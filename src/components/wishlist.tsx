'use client';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { useShop } from '@/store/shop-store';
import { products } from '@/data/products';
import { ProductCard } from './product-card';
export function Wishlist(){const wishlist=useShop(s=>s.wishlist);const saved=products.filter(p=>wishlist.includes(p.id));return saved.length?<><p className="wishlist-count" aria-live="polite">{saved.length} little {saved.length===1?'luxury':'luxuries'}, saved for later.</p><div className="product-grid">{saved.map(p=><ProductCard key={p.id} product={p} moveFromWishlist/>)}</div></>:<div className="empty-state"><Heart size={40} strokeWidth={1}/><h2>Keep the lovely things close.</h2><p>Tap a heart on any product to save it here for later.</p><Link className="button" href="/shop/">Find your favorites <ArrowRight size={17}/></Link></div>;}
