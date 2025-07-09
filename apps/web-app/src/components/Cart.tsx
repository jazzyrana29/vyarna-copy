'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { usePaymentStore } from '../store/paymentStore';
import { mockApiService } from '../services/mockApiService';

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
    getTotal,
    getOriginalTotal,
    getTotalSavings,
  } = useCartStore();
  const { userDetails, hasUserDetails } = useUserStore();
  const {
    isProcessing,
    paymentStatus,
    paymentError,
    setProcessing,
    setPaymentStatus,
    setPaymentError,
    resetPayment,
  } = usePaymentStore();

  const [showUserDetailsNeeded, setShowUserDetailsNeeded] = useState(false);

  // Listen for mock WebSocket events
  useEffect(() => {
    const handlePaymentCompleted = (event: any) => {
      const { status, error } = event.detail;
      setProcessing(false);

      if (status === 'succeeded') {
        setPaymentStatus('succeeded');
        resetCart();
        Alert.alert(
          'Payment Successful!',
          'Your order has been confirmed. You will receive an email confirmation shortly.',
          [{ text: 'OK', onPress: onClose }],
        );
      } else {
        setPaymentStatus('failed');
        setPaymentError(error || 'Payment failed');
      }
    };

    const handlePaymentFailed = (event: any) => {
      const { error } = event.detail;
      setProcessing(false);
      setPaymentStatus('failed');
      setPaymentError(error || 'Payment failed');
    };

    window.addEventListener('mock-payment-completed', handlePaymentCompleted);
    window.addEventListener('mock-payment-failed', handlePaymentFailed);

    return () => {
      window.removeEventListener(
        'mock-payment-completed',
        handlePaymentCompleted,
      );
      window.removeEventListener('mock-payment-failed', handlePaymentFailed);
    };
  }, []);

  const handleProceedToPayment = () => {
    if (!hasUserDetails()) {
      setShowUserDetailsNeeded(true);
      return;
    }

    initiatePayment();
  };

  const initiatePayment = async () => {
    if (!userDetails) return;

    try {
      setProcessing(true);
      setPaymentStatus('processing');
      setPaymentError(null);

      // Create payment session with auto-applied coupons
      const sessionData = await mockApiService.createPaymentSession(
        items,
        userDetails,
      );

      console.log('Payment session created:', sessionData);

      // In a real implementation, you would redirect to Stripe Checkout
      // For now, we'll simulate the payment process
      Alert.alert(
        'Redirecting to Payment',
        `Session ID: ${sessionData.sessionId}\n\nIn a real app, you would be redirected to Stripe Checkout.`,
        [
          {
            text: 'Simulate Success',
            onPress: () => {
              // Simulate successful payment
              setTimeout(() => {
                window.dispatchEvent(
                  new CustomEvent('mock-payment-completed', {
                    detail: {
                      sessionId: sessionData.sessionId,
                      customerEmail: userDetails.email,
                      status: 'succeeded',
                    },
                  }),
                );
              }, 2000);
            },
          },
          {
            text: 'Simulate Failure',
            style: 'destructive',
            onPress: () => {
              // Simulate failed payment
              setTimeout(() => {
                window.dispatchEvent(
                  new CustomEvent('mock-payment-failed', {
                    detail: {
                      sessionId: sessionData.sessionId,
                      customerEmail: userDetails.email,
                      status: 'failed',
                      error:
                        'Your card was declined. Please try a different payment method.',
                    },
                  }),
                );
              }, 2000);
            },
          },
        ],
      );
    } catch (error: any) {
      setProcessing(false);
      setPaymentStatus('failed');
      setPaymentError(error.message || 'Failed to create payment session');
    }
  };

  const handleBackToProducts = () => {
    onClose(); // Close cart first
    onBackToProducts(); // Then open product selector
  };

  const handleRetryPayment = () => {
    resetPayment();
    initiatePayment();
  };

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
              <TouchableOpacity className="mt-2" onPress={handleRetryPayment}>
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
                        {item.couponApplied ? (
                          <View>
                            <Text className="text-xs text-secondary line-through">
                              ${item.originalPrice.toFixed(2)} each
                            </Text>
                            <Text className="text-sm font-bold text-green-600">
                              ${item.currentPrice.toFixed(2)} each
                            </Text>
                            <Text className="text-xs text-green-600">
                              Presale discount applied!
                            </Text>
                          </View>
                        ) : (
                          <Text className="text-sm font-bold text-primary">
                            ${item.currentPrice.toFixed(2)} each
                          </Text>
                        )}
                      </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={isProcessing}
                        >
                          <Text className="text-lg font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="mx-3 text-base font-semibold">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isProcessing}
                        >
                          <Text className="text-lg font-bold">+</Text>
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row items-center">
                        <Text className="text-base font-bold text-primary mr-3">
                          ${(item.currentPrice * item.quantity).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          className="bg-red-100 px-2 py-1 rounded"
                          onPress={() => removeItem(item.id)}
                          disabled={isProcessing}
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
                {getTotalSavings() > 0 && (
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm text-secondary">
                      Original Total:
                    </Text>
                    <Text className="text-sm text-secondary line-through">
                      ${getOriginalTotal().toFixed(2)}
                    </Text>
                  </View>
                )}

                {getTotalSavings() > 0 && (
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm text-green-600">
                      Presale Savings:
                    </Text>
                    <Text className="text-sm text-green-600 font-semibold">
                      -${getTotalSavings().toFixed(2)}
                    </Text>
                  </View>
                )}

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold text-neutralText">
                    Total:
                  </Text>
                  <Text className="text-xl font-bold text-primary">
                    ${getTotal().toFixed(2)}
                  </Text>
                </View>

                <Text className="text-sm text-secondary text-center">
                  {items.reduce((count, item) => count + item.quantity, 0)}{' '}
                  item(s) in cart
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
                  onPress={resetCart}
                  disabled={isProcessing}
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
