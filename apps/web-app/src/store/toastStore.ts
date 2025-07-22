import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  message: string;
  type: ToastType;
}

interface ToastState {
  toast: Toast | null;
  show: (msg: string, type?: ToastType) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  show: (msg: string, type: ToastType = 'info') => {
    set({ toast: { message: msg, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
  hide: () => set({ toast: null }),
}));

export const showToast = (msg: string, type?: ToastType): void => {
  useToastStore.getState().show(msg, type);
};
