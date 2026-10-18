# Sanak Beauty

A complete Next.js ecommerce demonstration for an original premium beauty brand. Built with TypeScript, React, Tailwind CSS, Motion, Zustand, Three.js, React Three Fiber and Drei.

## Run locally

Requires Node.js 20.9+ (tested with Node 24.12) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For the optimized static production version:

```sh
npm run build
npm start
```

The included preview server serves the static `out/` directory on port 3000. Stop it before starting another server on that port. Fonts and all visual assets are local; normal builds do not require a Google Fonts connection. No environment variables, database or API key are needed.

## Pages and behavior

| Route | Experience |
| --- | --- |
| `/` | Editorial campaign, four favorite products, interactive five-family 3D studio, sample reviews, newsletter demo |
| `/shop/` | Twelve products; category, shade, price and favorites filters; search; sort; clear and empty states |
| `/shop/[slug]/` | Twelve generated product routes, photo/color-study/3D gallery, shade selection, quantity, cart, wishlist, details and related products |
| `/wishlist/` | Persistent saved SKUs; remove or move to the bag |
| `/cart/` | Persistent shade-specific cart, quantities, remove/clear, totals and demo checkout |
| `/about/` | Brand concept and clear fictional-brand disclosure |
| `/contact/` | Validated demo contact form, delivery/returns, privacy and product FAQs |
| Unknown route | Custom not-found page |

Global search supports product names, shades, categories and descriptions, and opens with Ctrl/Cmd+K. Native dialogs provide modal focus containment, Escape to close and focus restoration. Cart and wishlist persist in this browser's local storage. Forms and checkout do not submit, subscribe, place an order, or collect payment.

The 3D studio has real product geometry, physically based materials, local studio lighting, drag/touch rotation, controlled zoom, rotate buttons, arrow-key controls and reset. It is dynamically imported with SSR disabled, lazy-loaded near the viewport, and rendered on demand. WebGL failures have a photographic fallback. The models are original procedural interpretations, not exact scans of the generated packaging.

## Project structure

```text
src/
  app/                  App Router pages, metadata, global styles, local fonts
  components/           Shared navigation, product, search, cart and form UI
    three/              Five procedural model families and interactive viewer
  data/products.ts      Twelve SKUs; the shared catalog and variant source
  lib/shop.ts           Search/filter/sort, currency and cart arithmetic
  store/shop-store.ts   Persistent cart and wishlist; transient overlay state
public/images/          Optimized campaign/catalog WebPs and shade-study SVGs
assets/                 Generation prompts and preserved original images
scripts/                Asset preparation, local static preview, screenshots
tests/                  Unit and desktop/mobile browser tests
docs/                   Design, asset and verification notes; screenshots
.openai/hosting.json    Private Sites deployment identity and static output
```

## Images and replacement workflow

The hero and all twelve product front images were generated with the built-in image generation tool. The gallery color studies are intentional SVG placeholders. Separate editorial product angles and photographic macros are not included; production prompts are ready in `assets/image-generation-prompts.json`.

To replace an image, preserve its SKU/slug, update the matching approved original, and run:

```sh
node scripts/prepare-assets.mjs
```

Or place an optimized WebP directly at `public/images/{slug}.webp`. To add photographic gallery views, update `detailImage` in `src/data/products.ts` and the descriptive alt/caption in `product-detail.tsx`. See `docs/ASSET_GENERATION.md` for paths, art direction and generated-versus-placeholder status.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm start
# In a second terminal:
npx playwright install chromium
npm run test:e2e
```

The browser suite expects the production preview at http://127.0.0.1:3000. Optionally set `SANAK_BROWSER` to an existing Chromium executable to avoid downloading a browser. Verification results and known limits are recorded in `docs/VERIFICATION.md`.

## Deployment

For Vercel, import the repository, use the Next.js preset, `npm ci` for install and `npm run build` for build. `output: 'export'` creates the static `out/` directory; set `out` as the output directory if manual configuration is needed. No runtime server or secrets are required. All twelve product pages are enumerated by `generateStaticParams`.

For another static host, upload `out/`, preserve nested directory index files, and route unknown requests to `404.html`. Serve `/_next/` assets as files without SPA fallback. Before using a different production domain, update `metadataBase` in `src/app/layout.tsx`.

The Sites deployment uses the same static output and defaults to private access.

## Demo boundaries

No real commerce, shipping, customer accounts, subscription service or contact backend is integrated. Product formulas, benefits and testimonials are illustrative. Colors are visual approximations, not verified shade matches. A production commerce launch requires real product data, approved photography and claims, policies, inventory, order infrastructure and a payment integration.
