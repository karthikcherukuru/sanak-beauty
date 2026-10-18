'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, MoveUpRight, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { featuredProducts } from '@/data/products';
import { ProductCard } from './product-card';
import { Showcase } from './showcase';
export function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero"><div className="hero-copy"><motion.div initial={false} animate={{y: 0, opacity: 1}} transition={{duration: reduced ? 0 : .8}}><div className="hero-eyebrow"><span/> Everyday beauty. Exceptionally yours.</div><h1>Beauty that<br/>feels like <em>you.</em></h1><p>Thoughtfully crafted essentials for your everyday glow.<br className="desktop-break"/> Modern beauty, in its most effortless form.</p><div className="hero-actions"><Link className="button" href="/shop/">Explore the collection <ArrowRight size={18}/></Link><Link className="text-link" href="/about/">Discover Sanak <MoveUpRight size={15}/></Link></div></motion.div><div className="hero-bottom"><span className="hero-flower" aria-hidden="true">✳</span><span>A little ritual.<br/><strong>A beautiful feeling.</strong></span><a href="#favorites" aria-label="Discover our favorite products" className="hero-scroll"><ArrowDown size={19}/></a></div></div><div className="hero-image"><Image src="/images/campaign.webp" alt="Sanak campaign: an adult model wearing rosewood lipstick, holding the ivory and champagne lipstick" fill priority sizes="(max-width: 700px) 100vw, 58vw"/><div className="campaign-caption"><span>THE EVERYDAY MUSE</span><span>Sanak / The first collection</span></div><Link href="/shop/rosewood/" className="hero-product"><span className="hero-product-dot"/><span>Meet your new signature.<br/><strong>Velvet Matte · Rosewood</strong></span><ArrowRight size={19}/></Link></div></section>;
}
export function Favorites() {return <section className="favorites section container" id="favorites"><div className="section-heading"><div><span className="eyebrow">Our favorites</span><h2>Good things.<br className="mobile-only"/> Great glow.</h2><p>Loved for a reason. Made for your everyday.</p></div><Link className="text-link" href="/shop/">View all products <ArrowRight size={17}/></Link></div><div className="product-grid">{featuredProducts.map(product => <ProductCard key={product.id} product={product}/>)}</div></section>;}
const reviews = [
  {quote: 'The kind of lipstick that makes even a coffee run feel like a little occasion.', name: 'Ananya M.', product: 'Velvet Matte · Rosewood', initial: 'A'},
  {quote: 'A soft flush, a swipe of gloss, and I feel like myself. Just a little more luminous.', name: 'Meera S.', product: 'Petal Blush · Soft Rose', initial: 'M'},
  {quote: 'Beautiful on the shelf. Even more beautiful as part of my morning ritual.', name: 'Riya K.', product: 'Radiant Glow · Golden Hour', initial: 'R'},
  {quote: 'I love a finish that lets my skin be skin. This is exactly the feeling I look for.', name: 'Tara D.', product: 'Skin Tint · Honey', initial: 'T'},
];
export function Reviews() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  function shift(direction: number) {const next=(index+direction+reviews.length)%reviews.length;setIndex(next); const child=track.current?.children[next] as HTMLElement; if(child && track.current) track.current.scrollTo({left: child.offsetLeft-track.current.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});}
  return <section className="reviews section container"><div className="section-heading"><div><span className="eyebrow">Real stories. Real confidence.</span><h2>A beautiful kind of feeling.</h2><p>Imagined rituals from our demo community.</p></div><div className="carousel-actions"><button className="circle-button" aria-label="Previous review" onClick={() => shift(-1)}><ArrowLeft size={19}/></button><button className="circle-button" aria-label="Next review" onClick={() => shift(1)}><ArrowRight size={19}/></button></div></div><div className="reviews-track" ref={track}>{reviews.map(review => <article className="review" key={review.name}><div className="stars" aria-label="Sample rating: 5 out of 5">{Array.from({length:5},(_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div><blockquote>“{review.quote}”</blockquote><div className="review-person"><span>{review.initial}</span><div><strong>{review.name}</strong><small>{review.product}</small></div></div></article>)}</div><p className="demo-note">Fictional testimonials created for this demonstration. Not real customer endorsements.</p></section>;
}
export { Showcase };
