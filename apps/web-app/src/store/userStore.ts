import { create } from 'zustand';
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

export const useUserStore = create<UserStore>((set, get) => ({
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
}));

const USER_KEY = 'user-store';

SecureStore.getItemAsync(USER_KEY)
  .then((data) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);
        useUserStore.setState((state) => ({
          ...state,
          userDetails: parsed.userDetails ?? null,
          stripeCustomerId: parsed.stripeCustomerId ?? null,
          personId: parsed.personId ?? null,
        }));
      } catch (err) {
        console.warn('Failed to parse stored user', err);
      }
    }
  })
  .catch((err) => console.warn('Failed to load user', err));

useUserStore.subscribe((state) => {
  SecureStore.setItemAsync(
    USER_KEY,
    JSON.stringify({
      userDetails: state.userDetails,
      stripeCustomerId: state.stripeCustomerId,
      personId: state.personId,
    }),
  ).catch((err) => console.warn('Failed to save user', err));
});
