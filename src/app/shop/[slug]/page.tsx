import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductDetail } from '@/components/product-detail';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=products.find(p=>p.slug===slug);return {title:p?`${p.name} — ${p.shade}`:'Product not found',description:p?.description};}
export default async function ProductPage({params}: {params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();return <ProductDetail key={p.id} initialProduct={p}/>;}
