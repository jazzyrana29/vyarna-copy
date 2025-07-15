import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

export interface UserDetails {
  nameFirst: string;
  nameMiddle?: string;
  nameLastFirst: string;
  nameLastSecond?: string;
  email: string;
  address?: {
    street: string;
    city: string;
    postalCode?: string;
    country?: string;
  };
}

interface UserStore {
  userDetails: UserDetails | null;
  stripeCustomerId: string | null;
  personId: string | null;
  setUserDetails: (details: UserDetails) => void;
  setStripeCustomerId: (id: string) => void;
  setPersonId: (id: string) => void;
  clearUserDetails: () => void;
  hasUserDetails: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userDetails: null,
      stripeCustomerId: null,
      personId: null,

      setUserDetails: (details) => set({ userDetails: details }),
      setStripeCustomerId: (id) => set({ stripeCustomerId: id }),
      setPersonId: (id) => set({ personId: id }),

      clearUserDetails: () =>
        set({ userDetails: null, stripeCustomerId: null, personId: null }),

      hasUserDetails: () => {
        const d = get().userDetails;
        return !!(d?.nameFirst && d?.nameLastFirst && d?.email);
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => ({
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      })),
    },
  ),
);
