# Sanak Beauty design system

## Direction
An original beauty counter in warm afternoon light: tactile ivory packaging, champagne metal, rose pigment, and burgundy typography. The supplied brand palette and editorial type direction take precedence over generic skill defaults.

## Color tokens
Defined in `src/app/globals.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--ivory` | `#FBF8F5` | Page surface |
| `--cream` | `#F4EAE4` | Secondary surfaces |
| `--blush` | `#EAD4D0` | Selection and gentle accents |
| `--rose` | `#C8958E` | Small decorative accents |
| `--gold` | `#C9A17C` | Material inspiration |
| `--burgundy` | `#542E35` | Actions, headings and footer |
| `--ink` | `#292020` | Primary copy |
| `--muted` | `#71615D` | Legible secondary copy |
| `--line` | `#DFD4CD` | Quiet dividers |

## Typography
Locally hosted Cormorant Garamond, normal and italic, contrasts with variable Manrope. `next/font/local` optimizes preload and font loading; OFL licenses accompany the fonts. Headlines use fluid sizing and controlled line height. Italics carry occasional emphasis, not whole paragraphs. The lowercase custom wordmark is composed with real type.

## Layout
1320px content maximum; desktop margins 56px, tablet 32px, mobile 20px. Five core homepage sections: campaign, collection, 3D studio, fictional testimonials, editorial footer. Hero uses a 46/54 split, followed by four photo-led products. Homepage and collection grids become two columns on mobile. Product details become a stacked gallery and purchase panel. Mobile studio has full-width copy, then viewer, then details.

## Components and states
Solid burgundy rectangular actions, ruled text links, round utility buttons, shade swatches with an additional selection ring and `aria-pressed`. Product cards are unboxed imagery and type. Glass is limited to the sticky header, campaign caption and studio information surface. Drawers and dialogs use native dialog semantics, focus containment and restoration.

Shopping feedback uses a live region. Filters have counts, reset and empty states. Cart and wishlist support empty and populated states. Contact/newsletter success copy explicitly identifies the local demo behavior.

## Motion
Ease-out transforms, image magnification and a color-study hover reveal, brief drawer entrance, and immediate cart feedback. Essential content is visible before animation. All CSS motion respects reduced-motion settings. The 3D scene does not auto-spin; it renders on demand and uses explicit pointer/keyboard controls.

## Imagery
Thirteen optimized, generated WebPs: one campaign portrait plus twelve consistent product fronts. Gallery details use visibly labeled abstract SVG shade studies. The live 3D models are real geometry with five specific silhouettes. Images and models are original fictional concepts; colors are illustrative.
