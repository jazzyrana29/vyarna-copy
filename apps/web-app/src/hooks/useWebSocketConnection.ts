"use client"

import { useEffect, useState } from "react"
import { wsService } from "../services/websocketService"
import { WS_MESSAGES } from "../constants/websocket-messages"
import { usePaymentStore } from "../store/paymentStore"
import { useCartStore } from "../store/cartStore"
import { useUserStore } from "../store/userStore"
import { wsApiService } from "../services/websocketApiService"

export const useWebSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const { setPaymentStatus, setPaymentError, setProcessing } = usePaymentStore()
  const { resetCart } = useCartStore()
  const { userDetails } = useUserStore()

  useEffect(() => {
    // Connection status
    const unsubscribeConnection = wsService.on(WS_MESSAGES.CONNECTION_ESTABLISHED, () => {
      setIsConnected(true)
      setConnectionError(null)
      console.log("WebSocket connection established")
    })

    // Payment status updates
    const unsubscribePaymentStatus = wsApiService.onPaymentStatusUpdate((data) => {
      const { status, error, customerEmail } = data

      // Only handle updates for current user
      if (userDetails?.email && customerEmail === userDetails.email) {
        setProcessing(false)

        if (status === "succeeded") {
          setPaymentStatus("succeeded")
          resetCart()
        } else if (status === "failed") {
          setPaymentStatus("failed")
          setPaymentError(error || "Payment failed")
        } else if (status === "processing") {
          setProcessing(true)
          setPaymentStatus("processing")
        }
      }
    })

    // Coupon updates
    const unsubscribeCouponUsed = wsApiService.onCouponUsed((data) => {
      console.log("Coupon used:", data)
      // Could update UI to reflect coupon usage
    })

    const unsubscribeCouponLimit = wsApiService.onCouponLimitReached((data) => {
      console.log("Coupon limit reached:", data)
      // Could show notification that discount is no longer available
    })

    // Join customer room when user details are available
    if (userDetails?.email) {
      wsApiService.joinCustomerRoom(userDetails.email)
    }

    // Monitor connection status
    const checkConnection = setInterval(() => {
      const connected = wsService.isConnected
      if (connected !== isConnected) {
        setIsConnected(connected)
        if (!connected) {
          setConnectionError("Connection lost")
        }
      }
    }, 1000)

    // Cleanup
    return () => {
      unsubscribeConnection()
      unsubscribePaymentStatus()
      unsubscribeCouponUsed()
      unsubscribeCouponLimit()
      clearInterval(checkConnection)

      if (userDetails?.email) {
        wsApiService.leaveCustomerRoom(userDetails.email)
      }
    }
  }, [userDetails?.email, isConnected, setPaymentStatus, setPaymentError, setProcessing, resetCart])

  return {
    isConnected,
    connectionError,
    wsService,
    wsApiService,
  }
}
