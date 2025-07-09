import { create } from "zustand"

export interface UserDetails {
  firstName: string
  lastName: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

interface UserStore {
  userDetails: UserDetails | null
  setUserDetails: (details: UserDetails) => void
  clearUserDetails: () => void
  hasUserDetails: () => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
  userDetails: null,

  setUserDetails: (details) => {
    set({ userDetails: details })
  },

  clearUserDetails: () => {
    set({ userDetails: null })
  },

  hasUserDetails: () => {
    const details = get().userDetails
    return !!(details?.firstName && details?.lastName && details?.email && details?.address?.street)
  },
}))
