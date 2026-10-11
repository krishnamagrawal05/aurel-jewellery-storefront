import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { pieces } from '../src/catalog.js'

const host = '127.0.0.1'
const port = Number(process.env.API_PORT || 3001)
const dataPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'demo-orders.json')
const demoOrders = new Map()
const productsById = new Map(pieces.map(piece => [piece.id, piece]))
const maximumBodyBytes = 16 * 1024
let writeQueue = Promise.resolve()

function sendJson(response, status, data) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  response.end(JSON.stringify(data))
}

async function persistOrders() {
  const snapshot = JSON.stringify([...demoOrders.values()], null, 2)
  writeQueue = writeQueue.then(async () => {
    await mkdir(dirname(dataPath), { recursive: true })
    const temporaryPath = `${dataPath}.${randomUUID()}.tmp`
    await writeFile(temporaryPath, snapshot, { encoding: 'utf8', flag: 'wx' })
    await rename(temporaryPath, dataPath)
  })
  await writeQueue
}

async function loadOrders() {
  try {
    const saved = JSON.parse(await readFile(dataPath, 'utf8'))
    if (!Array.isArray(saved)) throw new Error('Saved demo order data must be a JSON array.')
    for (const order of saved) {
      if (order && typeof order.id === 'string') demoOrders.set(order.id, order)
    }
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw new Error(`Unable to load saved demo orders: ${error.message}`)
  }
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > maximumBodyBytes) {
      request.resume()
      const error = new Error('Request body is too large.')
      error.status = 413
      throw error
    }
  }
  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Request body must be valid JSON.')
    error.status = 400
    throw error
  }
}

function createDemoOrder(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 40) {
    const error = new Error('Add between 1 and 40 product lines to the demo order.')
    error.status = 400
    throw error
  }

  const normalized = new Map()
  for (const line of items) {
    if (!line || typeof line.id !== 'string' || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 10) {
      const error = new Error('Each line needs a product ID and a quantity from 1 to 10.')
      error.status = 400
      throw error
    }
    const product = productsById.get(line.id)
    if (!product) {
      const error = new Error(`Unknown product: ${line.id}`)
      error.status = 400
      throw error
    }
    const quantity = (normalized.get(line.id) || 0) + line.quantity
    if (quantity > 10) {
      const error = new Error('A demo product quantity cannot exceed 10.')
      error.status = 400
      throw error
    }
    normalized.set(line.id, quantity)
  }

  const orderItems = [...normalized].map(([id, quantity]) => {
    const product = productsById.get(id)
    return { id, name: product.name, quantity, unitPrice: product.price, lineTotal: product.price * quantity }
  })
  return {
    id: `AR-${randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    currency: 'USD',
    items: orderItems,
    total: orderItems.reduce((sum, item) => sum + item.lineTotal, 0),
    status: 'awaiting-demo-payment',
    payment: null,
    paymentAttempts: [],
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${host}:${port}`)
    if (request.method === 'GET' && url.pathname === '/api/health') {
      sendJson(response, 200, { status: 'ok', mode: 'local-demo', catalogueCount: pieces.length })
      return
    }

    if (request.method === 'GET' && url.pathname === '/api/products') {
      const products = pieces.map(({ id, name, category, gender, price, material, badge, image, second, description }) => ({
        id, name, category, gender, price, material, badge, image, second, description,
      }))
      sendJson(response, 200, { products, count: products.length })
      return
    }

    if (request.method === 'GET' && url.pathname.startsWith('/api/products/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/products/'.length))
      const product = productsById.get(id)
      if (!product) {
        sendJson(response, 404, { error: 'Product not found.' })
        return
      }
      sendJson(response, 200, { product })
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/demo-orders') {
      const body = await readJson(request)
      const order = createDemoOrder(body.items)
      demoOrders.set(order.id, order)
      await persistOrders()
      sendJson(response, 201, { order, notice: 'Demo only. No payment, customer details, or fulfilment were collected.' })
      return
    }

    const demoPaymentMatch = url.pathname.match(/^\/api\/demo-orders\/([^/]+)\/demo-payment$/)
    if (request.method === 'POST' && demoPaymentMatch) {
      const id = decodeURIComponent(demoPaymentMatch[1])
      const order = demoOrders.get(id)
      if (!order) {
        sendJson(response, 404, { error: 'Demo order not found.' })
        return
      }
      if (order.status === 'demo-paid') {
        sendJson(response, 409, { error: 'This demo order has already been approved.', order })
        return
      }
      const body = await readJson(request)
      if (!['demo-card', 'demo-wallet'].includes(body.method) || !['approved', 'declined'].includes(body.outcome)) {
        sendJson(response, 400, { error: 'Choose a demo payment method and an approved or declined outcome.' })
        return
      }
      const approved = body.outcome === 'approved'
      order.status = approved ? 'demo-paid' : 'awaiting-demo-payment'
      const payment = {
        id: `DEMO-${randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()}`,
        method: body.method,
        status: approved ? 'approved' : 'declined',
        simulatedAt: new Date().toISOString(),
      }
      order.payment = payment
      order.paymentAttempts ||= []
      order.paymentAttempts.push(payment)
      await persistOrders()
      sendJson(response, 200, {
        order,
        notice: approved
          ? 'Demo payment approved. No money was charged.'
          : 'Demo payment declined. No money was charged.',
      })
      return
    }

    if (request.method === 'GET' && url.pathname.startsWith('/api/demo-orders/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/demo-orders/'.length))
      const order = demoOrders.get(id)
      if (!order) {
        sendJson(response, 404, { error: 'Demo order not found.' })
        return
      }
      sendJson(response, 200, { order })
      return
    }

    sendJson(response, 404, { error: 'API route not found.' })
  } catch (error) {
    if (response.destroyed || response.writableEnded) return
    if (!error.status) console.error('Local demo API error:', error)
    sendJson(response, error.status || 500, { error: error.status ? error.message : 'Unexpected local API error.' })
  }
})

await loadOrders()
server.listen(port, host, () => console.log(`AUREL local demo API listening on http://${host}:${port}`))
