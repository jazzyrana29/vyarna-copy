import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  currentPrice: number; // After coupon application
  stripePriceId?: string;
  couponApplied: boolean;
  couponId?: string;
  savings?: number;
  image: any;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemPricing: (id: string, pricing: Partial<CartItem>) => void;
  resetCart: () => void;
  getTotal: () => number;
  getOriginalTotal: () => number;
  getTotalSavings: () => number;
  getItemCount: () => number;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }],
      });
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    });
  },

  updateItemPricing: (id, pricing) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, ...pricing } : item,
      ),
    });
  },

  resetCart: () => {
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0,
    );
  },

  getOriginalTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.originalPrice * item.quantity,
      0,
    );
  },

  getTotalSavings: () => {
    return get().getOriginalTotal() - get().getTotal();
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  openCart: () => {
    set({ isOpen: true });
  },

  closeCart: () => {
    set({ isOpen: false });
  },
}));
