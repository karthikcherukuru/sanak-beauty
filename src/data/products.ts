export type Family = 'lipstick' | 'serum' | 'blush' | 'foundation' | 'gloss';
export type Category = 'Lips' | 'Face' | 'Skincare';
export type Product = {
  id: string; sku: string; slug: string; name: string; family: Family; category: Category;
  shade: string; color: string; price: number; size: string; description: string;
  longDescription: string; benefits: string[]; usage: string; ingredients: string;
  image: string; detailImage: string; featured: boolean; finish: string;
};
const families = {
  lipstick: { name: 'Velvet Matte Lipstick', category: 'Lips', price: 899, size: '3.5 g', finish: 'Soft matte', description: 'A little color. A whole mood. Meet your everyday velvet-soft lip.', longDescription: 'A considered pop of color for slow mornings and spontaneous evenings. Our imagined velvet matte formula pairs a softly blurred finish with rich, expressive shades.', benefits: ['Velvet-soft finish', 'Buildable color', 'Precision bullet'], usage: 'Glide from the center of your lips outward. Blot for a soft stain or layer for a more expressive finish.', ingredients: 'Illustrative concept: waxes, emollient oils and cosmetic pigments. This is not a manufactured formula or an allergy reference.' },
  serum: { name: 'Radiant Glow Serum', category: 'Skincare', price: 1299, size: '30 ml', finish: 'Fresh glow', description: 'Your quiet morning ritual, bottled. A soft, luminous finishing touch.', longDescription: 'Inspired by the beautiful light just before sunset, this serum concept brings a moment of ease to your daily routine. A light texture, a luminous look, and a bottle worth leaving on the shelf.', benefits: ['Lightweight texture concept', 'Dewy finish', 'Precision dropper'], usage: 'For this demo ritual, imagine applying two to three drops to clean skin before moisturizer. Real product directions would follow formula testing.', ingredients: 'Illustrative concept: water, glycerin and emollients. Not a verified ingredient list; no efficacy or safety claims are made.' },
  blush: { name: 'Petal Blush Compact', category: 'Face', price: 1099, size: '6 g', finish: 'Soft satin', description: 'The softest flush, as if the day just got a little lovelier.', longDescription: 'A petal-inspired wash of color, housed in a champagne compact. This powder blush concept is designed around the pleasure of a simple, expressive makeup ritual.', benefits: ['Buildable flush', 'Soft satin look', 'Mirror compact'], usage: 'Sweep lightly across the apples of your cheeks, blending upward. Layer to your preferred depth of color.', ingredients: 'Illustrative concept: mica, powder binders and pigments. Not a production formula or clinical claim.' },
  foundation: { name: 'Skin Tint Foundation', category: 'Face', price: 1399, size: '30 ml', finish: 'Natural satin', description: 'A little coverage that leaves plenty of room for you.', longDescription: 'Skin, with a little something. A lightweight foundation concept for an even-looking, naturally expressive complexion, offered in three illustrative warm shades for this demo.', benefits: ['Sheer coverage concept', 'Natural-looking finish', 'Buildable tint'], usage: 'Blend a small amount from the center of your face outward with fingers, a sponge or a brush. Add coverage where desired.', ingredients: 'Illustrative concept: water, emollients and mineral pigments. Demo shade range and formula only; not a tested product.' },
  gloss: { name: 'Lustre Lip Gloss', category: 'Lips', price: 799, size: '5 ml', finish: 'Sheer shine', description: 'Catch the light. A sheer veil of color with a glassy finish.', longDescription: 'An effortless final touch for your lips. This gloss concept combines softly tinted shine with a refined, easy-to-carry silhouette. Wear it alone or layer over your favorite lip color.', benefits: ['Sheer color', 'Glassy finish', 'Easy applicator'], usage: 'Apply to bare lips for a sheer finish, or add a touch over lipstick at the center of your lips.', ingredients: 'Illustrative concept: emollient oils, gloss polymers and pigments. Not a verified commercial ingredient list.' },
} satisfies Record<Family, Omit<Product, 'id' | 'sku' | 'slug' | 'family' | 'shade' | 'color' | 'image' | 'detailImage' | 'featured'>>;
const entries: [string, string, Family, string, string, boolean][] = [
  ['SB-LIP-001', 'rosewood', 'lipstick', 'Rosewood', '#A65F59', true],
  ['SB-LIP-002', 'mauve-muse', 'lipstick', 'Mauve Muse', '#A87386', false],
  ['SB-LIP-003', 'berry-noir', 'lipstick', 'Berry Noir', '#6B3048', false],
  ['SB-SER-001', 'golden-hour', 'serum', 'Golden Hour', '#D6A554', true],
  ['SB-SER-002', 'dewdrop', 'serum', 'Dewdrop', '#E5B8BD', false],
  ['SB-BLU-001', 'soft-rose', 'blush', 'Soft Rose', '#BF7B82', true],
  ['SB-BLU-002', 'peach-bloom', 'blush', 'Peach Bloom', '#D89475', false],
  ['SB-FND-001', 'sand', 'foundation', 'Sand', '#D7B18A', true],
  ['SB-FND-002', 'honey', 'foundation', 'Honey', '#BA8654', false],
  ['SB-FND-003', 'almond', 'foundation', 'Almond', '#8A5B3E', false],
  ['SB-GLS-001', 'nude-glaze', 'gloss', 'Nude Glaze', '#C9958B', false],
  ['SB-GLS-002', 'pink-veil', 'gloss', 'Pink Veil', '#D38C9B', false],
];
export const products: Product[] = entries.map(([sku, slug, family, shade, color, featured]) => ({
  ...families[family], id: sku, sku, slug, family, shade, color, featured,
  image: `/images/${slug}.webp`, detailImage: `/images/${slug}-detail.svg`,
}));
export const findProduct = (id: string) => products.find(p => p.id === id || p.slug === id);
export const variantsOf = (product: Product) => products.filter(p => p.family === product.family);
export const featuredProducts = products.filter(p => p.featured);
