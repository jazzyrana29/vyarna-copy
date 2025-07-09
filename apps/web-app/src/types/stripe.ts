// Types for Stripe data
export interface StripeProduct {
  id: string
  name: string
  description: string | null
  images: string[]
  metadata: Record<string, string>
  active: boolean
  created: number
  updated: number
}

export interface StripePrice {
  id: string
  product: string
  active: boolean
  currency: string
  unit_amount: number | null
  type: "one_time" | "recurring"
  metadata: Record<string, string>
}

export interface StripeCoupon {
  id: string
  name: string | null
  percent_off: number | null
  amount_off: number | null
  currency: string | null
  duration: "forever" | "once" | "repeating"
  max_redemptions: number | null
  times_redeemed: number
  valid: boolean
  redeem_by: number | null
}

export interface ProductWithPricing {
  id: string
  name: string
  description: string
  images: string[]
  originalPrice: number
  discountedPrice?: number
  stripePriceId: string
  couponId?: string
  couponActive: boolean
  savings?: number
  metadata: Record<string, string>
}
