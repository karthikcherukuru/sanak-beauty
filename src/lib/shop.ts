import { products, type Product } from '@/data/products';
export const currency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export type Filters = { query?: string; category?: string; maxPrice?: number; shade?: string; sort?: string; featured?: boolean };
export function filterProducts(filters: Filters, collection: Product[] = products) {
  const q = (filters.query || '').trim().toLowerCase();
  const result = collection.filter(p => (!q || `${p.name} ${p.category} ${p.shade} ${p.description}`.toLowerCase().includes(q)) && (!filters.category || filters.category === 'All' || p.category === filters.category) && (!filters.maxPrice || p.price <= filters.maxPrice) && (!filters.shade || filters.shade === 'All' || p.shade === filters.shade) && (!filters.featured || p.featured));
  return result.sort((a,b) => filters.sort === 'price-asc' ? a.price-b.price : filters.sort === 'price-desc' ? b.price-a.price : filters.sort === 'name' ? `${a.name} ${a.shade}`.localeCompare(`${b.name} ${b.shade}`) : Number(b.featured)-Number(a.featured));
}
export type CartLine = { id: string; quantity: number };
export const cartTotal = (items: CartLine[]) => items.reduce((sum, item) => sum + (products.find(p => p.id === item.id)?.price || 0) * item.quantity, 0);
export const itemCount = (items: CartLine[]) => items.reduce((n, i) => n+i.quantity, 0);
