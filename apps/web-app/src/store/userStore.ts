import { create } from 'zustand';
import { PersonWithoutPasswordDto } from 'ez-utils';

export interface UserDetails
  extends Omit<PersonWithoutPasswordDto, 'personId' | 'stripeCustomerId'> {
  addInActiveCampaign?: boolean;
}

interface UserStore {
  userDetails: UserDetails | null;
  isLoggedIn: boolean;
  setUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
  login: (details?: Partial<UserDetails>) => void;
  logout: () => void;
  hasUserDetails: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userDetails: null,
  isLoggedIn: false,

  setUserDetails: (details) => set({ userDetails: details }),

  clearUserDetails: () => set({ userDetails: null }),

  login: (details) =>
    set((state) => ({
      isLoggedIn: true,
      userDetails: details ? { ...(state.userDetails ?? {}), ...details } : state.userDetails,
    })),

  logout: () => set({ isLoggedIn: false, userDetails: null }),

  hasUserDetails: () => {
    const d = get().userDetails;
    return !!(d?.nameFirst && d?.nameLastFirst && d?.email);
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
