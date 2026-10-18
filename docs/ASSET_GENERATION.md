# Sanak Beauty asset inventory

The campaign and all 12 catalog front images are original AI-generated fictional Sanak Beauty imagery, generated with the built-in `image_gen` tool. No third-party cosmetic brand photography is used. These depict design concepts, not real commercial products or verified shade matches.

Five original product families establish consistent ivory packaging, champagne metal, warm studio lighting, and SANAK branding. Seven additional shades were generated as targeted edits of the relevant family image; packaging, viewpoint and backdrop were preserved. Every source image is retained in `assets/originals/*-original.png`, outside the public deployment to keep the shipped assets small.

## Delivered

- `public/images/campaign.webp`: optimized editorial hero image.
- `public/images/{slug}.webp`: 12 distinct, optimized 900 × 900 product images.
- `public/images/{slug}-detail.svg`: 12 matching abstract color studies. Each visibly says **ILLUSTRATIVE SHADE STUDY**; these are SVG placeholders, not photographic macros.
- `assets/image-generation-prompts.json`: production prompts for every SKU's front, editorial and macro view, plus the campaign. Each entry records its actual status and local path.

Separate editorial product angles and photographic macro shots have **not** been generated. Their production prompts are ready for a later asset pass. The existing gallery uses the front image and illustrative color study.

## Rebuild optimized assets

From the repository root, after installing dependencies:

```sh
node scripts/prepare-assets.mjs
```

The script uses Sharp to generate WebP derivatives at quality 85 (900 × 900 product images, campaign up to 1600 pixels wide without enlargement), and writes deterministic SVG color studies using the prompt manifest. It preserves all originals. The website references only optimized derivatives and small SVGs; originals remain available for future art direction.

## Art direction and replacements

The machine-readable prompt set is the source of production prompts. For another image generation pass, inspect and reference the matching `*-original.png` to preserve packaging. Keep one generated file per SKU; never tint the entire image to simulate a shade change. Review brand lettering, pigment, geometry and lighting, then save as a new original or intentionally replace the corresponding concept. Re-run the preparation script after updating the approved sources.

Hex values in the manifest define the UI and illustrative swatch artwork. Generated images are visual approximations and are not color calibration targets.
