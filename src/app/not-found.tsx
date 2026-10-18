import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function NotFound(){return <div className="empty-state not-found"><span className="eyebrow">A little detour · 404</span><h1>This beauty<br/>is <em>elsewhere.</em></h1><p>We couldn’t find that page. Your next favorite is still waiting.</p><Link href="/shop/" className="button">Back to the collection <ArrowRight size={17}/></Link></div>;}
