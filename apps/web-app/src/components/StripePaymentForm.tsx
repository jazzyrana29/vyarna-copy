'use client';

import { type FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePaymentStore } from '../store/paymentStore';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { wsApiService } from '../services/websocketApiService';
import type { PaymentIntentCreatedPayload } from '../constants/websocket-messages';

interface StripePaymentFormProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripePaymentForm: FC<StripePaymentFormProps> = ({
  visible,
  onSuccess,
  onCancel,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { items, resetCart, getTotal, getTotalSavings } = useCartStore();
  const { userDetails } = useUserStore();
  const { setProcessing, setPaymentStatus, setPaymentError } =
    usePaymentStore();

  // Create payment intent when component becomes visible
  useEffect(() => {
    if (visible && items.length > 0 && userDetails) {
      createPaymentIntent();
    }
  }, [visible, items, userDetails]);

  const createPaymentIntent = async () => {
    if (!userDetails) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: PaymentIntentCreatedPayload =
        await wsApiService.createPaymentIntent(items, userDetails);

      if (response.success) {
        setClientSecret(response.clientSecret);
        setPaymentIntentId(response.paymentIntentId);

        console.log('Payment Intent Created via WebSocket:', {
          paymentIntentId: response.paymentIntentId,
          totalAmount: response.totalAmount,
          appliedCoupons: response.appliedCoupons,
        });
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      setError(error.message || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!clientSecret || !paymentIntentId || !userDetails) return;

    setProcessing(true);
    setPaymentStatus('processing');
    setPaymentError(null);

    try {
      // In a real implementation, you would use Stripe Elements here
      // For now, we'll simulate the payment process

      Alert.alert(
        'WebSocket Stripe Payment Simulation',
        `Payment Intent: ${paymentIntentId}\nTotal: $${getTotal().toFixed(2)}\n\nPayment processing via WebSocket connection.\n\nIn a real app, Stripe Elements would handle the card input and payment processing.`,
        [
          {
            text: 'Simulate Success',
            onPress: async () => {
              try {
                // Simulate payment processing delay
                await new Promise((resolve) => setTimeout(resolve, 2000));

                // Confirm payment with backend via WebSocket
                const confirmResponse = await wsApiService.confirmPayment(
                  paymentIntentId,
                  userDetails.email,
                );

                if (confirmResponse.success) {
                  setPaymentStatus('succeeded');
                  resetCart();
                  onSuccess();

                  Alert.alert(
                    'Payment Successful!',
                    'Your order has been confirmed via WebSocket. You will receive an email confirmation shortly.',
                  );
                } else {
                  throw new Error('Payment confirmation failed');
                }
              } catch (error: any) {
                setPaymentStatus('failed');
                setPaymentError(error.message || 'Payment confirmation failed');
              } finally {
                setProcessing(false);
              }
            },
          },
          {
            text: 'Simulate Failure',
            style: 'destructive',
            onPress: () => {
              setProcessing(false);
              setPaymentStatus('failed');
              setPaymentError(
                'Your card was declined. Please try a different payment method.',
              );
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setProcessing(false);
              setPaymentStatus('idle');
            },
          },
        ],
      );
    } catch (error: any) {
      setProcessing(false);
      setPaymentStatus('failed');
      setPaymentError(error.message || 'Payment failed');
    }
  };

  if (!visible) return null;

  return (
    <View className="bg-white p-6 rounded-lg shadow-lg">
      <Text className="text-xl font-bold text-primary mb-4">
        Complete Your Payment (WebSocket)
      </Text>

      {/* Order Summary */}
      <View className="bg-gray-50 p-4 rounded-lg mb-6">
        <Text className="font-semibold text-neutralText mb-2">
          Order Summary
        </Text>
        {items.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center mb-1"
          >
            <Text className="text-sm text-secondary">
              {item.name} x{item.quantity}
            </Text>
            <Text className="text-sm font-semibold">
              ${(item.currentPrice * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        {getTotalSavings() > 0 && (
          <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-200">
            <Text className="text-sm text-green-600">Total Savings:</Text>
            <Text className="text-sm font-semibold text-green-600">
              -${getTotalSavings().toFixed(2)}
            </Text>
          </View>
        )}

        <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-200">
          <Text className="font-bold text-neutralText">Total:</Text>
          <Text className="font-bold text-primary text-lg">
            ${getTotal().toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Error Display */}
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <Text className="text-red-800 font-semibold">Payment Error</Text>
          <Text className="text-red-700 text-sm mt-1">{error}</Text>
        </View>
      )}

      {/* Loading State */}
      {isLoading && (
        <View className="flex-row items-center justify-center py-8">
          <ActivityIndicator size="large" color="#5AC8FA" />
          <Text className="ml-3 text-secondary">
            Initializing payment via WebSocket...
          </Text>
        </View>
      )}

      {/* Payment Form Placeholder */}
      {clientSecret && !isLoading && (
        <View className="mb-6">
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <Text className="text-blue-800 font-semibold mb-2">
              🔗 WebSocket + Stripe Elements Integration
            </Text>
            <Text className="text-blue-700 text-sm">
              Payment processing via WebSocket connection. In production, this
              area would contain:
            </Text>
            <Text className="text-blue-700 text-sm mt-2">
              • Stripe Elements card input form{'\n'}• Real-time validation via
              WebSocket{'\n'}• Secure PCI-compliant processing{'\n'}• Live
              payment status updates
            </Text>
          </View>

          <View className="bg-gray-100 p-4 rounded-lg">
            <Text className="text-xs text-gray-600 mb-2">
              Payment Intent ID (via WebSocket):
            </Text>
            <Text className="text-xs font-mono text-gray-800">
              {paymentIntentId}
            </Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row space-x-3">
        <TouchableOpacity
          className="flex-1 bg-gray-200 py-3 rounded-lg"
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text className="text-neutralText font-semibold text-center">
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg ${clientSecret && !isLoading ? 'bg-accent' : 'bg-gray-400'}`}
          onPress={handlePaymentSubmit}
          disabled={!clientSecret || isLoading}
        >
          <Text className="text-white font-bold text-center">
            {isLoading ? 'Loading...' : `Pay $${getTotal().toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StripePaymentForm;
