'use client';

import React, { type FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePaymentStore } from '../store/paymentStore';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import {
  socketConfirmPaymentIntent,
  socketCreatePaymentIntent,
} from '../api/payments';
import {
  confirmEmbeddedPayment,
  createEmbeddedPaymentForm,
} from '../utils/stripe';
import {
  SOCKET_NAMESPACE_FINANCE_PAYMENTS,
  SOCKET_NAMESPACE_FINANCE_WALLET,
} from '../constants/socketEvents';
import type {
  ConfirmPaymentIntentDto,
  CreatePaymentIntentPayloadDto,
  RecordTransactionDto,
} from 'ez-utils';
import { socketRecordTransaction } from '../api/wallet';
import OrderSummary from './OrderSummary';

interface StripePaymentFormProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  onEditAddress: () => void;
}

const StripePaymentForm: FC<StripePaymentFormProps> = ({
  visible,
  onSuccess,
  onCancel,
  onEditAddress,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeElements, setStripeElements] = useState<any>(null);
  const [paymentElement, setPaymentElement] = useState<any>(null);
  const [stripe, setStripe] = useState<any>(null);
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [isInitializingStripe, setIsInitializingStripe] = useState(false);
  const paymentElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paymentElement) {
      // keep linter happy by referencing paymentElement
      console.debug('Payment element ready');
    }
  }, [paymentElement]);

  const { items, resetCart, getTotalCents } = useCartStore();
  const userDetails = useUserStore((s) => s.userDetails);
  const primary = userDetails?.addresses?.find((a) => a.isPrimary);
  const { setProcessing, setPaymentStatus, setPaymentError } =
    usePaymentStore();

  // Create payment intent when component becomes visible
  useEffect(() => {
    if (visible && items.length > 0 && userDetails) {
      createPaymentIntent();
    }
  }, [visible, items, userDetails]);

  // Initialize Stripe Elements when client secret is available
  useEffect(() => {
    if (clientSecret && !stripeElements && !isInitializingStripe) {
      initializeStripeElements();
    }
  }, [clientSecret, stripeElements, isInitializingStripe]);

  const createPaymentIntent = async () => {
    if (!userDetails) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload: CreatePaymentIntentPayloadDto = {
        items: items.map((i) => ({
          id: i.id,
          quantity: i.quantity,
          priceCents: i.priceCents,
          currency: i.currency,
        })),
        customerDetails: {
          firstName: userDetails.nameFirst,
          lastName: userDetails.nameLastFirst,
          email: userDetails?.email!,
          address: {
            street: primary?.addressLine1 || '',
            city: primary?.city || '',
            state: primary?.state || '',
            zip: primary?.postalCode || '',
            country: primary?.country || '',
          },
        },
      };

      const response = await socketCreatePaymentIntent(
        SOCKET_NAMESPACE_FINANCE_PAYMENTS,
        payload,
      );

      setClientSecret(response.clientSecret);
      setPaymentIntentId(response.paymentIntentId);
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      setError(error.message || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeStripeElements = async () => {
    if (!clientSecret || isInitializingStripe) return;

    setIsInitializingStripe(true);
    setError(null);

    try {
      const { elements, paymentElement, stripe } =
        await createEmbeddedPaymentForm(clientSecret);

      setStripeElements(elements);
      setPaymentElement(paymentElement);
      setStripe(stripe);

      // Mount the payment element to the DOM (web only)
      if (
        typeof window !== 'undefined' &&
        paymentElement &&
        paymentElementRef.current
      ) {
        try {
          console.log('Mounting payment element to DOM...');
          const container = paymentElementRef.current;
          if (container.children.length > 0) {
            container.innerHTML = '';
          }
          await paymentElement.mount(container);
          setIsStripeReady(true);
          console.log('Stripe Elements mounted successfully');
        } catch (mountError) {
          console.error('Failed to mount Stripe Elements:', mountError);
          setError('Failed to load payment form - please try again');
        }
      } else {
        // For non-web platforms, mark as ready for simulation
        setIsStripeReady(true);
        console.log('Non-web platform detected - using simulation mode');
      }
    } catch (error: any) {
      console.error('Failed to initialize Stripe Elements:', error);
      setError(`Failed to load payment form: ${error.message}`);
    } finally {
      setIsInitializingStripe(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!clientSecret || !paymentIntentId || !userDetails) return;

    setProcessing(true);
    setPaymentStatus('processing');
    setPaymentError(null);

    try {
      if (
        stripe &&
        stripeElements &&
        typeof window !== 'undefined' &&
        isStripeReady
      ) {
        console.log('Processing real Stripe payment...');

        // Real Stripe payment processing
        const returnUrl = `${window.location.origin}/payment-success`;
        const result = await confirmEmbeddedPayment(
          stripe,
          stripeElements,
          returnUrl,
        );

        if (result.error) {
          throw new Error(result.error.message || 'Payment failed');
        }

        if (
          'paymentIntent' in result &&
          result?.paymentIntent?.status === 'succeeded'
        ) {
          // Confirm with backend
          const confirmDto: ConfirmPaymentIntentDto = {
            paymentIntentId,
            paymentMethodId: result?.paymentIntent?.payment_method as string,
            receiptEmail: userDetails.email,
            returnUrl,
          };
          const confirmResponse = await socketConfirmPaymentIntent(
            SOCKET_NAMESPACE_FINANCE_PAYMENTS,
            confirmDto,
          );

          if (confirmResponse.success) {
            try {
              const txDto: RecordTransactionDto = {
                accountId: userDetails.personId ?? '',
                amountCents: getTotalCents(),
                transactionType: 'ADJUSTMENT',
                relatedType: 'PaymentIntent',
                relatedId: paymentIntentId,
                description: 'Checkout payment',
              };
              await socketRecordTransaction(
                SOCKET_NAMESPACE_FINANCE_WALLET,
                txDto,
              );
            } catch (recErr) {
              console.error('Failed to record transaction:', recErr);
            }

            setPaymentStatus('succeeded');
            resetCart();
            onSuccess();

            Alert.alert(
              'Payment Successful!',
              'Your order has been confirmed. You will receive an email confirmation shortly.',
            );
          } else {
            throw new Error('Payment confirmation failed');
          }
        }
      } else {
        console.log('Using payment simulation mode...');

        // Fallback to simulation for non-web platforms or when Stripe isn't available
        Alert.alert(
          'Payment Simulation',
          `Payment Intent: ${paymentIntentId}\nTotal: $${(getTotalCents() / 100).toFixed(2)}\n\nSimulating payment processing...`,
          [
            {
              text: 'Simulate Success',
              onPress: async () => {
                try {
                  // Simulate processing delay
                  await new Promise((resolve) => setTimeout(resolve, 2000));

                  const confirmDto: ConfirmPaymentIntentDto = {
                    paymentIntentId,
                    paymentMethodId: 'simulated',
                    receiptEmail: userDetails.email,
                  };
                  const confirmResponse = await socketConfirmPaymentIntent(
                    SOCKET_NAMESPACE_FINANCE_PAYMENTS,
                    confirmDto,
                  );

                  if (confirmResponse.success) {
                    try {
                      const txDto: RecordTransactionDto = {
                        accountId: userDetails.personId ?? '',
                        amountCents: getTotalCents(),
                        transactionType: 'ADJUSTMENT',
                        relatedType: 'PaymentIntent',
                        relatedId: paymentIntentId,
                        description: 'Checkout payment',
                      };
                      await socketRecordTransaction(
                        SOCKET_NAMESPACE_FINANCE_WALLET,
                        txDto,
                      );
                    } catch (recErr) {
                      console.error('Failed to record transaction:', recErr);
                    }

                    setPaymentStatus('succeeded');
                    resetCart();
                    onSuccess();

                    Alert.alert(
                      'Payment Successful!',
                      'Your order has been confirmed.',
                    );
                  } else {
                    throw new Error('Payment confirmation failed');
                  }
                } catch (error: any) {
                  setPaymentStatus('failed');
                  setPaymentError(
                    error.message || 'Payment confirmation failed',
                  );
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
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      setProcessing(false);
      setPaymentStatus('failed');
      setPaymentError(error.message || 'Payment failed');
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsStripeReady(false);
    setStripeElements(null);
    setPaymentElement(null);
    setStripe(null);

    if (clientSecret) {
      initializeStripeElements();
    } else {
      createPaymentIntent();
    }
  };

  // Cleanup mounted Stripe element on unmount or when a new element is created
  useEffect(() => {
    return () => {
      if (
        typeof window !== 'undefined' &&
        paymentElement &&
        paymentElementRef.current &&
        paymentElementRef.current.firstChild
      ) {
        try {
          paymentElement.unmount();
          paymentElementRef.current.innerHTML = '';
        } catch (cleanupError) {
          console.error('Error unmounting Stripe element:', cleanupError);
        }
      }
    };
  }, [paymentElement]);

  if (!visible) return null;

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <OrderSummary />
        <Text className="text-xl font-bold text-primary mb-4">
          Shipping Address
        </Text>

        {/* Shipping Address */}
        {primary && (
          <View className="bg-gray-50 p-4 rounded-lg mb-4 flex-row justify-between">
            <View className="flex-1 mr-2">
              <Text className="text-sm text-neutralText">
                {primary.addressLine1}
              </Text>
              {primary.addressLine2 ? (
                <Text className="text-sm text-neutralText">
                  {primary.addressLine2}
                </Text>
              ) : null}
              <Text className="text-sm text-neutralText">
                {primary.city}, {primary.state} {primary.postalCode}
              </Text>
              <Text className="text-sm text-neutralText">
                {primary.country}
              </Text>
            </View>
            <TouchableOpacity onPress={onEditAddress} className="ml-2">
              <Text className="text-primary text-lg">✎</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Error Display */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-800 font-semibold">Payment Error</Text>
            <Text className="text-red-700 text-sm mt-1">{error}</Text>
            <TouchableOpacity
              className="mt-2 bg-red-600 px-3 py-1 rounded"
              onPress={handleRetry}
            >
              <Text className="text-white text-sm font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading State */}
        {(isLoading || isInitializingStripe) && (
          <View className="flex-row items-center justify-center py-8">
            <ActivityIndicator size="large" color="#5AC8FA" />
            <Text className="ml-3 text-secondary">
              {isLoading
                ? 'Creating payment intent...'
                : 'Loading payment form...'}
            </Text>
          </View>
        )}

        {/* Stripe Elements Payment Form */}
        {clientSecret && !isLoading && !isInitializingStripe && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-primary mb-4">
              Payment Details
            </Text>

            {typeof window !== 'undefined' ? (
              <div className="mb-4">
                {!isStripeReady && (
                  <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <div style={{ marginBottom: '8px' }}>
                      Loading payment form...
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      Please wait while we initialize Stripe Elements
                    </div>
                  </div>
                )}
                <div
                  ref={paymentElementRef}
                  style={{
                    minHeight: '200px',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                  }}
                />
              </div>
            ) : (
              <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <Text className="text-blue-800 font-semibold mb-2">
                  💳 Payment Simulation Mode
                </Text>
                <Text className="text-blue-700 text-sm">
                  Real Stripe payment form is available on web platforms. On
                  mobile, we'll simulate the payment process for demo purposes.
                </Text>
              </View>
            )}

            <View className="mt-4" />
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-6 border-t border-gray-200">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg"
            onPress={onCancel}
            disabled={isLoading || isInitializingStripe}
          >
            <Text className="text-neutralText font-semibold text-center">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              clientSecret && !isLoading && !isInitializingStripe && !error
                ? 'bg-accent'
                : 'bg-gray-400'
            }`}
            onPress={handlePaymentSubmit}
            disabled={
              !clientSecret || isLoading || isInitializingStripe || !!error
            }
          >
            <Text className="text-white font-bold text-center">
              {isLoading || isInitializingStripe
                ? 'Loading...'
                : `Pay $${(getTotalCents() / 100).toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StripePaymentForm;
