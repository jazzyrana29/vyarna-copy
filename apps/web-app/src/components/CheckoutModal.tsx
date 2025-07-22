import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import SignupModal from './SignupModal';
import UserAddressForm from './UserAddressForm';
import StripePaymentForm from './StripePaymentForm';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';
import { formatMoney } from '../utils/currency';

export interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
}

enum Step {
  SIGNUP = 'Account',
  ADDRESS = 'Address',
  PAYMENT = 'Payment',
}

const CheckoutModal: FC<CheckoutModalProps> = ({ visible, onClose }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const hasAddress = useUserStore((s) => s.hasAddress());
  const { items, getTotalCents } = useCartStore();

  const [step, setStep] = useState<Step>(Step.SIGNUP);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    if (visible) {
      if (isLoggedIn) {
        if (hasAddress) {
          setStep(Step.PAYMENT);
          setShowPaymentForm(true);
        } else {
          setStep(Step.ADDRESS);
        }
      } else {
        setStep(Step.SIGNUP);
      }
    }
  }, [visible, isLoggedIn, hasAddress]);

  const breadcrumbs = [Step.SIGNUP, Step.ADDRESS, Step.PAYMENT];

  const renderBreadcrumbs = () => (
    <View className="flex-row justify-center mb-2">
      {breadcrumbs.map((s, idx) => (
        <Text
          key={s}
          className={`mx-1 ${step === s ? 'font-bold text-primary' : 'text-secondary'}`}
        >
          {idx + 1}. {s}
        </Text>
      ))}
    </View>
  );

  const closeAll = () => {
    setShowPaymentForm(false);
    onClose();
  };

  const handleSignupComplete = () => {
    setStep(Step.ADDRESS);
  };

  const handleAddressSaved = () => {
    setStep(Step.PAYMENT);
    setShowPaymentForm(true);
  };

  const renderContent = () => {
    switch (step) {
      case Step.SIGNUP:
        return (
          <SignupModal
            visible={true}
            onComplete={handleSignupComplete}
            onClose={closeAll}
          />
        );
      case Step.ADDRESS:
        return (
          <View className="p-4 flex-1">
            <UserAddressForm onSave={handleAddressSaved} />
          </View>
        );
      case Step.PAYMENT:
        return (
          <View className="flex-1">
            <ScrollView className="flex-1 p-4">
              {items.map((i) => (
                <View key={i.id} className="flex-row justify-between mb-2">
                  <Text>
                    {i.name} x{i.quantity}
                  </Text>
                  <Text>
                    {formatMoney(i.priceCents * i.quantity, i.currency)}
                  </Text>
                </View>
              ))}
              <View className="flex-row justify-between mt-4 border-t pt-2">
                <Text className="font-bold">Total:</Text>
                <Text className="font-bold">
                  {formatMoney(getTotalCents(), items[0]?.currency || 'usd')}
                </Text>
              </View>
            </ScrollView>
            <StripePaymentForm
              visible={showPaymentForm}
              onSuccess={closeAll}
              onCancel={closeAll}
            />
          </View>
        );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        className={`flex-1 ${isMobile ? 'justify-end' : 'justify-center items-center'} bg-black bg-opacity-50`}
      >
        <View
          className={`bg-white rounded-t-xl ${isMobile ? 'w-full max-h-[90%]' : 'rounded-xl w-[90%] max-w-3xl h-[90%]'}`}
        >
          <View className="p-4 border-b">
            <Text className="text-lg font-bold text-center">{step}</Text>
            {renderBreadcrumbs()}
          </View>
          <View className="flex-1">{renderContent()}</View>
          <View className="p-4 border-t">
            {step === Step.SIGNUP && (
              <TouchableOpacity
                onPress={closeAll}
                className="bg-secondary py-3 rounded-lg"
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;
