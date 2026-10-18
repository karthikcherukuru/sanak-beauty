'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MoveHorizontal, Plus, Sparkles } from 'lucide-react';
import { products, variantsOf, type Product } from '@/data/products';
import { currency } from '@/lib/shop';
import { useShop, useUI } from '@/store/shop-store';
const Viewer=dynamic(()=>import('./three/viewer'),{ssr:false,loading:()=><div className="viewer-loading">Preparing your beauty studio…</div>});
const options=[products[0],products[3],products[5],products[7],products[10]];
export function ProductViewer({product}: {product:Product}) {
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);observer.disconnect();}},{rootMargin:'160px'});observer.observe(node);return()=>observer.disconnect();},[]);
  const fallback=<div className="viewer-fallback"><Image src={product.image} width={700} height={700} alt={`${product.name} in ${product.shade}`}/><p>Static product preview · 3D requires WebGL</p></div>;
  return <div ref={ref} className="viewer-host">{visible?<Viewer product={product} fallback={fallback}/>:<Image className="viewer-poster" src={product.image} width={700} height={700} alt={`${product.name} preview`}/>}</div>;
}
export function Showcase() {
  const [product,setProduct]=useState(products[0]);
  const add=useShop(s=>s.add), notify=useUI(s=>s.notify);
  return <section className="showcase" id="studio"><div className="container"><div className="studio-topline"><span className="eyebrow">The signature showcase</span><span><span className="live-dot"/> The interactive beauty studio</span></div><div className="studio-grid"><div className="studio-intro"><h2>A new angle<br/>on <em>beauty.</em></h2><p>Get a little closer. Turn it, explore it, find your shade. Your next favorite, from every angle.</p><a className="text-link" href="#studio-products">Try beauty in 360° <ArrowRight size={17}/></a><div className="drag-note"><MoveHorizontal size={23}/><span>Drag to discover.<br/>A little curiosity looks good on you.</span></div></div><div className="studio-stage"><span className="stage-number" aria-hidden="true">360°</span><ProductViewer product={product}/></div><div className="studio-details"><span className="studio-edition"><Sparkles size={14}/> THE SANAK ESSENTIALS</span><h3>{product.name}</h3><p>{product.description}</p><div className="studio-price">{currency(product.price)} <span>/ {product.size}</span></div><div className="shade-label">Your shade <strong>{product.shade}</strong></div><div className="swatches large-swatches">{variantsOf(product).map(v=><button key={v.id} className={`swatch ${product.id===v.id?'selected':''}`} style={{'--swatch':v.color} as React.CSSProperties} aria-label={`Show ${v.shade} in 3D`} aria-pressed={product.id===v.id} onClick={()=>setProduct(v)}/>)}</div><div className="studio-benefits">{product.benefits.slice(0,2).map(b=><span key={b}>{b}</span>)}</div><button className="button wide" onClick={()=>{add(product.id);notify(`${product.name} · ${product.shade} added to your bag.`);}}>Add to bag <Plus size={17}/></button><Link className="text-link centered" href={`/shop/${product.slug}/`}>All the lovely details <ArrowRight size={14}/></Link></div></div><div className="studio-products" id="studio-products" aria-label="Choose a 3D product">{options.map(p=><button key={p.family} className={product.family===p.family?'active':''} onClick={()=>setProduct(p)} aria-pressed={product.family===p.family}><span>{p.family==='lipstick'?'The velvet lip':p.family==='serum'?'The daily glow':p.family==='blush'?'The soft flush':p.family==='foundation'?'The skin tint':'The finishing touch'}</span><ArrowRight size={15}/></button>)}</div></div></section>;
}
