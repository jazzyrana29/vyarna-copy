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
  getTotal: () => number;
  setCartId: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartId: null,
  items: [],
  isOpen: false,

  addItem: (item): void => {
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

  removeItem: (id): void => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  updateQuantity: (id, quantity): void => {
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

  resetCart: (): void => {
    set({ items: [], cartId: null });
  },

  getItemCount: (): number => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  getTotal: (): number => {
    return (
      get().items.reduce(
        (total, item) => total + item.priceCents * item.quantity,
        0,
      ) / 100
    );
  },

  setCartId: (id): void => {
    set({ cartId: id });
  },

  openCart: (): void => {
    set({ isOpen: true });
  },

  closeCart: (): void => {
    set({ isOpen: false });
  },
}));
