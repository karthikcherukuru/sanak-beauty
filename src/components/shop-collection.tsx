'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import { filterProducts, currency } from '@/lib/shop';
import { ProductCard } from './product-card';
import { Modal } from './modal';
export function ShopCollection() {
  const params=useSearchParams();
  return <Collection key={params.toString()}/>;
}
function Collection() {
  const params=useSearchParams();
  const [category,setCategory]=useState(params.get('category')||'All');
  const [query,setQuery]=useState(params.get('q')||'');
  const [featured,setFeatured]=useState(params.get('featured')==='true');
  const [maxPrice,setMaxPrice]=useState(1500);
  const [shade,setShade]=useState('All');
  const [sort,setSort]=useState('featured');
  const [filterOpen,setFilterOpen]=useState(false);
  const filtered=filterProducts({category,query,featured,maxPrice,shade,sort});
  const active=category!=='All'||query||featured||maxPrice<1500||shade!=='All';
  function clear(){setCategory('All');setQuery('');setFeatured(false);setMaxPrice(1500);setShade('All');}
  const filters=<><label className="filter-label">A little something for<select aria-label="Category filter" value={category} onChange={e=>{setCategory(e.target.value);setShade('All');}}>{['All','Lips','Face','Skincare'].map(c=><option key={c} value={c}>{c==='All'?'Everyday, everything':c}</option>)}</select></label><label className="filter-label">Your shade<select aria-label="Shade filter" value={shade} onChange={e=>setShade(e.target.value)}><option value="All">All shades</option>{products.filter(p=>category==='All'||p.category===category).map(p=><option key={p.id}>{p.shade}</option>)}</select></label><label className="filter-label">Price, up to <strong>{currency(maxPrice)}</strong><input aria-label="Maximum price" type="range" min={799} max={1500} step={1} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></label><label className="checkbox-label"><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)}/> Only our favorites</label><button className="text-link" onClick={clear}>Clear all filters <X size={14}/></button></>;
  return <><div className="collection-tabs" role="group" aria-label="Product categories">{['All','Lips','Face','Skincare'].map(c=><button key={c} className={category===c?'active':''} onClick={()=>{setCategory(c);setShade('All');}} aria-pressed={category===c}>{c==='All'?'All essentials':c}</button>)}</div><div className="collection-toolbar"><label className="collection-search"><Search size={18}/><input aria-label="Search collection" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find your favorite…"/>{query&&<button aria-label="Clear collection search" onClick={()=>setQuery('')}><X size={16}/></button>}</label><span className="result-count" aria-live="polite">{filtered.length} essentials</span><button className="filter-toggle" onClick={()=>setFilterOpen(true)}><SlidersHorizontal size={17}/> Filters</button><label className="sort-label"><span>Sort by</span><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option></select></label></div><div className="collection-layout"><aside className="collection-filters"><h2>Make it yours.</h2>{filters}</aside><div><div className="product-grid shop-grid">{filtered.map(product=><ProductCard key={product.id} product={product}/>)}</div>{!filtered.length&&<div className="empty-state"><h2>A fresh start?</h2><p>There are no essentials matching these filters.</p><button className="button" onClick={clear}>Explore all products</button></div>}{active&&filtered.length>0&&<button className="text-link clear-bottom" onClick={clear}>Reset filters and see all 12 essentials <X size={14}/></button>}</div></div><Modal open={filterOpen} close={()=>setFilterOpen(false)} title="Find your essentials" drawer><div className="mobile-filters">{filters}<button className="button wide" onClick={()=>setFilterOpen(false)}>Show {filtered.length} essentials</button></div></Modal></>;
}
