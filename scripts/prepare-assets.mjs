import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'public', 'images');
const originals = path.join(root, 'assets', 'originals');
const manifest = JSON.parse(await readFile(path.join(root, 'assets', 'image-generation-prompts.json'), 'utf8'));
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

// Deterministic color artwork, intentionally identified as an illustration.
// This is not a fabricated photographic swatch or a color matching guarantee.
function shadeArtwork(product) {
  const title = escapeXml(product.shade);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" role="img" aria-labelledby="title desc">
  <title id="title">${title} — illustrative shade study</title>
  <desc id="desc">Abstract color artwork for ${escapeXml(product.name)}. Illustrative demo shade, not a product photograph.</desc>
  <rect width="900" height="900" fill="#F4EAE4"/>
  <circle cx="450" cy="420" r="251" fill="none" stroke="#D8C6BC" stroke-width="1"/>
  <path d="M260 335 C280 245 398 199 496 220 C585 239 657 316 654 410 C650 521 560 600 470 623 C368 649 268 587 244 501 C227 439 243 386 260 335Z" fill="${product.color}" transform="rotate(-17 450 420)"/>
  <path d="M300 336 C339 271 411 255 465 264" fill="none" stroke="#FFFFFF" stroke-opacity=".2" stroke-width="3" stroke-linecap="round"/>
  <text x="450" y="745" text-anchor="middle" fill="#542E35" font-family="Georgia,serif" font-size="39">${title}</text>
  <text x="450" y="787" text-anchor="middle" fill="#82716D" font-family="Arial,sans-serif" font-size="13" letter-spacing="2.4">ILLUSTRATIVE SHADE STUDY</text>
  </svg>`;
}

let totalBytes = 0;
for (const product of manifest.products) {
  const original = path.join(originals, `${product.slug}-original.png`);
  await access(original);
  const result = await sharp(original).resize(900, 900, { fit: 'contain', background: '#FBF8F5' }).webp({ quality: 85, effort: 6 }).toFile(path.join(directory, `${product.slug}.webp`));
  await writeFile(path.join(directory, `${product.slug}-detail.svg`), shadeArtwork(product), 'utf8');
  totalBytes += result.size;
  console.log(`${product.slug}: ${result.width}×${result.height}, ${Math.round(result.size / 1024)} KB`);
}
const campaign = await sharp(path.join(originals, 'campaign-original.png')).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile(path.join(directory, 'campaign.webp'));
totalBytes += campaign.size;
console.log(`campaign: ${campaign.width}×${campaign.height}, ${Math.round(campaign.size / 1024)} KB`);
console.log(`Prepared 13 WebP images and 12 SVG shade studies. WebP total: ${(totalBytes / 1024 / 1024).toFixed(2)} MB.`);
