'use client';

import type { FC } from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import {
  socketAddCartItem,
  socketRemoveCartItem,
} from '../hooks/useSalesCommerce';
import { useUserStore } from '../store/userStore';
import { usePaymentStore } from '../store/paymentStore';
import { useLoadingStore } from '../store/loadingStore';
import { formatMoney } from '../utils/currency';

interface CartProps {
  visible: boolean;
  onClose: () => void;
  onBackToProducts: () => void;
}

const Cart: FC<CartProps> = ({ visible, onClose, onBackToProducts }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    resetCart,
    getItemCount,
    getTotalCents,
    cartId,
  } = useCartStore();

  const hasUserDetails = useUserStore((s) => s.hasUserDetails);
  const { isProcessing, paymentError, resetPayment } = usePaymentStore();
  const isLoading = useLoadingStore((s) => s.isLoading);

  const showAlert = (title: string, message: string): void => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showUserDetailsNeeded, setShowUserDetailsNeeded] = useState(false);

  const handleProceedToPayment = () => {
    if (!hasUserDetails()) {
      setShowUserDetailsNeeded(true);
      return;
    }

    setShowPaymentForm(true);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    resetPayment();
  };

  const handleBackToProducts = () => {
    onClose(); // Close cart first
    onBackToProducts(); // Then open product selector
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    const existing = items.find((i) => i.id === productId);
    if (!cartId) {
      if (newQuantity > 0) updateQuantity(productId, newQuantity);
      else if (existing) removeItem(productId);
      return;
    }
    try {
      if (newQuantity > 0) {
        await socketAddCartItem('sales-commerce', {
          cartId,
          productId,
          quantity: newQuantity,
        });
        updateQuantity(productId, newQuantity);
      } else if (existing) {
        await socketRemoveCartItem('sales-commerce', { cartId, productId });
        removeItem(productId);
      }
    } catch (e: any) {
      console.error('Quantity change failed', e);
      showAlert('Cart Error', e.message || 'Quantity change failed');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!cartId) {
      removeItem(productId);
      return;
    }
    try {
      await socketRemoveCartItem('sales-commerce', { cartId, productId });
      removeItem(productId);
    } catch (e: any) {
      console.error('Remove item failed', e);
      showAlert('Cart Error', e.message || 'Failed to remove item');
    }
  };

  const handleResetCart = async () => {
    const ids = items.map((i) => i.id);
    if (!cartId) {
      resetCart();
      return;
    }
    try {
      await Promise.all(
        ids.map((pid) =>
          socketRemoveCartItem('sales-commerce', { cartId, productId: pid }),
        ),
      );
      resetCart();
    } catch (e: any) {
      console.error('Reset cart failed', e);
      showAlert('Cart Error', e.message || 'Failed to reset cart');
    }
  };

  // Show payment form if requested
  if (showPaymentForm) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handlePaymentCancel}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
          {/*<StripePaymentForm*/}
          {/*  visible={showPaymentForm}*/}
          {/*  onSuccess={handlePaymentSuccess}*/}
          {/*  onCancel={handlePaymentCancel}*/}
          {/*/>*/}
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md max-h-[80%]">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={handleBackToProducts} className="p-1">
              <Text className="text-2xl text-primary">←</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-primary">Your Cart</Text>
            <Pressable onPress={onClose} className="p-1">
              <Text className="text-2xl text-secondary">×</Text>
            </Pressable>
          </View>

          {/* User Details Needed Warning */}
          {showUserDetailsNeeded && (
            <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <Text className="text-yellow-800 font-semibold mb-1">
                Details Required
              </Text>
              <Text className="text-yellow-700 text-sm">
                Please go back and enter your details to proceed with checkout.
              </Text>
              <TouchableOpacity
                className="mt-2"
                onPress={() => {
                  setShowUserDetailsNeeded(false);
                  handleBackToProducts();
                }}
              >
                <Text className="text-yellow-800 font-semibold underline">
                  Enter Details
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Payment Error */}
          {paymentError && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <Text className="text-red-800 font-semibold mb-1">
                Payment Failed
              </Text>
              <Text className="text-red-700 text-sm">{paymentError}</Text>
              <TouchableOpacity
                className="mt-2"
                onPress={() => setShowPaymentForm(true)}
              >
                <Text className="text-red-800 font-semibold underline">
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {items.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-lg text-secondary mb-4">
                Your cart is empty
              </Text>
              <Text className="text-sm text-neutralText text-center mb-6">
                Add some Vyarna products to get started!
              </Text>
              <TouchableOpacity
                className="bg-primary px-6 py-3 rounded-lg"
                onPress={handleBackToProducts}
              >
                <Text className="text-white font-semibold">
                  Browse Products
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollView className="max-h-64 mb-4">
                {items.map((item) => (
                  <View
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <View className="flex-row items-center mb-3">
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                      />
                      <View className="flex-1 ml-3">
                        <Text className="text-base font-semibold text-neutralText">
                          {item.name}
                        </Text>
                        <Text className="text-xs text-secondary">
                          {item.description}
                        </Text>

                        {/* Price Display */}
                        {/*{item.couponApplied ? (*/}
                        {/*  <View>*/}
                        {/*    <Text className="text-xs text-secondary line-through">*/}
                        {/*      ${item.originalPrice.toFixed(2)} each*/}
                        {/*    </Text>*/}
                        {/*    <Text className="text-sm font-bold text-green-600">*/}
                        {/*      ${item.currentPrice.toFixed(2)} each*/}
                        {/*    </Text>*/}
                        {/*    <Text className="text-xs text-green-600">*/}
                        {/*      Presale discount applied!*/}
                        {/*    </Text>*/}
                        {/*  </View>*/}
                        {/*) : (*/}
                        {/*  <Text className="text-sm font-bold text-primary">*/}
                        {/*    ${item.currentPrice.toFixed(2)} each*/}
                        {/*  </Text>*/}
                        {/*)}*/}
                      </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={isProcessing || isLoading}
                        >
                          <Text className="text-lg font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="mx-3 text-base font-semibold">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={isProcessing || isLoading}
                        >
                          <Text className="text-lg font-bold">+</Text>
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row items-center">
                        <Text className="text-base font-bold text-primary mr-3">
                          {formatMoney(item.priceCents * item.quantity, item.currency)}
                        </Text>
                        <TouchableOpacity
                          className="bg-red-100 px-2 py-1 rounded"
                          onPress={() => handleRemoveItem(item.id)}
                          disabled={isProcessing || isLoading}
                        >
                          <Text className="text-red-600 text-xs">Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Cart Summary */}
              <View className="border-t border-gray-200 pt-4 mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold text-neutralText">Total:</Text>
                  <Text className="text-xl font-bold text-primary">
                    {formatMoney(getTotalCents(), items[0]?.currency || 'usd')}
                  </Text>
                </View>
                <Text className="text-sm text-secondary text-center">
                  {getItemCount()} item(s) in cart
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="space-y-3">
                <TouchableOpacity
                  className={`w-full py-3 rounded-lg ${isProcessing ? 'bg-gray-400' : 'bg-accent'}`}
                  onPress={handleProceedToPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <View className="flex-row justify-center items-center">
                      <ActivityIndicator size="small" color="white" />
                      <Text className="text-white font-bold text-center ml-2">
                        Processing...
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-white font-bold text-center text-base">
                      Proceed to Payment
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-200 w-full py-3 rounded-lg"
                  onPress={handleResetCart}
                  disabled={isProcessing || isLoading}
                >
                  <Text className="text-neutralText font-semibold text-center text-base">
                    Reset Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Cart;
