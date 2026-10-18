'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { type Product, variantsOf } from '@/data/products';
import { currency } from '@/lib/shop';
import { useShop, useUI } from '@/store/shop-store';
export function ProductCard({product, moveFromWishlist = false}: {product: Product; moveFromWishlist?: boolean}) {
  const [selected, setSelected] = useState(product);
  const saved = useShop(s => s.wishlist.includes(selected.id));
  const toggle = useShop(s => s.toggleWish);
  const add = useShop(s => s.add);
  const move = useShop(s => s.moveToCart);
  const notify = useUI(s => s.notify);
  const [added, setAdded] = useState(false);
  const variants = variantsOf(product);
  function onAdd() {if(moveFromWishlist) move(selected.id); else add(selected.id); notify(`${selected.name} · ${selected.shade} added to your bag.`); setAdded(true); setTimeout(() => setAdded(false), 1800);}
  return <article className="product-card">
    <div className="product-art"><Link href={`/shop/${selected.slug}/`} aria-label={`${selected.name} — ${selected.shade}`}><Image src={selected.image} alt={`${selected.shade} ${selected.name} in Sanak champagne packaging`} width={900} height={900} sizes="(max-width: 600px) 48vw, (max-width: 1000px) 45vw, 23vw"/><Image className="product-detail-art" src={selected.detailImage} alt="" width={900} height={900}/></Link>
      {product.featured && <span className="product-tag">The essentials</span>}
      <button className={`wish-button ${saved ? 'is-saved' : ''}`} onClick={() => {toggle(selected.id); notify(saved ? 'Removed from your wishlist.' : 'Saved to your wishlist.');}} aria-label={`${saved ? 'Remove' : 'Save'} ${selected.name} ${selected.shade} ${saved ? 'from' : 'to'} wishlist`} aria-pressed={saved}><Heart size={18} fill={saved ? 'currentColor' : 'none'}/></button>
      <button className={`quick-add ${added ? 'added' : ''}`} onClick={onAdd} aria-label={`Add ${selected.name} ${selected.shade} to bag`}>{added ? <Check size={17}/> : <Plus size={17}/>}<span>{added ? 'Added to bag' : moveFromWishlist ? 'Move to bag' : 'Add to bag'}</span></button>
    </div>
    <div className="product-meta"><span>{selected.category} / {selected.finish}</span><span>{currency(selected.price)}</span></div>
    <h3><Link href={`/shop/${selected.slug}/`}>{selected.name}</Link></h3>
    <div className="product-bottom"><p>{selected.shade}</p>{!moveFromWishlist && <div className="swatches" aria-label={`${selected.name} shades`}>{variants.map(v => <button key={v.id} className={`swatch ${selected.id === v.id ? 'selected' : ''}`} style={{'--swatch': v.color} as React.CSSProperties} onClick={() => setSelected(v)} aria-label={v.shade} aria-pressed={selected.id === v.id} title={v.shade}/>)}</div>}</div>
  </article>;
}
