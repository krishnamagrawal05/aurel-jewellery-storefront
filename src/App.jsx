import { useEffect, useMemo, useState } from 'react'
import { pieces, productImages } from './catalog.js'
import './App.css'

const image = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const stories = [
  { image: 'photo-1529139574466-a303027c1d8b', category: 'The art of wearing', title: 'Getting dressed, a little more slowly', body: 'On finding beauty in the things we return to, and making the everyday feel a little more like our own.' },
  { image: 'photo-1515562141207-7a88fb7ce338', category: 'Behind the piece', title: 'Questions to ask about craftsmanship', body: 'A practical guide to construction details, finish, repair options, and what to request before buying.' },
  { image: 'photo-1503342217505-b0a15ec3261c', category: 'A lighter footprint', title: 'What transparent materials look like', body: 'A reminder to look for specific, checkable product disclosures rather than broad promises.' },
]

const money = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function Icon({ name, size = 19 }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.2" /><path d="m15.3 15.3 4.1 4.1" /></>,
    bag: <><path d="M4.5 7.5h15l-1 12h-13z" /><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" /></>,
    heart: <path d="M20.4 8.5c0 5-8.4 10-8.4 10s-8.4-5-8.4-10a4.2 4.2 0 0 1 8.4-1.1 4.2 4.2 0 0 1 8.4 1.1Z" />,
    menu: <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    ship: <><path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    diamond: <><path d="M12 2 3 8l9 14 9-14zM3 8h18" /><path d="m12 22-3-14 3-6 3 6z" /></>,
    leaf: <><path d="M20 4c-8 0-14 2-14 9a6 6 0 0 0 6 6c7 0 8-7 8-15Z" /><path d="M3 21c3-5 7-8 13-11" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function Link({ to = '', children, className = '', ...props }) {
  return <a href={`#/${to}`} className={className} {...props}>{children}</a>
}

function SectionLink({ target, children }) {
  return <a href={`#${target}`} onClick={event => {
    event.preventDefault()
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }}>{children}</a>
}

function Header({ count, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <div className="announcement">AUREL concept storefront · sample products, not verified offers</div>
    <header className="site-header">
      <div className="header-main page-width">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="shop">Shop</Link><Link to="women">Women</Link><Link to="men">Men</Link><Link to="quiz">Find your piece</Link><Link to="atelier">Atelier</Link>
        </nav>
        <Link className="wordmark" to="" aria-label="AUREL home">AUREL<span>Jewellery, considered</span></Link>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search" onClick={onSearch}><Icon name="search" /></button>
          <Link className="icon-button" to="saved" aria-label="Saved pieces"><Icon name="heart" /></Link>
          <Link className="icon-button" to="bag" aria-label="Shopping bag"><Icon name="bag" /><span className="bag-count">{count}</span></Link>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" onClick={() => setMenuOpen(false)}><Link to="shop">Shop all</Link><Link to="women">Women’s edit</Link><Link to="men">Men’s edit</Link><Link to="gift-finder">Gift finder</Link><Link to="quiz">Find your piece</Link><Link to="atelier">Personalise a concept</Link><Link to="care">Care & repair guide</Link><Link to="education">Materials guide</Link><Link to="faq">FAQs</Link><Link to="story">Our story</Link></nav>}
    </header>
  </>
}

function ProductCard({ item, favorite, onFavorite, onAdd }) {
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`product/${item.id}`} className="product-image-link">
        {item.badge && <span className="product-badge">{item.badge}</span>}
        <img src={image(item.image, 700)} alt={`${item.name}, ${item.material}`} loading="lazy" />
      </Link>
      <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} aria-label={favorite ? 'Remove from saved pieces' : 'Add to saved pieces'} onClick={() => onFavorite(item.id)}><Icon name="heart" size={17} /></button>
      <button className="quick-add" onClick={() => onAdd(item.id)}>Add to bag · {money(item.price)}</button>
    </div>
    <div className="product-info">
      <div><Link to={`product/${item.id}`}><h3>{item.name}</h3></Link><p>{item.gender}’s edit · {item.category}</p></div>
      <span className="product-price">{money(item.price)}</span>
    </div>
  </article>
}

function SectionHeading({ eyebrow, title, link, to }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Link to={to} className="text-link">{link} <span>→</span></Link></div>
}

function Benefits() {
  return <div className="benefits page-width">
    <div><Icon name="ship" size={17} /> Clear policies before you purchase</div>
    <div><Icon name="diamond" size={17} /> Ask for stone and metal details</div>
    <div><Icon name="leaf" size={17} /> Verify claims with the seller</div>
  </div>
}

function Home({ favorites, onFavorite, onAdd }) {
  return <main>
    <section className="hero">
      <img className="hero-image" src={image('photo-1602173574767-37ac01994b2a', 1800)} alt="An illustrative close-up of a fine jewellery design" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content page-width"><p className="eyebrow">The everyday, made extraordinary</p><h1>Pieces to<br />keep close.</h1><p>Thoughtfully made jewellery for wherever life takes you. A little light, every day.</p><Link to="shop" className="button button-light">Discover the collection <span>→</span></Link></div>
      <span className="hero-caption">A study in the everyday</span>
    </section>
    <Benefits />
    <section className="section page-width">
      <SectionHeading eyebrow="Made for your every day" title="Find your forever piece" link="Explore all jewellery" to="shop" />
      <div className="audience-links"><Link to="women">Explore the women’s edit <span>→</span></Link><Link to="men">Explore the men’s edit <span>→</span></Link></div>
      <div className="category-grid">
        <Link to="shop?category=Necklaces" className="category-card"><img src={image('photo-1599643478518-a784e5dc4c8f', 850)} alt="Layered gold necklaces" loading="lazy" /><span><strong>Necklaces</strong><small>Close to the heart →</small></span></Link>
        <Link to="shop?category=Earrings" className="category-card"><img src={image('photo-1617038220319-276d3cfab638', 800)} alt="Sculptural gold earrings" loading="lazy" /><span><strong>Earrings</strong><small>A little light →</small></span></Link>
        <Link to="shop?category=Rings" className="category-card"><img src={image('photo-1605100804763-247f67b3557e', 850)} alt="Fine gold ring" loading="lazy" /><span><strong>Rings</strong><small>Everyday treasures →</small></span></Link>
      </div>
    </section>
    <section className="section page-width section-products">
      <SectionHeading eyebrow="Chosen with care" title="The pieces you reach for" link="Shop bestsellers" to="shop" />
      <div className="product-grid">{pieces.slice(0, 4).map(item => <ProductCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={onFavorite} onAdd={onAdd} />)}</div>
    </section>
    <section className="editorial-band"><div className="editorial-image" style={{ backgroundImage: `url("${image('photo-1515562141207-7a88fb7ce338', 1200)}")` }} /><div className="editorial-copy"><p className="eyebrow">A considered concept</p><h2>Good details.<br />Clear answers.</h2><p>Trust starts with specifics. Explore our independent materials guide, know what to ask about metal fineness and gemstones, and check a seller’s policies before you buy.</p><Link to="education" className="text-link">Explore the materials guide <span>→</span></Link></div></section>
    <section className="trust-section page-width"><p className="eyebrow">Why trust AUREL?</p><h2>Because trust should be checkable.</h2><p>AUREL is a concept storefront, not a verified jewellery retailer. This catalogue is for demonstration only: no products, certifications, customer reviews, sourcing records, payment processing, or fulfilment are represented as real.</p><div className="trust-actions"><Link to="story" className="text-link">Our transparency promise →</Link><Link to="faq" className="text-link">Read frequently asked questions →</Link></div></section>
    <section className="guided-shopping page-width"><div className="guided-heading"><p className="eyebrow">A little help finding your piece</p><h2>Good choices start with you.</h2><p>Take a quick style quiz or find an idea for someone special. Suggestions are drawn from our illustrative demo catalogue.</p></div><div className="guided-cards"><Link to="quiz" className="guided-card"><span className="guided-number">01 / YOUR STYLE</span><h3>Find your piece</h3><p>A few thoughtful questions. A shortlist that feels more like you.</p><span className="guided-arrow">Take the quiz →</span></Link><Link to="gift-finder" className="guided-card"><span className="guided-number">02 / THOUGHTFUL GIFTS</span><h3>Find a lovely gift</h3><p>Explore gift ideas by recipient, occasion, and your budget.</p><span className="guided-arrow">Meet the gift finder →</span></Link><Link to="atelier" className="guided-card"><span className="guided-number">03 / MAKE IT YOURS</span><h3>Imagine a custom piece</h3><p>Play with shape, metal colour, stone, and engraving ideas.</p><span className="guided-arrow">Visit the concept atelier →</span></Link></div></section>
    <section className="section page-width journal-preview"><SectionHeading eyebrow="Know what you’re choosing" title="A little more about materials" link="Read the complete guide" to="education" /><div className="knowledge-grid"><article><p className="eyebrow">01 · Gold</p><h3>Karat describes fineness.</h3><p>Learn how karats and alloy colour relate, and which details a trustworthy listing should disclose.</p></article><article><p className="eyebrow">02 · Diamonds</p><h3>Look beyond the word “diamond”.</h3><p>Understand the 4Cs, origin disclosures, treatments, and when grading documentation matters.</p></article><article><p className="eyebrow">03 · Gemstones</p><h3>Beauty deserves context.</h3><p>Ask about gemstone identity, treatments, durability, and care before making a decision.</p></article></div></section>
    <section className="editorial-collections page-width"><div className="guided-heading"><p className="eyebrow">A few ways to explore</p><h2>Every piece has a point of view.</h2><p>Browse small, editorial edits by mood. These collections organise demo products; they are not claims about an actual maker or occasion.</p></div><div className="collection-story-grid"><Link to="shop?category=Rings" className="collection-story"><img src={image('photo-1605100804763-247f67b3557e', 850)} alt="Illustrative detail of rings" loading="lazy" /><span><small>01 · THE LITTLE HEIRLOOM EDIT</small><strong>Rings to mark a moment.</strong><em>Explore sample rings →</em></span></Link><Link to="shop?category=Necklaces" className="collection-story"><img src={image('photo-1599643478518-a784e5dc4c8f', 850)} alt="Illustrative detail of a pendant" loading="lazy" /><span><small>02 · THE LAYERING STUDY</small><strong>Made for your own rhythm.</strong><em>Explore sample necklaces →</em></span></Link><Link to="men" className="collection-story"><img src={image('photo-1611591437281-460bfbe1220a', 850)} alt="Illustrative detail of a bracelet" loading="lazy" /><span><small>03 · OBJECTS FOR EVERY DAY</small><strong>Simple shapes, your way.</strong><em>Explore the men’s edit →</em></span></Link></div></section>
    <section className="trust-faq page-width"><div><p className="eyebrow">A few clear answers</p><h2>Before you add anything to your bag.</h2><p>Wondering about materials, certificates, returns, or the demo checkout? We have put the important details in one place.</p><Link to="faq" className="text-link">Visit the FAQ <span>→</span></Link></div><Link className="faq-teaser" to="faq"><span>Are these real products or verified listings?</span><span>＋</span></Link><Link className="faq-teaser" to="faq"><span>Does the checkout take payment?</span><span>＋</span></Link><Link className="faq-teaser" to="faq"><span>How can I verify a metal or gemstone claim?</span><span>＋</span></Link></section>
    <section className="care-banner page-width"><div><p className="eyebrow">A little care goes a long way</p><h2>Keep the things you love, lovely.</h2><p>Learn why care depends on the exact metal, surface, setting, and stone—and what to ask a jeweller about repairs.</p><Link to="care" className="text-link">Explore the care & repair guide →</Link></div><img src={image('photo-1515562141207-7a88fb7ce338', 900)} alt="Illustrative close-up of jewellery details" loading="lazy" /></section>
    <section className="section page-width journal-preview"><SectionHeading eyebrow="Read, wear, repeat" title="From the AUREL journal" link="All stories" to="journal" /><StoryCards onOpen={() => { window.location.hash = '#/journal' }} /></section>
  </main>
}

function StoryCards({ onOpen, items = stories }) {
  return <div className="journal-grid">{items.map(story => <article className="journal-card" key={story.title} onClick={onOpen} tabIndex="0" onKeyDown={event => event.key === 'Enter' && onOpen()}><img src={image(story.image, 700)} alt={story.title} loading="lazy" /><p className="eyebrow">{story.category}</p><h3>{story.title}</h3><p>{story.body}</p></article>)}</div>
}

function Collection({ category, gender = 'All', favorites, savedOnly, onFavorite, onAdd }) {
  const [selectedCategories, setSelectedCategories] = useState(category === 'All jewellery' ? [] : [category])
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedGenders, setSelectedGenders] = useState(gender === 'All' ? [] : [gender])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [withStone, setWithStone] = useState(false)
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [collapsed, setCollapsed] = useState({})
  const title = savedOnly ? 'Saved pieces' : gender === 'Men' ? 'Men’s edit' : gender === 'Women' ? 'Women’s edit' : category
  const list = useMemo(() => {
    let filtered = pieces.filter(item =>
      (!savedOnly || favorites.includes(item.id)) &&
      (category === 'All jewellery' || item.category === category) &&
      (gender === 'All' || item.gender === gender) &&
      (!selectedGenders.length || gender !== 'All' || selectedGenders.includes(item.gender)) &&
      (!selectedCategories.length || category !== 'All jewellery' || selectedCategories.includes(item.category)) &&
      (!selectedPrices.length || selectedPrices.some(range => range === 'under400' ? item.price < 400 : range === '400to600' ? item.price >= 400 && item.price <= 600 : item.price > 600)) &&
      (!selectedMaterials.length || selectedMaterials.some(material => item.material.toLowerCase().includes(material))) &&
      (!withStone || /sapphire|diamond/i.test(item.material))
    )
    if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    return filtered
  }, [category, gender, favorites, savedOnly, selectedCategories, selectedGenders, selectedPrices, selectedMaterials, withStone, sort])
  const toggleItem = (value, setter, current) => setter(current.includes(value) ? current.filter(item => item !== value) : [...current, value])

  const filterGroup = (key, label, content) => <div className="filter-group" key={key}>
    <button className="filter-title" onClick={() => setCollapsed({ ...collapsed, [key]: !collapsed[key] })}>{label}<span>{collapsed[key] ? '+' : '−'}</span></button>
    {!collapsed[key] && <div className="filter-options">{content}</div>}
  </div>

  const sidebar = <aside className={`filter-sidebar ${filtersOpen ? 'mobile-open' : ''}`}>
    {filterGroup('gender', 'Shop by', ['Women', 'Men'].map(value => <label key={value} className="filter-option"><input type="checkbox" checked={gender === value || selectedGenders.includes(value)} disabled={gender !== 'All' && gender !== value} onChange={() => toggleItem(value, setSelectedGenders, selectedGenders)} />{value}’s edit</label>))}
    {filterGroup('category', 'Category', ['Earrings', 'Necklaces', 'Rings', 'Bracelets'].map(value => <label key={value} className="filter-option"><input type="checkbox" checked={category === value || selectedCategories.includes(value)} disabled={category !== 'All jewellery' && category !== value} onChange={() => toggleItem(value, setSelectedCategories, selectedCategories)} />{value}</label>))}
    {filterGroup('price', 'Price', [['under400', 'Under $400'], ['400to600', '$400 – $600'], ['over600', '$600 & above']].map(([value, label]) => <label key={value} className="filter-option"><input type="checkbox" checked={selectedPrices.includes(value)} onChange={() => toggleItem(value, setSelectedPrices, selectedPrices)} />{label}</label>))}
    {filterGroup('material', 'Material', <>{[['yellow gold', 'Yellow gold'], ['silver', 'Silver'], ['vermeil', 'Gold vermeil']].map(([value, label]) => <label key={value} className="filter-option"><input type="checkbox" checked={selectedMaterials.includes(value)} onChange={() => toggleItem(value, setSelectedMaterials, selectedMaterials)} />{label}</label>)}<label className="filter-option"><input type="checkbox" checked={withStone} onChange={() => setWithStone(!withStone)} />With a sample stone</label></>)}
  </aside>

  return <main>
    <div className="page-hero"><p className="eyebrow">The AUREL demo collection</p><h1>{title}</h1><p>{savedOnly ? 'Your saved sample catalogue pieces.' : 'Explore illustrative product data. Verify all product specifications with a retailer before purchase.'}</p></div>
    <div className="page-width"><div className="breadcrumbs"><Link to="">Home</Link><span>／</span><span>{title}</span></div>
      <div className="collection-layout">{sidebar}<div>
        <div className="collection-toolbar"><button className="mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)}>{filtersOpen ? '− Close filters' : '＋ Filters'}</button><span>{list.length} sample {list.length === 1 ? 'piece' : 'pieces'} · {pieces.length} in demo catalogue</span><label className="sort-label">Sort: <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option><option value="name">Name: A to Z</option></select></label></div>
        {list.length ? <div className="product-grid collection-grid">{list.map(item => <ProductCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={onFavorite} onAdd={onAdd} />)}</div> : <div className="no-results"><h2>Nothing just yet.</h2><p>Try changing your filters or explore the full collection.</p><Link to="shop" className="text-link">Explore the collection →</Link></div>}
      </div></div>
    </div>
  </main>
}

function ProductDetail({ id, favorites, onFavorite, onAdd }) {
  const item = pieces.find(piece => piece.id === id) || pieces[0]
  const [variant, setVariant] = useState(item.category === 'Rings' ? '6' : item.category === 'Necklaces' ? '18″' : '')
  const [activeImage, setActiveImage] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const gallery = [item.image, item.second, productImages[item.category][3] || item.image]
  const related = pieces.filter(piece => piece.id !== item.id && piece.category === item.category).slice(0, 4)
  const variants = item.category === 'Rings' ? ['5', '6', '7', '8', '9'] : item.category === 'Necklaces' ? ['16″', '18″', '20″'] : []
  useEffect(() => {
    if (!zoomOpen) return undefined
    const onKeyDown = event => {
      if (event.key === 'Escape') setZoomOpen(false)
      if (event.key === 'ArrowRight') setActiveImage(index => (index + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setActiveImage(index => (index + gallery.length - 1) % gallery.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [gallery.length, zoomOpen])
  return <main className="page-width">
    <div className="breadcrumbs"><Link to="">Home</Link><span>／</span><Link to={`shop?category=${encodeURIComponent(item.category)}`}>{item.category}</Link><span>／</span><span>{item.name}</span></div>
    <section className="product-detail">
      <div className="detail-gallery">
        <button className="gallery-main-image" aria-label="Open larger product image" onClick={() => setZoomOpen(true)}><img src={image(gallery[activeImage], 1200)} alt={`Illustrative image for ${item.name}`} fetchPriority="high" /><span>＋ View larger</span></button>
        <div className="gallery-thumbnails">{gallery.map((photoId, index) => <button key={`${photoId}-${index}`} className={`gallery-thumbnail ${activeImage === index ? 'active' : ''}`} onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1} of ${item.name}`}><img src={image(photoId, 320)} alt="" /></button>)}</div>
        <p className="gallery-caption">Illustrative imagery · image {activeImage + 1} of {gallery.length}</p>
      </div>
      <div className="detail-panel"><p className="eyebrow">Illustrative demo listing · {item.gender}’s edit</p><h1>{item.name}</h1><p className="detail-price">{money(item.price)}</p><p className="detail-description">{item.description}</p><hr />
        {variants.length > 0 && <><span className="option-label">{item.category === 'Rings' ? 'Ring size' : 'Chain length'}</span><div className="variant-options">{variants.map(value => <button key={value} className={`variant ${variant === value ? 'selected' : ''}`} onClick={() => setVariant(value)}>{value}</button>)}</div></>}
        <div className="detail-actions"><button className="button button-full" onClick={() => onAdd(item.id)}>Add to bag · {money(item.price)}</button><button className={`favorite-button ${favorites.includes(item.id) ? 'is-favorite' : ''}`} aria-label="Save piece" onClick={() => onFavorite(item.id)}><Icon name="heart" /></button></div>
        <p className="delivery-note">Demo only: no item is for sale, shipping is not arranged, and payment is not collected.</p>
        <details className="accordion"><summary>Materials & care information</summary><p>Sample listing describes this item as {item.material.toLowerCase()}; this description has not been tested or verified. Ask the actual seller for exact alloy fineness, plating thickness, gemstone treatments, care instructions, and documentation.</p></details>
        <details className="accordion"><summary>Shipping, returns & warranty</summary><p>AUREL is a demo storefront with no shipping, returns, warranty, or repair service. Before buying from any jeweller, check written policies, processing timelines, and the seller’s contact details.</p></details>
        <details className="accordion"><summary>What can be verified?</summary><p>This concept page does not represent a real product, certification, appraisal, sourcing record, maker, or customer review. Independent supporting documentation should be requested from a real seller.</p></details>
      </div>
    </section>
    {zoomOpen && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Image gallery for ${item.name}`} onClick={event => event.target === event.currentTarget && setZoomOpen(false)}><button className="lightbox-close" aria-label="Close image gallery" onClick={() => setZoomOpen(false)}>×</button><button className="lightbox-step previous" aria-label="Previous image" onClick={() => setActiveImage(index => (index + gallery.length - 1) % gallery.length)}>←</button><img src={image(gallery[activeImage], 1800)} alt={`Illustrative image ${activeImage + 1} for ${item.name}`} /><button className="lightbox-step next" aria-label="Next image" onClick={() => setActiveImage(index => (index + 1) % gallery.length)}>→</button><span>{item.name} · {activeImage + 1} / {gallery.length} · demo imagery</span></div>}
    <section className="section related-section"><SectionHeading eyebrow="A little more to love" title="Made to be worn together" link="Shop all jewellery" to="shop" /><div className="product-grid">{related.map(piece => <ProductCard key={piece.id} item={piece} favorite={favorites.includes(piece.id)} onFavorite={onFavorite} onAdd={onAdd} />)}</div></section>
  </main>
}

function Story() {
  return <main className="page-width content-page">
    <section className="story-intro"><img src={image('photo-1515562141207-7a88fb7ce338', 1000)} alt="Illustrative jewellery design imagery" fetchPriority="high" /><div><p className="eyebrow">The idea behind AUREL</p><h1>Beautiful design. Honest details.</h1><p>AUREL is a fictional jewellery-brand concept built to demonstrate a considered shopping experience. The designs, catalogue, prices, product descriptions, and imagery shown here are examples—not an operating jewellery business or available products.</p><p>Our point of view is simple: customers deserve useful information before they buy. That means clear material fineness, accurate gemstone details, care guidance, written policies, and independent documentation wherever a claim calls for proof.</p><Link to="education" className="text-link">Explore the materials guide →</Link></div></section>
    <section className="trust-manifesto"><p className="eyebrow">Why trust AUREL?</p><h2>Because trust should never depend on a beautiful photograph.</h2><p>This demo is open about what it cannot verify. It does not hold stock, sell jewellery, employ named craftspeople, collect customer reviews, issue certificates, process payments, or provide fulfilment. No sourcing, ethical, recycled-content, warranty, or quality claim is made about an actual product.</p></section>
    <div className="values-grid"><div><p className="eyebrow">01 · Ask for specifics</p><h3>“Gold” is not a complete disclosure.</h3><p>Request exact fineness, metal marks, plating details where relevant, and documentation that matches the specific item.</p></div><div><p className="eyebrow">02 · Check the stone</p><h3>Details matter more than adjectives.</h3><p>Ask about gem identity, natural or laboratory-grown origin when relevant, treatments, grading scope, and report numbers.</p></div><div><p className="eyebrow">03 · Read the policies</p><h3>Know who stands behind it.</h3><p>Review the actual seller’s contact information, returns, repairs, warranty terms, delivery expectations, and privacy practices before paying.</p></div></div>
    <div className="story-next"><Link to="faq" className="text-link">Read our frequently asked questions →</Link><Link to="contact" className="text-link">Contact details for this demo →</Link></div>
  </main>
}

function Education() {
  const topics = [
    { id: 'gold', eyebrow: '01 · Precious metal', title: 'Gold & fineness', intro: 'Karat (K) indicates the proportion of gold in an alloy by mass. Colour comes from the other metals in the alloy; a gold colour alone does not establish gold content.', points: [['24K', 'Near-pure gold is softer than common jewellery alloys; confirm the exact fineness and suitability for the design.'], ['18K', '18 parts of gold out of 24, or 75% gold by mass. The other metals influence colour and working properties.'], ['14K', '14 parts of gold out of 24, or about 58.5% gold by mass. Hallmarks and seller disclosures should match the stated fineness.'], ['Gold plated / vermeil', 'These describe a surface layer over a base metal (with legal definitions that vary). Ask for base-metal details and plating thickness rather than assuming a solid-gold item.']] },
    { id: 'diamonds', eyebrow: '02 · The four Cs', title: 'Understanding diamonds', intro: 'Cut, colour, clarity, and carat are useful comparison categories—not a complete description of a particular stone or a substitute for a report.', points: [['Cut', 'Describes proportions and finish that influence how a diamond interacts with light. It is distinct from shape, such as round or oval.'], ['Colour', 'For many grading scales, this describes how close a colourless diamond appears to the top of that scale. Fancy-colour diamonds are described differently.'], ['Clarity', 'Concerns internal and surface characteristics under a defined viewing method. Ask which grading system and conditions were used.'], ['Carat', 'A unit of weight, not a direct measurement of visible size. Face-up dimensions and cut proportions also affect appearance.']] },
    { id: 'silver', eyebrow: '03 · Silver', title: 'Silver & its marks', intro: 'Sterling silver is commonly an alloy containing 92.5% silver by mass and may be marked 925. Marks, rules, and enforcement vary by jurisdiction, so confirm with the seller.', points: [['Tarnish', 'Silver can darken through surface reactions with its environment. This is common and is not, by itself, proof of a problem or of authenticity.'], ['Care', 'Store dry and follow the maker’s cleaning advice. Some finishes, gemstones, and plated surfaces can be damaged by polishing compounds or chemicals.'], ['Questions to ask', 'Is the item solid sterling, plated, or another silver alloy? What do the marks indicate, and what care is suitable for the full piece?']] },
    { id: 'gemstones', eyebrow: '04 · Colour & origin', title: 'Gemstones & treatments', intro: 'Gemstone names cover stones with different origins, durability, care needs, and potential treatments. Request the disclosure for the specific stone in the specific setting.', points: [['Identity', 'Ask whether a description refers to a natural gemstone, a laboratory-grown stone, a simulant, or another material. Similar appearance does not mean the same composition.'], ['Treatments', 'Heat, filling, coating, and other treatments can affect appearance, value, and care. Ask what treatments are known and what has actually been tested.'], ['Reports', 'If a report is offered, confirm the issuing laboratory, scope, date, and report number independently. A report on a stone does not certify every claim about a finished piece.'], ['Care', 'Hardness is only one factor in durability. Inclusions, cleavage, setting, heat, chemicals, and impact all matter. Follow qualified gemmological advice.']] },
  ]
  return <main className="page-width content-page education-page">
    <header className="education-heading"><p className="eyebrow">A buyer’s guide · independent of the sample catalogue</p><h1>Know what you’re choosing.</h1><p>Clear, practical starting points for conversations with a jewellery seller. This guide is general information, not an appraisal, grading service, or authentication.</p></header>
    <div className="education-nav"><SectionLink target="gold">Gold</SectionLink><SectionLink target="diamonds">Diamonds</SectionLink><SectionLink target="silver">Silver</SectionLink><SectionLink target="gemstones">Gemstones</SectionLink><SectionLink target="verify">Verify a claim</SectionLink></div>
    <div className="education-topics">{topics.map(topic => <article id={topic.id} key={topic.id} className="education-topic"><div><p className="eyebrow">{topic.eyebrow}</p><h2>{topic.title}</h2><p>{topic.intro}</p></div><div className="education-points">{topic.points.map(([label, detail]) => <div key={label}><h3>{label}</h3><p>{detail}</p></div>)}</div></article>)}</div>
    <section id="verify" className="verification-panel"><p className="eyebrow">Before you buy</p><h2>A practical verification checklist</h2><ol><li>Get the precise metal fineness, alloy, and any plating details in writing.</li><li>For a gemstone, ask for identity, origin terminology, known treatments, weight, and dimensions.</li><li>Independently confirm any grading report with the named laboratory using its report number.</li><li>Read the actual return, repair, warranty, delivery, and privacy policies—not a generic promise.</li><li>Check the seller’s legal business identity, reachable contact details, and payment protections.</li></ol><p>This demo cannot perform any of these checks for a real product; verify directly with the seller or an independent professional.</p></section>
  </main>
}

function FAQ() {
  const questions = [
    ['Are the products shown here real or available to buy?', 'No. AUREL is a fictional concept storefront. The products, materials, descriptions, prices, and images are illustrative sample content. There is no live inventory.'],
    ['Are the material, gemstone, sourcing, or quality claims verified?', 'No. Nothing in this sample catalogue has been independently verified. Ask a real seller for specific, item-matched disclosures and supporting documents before making a purchase.'],
    ['Does AUREL have diamond certificates or appraisals?', 'No certificates or appraisals are issued by this demo. If a seller provides a grading report, independently confirm the issuer, report number, and what the report covers. A grading report is not the same as an appraisal.'],
    ['Can I place an order or make a payment?', 'No real order or payment is made. The local demo checkout can simulate approved and declined card or wallet outcomes without collecting card details or connecting to a payment provider. It sends only product IDs and quantities to the local demo API.'],
    ['Is there real shipping, tracking, or a returns service?', 'No. This concept site has no fulfilment, shipping, returns, repair, or warranty service. Any policy shown in demo content is not a real offer.'],
    ['How can I tell whether gold is solid, plated, or vermeil?', 'Request the exact metal fineness and base-metal composition, and ask whether the piece is solid, plated, or vermeil. Seek marks and supporting documentation appropriate to the jurisdiction and item; appearance alone is not proof.'],
    ['What is the difference between natural and laboratory-grown diamonds?', 'Both are diamond material but form in different environments. A simulant can look similar without having the same composition. Ask for clear origin terminology and an independent report where appropriate.'],
    ['How do I choose the right ring or chain size?', 'Use a correctly sized measuring method and the retailer’s item-specific guide. For rings, consider band width and temperature; for necklaces, compare a measured length against your preferred neckline. Confirm the retailer’s adjustment policy first.'],
    ['How should I care for jewellery?', 'Care depends on the metal, finish, stone, setting, and any treatment. Ask the maker for item-specific instructions. Avoid assuming one cleaning method is safe for every piece.'],
    ['Can I request a repair or resizing from AUREL?', 'No. The repair-request interaction is a preview only. This fictional storefront has no workshop or repair service. Ask the real seller or a qualified local jeweller to inspect the exact piece and explain the risks and estimate before authorising work.'],
    ['Does the newsletter or contact form send my information?', 'No. These forms only show a local demo confirmation; they do not send or store your contact details in a marketing or support system.'],
    ['Are demo orders saved?', 'Yes. The local development API saves sample product IDs, quantities, and simulated payment results in data/demo-orders.json on this device. This is not protected production storage; do not enter real or sensitive data.'],
  ]
  return <main className="page-width content-page faq-page"><header className="education-heading"><p className="eyebrow">Frequently asked questions</p><h1>Clear answers, before anything else.</h1><p>About the demo, jewellery materials, documentation, and what a responsible purchase conversation can include.</p></header><div className="faq-layout"><nav className="faq-index"><SectionLink target="demo">About this demo</SectionLink><SectionLink target="materials-faq">Materials & verification</SectionLink><SectionLink target="shopping">Sizing & care</SectionLink></nav><div className="faq-groups"><section id="demo"><p className="eyebrow">01 · The AUREL concept</p>{questions.slice(0,5).map(([question, answer]) => <details className="accordion faq-accordion" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section><section id="materials-faq"><p className="eyebrow">02 · Materials & verification</p>{questions.slice(5,7).map(([question, answer]) => <details className="accordion faq-accordion" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section><section id="shopping"><p className="eyebrow">03 · Sizing & care</p>{questions.slice(7).map(([question, answer]) => <details className="accordion faq-accordion" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section><Link to="education" className="text-link">Explore the gold, diamond & gemstone guide →</Link></div></div></main>
}

function GuidedFinder({ gift = false }) {
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const questions = gift
    ? [
        { id: 'recipient', label: 'Who are you celebrating?', options: [['Women', 'The women’s edit'], ['Men', 'The men’s edit'], ['Anyone', 'A surprise for anyone']] },
        { id: 'occasion', label: 'What is the occasion?', options: [['Rings', 'A milestone'], ['Necklaces', 'A little everyday love'], ['Earrings', 'A celebration'], ['Bracelets', 'Just because']] },
        { id: 'budget', label: 'What feels comfortable?', options: [['under400', 'Under $400'], ['400to700', '$400–$700'], ['any', 'Show me a little of everything']] },
      ]
    : [
        { id: 'mood', label: 'Which silhouettes feel most like you?', options: [['Rings', 'A small detail, close at hand'], ['Necklaces', 'A layer I can make my own'], ['Earrings', 'A little light around the face'], ['Bracelets', 'A favourite on the wrist']] },
        { id: 'metal', label: 'What material mood draws you in?', options: [['gold', 'Warm, sunny gold'], ['silver', 'Cool, classic silver'], ['all', 'I’m open to exploring']] },
        { id: 'budget', label: 'What range should we explore?', options: [['under400', 'Under $400'], ['400to700', '$400–$700'], ['any', 'Show me a little of everything']] },
      ]
  const select = value => {
    setAnswers(current => ({ ...current, [questions[step].id]: value }))
    setShowResults(false)
  }
  const findMatches = () => {
    let matches = pieces.filter(item =>
      (answers.recipient === 'Anyone' || !answers.recipient || item.gender === answers.recipient) &&
      (!answers.mood || item.category === answers.mood) &&
      (!answers.occasion || item.category === answers.occasion) &&
      (!answers.metal || answers.metal === 'all' || item.material.toLowerCase().includes(answers.metal)) &&
      (!answers.budget || answers.budget === 'any' || (answers.budget === 'under400' ? item.price < 400 : item.price >= 400 && item.price <= 700)),
    )
    if (matches.length < 4) {
      matches = pieces.filter(item =>
        (!answers.recipient || answers.recipient === 'Anyone' || item.gender === answers.recipient) &&
        (!answers.mood || item.category === answers.mood) &&
        (!answers.occasion || item.category === answers.occasion) &&
        (!answers.metal || answers.metal === 'all' || item.material.toLowerCase().includes(answers.metal)),
      )
    }
    if (matches.length < 4) matches = pieces.filter(item => !answers.recipient || answers.recipient === 'Anyone' || item.gender === answers.recipient)
    return matches.slice(0, 4)
  }
  const matches = findMatches()
  return <main className="page-width content-page finder-page">
    <header className="education-heading"><p className="eyebrow">{gift ? 'A little something for someone lovely' : 'A small moment for yourself'}</p><h1>{gift ? 'The thoughtful gift finder.' : 'Find the piece that feels like you.'}</h1><p>{gift ? 'A few simple prompts turn a big catalogue into a gentler place to begin.' : 'Tell us what catches your eye, and we’ll make a little sample shortlist.'} Demo suggestions only; no purchase or gifting service is provided.</p></header>
    {!showResults ? <section className="finder-panel"><div className="finder-progress"><span>{String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span><div><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div></div><p className="eyebrow">{gift ? 'GIFT NOTES' : 'STYLE NOTES'}</p><h2>{questions[step].label}</h2><div className="finder-options">{questions[step].options.map(([value, label]) => <button key={value} className={`finder-option ${answers[questions[step].id] === value ? 'selected' : ''}`} onClick={() => select(value)}><span>{label}</span><span>{answers[questions[step].id] === value ? '✓' : '＋'}</span></button>)}</div><div className="finder-controls"><button className="button button-outline" disabled={step === 0} onClick={() => setStep(current => Math.max(0, current - 1))}>← Back</button>{step < questions.length - 1 ? <button className="button" disabled={!answers[questions[step].id]} onClick={() => setStep(current => current + 1)}>Next question →</button> : <button className="button" disabled={!answers[questions[step].id]} onClick={() => setShowResults(true)}>Show my sample edit →</button>}</div></section> : <section className="finder-results"><div className="section-heading"><div><p className="eyebrow">A little shortlist, picked for you</p><h2>{gift ? 'A few gift ideas to get you started.' : 'Your style, in a few pieces.'}</h2></div><button className="text-link finder-reset" onClick={() => { setAnswers({}); setStep(0); setShowResults(false) }}>Start again ↻</button></div><p className="finder-disclosure">These suggestions match your answers against illustrative catalogue tags. The items and prices are demo data.</p><div className="product-grid">{matches.map(item => <article className="mini-recommendation" key={item.id}><Link to={`product/${item.id}`}><img src={image(item.image, 600)} alt={`Illustrative image for ${item.name}`} /><span><strong>{item.name}</strong><small>{item.category} · sample {money(item.price)}</small></span></Link></article>)}</div></section>}
  </main>
}

function Atelier() {
  const [shape, setShape] = useState('Pendant')
  const [metal, setMetal] = useState('Warm yellow')
  const [stone, setStone] = useState('White sapphire')
  const [engraving, setEngraving] = useState('')
  const [previewed, setPreviewed] = useState(false)
  const materialLabel = metal === 'Silver tone' ? 'silver-tone (illustrative)' : metal === 'Soft rose' ? 'rose-gold-tone (illustrative)' : 'yellow-gold-tone (illustrative)'
  return <main className="page-width content-page atelier-page">
    <header className="education-heading"><p className="eyebrow">The AUREL concept atelier</p><h1>Imagine something of your own.</h1><p>Explore a few design decisions and make a local visual concept. It is not a CAD tool, quote, order, or a promise that custom work is available.</p></header>
    <div className="atelier-layout"><section className="atelier-preview"><div className={`atelier-object shape-${shape.toLowerCase()}`}><span className={`atelier-stone stone-${stone.toLowerCase().replaceAll(' ', '-')}`} /></div><div className="atelier-preview-caption"><p className="eyebrow">YOUR CONCEPT, SO FAR</p><h2>{metal} {shape.toLowerCase()}</h2><p>{stone}{engraving ? ` · “${engraving}”` : ''}</p><small>Visual mood board only · not a product render</small></div></section><section className="atelier-controls">
      <fieldset><legend>01 · Choose a starting shape</legend><div className="choice-grid">{['Pendant', 'Signet', 'Hoops', 'Cuff'].map(option => <button type="button" key={option} className={`choice ${shape === option ? 'active' : ''}`} onClick={() => { setShape(option); setPreviewed(false) }}>{option}</button>)}</div></fieldset>
      <fieldset><legend>02 · Pick a metal colour</legend><div className="choice-grid">{['Warm yellow', 'Soft rose', 'Silver tone'].map(option => <button type="button" key={option} className={`choice ${metal === option ? 'active' : ''}`} onClick={() => { setMetal(option); setPreviewed(false) }}>{option}</button>)}</div></fieldset>
      <fieldset><legend>03 · Imagine a centre stone</legend><div className="choice-grid">{['White sapphire', 'Green tourmaline', 'No stone'].map(option => <button type="button" key={option} className={`choice ${stone === option ? 'active' : ''}`} onClick={() => { setStone(option); setPreviewed(false) }}>{option}</button>)}</div></fieldset>
      <div className="field"><label htmlFor="atelier-engraving">A short engraving idea · optional</label><input id="atelier-engraving" value={engraving} maxLength={18} onChange={event => { setEngraving(event.target.value); setPreviewed(false) }} placeholder="A word, initials, or date" /><small>{engraving.length} / 18 characters · stored only in this page while open</small></div>
      <button className="button" onClick={() => setPreviewed(true)}>Save this concept on screen →</button>
      {previewed && <p className="atelier-confirmation" role="status">Your {materialLabel} {shape.toLowerCase()} concept is ready to explore. Nothing was saved or sent.</p>}
      <p className="finder-disclosure">This fictional configurator creates no image file, product specification, price quote, order, or manufacturing request.</p>
    </section></div>
  </main>
}

function CareGuide() {
  const [requestType, setRequestType] = useState('Sizing question')
  const [requestPreview, setRequestPreview] = useState(false)
  const careTopics = [
    ['Gold alloys & plated finishes', 'Care depends on the precise alloy, surface finish, and construction. Ask whether a piece is solid gold, plated, vermeil, or another material. A soft dry cloth is a gentler starting point than household cleaners; avoid assuming the same method is safe for every finish.'],
    ['Silver & tarnish', 'Silver may tarnish as it reacts with its environment. Store it dry and separately to reduce scratching. Check whether polishing is suitable for the exact finish, plating, or stones before using a silver cloth or solution.'],
    ['Gemstones & settings', 'Stone hardness alone does not determine care. Treatments, inclusions, cleavage, settings, and adhesives all matter. Avoid ultrasonic cleaners, steam, heat, or chemicals unless the stone setter or a qualified professional confirms they are suitable.'],
    ['Storage & everyday wear', 'Keep jewellery in a clean, dry, separate pouch or compartment. Put pieces on after fragrance, lotion, sunscreen, and hair products. Remove them before activities that can expose them to impact, chemicals, or snagging.'],
  ]
  return <main className="page-width content-page care-page"><header className="education-heading"><p className="eyebrow">Care notes · general information</p><h1>Gentle care, thoughtful questions.</h1><p>Jewellery needs differ. Use item-specific advice from its maker or a qualified professional; these general notes cannot diagnose a piece or guarantee a cleaning method.</p></header><div className="care-layout"><section><div className="care-image"><img src={image('photo-1515562141207-7a88fb7ce338', 1200)} alt="Illustrative jewellery-care detail" /><span>ILLUSTRATIVE IMAGE · NOT AN AUREL SERVICE</span></div><h2>A few things worth knowing.</h2>{careTopics.map(([title, detail]) => <details className="accordion faq-accordion" key={title}><summary>{title}</summary><p>{detail}</p></details>)}</section><aside className="repair-card"><p className="eyebrow">Repairs & resizing</p><h2>Before asking a jeweller for help.</h2><p>A real repair professional needs to inspect the specific item before confirming what can be done. Ask about:</p><ul><li>Metal, plating, gemstones, and known treatments</li><li>Whether inspection or an estimate has a fee</li><li>Risks to stones, patina, or finish</li><li>Written cost, timing, and work guarantee</li><li>Proof of ownership and insurance requirements</li></ul><form onSubmit={event => { event.preventDefault(); setRequestPreview(true) }}><label className="option-label" htmlFor="repair-topic">Preview a request topic</label><select id="repair-topic" value={requestType} onChange={event => { setRequestType(event.target.value); setRequestPreview(false) }}><option>Sizing question</option><option>Loose stone</option><option>Clasp or chain repair</option><option>Surface care question</option></select><button className="button button-full">Preview request →</button>{requestPreview && <p role="status" className="atelier-confirmation">Preview only: “{requestType}” was not sent. AUREL does not provide repairs.</p>}</form></aside></div></main>
}

function Journal() {
  const moreStories = [
    { image: 'photo-1519741497674-611481863552', category: 'The AUREL edit', title: 'An ode to meaningful gifts', body: 'For the people who make everything feel more like home. A few things worth celebrating.' },
    { image: 'photo-1515886657613-9f3515b0c78f', category: 'The everyday', title: 'The joy of wearing what you love', body: 'A note to wear the good things now. No special occasion required.' },
    { image: 'photo-1525507119028-ed4c629a60a3', category: 'Our materials', title: 'Gold, with a clearer story', body: 'What a useful gold disclosure includes, and the questions to ask about fineness and plating.' },
  ]
  return <main className="page-width content-page"><section className="journal-feature"><img src={image(stories[0].image, 1200)} alt={stories[0].title} /><div><p className="eyebrow">The AUREL journal · {stories[0].category}</p><h2>{stories[0].title}</h2><p>{stories[0].body}</p><Link className="text-link" to="education">Read the materials guide →</Link></div></section><div id="journal-stories"><StoryCards onOpen={() => {}} items={[...stories.slice(1), ...moreStories]} /></div></main>
}

function Contact() {
  const [sent, setSent] = useState(false)
  return <main className="page-width content-page"><div className="contact-layout">
    <div><p className="eyebrow">A concept storefront</p><h1>A note to say hello.</h1><p>This demonstration does not have a customer-support team or a monitored inbox. Its contact form is illustrative and does not transmit messages.</p><div className="contact-info"><strong>Looking for product guidance?</strong><p>Read the independent materials guide and verification checklist.</p><strong>Want to learn more?</strong><p>See the FAQ for transparent answers about the sample catalogue and checkout.</p><Link className="text-link" to="faq">Browse frequently asked questions →</Link></div></div>
    <form onSubmit={event => { event.preventDefault(); setSent(true); event.currentTarget.reset() }}><div className="form-grid"><div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" required autoComplete="name" /></div><div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" required autoComplete="email" /></div><div className="field full"><label htmlFor="contact-subject">What’s it about?</label><select id="contact-subject" name="subject"><option>Order enquiry</option><option>Product question</option><option>Care & repairs</option><option>Something else</option></select></div><div className="field full"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" required /></div><div className="field full"><button className="button">Preview form →</button>{sent && <p className="form-message">Demo only: no message was sent and these form details were not saved.</p>}</div></div></form>
  </div></main>
}

function Bag({ cart, onQuantity, onRemove }) {
  const subtotal = cart.reduce((sum, line) => sum + (pieces.find(item => item.id === line.id)?.price || 0) * line.quantity, 0)
  if (!cart.length) return <main className="page-width content-page"><div className="empty-state"><p className="eyebrow">Your AUREL bag</p><h2>Nothing here, for now.</h2><p>Something meaningful is just around the corner.</p><Link to="shop" className="button">Explore the collection</Link></div></main>
  return <main className="page-width"><div className="breadcrumbs"><Link to="">Home</Link><span>／</span><span>Your bag</span></div><section className="cart-layout"><div><h1>Your sample bag <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h1>{cart.map(line => { const item = pieces.find(piece => piece.id === line.id); return <div className="cart-line" key={line.id}><Link to={`product/${item.id}`}><img src={image(item.image, 300)} alt={item.name} /></Link><div><Link to={`product/${item.id}`}><h3>{item.name}</h3></Link><p>{item.material} · demo listing</p><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => onQuantity(item.id, -1)}>−</button><span>{line.quantity}</span><button aria-label="Increase quantity" onClick={() => onQuantity(item.id, 1)}>+</button></div><button className="remove-link" onClick={() => onRemove(item.id)}>Remove</button></div><span className="cart-line-price">{money(item.price * line.quantity)}</span></div> })}</div><aside className="cart-summary"><h2>Illustrative total</h2><div className="summary-row"><span>Sample subtotal</span><span>{money(subtotal)}</span></div><div className="summary-row muted"><span>Shipping & tax</span><span>Not calculated</span></div><div className="summary-row summary-total"><span>Demo total</span><span>{money(subtotal)}</span></div><p className="delivery-note">Prices are sample data. No shipping, tax, or payment is processed.</p><Link to="checkout" className="button button-full">Continue to demo checkout →</Link><Link to="shop" className="text-link continue-link">Continue exploring</Link></aside></section></main>
}

function Checkout({ cart, onComplete }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const subtotal = cart.reduce((sum, line) => sum + (pieces.find(item => item.id === line.id)?.price || 0) * line.quantity, 0)
  if (!cart.length) return <Bag cart={cart} />
  const submitDemoOrder = async event => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/demo-orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ items: cart.map(({ id, quantity }) => ({ id, quantity })) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'The local demo API could not create this preview.')
      onComplete(result.order.id)
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? 'Could not reach the local demo API. Start it with “npm run api” and try again.'
        : requestError.message || 'The local demo API could not create this preview.')
    } finally {
      setSubmitting(false)
    }
  }
  return <main className="page-width"><div className="breadcrumbs"><Link to="">Home</Link><span>／</span><Link to="bag">Your bag</Link><span>／</span><span>Demo checkout</span></div><section className="cart-layout"><div><div className="checkout-steps"><span className="current">01 · Review</span><span>02 · Demo API</span><span>03 · Complete</span></div><form onSubmit={submitDemoOrder} className="checkout-form"><h2>Review your sample order.</h2><p className="delivery-note">The local API checks these sample product IDs and quantities, then returns a demo reference. No name, address, email, card details, or other personal information is requested or sent.</p><label className="payment-option"><input type="checkbox" required />I understand this is a demo only and no real order or payment will be made.</label>{error && <p className="api-error" role="alert">{error}</p>}<button className="button button-full" disabled={submitting}>{submitting ? 'Creating demo preview…' : `Continue to demo payment · ${money(subtotal)} →`}</button></form></div><aside className="checkout-aside"><h2>Sample pieces</h2>{cart.map(line => { const item = pieces.find(piece => piece.id === line.id); return <div className="checkout-item" key={line.id}><span>{item.name} × {line.quantity}</span><span>{money(item.price * line.quantity)}</span></div> })}<div className="summary-row summary-total"><span>Illustrative total</span><span>{money(subtotal)}</span></div></aside></section></main>
}

function DemoPayment({ orderId, onPaid }) {
  const [order, setOrder] = useState(null)
  const [method, setMethod] = useState('demo-card')
  const [outcome, setOutcome] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetch(`/api/demo-orders/${encodeURIComponent(orderId)}`)
      .then(async response => {
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Could not find this demo order.')
        if (active) setOrder(result.order)
      })
      .catch(requestError => { if (active) setError(requestError.message) })
    return () => { active = false }
  }, [orderId])

  const simulatePayment = async simulation => {
    setBusy(true)
    setError('')
    setOutcome('')
    try {
      const response = await fetch(`/api/demo-orders/${encodeURIComponent(orderId)}/demo-payment`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ method, outcome: simulation }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not complete the demo payment.')
      setOrder(result.order)
      setOutcome(simulation)
      if (simulation === 'approved') onPaid()
    } catch (requestError) {
      setError(requestError instanceof TypeError ? 'Cannot reach the local demo payment API. Start it with “npm run api” and retry.' : requestError.message)
    } finally {
      setBusy(false)
    }
  }

  if (error && !order) return <main className="page-width content-page"><div className="empty-state"><p className="eyebrow">Demo payment</p><h2>We couldn’t load this demo order.</h2><p>{error}</p><Link to="bag" className="button">Return to your sample bag</Link></div></main>
  if (!order) return <main className="page-width content-page"><div className="empty-state"><p className="eyebrow">Demo payment</p><h2>Loading your sample order…</h2></div></main>

  return <main className="page-width content-page">
    <div className="breadcrumbs"><Link to="">Home</Link><span>／</span><Link to="bag">Sample bag</Link><span>／</span><span>Demo payment</span></div>
    <section className="payment-demo-layout"><div className="payment-demo-main"><p className="eyebrow">Step 2 · Simulated payment</p><h1>Try the demo payment flow.</h1><p className="detail-description">This is not a card form. Select a simulation to see the approved and declined outcomes; no real payment method or personal data is accepted.</p>
      <label className="payment-method-card"><input type="radio" name="demo-method" checked={method === 'demo-card'} onChange={() => setMethod('demo-card')} /><span><strong>Demo card</strong><small>Simulated provider response · no card details</small></span><span>DEMO</span></label>
      <label className="payment-method-card"><input type="radio" name="demo-method" checked={method === 'demo-wallet'} onChange={() => setMethod('demo-wallet')} /><span><strong>Demo wallet</strong><small>Simulated wallet response · no account connection</small></span><span>DEMO</span></label>
      {error && <p className="api-error" role="alert">{error}</p>}
      {outcome === 'declined' && <div className="payment-result declined" role="status"><strong>Simulation declined.</strong> Nothing was charged. You can retry or choose the approved simulation.</div>}
      {outcome === 'approved' && <div className="payment-result approved" role="status"><strong>Simulation approved.</strong> No money was charged. Your demo reference is {order.id}.</div>}
      {order.status !== 'demo-paid' && <div className="payment-simulation-actions"><button className="button button-outline" disabled={busy} onClick={() => simulatePayment('declined')}>{busy ? 'Simulating…' : 'Simulate decline'}</button><button className="button" disabled={busy} onClick={() => simulatePayment('approved')}>{busy ? 'Simulating…' : 'Simulate approval →'}</button></div>}
      <p className="delivery-note">Demo-only checkout · no card fields · no real charge · no shipping or fulfilment.</p>
    </div><aside className="checkout-aside"><h2>Demo order</h2><p className="payment-order-id">{order.id}</p>{order.items.map(item => <div className="checkout-item" key={item.id}><span>{item.name} × {item.quantity}</span><span>{money(item.lineTotal)}</span></div>)}<div className="summary-row summary-total"><span>Illustrative total</span><span>{money(order.total)}</span></div><p className="finder-disclosure">Only product IDs, quantities, and calculated sample totals are stored in the local demo server.</p></aside></section>
  </main>
}

function OrderConfirmation({ orderId }) {
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    fetch(`/api/demo-orders/${encodeURIComponent(orderId)}`)
      .then(async response => {
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Could not load this demo order.')
        if (active) setOrder(result.order)
      })
      .catch(requestError => { if (active) setError(requestError.message) })
    return () => { active = false }
  }, [orderId])
  return <main className="page-width"><section className="success-page"><p className="eyebrow">Demo flow complete · no real order</p><h1>{order ? 'Thank you.' : 'Your demo order'}</h1>{error ? <p role="alert">{error}</p> : order ? <><p>Reference <strong>{order.id}</strong> · status <strong>{order.status}</strong></p>{order.payment && <p>Simulated {order.payment.method === 'demo-card' ? 'card' : 'wallet'} outcome: {order.payment.status}. No money was charged.</p>}<p>No order, payment, or personal information was sent. Demo orders are saved only in the local development data file.</p></> : <p>Loading your local demo order…</p>}<Link to="shop" className="button">Continue exploring</Link></section></main>
}

function Footer({ onNewsletter }) {
  return <>
    <section className="newsletter page-width"><div><h2>Notes from AUREL</h2><p>Preview a newsletter signup interaction. This demo does not collect subscribers.</p></div><form onSubmit={event => { event.preventDefault(); onNewsletter(); event.currentTarget.reset() }}><input name="email" type="email" placeholder="Your email address" required aria-label="Your email address" /><button>Preview signup →</button></form></section>
    <footer className="site-footer page-width"><div className="footer-main">
      <div className="footer-brand"><Link to="" className="wordmark">AUREL<span>Jewellery, considered</span></Link><p>A fictional jewellery brand concept. The sample catalogue is not for sale.</p></div>
      <div className="footer-column"><h3>Discover</h3><Link to="shop">Shop all · 104 demos</Link><Link to="women">Women’s edit</Link><Link to="men">Men’s edit</Link><Link to="quiz">Style quiz</Link><Link to="gift-finder">Gift finder</Link></div>
      <div className="footer-column"><h3>Explore</h3><Link to="atelier">Concept atelier</Link><Link to="care">Care & repair guide</Link><Link to="story">About this concept</Link><Link to="education">Materials guide</Link><Link to="journal">The journal</Link></div>
      <div className="footer-column"><h3>Questions</h3><Link to="faq">Frequently asked questions</Link><Link to="contact">Contact form demo</Link></div>
    </div><p className="demo-disclosure">AUREL is a fictional concept storefront. Product listings, images, prices, policies, and form interactions are illustrative; no sale or service is offered.</p><div className="footer-bottom"><span>© 2026 AUREL CONCEPT · DEMO ONLY</span><div><Link to="education">MATERIALS GUIDE</Link><Link to="faq">FAQ</Link></div></div></footer>
  </>
}

function Search({ open, onClose }) {
  const [query, setQuery] = useState('')
  const results = query ? pieces.filter(item => `${item.name} ${item.category} ${item.material}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : []
  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])
  if (!open) return null
  return <div className="search-overlay" onClick={event => event.target === event.currentTarget && onClose()}><section className="search-panel" role="dialog" aria-modal="true" aria-label="Search AUREL"><div className="search-panel-top"><h2>What are you looking for?</h2><button className="icon-button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></div><div className="search-input"><Icon name="search" /><input autoFocus type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try hoops, gold, a little something…" /></div><div className="search-results">{results.length ? results.map(item => <Link className="search-result" key={item.id} to={`product/${item.id}`} onClick={onClose}><img src={image(item.image, 300)} alt={item.name} /><p>{item.name}</p><span>{money(item.price)}</span></Link>) : query ? <p className="search-empty">No pieces found. Try a different search.</p> : null}</div></section></div>
}

function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [cart, setCart] = useState(() => readStorage('aurel-cart', []))
  const [favorites, setFavorites] = useState(() => readStorage('aurel-favorites', []))
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const changeRoute = () => {
      setRoute(window.location.hash)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', changeRoute)
    if (!window.location.hash) window.location.hash = '/'
    return () => window.removeEventListener('hashchange', changeRoute)
  }, [])
  useEffect(() => {
    document.title = route.startsWith('#/product/')
      ? `${pieces.find(item => item.id === route.split('/')[2])?.name || 'Jewellery'} — AUREL`
      : `${route.split(/[/?]/)[1] ? ({ women: 'Women’s Edit', men: 'Men’s Edit', education: 'Materials Guide', faq: 'FAQ', 'gift-finder': 'Gift Finder', atelier: 'Concept Atelier', care: 'Care Guide', quiz: 'Style Quiz' }[route.split(/[/?]/)[1]] || route.split(/[/?]/)[1].replace('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase())) : 'Jewellery, considered'} — AUREL`
  }, [route])

  const notify = message => {
    setToast(message)
    window.clearTimeout(notify.timer)
    notify.timer = window.setTimeout(() => setToast(''), 2600)
  }
  const addToBag = id => {
    setCart(current => {
      const existing = current.find(item => item.id === id)
      const next = existing ? current.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { id, quantity: 1 }]
      localStorage.setItem('aurel-cart', JSON.stringify(next))
      return next
    })
    notify(`${pieces.find(item => item.id === id)?.name} added to your bag`)
  }
  const toggleFavorite = id => {
    setFavorites(current => {
      const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id]
      localStorage.setItem('aurel-favorites', JSON.stringify(next))
      return next
    })
    notify(favorites.includes(id) ? 'Removed from saved pieces' : 'Saved for later')
  }
  const updateQuantity = (id, delta) => {
    setCart(current => {
      const next = current.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0)
      localStorage.setItem('aurel-cart', JSON.stringify(next))
      return next
    })
  }
  const removeFromBag = id => {
    setCart(current => {
      const next = current.filter(item => item.id !== id)
      localStorage.setItem('aurel-cart', JSON.stringify(next))
      return next
    })
    notify('Piece removed from your bag')
  }
  const completeOrder = orderNumber => {
    window.location.hash = `/payment/${encodeURIComponent(orderNumber)}`
  }
  const finishPaidDemoOrder = orderNumber => {
    localStorage.setItem('aurel-cart', JSON.stringify([]))
    setCart([])
    window.location.hash = `/order-confirmation/${encodeURIComponent(orderNumber)}`
  }

  const [path, query = ''] = route.replace(/^#\/?/, '').split('?')
  const segments = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)
  const page = (() => {
    if (!segments.length) return <Home favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'shop') return <Collection key={`shop-${params.get('category') || 'all'}`} category={params.get('category') || 'All jewellery'} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'women') return <Collection key="women" category="All jewellery" gender="Women" favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'men') return <Collection key="men" category="All jewellery" gender="Men" favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'product') return <ProductDetail key={segments[1]} id={segments[1]} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'story') return <Story />
    if (segments[0] === 'education') return <Education />
    if (segments[0] === 'faq') return <FAQ />
    if (segments[0] === 'quiz') return <GuidedFinder key="style-quiz" />
    if (segments[0] === 'gift-finder') return <GuidedFinder key="gift-finder" gift />
    if (segments[0] === 'atelier') return <Atelier />
    if (segments[0] === 'care') return <CareGuide />
    if (segments[0] === 'journal') return <Journal />
    if (segments[0] === 'contact') return <Contact />
    if (segments[0] === 'saved') return <Collection category="All jewellery" savedOnly favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} />
    if (segments[0] === 'bag') return <Bag cart={cart} onQuantity={updateQuantity} onRemove={removeFromBag} />
    if (segments[0] === 'checkout') return <Checkout cart={cart} onComplete={completeOrder} />
    if (segments[0] === 'payment') return <DemoPayment key={segments[1]} orderId={segments[1]} onPaid={() => finishPaidDemoOrder(segments[1])} />
    if (segments[0] === 'order-confirmation') return <OrderConfirmation key={segments[1]} orderId={segments[1]} />
    return <main className="page-width"><section className="success-page"><p className="eyebrow">A little detour</p><h1>We couldn’t find that page.</h1><p>Let us help you find something lovely.</p><Link to="" className="button">Back to AUREL</Link></section></main>
  })()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return <><Header count={count} onSearch={() => setSearchOpen(true)} />{page}<Footer onNewsletter={() => notify('Demo only: no subscriber details were sent or saved.')} /><Search open={searchOpen} onClose={() => setSearchOpen(false)} /><div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">{toast}</div></>
}

export default App
