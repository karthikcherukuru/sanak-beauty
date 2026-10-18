'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { findProduct } from '@/data/products';
import { cartTotal, currency } from '@/lib/shop';
import { useShop, useUI } from '@/store/shop-store';
export function CartContent({full = false}: {full?: boolean}) {
  const {items, quantity, remove, clear} = useShop();
  const {open, notify} = useUI();
  const total = cartTotal(items);
  if (!items.length) return <div className="empty-state"><ShoppingBag size={38} strokeWidth={1}/><h2>A little room for beauty.</h2><p>Your bag is waiting for something lovely.</p><Link className="button" href="/shop/" onClick={() => open(null)}>Explore the collection <ArrowRight size={17}/></Link></div>;
  return <div className={full ? 'cart-full' : 'cart-content'}><div className="cart-lines">{items.map(item => {
    const p = findProduct(item.id)!;
    return <article className="cart-line" key={item.id}><Link href={`/shop/${p.slug}/`} onClick={() => open(null)}><Image src={p.image} width={120} height={140} alt={`${p.name} ${p.shade}`}/></Link><div className="cart-line-info"><Link href={`/shop/${p.slug}/`} onClick={() => open(null)}>{p.name}</Link><p>{p.shade} · {p.size}</p><div className="quantity" aria-label={`Quantity for ${p.name} ${p.shade}`}><button aria-label={`Decrease ${p.shade} quantity`} onClick={() => quantity(item.id, item.quantity - 1)}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label={`Increase ${p.shade} quantity`} disabled={item.quantity >= 99} onClick={() => quantity(item.id, item.quantity + 1)}><Plus size={14}/></button></div></div><div className="cart-line-end"><span>{currency(p.price * item.quantity)}</span><button className="icon-button" aria-label={`Remove ${p.name} ${p.shade} from bag`} onClick={() => {remove(item.id); notify(`${p.shade} removed from your bag.`);}}><Trash2 size={16}/></button></div></article>;
  })}<button className="text-button" onClick={() => {clear(); notify('Your bag has been cleared.');}}>Clear bag</button></div><div className="cart-summary"><span className="eyebrow">A few lovely things</span><h2>Your bag, beautifully considered.</h2><div className="summary-line"><span>Subtotal</span><strong>{currency(total)}</strong></div><div className="summary-line"><span>Delivery</span><span>{total >= 1499 ? 'Complimentary' : currency(99)}</span></div><div className="summary-line total"><span>Demo total</span><strong>{currency(total + (total >= 1499 ? 0 : 99))}</strong></div><p className="small">Prices include illustrative taxes. Complimentary delivery from ₹1,499 in this demo.</p><button className="button wide" onClick={() => notify('Demo checkout only — no order is placed and no payment is collected.')}>Explore demo checkout <ArrowRight size={17}/></button>{!full && <Link className="text-link centered" href="/cart/" onClick={() => open(null)}>View your bag</Link>}<p className="demo-note">A shopping demonstration. No real purchases.</p></div></div>;
}
