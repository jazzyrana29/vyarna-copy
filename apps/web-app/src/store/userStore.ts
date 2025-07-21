import { create } from 'zustand';
import { PersonWithoutPasswordDto, PhysicalAddressDto } from 'ez-utils';

export interface UserDetails
  extends Omit<PersonWithoutPasswordDto, 'personId' | 'stripeCustomerId'> {
  /** Optional identifier of the logged in person */
  personId?: string;
  addInActiveCampaign?: boolean;
}

interface UserStore {
  userDetails: UserDetails | null;
  isLoggedIn: boolean;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
  setAddress: (address: PhysicalAddressDto) => void;
  setAddresses: (addresses: PhysicalAddressDto[]) => void;
  login: (details?: Partial<UserDetails>) => void;
  logout: () => void;
  hasUserDetails: () => boolean;
  hasAddress: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userDetails: null,
  isLoggedIn: false,

  setUserDetails: (details) => set({ userDetails: details }),

  clearUserDetails: () => set({ userDetails: null }),

  setAddress: (address) =>
    set((state) => {
      const existing = state.userDetails?.addresses ?? [];
      let updated = existing.filter((a) => a.addressId !== address.addressId);
      if (address.isPrimary) {
        updated = updated.map((a) => ({ ...a, isPrimary: false }));
      }
      updated.push(address);
      updated.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
      return {
        userDetails: state.userDetails
          ? { ...state.userDetails, addresses: updated }
          : ({ addresses: updated } as any),
      };
    }),

  setAddresses: (addresses) =>
    set((state) => ({
      userDetails: state.userDetails
        ? {
            ...state.userDetails,
            addresses: addresses.sort(
              (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0),
            ),
          }
        : ({ addresses } as any),
    })),

  login: (details) =>
    set((state) => ({
      isLoggedIn: true,
      userDetails: details
        ? { ...(state.userDetails ?? {}), ...details }
        : state.userDetails,
    })),

  logout: () => set({ isLoggedIn: false, userDetails: null }),

  hasUserDetails: () => {
    const d = get().userDetails;
    return !!(d?.nameFirst && d?.nameLastFirst && d?.email);
  },

  hasAddress: () => {
    const a = get().userDetails?.addresses?.find((addr) => addr.isPrimary);
    return !!a;
  },
}));

const USER_KEY = 'user-store';

if (typeof localStorage !== 'undefined') {
  try {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      useUserStore.setState((state) => ({
        ...state,
        userDetails: parsed.userDetails ?? null,
        isLoggedIn: parsed.isLoggedIn ?? false,
      }));
    }
  } catch (err) {
    console.warn('Failed to load user', err);
  }

  useUserStore.subscribe((state) => {
    try {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          userDetails: state.userDetails,
          isLoggedIn: state.isLoggedIn,
        }),
      );
    } catch (err) {
      console.warn('Failed to save user', err);
    }
  });
}
