import { create } from 'zustand';
import { CartItem } from '../types';

/**
 * @typedef {Object} CartStore
 * @property {CartItem[]} items - Array of cart items
 * @property {number} total - Total price of items in cart
 * @property {function(CartItem): void} addItem - Add an item to cart
 * @property {function(string): void} removeItem - Remove an item from cart
 * @property {function(string, number): void} updateQuantity - Update item quantity
 * @property {function(): void} clearCart - Clear all items from cart
 */

/** @type {import('zustand').StateCreator<CartStore>} */
export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
      total: state.total - (state.items.find((i) => i.id === id)?.price ?? 0),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
      total: state.items.reduce((acc, item) => 
        acc + (item.id === id ? item.price * quantity : item.price * item.quantity)
      , 0),
    })),
  clearCart: () => set({ items: [], total: 0 }),
}));