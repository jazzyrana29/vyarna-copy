import { create } from "zustand"

type PaymentStatus = "idle" | "processing" | "succeeded" | "failed"

interface PaymentStore {
  isProcessing: boolean
  paymentStatus: PaymentStatus
  paymentError: string | null
  sessionId: string | null

  setProcessing: (processing: boolean) => void
  setPaymentStatus: (status: PaymentStatus) => void
  setPaymentError: (error: string | null) => void
  setSessionId: (sessionId: string) => void
  resetPayment: () => void
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  isProcessing: false,
  paymentStatus: "idle",
  paymentError: null,
  sessionId: null,

  setProcessing: (processing) => {
    set({ isProcessing: processing })
  },

  setPaymentStatus: (status) => {
    set({ paymentStatus: status })
  },

  setPaymentError: (error) => {
    set({ paymentError: error })
  },

  setSessionId: (sessionId) => {
    set({ sessionId })
  },

  resetPayment: () => {
    set({
      isProcessing: false,
      paymentStatus: "idle",
      paymentError: null,
      sessionId: null,
    })
  },
}))
