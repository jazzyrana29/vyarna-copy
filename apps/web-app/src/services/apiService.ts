// Service that switches between mock and real API based on environment
import { mockStripeService } from "./mockStripeService"
import { stripeService } from "./stripeService"

// Use mock service for development, real service for production
const USE_MOCK_API = process.env.NODE_ENV === "development" || !process.env.EXPO_PUBLIC_API_URL

export const apiService = USE_MOCK_API ? mockStripeService : stripeService

// Export for easy switching during development
export { mockStripeService, stripeService }
