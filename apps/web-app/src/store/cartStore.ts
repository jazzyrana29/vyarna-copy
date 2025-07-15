import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  image: any;
  priceCents: number;
  currency: string;
  quantity: number;
}

interface CartStore {
  cartId: string | null;
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  resetCart: () => void;
  getItemCount: () => number;
  getTotalCents: () => number;
  setCartId: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartId: null,
  items: [],
  isOpen: false,

  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    });
  },

  resetCart: () => {
    set({ items: [], cartId: null });
  },

  getItemCount: () => get().items.reduce((c, i) => c + i.quantity, 0),

  getTotalCents: () =>
    get().items.reduce((t, i) => t + i.priceCents * i.quantity, 0),

  setCartId: (id) => set({ cartId: id }),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),
}));

const CART_KEY = 'cart-store';

if (typeof localStorage !== 'undefined') {
  try {
    const data = localStorage.getItem(CART_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      useCartStore.setState((state) => ({
        ...state,
        items: parsed.items ?? [],
        cartId: parsed.cartId ?? null,
      }));
    }
  } catch (err) {
    console.warn('Failed to load cart', err);
  }

  useCartStore.subscribe((state) => {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({ items: state.items, cartId: state.cartId }),
      );
    } catch (err) {
      console.warn('Failed to save cart', err);
    }
  });
}
