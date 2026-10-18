'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useShop, useUI } from '@/store/shop-store';
import { filterProducts, itemCount, currency } from '@/lib/shop';
import { Modal } from './modal';
import { CartContent } from './cart-content';
export function Wordmark({large = false}: {large?: boolean}) {return <span className={`wordmark ${large ? 'large' : ''}`}>sanak<span>BEAUTY</span></span>;}
export function SiteHeader() {
  const {items, wishlist} = useShop();
  const {panel, open, notice} = useUI();
  const pathname = usePathname();
  useEffect(() => {useShop.persist.rehydrate();}, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {e.preventDefault(); open(useUI.getState().panel === 'search' ? null : 'search');}};
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open]);
  return <><a href="#main" className="skip-link">Skip to content</a><div className="announcement"><span>A little luxury, every day.</span><span>Complimentary demo delivery on orders ₹1,499+ <ArrowRight size={12}/></span></div><header className="header"><div className="header-inner"><button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => open('menu')}><Menu size={22}/></button><Link href="/" aria-label="Sanak Beauty home" className="brand-link"><Wordmark/></Link><nav className="desktop-nav" aria-label="Main navigation"><Link href="/shop/" aria-current={pathname === '/shop/' ? 'page' : undefined}>Shop all</Link><Link href="/shop/?featured=true">Bestsellers</Link><Link href="/#studio">The beauty studio <span className="nav-dot"/></Link><Link href="/about/">Our story</Link></nav><div className="header-actions"><button className="icon-button" aria-label="Search products" onClick={() => open('search')}><Search size={20}/></button><Link className="icon-button header-wishlist" href="/wishlist/" aria-label={`Wishlist, ${wishlist.length} saved products`}><Heart size={20}/>{wishlist.length > 0 && <span className="count">{wishlist.length}</span>}</Link><button className="bag-button" aria-label={`Open shopping bag, ${itemCount(items)} items`} onClick={() => open('cart')}><ShoppingBag size={20}/><span className="bag-text">Bag</span><span className="bag-count">{itemCount(items)}</span></button></div></div></header>
    <Modal open={panel === 'cart'} close={() => open(null)} title="Your bag" drawer><CartContent/></Modal>
    <Modal open={panel === 'search'} close={() => open(null)} title="Find your next favorite"><SearchContent/></Modal>
    <Modal open={panel === 'menu'} close={() => open(null)} title="Explore Sanak" drawer><nav className="mobile-nav" aria-label="Mobile navigation">{[['Shop all','/shop/'],['Bestsellers','/shop/?featured=true'],['The beauty studio','/#studio'],['Our story','/about/'],['Your wishlist','/wishlist/'],['Get in touch','/contact/']].map(([label, href]) => <Link key={label} href={href} onClick={() => open(null)}>{label}<ArrowRight size={20}/></Link>)}</nav><p className="menu-signoff">Beauty, naturally yours.</p></Modal>
    <div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice && <><Check size={17}/><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => useUI.setState({notice: ''})}><X size={16}/></button></>}</div>
  </>;
}
function SearchContent() {
  const [query, setQuery] = useState('');
  const open = useUI(s => s.open);
  const results = filterProducts({query}).slice(0, 6);
  return <div className="search-content"><label className="search-field"><Search size={20}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Try ‘serum’, ‘rosewood’ or ‘face’" aria-label="Search products"/>{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={18}/></button>}</label><p className="small">{query ? `${results.length} matching ${results.length === 1 ? 'essential' : 'essentials'}` : 'A few things you might love'}</p><div className="search-results">{results.map(p => <Link key={p.id} href={`/shop/${p.slug}/`} onClick={() => open(null)}><Image src={p.image} width={80} height={80} alt=""/><span><strong>{p.name}</strong><small>{p.shade} · {p.category}</small></span><span>{currency(p.price)}</span><ArrowRight size={17}/></Link>)}</div>{!results.length && <div className="empty-state"><h3>No little luxuries found.</h3><p>Try a product, shade or category such as “Lips”.</p><button className="text-link" onClick={() => setQuery('')}>Clear your search</button></div>}<div className="search-foot"><span>⌘ / Ctrl + K to search</span><Link href={`/shop/?q=${encodeURIComponent(query)}`} onClick={() => open(null)}>Browse all results <ArrowRight size={14}/></Link></div></div>;
}
export function SiteFooter() {
  const [success, setSuccess] = useState(false);
  return <footer className="footer"><div className="footer-top container"><div className="newsletter"><span className="eyebrow">A note from Sanak</span><h2>A little beauty in<br/>your inbox.</h2><p>New favorites, everyday rituals, and little things to love.</p><form onSubmit={e => {e.preventDefault(); setSuccess(true);}}><label className="sr-only" htmlFor="newsletter">Your email address</label><input type="email" id="newsletter" placeholder="Your email address" required autoComplete="email" disabled={success}/><button aria-label="Join newsletter demo" disabled={success}>{success ? <Check size={21}/> : <ArrowRight size={21}/>}</button></form><p className="form-note" role="status">{success ? 'Thank you for trying it. Demo only — your email was not submitted or saved.' : 'Just a preview. This demo does not collect your email.'}</p></div><div className="footer-links"><div><h3>The collection</h3><Link href="/shop/">Shop all</Link><Link href="/shop/?category=Lips">Lips</Link><Link href="/shop/?category=Face">Face</Link><Link href="/shop/?category=Skincare">Skincare</Link></div><div><h3>A little closer</h3><Link href="/about/">Our story</Link><Link href="/contact/">Contact & care</Link><Link href="/wishlist/">Your wishlist</Link><Link href="/contact/#delivery">Delivery & returns</Link></div></div></div><div className="footer-brand container"><Wordmark large/><p>Made to glow.<br/><em>Designed to feel.</em></p></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} Sanak Beauty.</span><span>Original fictional brand · Ecommerce demonstration</span><span>Beauty, naturally yours.</span></div></footer>;
}
