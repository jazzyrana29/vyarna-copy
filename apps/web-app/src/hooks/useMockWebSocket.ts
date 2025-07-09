"use client"

import { useEffect } from "react"
import { usePaymentStore } from "../store/paymentStore"
import { useCartStore } from "../store/cartStore"

export const useMockWebSocket = () => {
  const { setPaymentStatus, setPaymentError, setProcessing } = usePaymentStore()
  const { resetCart } = useCartStore()

  useEffect(() => {
    // Listen for payment session created
    const handlePaymentSessionCreated = (event: any) => {
      const { sessionId, customerEmail, appliedCoupons } = event.detail
      console.log("Payment session created:", { sessionId, customerEmail, appliedCoupons })
    }

    // Listen for payment completed
    const handlePaymentCompleted = (event: any) => {
      const { sessionId, customerEmail, status } = event.detail
      console.log("Payment completed:", { sessionId, customerEmail, status })

      setProcessing(false)
      setPaymentStatus("succeeded")
      resetCart()
    }

    // Listen for payment failed
    const handlePaymentFailed = (event: any) => {
      const { sessionId, customerEmail, status, error } = event.detail
      console.log("Payment failed:", { sessionId, customerEmail, status, error })

      setProcessing(false)
      setPaymentStatus("failed")
      setPaymentError(error || "Payment failed")
    }

    // Listen for coupon limit reached
    const handleCouponLimitReached = (event: any) => {
      const { couponId, productId } = event.detail
      console.log("Coupon limit reached:", { couponId, productId })

      // You could update the UI to show that the coupon is no longer available
      // For now, just log it
    }

    // Add event listeners
    window.addEventListener("mock-payment-session-created", handlePaymentSessionCreated)
    window.addEventListener("mock-payment-completed", handlePaymentCompleted)
    window.addEventListener("mock-payment-failed", handlePaymentFailed)
    window.addEventListener("mock-coupon-limit-reached", handleCouponLimitReached)

    // Cleanup
    return () => {
      window.removeEventListener("mock-payment-session-created", handlePaymentSessionCreated)
      window.removeEventListener("mock-payment-completed", handlePaymentCompleted)
      window.removeEventListener("mock-payment-failed", handlePaymentFailed)
      window.removeEventListener("mock-coupon-limit-reached", handleCouponLimitReached)
    }
  }, [setPaymentStatus, setPaymentError, setProcessing, resetCart])
}
