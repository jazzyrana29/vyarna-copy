// src/store/userStore.ts
import { create } from 'zustand';

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
  // add any other user fields here
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

export const useUserStore = create<UserStore>((set, get) => ({
  // initial state
  userDetails: null,
  stripeCustomerId: null,
  personId: null,

  // setters
  setUserDetails: (details): void => set({ userDetails: details }),
  setStripeCustomerId: (id): void => set({ stripeCustomerId: id }),
  setPersonId: (id): void => set({ personId: id }),

  // clear all user info
  clearUserDetails: (): void =>
    set({ userDetails: null, stripeCustomerId: null, personId: null }),

  // helper to check if required fields are present
  hasUserDetails: (): boolean => {
    const d = get().userDetails;
    return !!(d?.nameFirst && d?.nameLastFirst && d?.email);
  },
}));
