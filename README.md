# AUREL — Jewellery, considered

A responsive, multi-page jewellery brand concept and storefront demonstration, built with React and Vite.

**Demo disclosure:** AUREL is fictional. The 104 product listings, descriptions, materials, prices, photography, brand copy, and policies are illustrative sample content. This is not a jewellery retailer and makes no verified sourcing, certification, customer-review, stock, or fulfilment claims. Demo checkout, contact, and newsletter interactions do not transmit personal information or process payment.

## Run locally

```sh
npm install
npm run api
```

In a second terminal, start the storefront:

```sh
npm run dev
```

Vite prints the local preview URL when the development server starts. To check the production build, run `npm run build`; `npm run preview` serves that build locally.

## Storefront

- Home: editorial campaign, dedicated women’s and men’s edits, style quiz, gift finder, concept atelier, editorial collections, care guide, materials education, trust disclosures, FAQs, and journal.
- Shop: 104 sample listings across the women’s and men’s edits, with category, price, material, and gemstone filters and price/name sorting.
- Product: sample product details, ring or chain-size choices, material and care information, verification prompts, and related products.
- Materials guide: practical background on gold, diamonds, silver, and gemstones with a seller-verification checklist.
- Guided shopping: local style quiz and gift finder recommend sample products from the demo catalogue; concept atelier provides an in-page customisation mood board.
- Care & repair guide: general material-care notes and a local-only repair-request topic preview, not a real service.
- Product image viewer: select alternate images and open an accessible full-screen gallery with keyboard navigation.
- FAQ and brand story: clear disclosures on demo limitations, product verification, policies, and why transparency matters.
- Saved pieces and shopping bag: persisted in browser local storage, including bag quantity controls.
- Checkout: the local demo API validates a sample bag, creates an order, and provides a simulated card/wallet payment step with approved and declined outcomes. It never collects payment details or charges money.
- Local API: `npm run api` starts a dependency-free Node server on `127.0.0.1:3001`. The Vite dev server proxies `/api` requests to it.
- API endpoints: `GET /api/health`, `GET /api/products`, `GET /api/products/:id`, `POST /api/demo-orders`, `GET /api/demo-orders/:id`, and `POST /api/demo-orders/:id/demo-payment`.
- Journal and contact pages; search and newsletter interaction previews. Forms do not send or retain form data.

Product photography is loaded from Unsplash and fonts from Google Fonts, so those assets require an internet connection.

The local API is a development demo, not a production commerce backend. Orders persist in `data/demo-orders.json` on this device and are excluded from version control. This file is not protected production storage; do not enter real or sensitive information. There is no database, authentication, inventory reservation, real payment processing, customer-data storage, or fulfilment. Do not use it for live orders.
