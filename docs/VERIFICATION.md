# Verification record

Verified on 18 October 2026 using Node.js 24.12, Next.js 16.4.2, React 19.3.1 and a locally installed Chromium browser. This is a frontend ecommerce demonstration, not a production commerce service.

## Passed checks

| Check | Result |
| --- | --- |
| `npm run build` | Passed; production static export generated, all twelve product routes included |
| Strict TypeScript validation | Passed standalone during implementation and in the final production build |
| `npm run lint` | Passed with no errors or warnings |
| `npm test` | 11 unit tests passed |
| `npm run test:e2e` | 16 Playwright tests passed: eight desktop and eight mobile |
| Viewport audit | No horizontal overflow on homepage, collection or product detail at 390, 768, 1024, 1440 and 1920px |
| Asset preparation | 13 optimized WebPs and 12 SVG shade studies exist; every catalog asset has a local file |
| Visual review | Desktop, tablet and mobile screenshots captured and inspected; mobile studio and text sizing refined |

## Unit coverage

- Twelve unique SKU/slug pairs and correct shade families.
- Name/category/shade/description search, including normalization and empty results.
- Combined category, price and shade filters; price and name sorting without source mutation.
- INR formatting and cart totals.
- Repeated cart additions merge while separate shades remain distinct.
- Quantity limits, invalid inputs, removal and clearing.
- Wishlist toggling and atomic move-to-cart behavior.
- Browser-storage serialization and validation when restoring persisted choices.

## Browser journeys

Each of these passed at both desktop and mobile widths:

1. Home → shop → lipstick → select Mauve Muse → add to bag → change quantity → refresh persistence → demo checkout → removal.
2. Save a product → refresh wishlist → move it into the bag.
3. Search serum → empty result → clear → open a product → Escape dismissal and focus restoration.
4. Filter Face → sort by price → price limit → empty state → clear filters.
5. Real WebGL canvas → rotation and zoom → shade change → switch through all five model families → reset → keyboard controls.
6. Newsletter and contact demo confirmations; mobile menu; navigation, image and overflow checks across all page types; no uncaught page errors.
7. Same-page footer category navigation, reduced-motion preference and custom not-found page.
8. Forced WebGL unavailability → static product fallback → successful add-to-bag.

The 3D reset test originally revealed a context-loss bug caused by remounting the canvas. The final implementation resets the existing OrbitControls camera instead. The affected desktop/mobile tests passed after the fix.

## Asset status

- Campaign and twelve catalog fronts: original AI-generated images.
- Detail gallery: explicitly labeled SVG shade-study placeholders.
- 3D: actual original procedural geometry, not flat-image rotation; an interpretation of the packaging rather than a scan.
- Additional editorial product photos and photographic macros: prompts prepared, images not generated.
- Public image output totals 339,157 bytes. Full-resolution originals are retained under `assets/originals/` and excluded from the public build.

## Limits

No Lighthouse score, formal WCAG certification, physical-device benchmark, Firefox run or Safari run is claimed. Mobile tests use Chromium emulation, supplemented by screenshots and five responsive widths. No backend, real order, payment, email delivery, subscription, account or shipping operation is implemented. Images, formulas, benefits and testimonials are illustrative demo content.

The Sites build helper hit a Windows npm-shim path issue. The same project was successfully built using `npm run build`, and the completed static output is used for packaging. No application workaround or plugin source modification was needed.
