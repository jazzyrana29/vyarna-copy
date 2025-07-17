import { create } from 'zustand';

interface ProductSelectorStore {
  visible: boolean;
  open: () => void;
  close: () => void;
}

export const useProductSelectorStore = create<ProductSelectorStore>((set) => ({
  visible: false,
  open: () => set({ visible: true }),
  close: () => set({ visible: false }),
}));
