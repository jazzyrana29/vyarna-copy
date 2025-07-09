'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { wsApiService } from '../services/websocketApiService';
import type {
  CouponEligibilityResponsePayload,
  ProductsResponsePayload,
} from '../constants/websocket-messages';

interface ProductSelectorProps {
  visible: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  originalPrice: number;
  discountedPrice?: number;
  stripePriceId: string;
  couponId?: string;
  couponActive: boolean;
  savings?: number;
  metadata: Record<string, string>;
}

interface ProductPricing {
  eligible: boolean;
  currentPrice: number;
  originalPrice: number;
  couponApplied: boolean;
  couponId?: string;
  savings?: number;
  reason?: string;
}

const ProductSelector: FC<ProductSelectorProps> = ({ visible, onClose }) => {
  const { addItem, openCart } = useCartStore();
  const { userDetails } = useUserStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [productPricing, setProductPricing] = useState<
    Record<string, ProductPricing>
  >({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [checkingPricing, setCheckingPricing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load products when modal opens
  useEffect(() => {
    if (visible) {
      loadProducts();
    }
  }, [visible]);

  // Check coupon eligibility when email is available
  useEffect(() => {
    if (userDetails?.email && products.length > 0 && visible) {
      checkCouponEligibility(userDetails.email);
    }
  }, [userDetails?.email, products.length, visible]);

  const loadProducts = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      const response: ProductsResponsePayload =
        await wsApiService.getProducts();
      if (response.success) {
        setProducts(response.products);
      } else {
        throw new Error('Failed to load products');
      }
    } catch (error: any) {
      console.error('Failed to load products:', error);
      setError(error.message || 'Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  };

  const checkCouponEligibility = async (email: string) => {
    setCheckingPricing(true);
    try {
      const productIds = products.map((p) => p.id);
      const response: CouponEligibilityResponsePayload =
        await wsApiService.checkCouponEligibility(email, productIds);

      if (response.success) {
        setProductPricing(response.eligibility);
      } else {
        throw new Error('Failed to check coupon eligibility');
      }
    } catch (error) {
      console.error('Failed to check coupon eligibility:', error);
      // Fallback to original pricing from products
      const fallbackPricing: Record<string, ProductPricing> = {};
      products.forEach((product) => {
        fallbackPricing[product.id] = {
          eligible: false,
          currentPrice: product.originalPrice,
          originalPrice: product.originalPrice,
          couponApplied: false,
          reason: 'Unable to check discount eligibility',
        };
      });
      setProductPricing(fallbackPricing);
    } finally {
      setCheckingPricing(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    const pricing = productPricing[product.id];

    const cartItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      originalPrice: product.originalPrice,
      currentPrice: pricing?.currentPrice || product.originalPrice,
      stripePriceId: product.stripePriceId,
      couponApplied: pricing?.couponApplied || false,
      couponId: pricing?.couponId || product.couponId,
      savings: pricing?.savings,
      image: product.images[0]
        ? { uri: product.images[0] }
        : require('../assets/images/preorder/value_proposition.png'),
    };

    addItem(cartItem);
    onClose();
    openCart();
  };

  const handleRetryLoad = () => {
    loadProducts();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-primary">
              Choose Your Pack
            </Text>
            <Pressable onPress={onClose}>
              <Text className="text-2xl text-secondary">×</Text>
            </Pressable>
          </View>

          {/* User Email Display */}
          {userDetails?.email && (
            <View className="bg-blue-50 p-3 rounded-lg mb-4">
              <Text className="text-sm text-blue-800">
                Checking discounts for: {userDetails.email}
              </Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <Text className="text-red-800 font-semibold mb-2">
                Failed to Load Products
              </Text>
              <Text className="text-red-700 text-sm mb-3">{error}</Text>
              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded"
                onPress={handleRetryLoad}
              >
                <Text className="text-white font-semibold text-center">
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Loading State */}
          {loadingProducts && (
            <View className="flex-row items-center justify-center py-8">
              <ActivityIndicator size="large" color="#5AC8FA" />
              <Text className="ml-3 text-secondary">
                Loading products via WebSocket...
              </Text>
            </View>
          )}

          {/* Pricing Check Loading */}
          {checkingPricing && !loadingProducts && (
            <View className="flex-row items-center justify-center py-4 mb-4">
              <ActivityIndicator size="small" color="#5AC8FA" />
              <Text className="ml-2 text-secondary">
                Checking available discounts...
              </Text>
            </View>
          )}

          {/* Products */}
          {!loadingProducts &&
            !error &&
            products.map((product) => {
              const pricing = productPricing[product.id];
              const isCheckingPrice = checkingPricing && !pricing;

              return (
                <View
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 mb-4"
                >
                  <View className="flex-row items-center mb-3">
                    <Image
                      source={
                        product.images[0]
                          ? { uri: product.images[0] }
                          : require('../assets/images/preorder/value_proposition.png')
                      }
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    />
                    <View className="flex-1 ml-3">
                      <Text className="text-lg font-semibold text-neutralText">
                        {product.name}
                      </Text>
                      <Text className="text-sm text-secondary">
                        {product.description}
                      </Text>

                      {/* Presale Badge */}
                      {pricing?.couponApplied && (
                        <View className="bg-green-100 px-2 py-1 rounded mt-1 self-start">
                          <Text className="text-green-800 text-xs font-semibold">
                            PRESALE DISCOUNT APPLIED
                          </Text>
                        </View>
                      )}

                      {/* No Discount Reason */}
                      {pricing && !pricing.couponApplied && pricing.reason && (
                        <View className="bg-gray-100 px-2 py-1 rounded mt-1 self-start">
                          <Text className="text-gray-600 text-xs">
                            {pricing.reason}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View>
                      {isCheckingPrice ? (
                        <View className="flex-row items-center">
                          <ActivityIndicator size="small" color="#5AC8FA" />
                          <Text className="ml-2 text-sm text-secondary">
                            Checking price...
                          </Text>
                        </View>
                      ) : pricing?.couponApplied ? (
                        <>
                          <Text className="text-sm text-secondary line-through">
                            ${pricing.originalPrice.toFixed(2)}
                          </Text>
                          <Text className="text-lg font-bold text-green-600">
                            ${pricing.currentPrice.toFixed(2)}
                          </Text>
                          <Text className="text-xs text-green-600">
                            Save ${pricing.savings?.toFixed(2)}!
                          </Text>
                        </>
                      ) : (
                        <Text className="text-lg font-bold text-primary">
                          $
                          {(
                            pricing?.currentPrice || product.originalPrice
                          ).toFixed(2)}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      className={`px-4 py-2 rounded-lg ${isCheckingPrice ? 'bg-gray-300' : 'bg-primary'}`}
                      onPress={() => handleAddToCart(product)}
                      disabled={isCheckingPrice}
                    >
                      <Text className="text-white font-semibold">
                        {isCheckingPrice ? 'Loading...' : 'Add to Cart'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

          {/* View Cart Button */}
          {!loadingProducts && !error && (
            <TouchableOpacity
              className="bg-secondary w-full py-3 rounded-lg mt-2"
              onPress={() => {
                onClose();
                openCart();
              }}
            >
              <Text className="text-white font-bold text-center text-base">
                View Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ProductSelector;
