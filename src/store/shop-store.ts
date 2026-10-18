'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { findProduct } from '@/data/products';
import type { CartLine } from '@/lib/shop';
type ShopState = {
  items: CartLine[]; wishlist: string[];
  add: (id: string, quantity?: number) => void;
  quantity: (id: string, quantity: number) => void;
  remove: (id: string) => void; clear: () => void;
  toggleWish: (id: string) => void; moveToCart: (id: string) => void;
};
export const useShop = create<ShopState>()(persist((set) => ({
  items: [], wishlist: [],
  add: (id, quantity = 1) => set(state => {
    if (!findProduct(id) || !Number.isFinite(quantity) || quantity < 1) return state;
    const existing = state.items.find(i => i.id === id);
    return { items: existing ? state.items.map(i => i.id === id ? {...i, quantity: Math.min(99, i.quantity + Math.floor(quantity))} : i) : [...state.items, {id, quantity: Math.min(99, Math.floor(quantity))}] };
  }),
  quantity: (id, quantity) => set(state => Number.isFinite(quantity) ? ({items: quantity <= 0 ? state.items.filter(i => i.id !== id) : state.items.map(i => i.id === id ? {...i, quantity: Math.min(99, Math.floor(quantity))} : i)}) : state),
  remove: id => set(state => ({items: state.items.filter(i => i.id !== id)})),
  clear: () => set({items: []}),
  toggleWish: id => set(state => !findProduct(id) ? state : ({wishlist: state.wishlist.includes(id) ? state.wishlist.filter(i => i !== id) : [...state.wishlist, id]})),
  moveToCart: id => set(state => {
    if (!findProduct(id)) return state;
    return {wishlist: state.wishlist.filter(i => i !== id), items: state.items.some(i => i.id === id) ? state.items.map(i => i.id === id ? {...i, quantity: Math.min(i.quantity+1, 99)} : i) : [...state.items, {id, quantity: 1}]};
  }),
}), {name: 'sanak-beauty-v1', skipHydration: true, partialize: state => ({items: state.items, wishlist: state.wishlist}), merge: (saved, current) => {
  const data = saved as Partial<ShopState> | undefined;
  return {...current, items: Array.isArray(data?.items) ? data.items.filter(i => i && findProduct(i.id) && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 99) : [], wishlist: Array.isArray(data?.wishlist) ? [...new Set(data.wishlist.filter(id => findProduct(id)))] : []};
}}));
type UIState = { panel: 'cart' | 'search' | 'menu' | null; notice: string; open: (panel: UIState['panel']) => void; notify: (message: string) => void };
let noticeTimer: ReturnType<typeof setTimeout>;
export const useUI = create<UIState>()(set => ({panel: null, notice: '', open: panel => set({panel}), notify: notice => {clearTimeout(noticeTimer); set({notice}); noticeTimer = setTimeout(() => set({notice: ''}), 4000);}}));
