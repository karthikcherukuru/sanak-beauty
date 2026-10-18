import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopCollection } from '@/components/shop-collection';
export const metadata: Metadata={title:'The Collection',description:'Explore twelve original Sanak essentials for lips, face and skincare. Find your shade and make the ritual yours.'};
export default function Shop(){return <div className="container page-space"><header className="page-heading"><span className="eyebrow">The Sanak collection</span><h1>Your everyday.<br/><em>A little more beautiful.</em></h1><p>Twelve thoughtful essentials. A world of ways to feel like you.</p></header><Suspense fallback={<p>Opening the collection…</p>}><ShopCollection/></Suspense></div>;}
