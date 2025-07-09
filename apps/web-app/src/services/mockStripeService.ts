// Enhanced mock service that simulates real Stripe API responses
import type { ProductWithPricing } from "../types/stripe"
import type { UserDetails } from "../store/userStore"
import type { CartItem } from "../store/cartStore"

interface CouponEligibilityResponse {
  success: boolean
  eligibility: {
    [productId: string]: {
      eligible: boolean
      currentPrice: number
      originalPrice: number
      couponApplied: boolean
      couponId?: string
      savings?: number
      reason?: string
    }
  }
}

interface PaymentIntentResponse {
  success: boolean
  clientSecret: string
  paymentIntentId: string
  appliedCoupons: Array<{
    id: string
    productId: string
    discountAmount: number
  }>
  totalAmount: number
  originalAmount: number
}

// Mock database for coupon usage tracking
const MOCK_COUPON_USAGE: Record<string, string[]> = {
  "test@example.com": ["PRESALE_SINGLE_BOOSTER_30"],
  "used@example.com": ["PRESALE_SINGLE_BOOSTER_30", "PRESALE_BOOSTER_BOX_33"],
}

// Mock products data (simulating what backend would return from Stripe)
const MOCK_PRODUCTS: ProductWithPricing[] = [
  {
    id: "single-booster",
    name: "Vyarna Booster",
    description: "Single 1g booster - Real breast milk, freeze-dried and lab-tested",
    images: ["/placeholder.svg?height=200&width=200"],
    originalPrice: 2.0,
    discountedPrice: 1.4,
    stripePriceId: "price_1ABC123_single_booster",
    couponId: "PRESALE_SINGLE_BOOSTER_30",
    couponActive: true,
    savings: 0.6,
    metadata: {
      category: "single",
      weight: "1g",
    },
  },
  {
    id: "booster-box",
    name: "Vyarna Booster Box",
    description: "150 x 1g boosters - One month supply with usage guide",
    images: ["/placeholder.svg?height=200&width=200"],
    originalPrice: 300.0,
    discountedPrice: 200.0,
    stripePriceId: "price_1DEF456_booster_box",
    couponId: "PRESALE_BOOSTER_BOX_33",
    couponActive: true,
    savings: 100.0,
    metadata: {
      category: "bulk",
      quantity: "150",
    },
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockStripeService = {
  // GET /api/products
  async getProducts(): Promise<{ success: boolean; products: ProductWithPricing[] }> {
    await delay(800) // Simulate network delay

    // Simulate occasional API errors for testing
    if (Math.random() < 0.05) {
      // 5% chance of error
      throw new Error("Failed to fetch products from Stripe API")
    }

    return {
      success: true,
      products: MOCK_PRODUCTS,
    }
  },

  // POST /api/check-coupon-eligibility
  async checkCouponEligibility(email: string, productIds: string[]): Promise<CouponEligibilityResponse> {
    await delay(600) // Simulate network delay

    const eligibility: CouponEligibilityResponse["eligibility"] = {}
    const usedCoupons = MOCK_COUPON_USAGE[email] || []

    productIds.forEach((productId) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === productId)
      if (!product) {
        eligibility[productId] = {
          eligible: false,
          currentPrice: 0,
          originalPrice: 0,
          couponApplied: false,
          reason: "Product not found",
        }
        return
      }

      const couponAlreadyUsed = product.couponId && usedCoupons.includes(product.couponId)

      if (couponAlreadyUsed) {
        eligibility[productId] = {
          eligible: false,
          currentPrice: product.originalPrice,
          originalPrice: product.originalPrice,
          couponApplied: false,
          reason: "Coupon already used",
        }
      } else if (product.couponActive && product.discountedPrice) {
        eligibility[productId] = {
          eligible: true,
          currentPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          couponApplied: true,
          couponId: product.couponId,
          savings: product.savings,
        }
      } else {
        eligibility[productId] = {
          eligible: false,
          currentPrice: product.originalPrice,
          originalPrice: product.originalPrice,
          couponApplied: false,
          reason: "No active discount available",
        }
      }
    })

    return {
      success: true,
      eligibility,
    }
  },

  // POST /api/create-payment-intent
  async createPaymentIntent(items: CartItem[], customerDetails: UserDetails): Promise<PaymentIntentResponse> {
    await delay(1000) // Simulate network delay

    // Calculate totals
    const originalAmount = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
    const totalAmount = items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)

    // Collect applied coupons
    const appliedCoupons = items
      .filter((item) => item.couponApplied && item.couponId)
      .map((item) => ({
        id: item.couponId!,
        productId: item.id,
        discountAmount: (item.originalPrice - item.currentPrice) * item.quantity,
      }))

    // Generate mock payment intent
    const paymentIntentId = `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const clientSecret = `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 9)}`

    // Record coupon usage in mock database
    appliedCoupons.forEach((coupon) => {
      if (!MOCK_COUPON_USAGE[customerDetails.email]) {
        MOCK_COUPON_USAGE[customerDetails.email] = []
      }
      if (!MOCK_COUPON_USAGE[customerDetails.email].includes(coupon.id)) {
        MOCK_COUPON_USAGE[customerDetails.email].push(coupon.id)
      }
    })

    console.log("Mock Payment Intent Created:", {
      paymentIntentId,
      customerEmail: customerDetails.email,
      totalAmount,
      appliedCoupons,
    })

    return {
      success: true,
      clientSecret,
      paymentIntentId,
      appliedCoupons,
      totalAmount,
      originalAmount,
    }
  },

  // POST /api/confirm-payment
  async confirmPayment(paymentIntentId: string, customerEmail: string): Promise<{ success: boolean; status: string }> {
    await delay(500)

    // Simulate payment confirmation - 90% success rate
    const success = Math.random() > 0.1

    if (success) {
      console.log("Mock Payment Confirmed:", { paymentIntentId, customerEmail })
      return {
        success: true,
        status: "succeeded",
      }
    } else {
      throw new Error("Payment confirmation failed")
    }
  },
}

// Mock WebSocket events for testing
export const mockWebSocketEvents = {
  simulatePaymentSuccess: (paymentIntentId: string, customerEmail: string) => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mock-payment-succeeded", {
          detail: { paymentIntentId, customerEmail, status: "succeeded" },
        }),
      )
    }, 2000)
  },

  simulatePaymentFailure: (paymentIntentId: string, customerEmail: string, error: string) => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mock-payment-failed", {
          detail: { paymentIntentId, customerEmail, status: "failed", error },
        }),
      )
    }, 2000)
  },
}
