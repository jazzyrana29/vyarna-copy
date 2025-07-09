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
import { mockApiService } from '../services/mockApiService';

interface ProductSelectorProps {
  visible: boolean;
  onClose: () => void;
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
  const [productPricing, setProductPricing] = useState<
    Record<string, ProductPricing>
  >({});
  const [checkingPricing, setCheckingPricing] = useState(false);

  const products = [
    {
      id: 'single-booster',
      name: 'Vyarna Booster',
      description: 'Single 1g booster',
      originalPrice: 2.0,
      image: require('../assets/images/preorder/value_proposition.png'),
    },
    {
      id: 'booster-box',
      name: 'Vyarna Booster Box',
      description: '150 x 1g boosters',
      originalPrice: 300.0,
      image: require('../assets/images/preorder/box_contents.jpg'),
    },
  ];

  // Check coupon eligibility when email is available
  useEffect(() => {
    if (userDetails?.email && visible) {
      checkCouponEligibility(userDetails.email);
    }
  }, [userDetails?.email, visible]);

  const checkCouponEligibility = async (email: string) => {
    setCheckingPricing(true);
    try {
      const productIds = products.map((p) => p.id);
      const eligibilityData = await mockApiService.checkCouponEligibility(
        email,
        productIds,
      );
      setProductPricing(eligibilityData);
    } catch (error) {
      console.error('Failed to check coupon eligibility:', error);
      // Fallback to original pricing
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

  const handleAddToCart = (product: (typeof products)[0]) => {
    const pricing = productPricing[product.id];

    const cartItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      originalPrice: product.originalPrice,
      currentPrice: pricing?.currentPrice || product.originalPrice,
      couponApplied: pricing?.couponApplied || false,
      couponId: pricing?.couponId,
      savings: pricing?.savings,
      image: product.image,
    };

    addItem(cartItem);
    onClose();
    openCart();
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

          {/* Loading State */}
          {checkingPricing && (
            <View className="flex-row items-center justify-center py-4 mb-4">
              <ActivityIndicator size="small" color="#5AC8FA" />
              <Text className="ml-2 text-secondary">
                Checking available discounts...
              </Text>
            </View>
          )}

          {/* Products */}
          {products.map((product) => {
            const pricing = productPricing[product.id];
            const isLoading = checkingPricing && !pricing;

            return (
              <View
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <View className="flex-row items-center mb-3">
                  <Image
                    source={product.image}
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
                    {isLoading ? (
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
                    className={`px-4 py-2 rounded-lg ${isLoading ? 'bg-gray-300' : 'bg-primary'}`}
                    onPress={() => handleAddToCart(product)}
                    disabled={isLoading}
                  >
                    <Text className="text-white font-semibold">
                      {isLoading ? 'Loading...' : 'Add to Cart'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* View Cart Button */}
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
        </View>
      </View>
    </Modal>
  );
};

export default ProductSelector;
