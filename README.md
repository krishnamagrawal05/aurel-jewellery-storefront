
AUREL
Jewellery, considered.

Considered jewellery, made to be kept. Fine gold and thoughtfully chosen stones.

Live Demo · Report a Bug · Request a Feature

Show Image Show Image Show Image Show Image

</div>
Table of Contents
About the Project
Live Demo
Screenshots
Features
Design Principles
Tech Stack
Project Structure
Getting Started
Available Scripts
Environment Variables
Deployment
SEO & Performance
Accessibility
Browser Support
Roadmap
Contributing
License
Contact
About the Project

AUREL is a jewellery storefront for a brand built on one idea: pieces made to be kept. The experience is calm, minimal and editorial. It lets fine gold and carefully chosen stones take centre stage, without visual noise or pressure.

The goal of this project is to deliver a fast, elegant and responsive shopping front end that feels as considered as the jewellery it presents.

Live Demo

https://aurel-jewellery-storefront.vercel.app/

Screenshots
<!-- Add screenshots to a /docs or /screenshots folder, then uncomment: --> <!-- | Home | Collection | Product | | ---- | ---------- | ------- | | ![Home](./screenshots/home.png) | ![Collection](./screenshots/collection.png) | ![Product](./screenshots/product.png) | -->

Screenshots coming soon.

Features
Editorial storefront: a refined home page that presents the brand and featured pieces
Collection browsing: explore jewellery by category or collection
Product pages: large imagery, materials, stones and care details
Shopping cart: add, remove and review items
Fully responsive: designed for mobile, tablet and desktop
Fast by default: optimised assets and edge delivery via Vercel
SEO-ready: descriptive title, meta description and theme colour
Clean, extendable code: easy to maintain and add to

Keep only the features that are actually implemented in your build.

Design Principles
Principle	Description
Considered	Every element earns its place. Nothing is decorative for its own sake.
Quiet luxury	Warm neutral palette (
#f8f7f4 theme colour), generous whitespace, refined typography.
Product first	Imagery and detail lead. The interface stays out of the way.
Mobile first	Layouts are designed for small screens first, then scaled up.
Tech Stack
Layer	Technology
Frontend	HTML5, CSS3, JavaScript (replace with your framework, e.g. React / Next.js / Vite)
Styling	CSS (replace with Tailwind / CSS Modules / Sass if used)
Hosting	Vercel
Version control	Git & GitHub
Project Structure
text
aurel-jewellery-storefront/
├── public/              # Static assets: images, fonts, favicon
├── src/
│   ├── components/      # Reusable UI components (header, footer, product card)
│   ├── pages/           # Pages / routes
│   ├── data/            # Product and collection data
│   ├── styles/          # Global styles and design tokens
│   └── utils/           # Helper functions
├── .gitignore
├── package.json
├── LICENSE
└── README.md

Update this tree to match your actual repository.

Getting Started
Prerequisites
Node.js v18 or later
npm, yarn or pnpm
Git
Installation
bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/aurel-jewellery-storefront.git

# 2. Navigate into the project
cd aurel-jewellery-storefront

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

Open the address shown in your terminal, typically http://localhost:3000 or http://localhost:5173.

Available Scripts
Command	Description
npm run dev	Start the development server with hot reload
npm run build	Create an optimised production build
npm run start	Serve the production build locally
npm run lint	Check code for lint errors

Match these to the scripts in your package.json.

Environment Variables

Create a .env.local file in the project root if your build needs configuration:

env
# Public site URL
NEXT_PUBLIC_SITE_URL=https://aurel-jewellery-storefront.vercel.app

# Payment / analytics keys (only if used)
# STRIPE_PUBLIC_KEY=
# ANALYTICS_ID=

Never commit .env files or secret keys. Make sure .env* is listed in .gitignore.

Deployment

The project is deployed on Vercel.

Deploy your own copy
Fork or push this repository to your GitHub account.
Go to vercel.com/new and import the repository.
Add any required environment variables.
Click Deploy.

Every push to the main branch triggers an automatic production deployment, and pull requests receive preview URLs.

SEO & Performance
Descriptive page title: AUREL — Jewellery, considered
Meta description for search engines and social previews
Theme colour (
#f8f7f4) for mobile browser chrome
Responsive viewport configuration
Global CDN delivery through Vercel

Suggested improvements: Open Graph and Twitter card images, sitemap.xml, robots.txt, structured data (Product schema) and image optimisation (WebP/AVIF, lazy loading).

Accessibility

The project aims to follow WCAG 2.1 AA practices:

Sufficient colour contrast
Semantic HTML landmarks and headings
Descriptive alt text for product images
Keyboard-friendly navigation and visible focus states
Browser Support
Browser	Support
Chrome (latest)	✅
Firefox (latest)	✅
Safari (latest)	✅
Edge (latest)	✅
Mobile Safari / Chrome	✅
Roadmap
 Responsive storefront
 Deployment on Vercel
 Product search and filters (metal, stone, price)
 Wishlist
 Secure checkout and payments
 Customer accounts and order history
 Ring size guide and jewellery care guide
 Newsletter sign-up
 Multi-currency support
 Open Graph / social share images

See the open issues for a full list of proposed features and known problems.

Contributing

Contributions make open source great. Any contribution you make is appreciated.

Fork the project
Create your feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m "Add amazing feature"
Push to the branch: git push origin feature/amazing-feature
Open a pull request

Please keep pull requests focused and follow the existing code style.

License

Distributed under the MIT License. See LICENSE for more information.

Contact

Your Name

GitHub: @YOUR_USERNAME
Email: your.email@example.com

Project link: https://github.com/YOUR_USERNAME/aurel-jewellery-storefront

<div align="center">

Crafted with care · AUREL

</div>
