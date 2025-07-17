import { create } from 'zustand';

interface ToastState {
  message: string | null;
  show: (msg: string) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (msg: string) => {
    set({ message: msg });
    setTimeout(() => set({ message: null }), 3000);
  },
  hide: () => set({ message: null }),
}));

export const showToast = (msg: string): void => {
  useToastStore.getState().show(msg);
};
