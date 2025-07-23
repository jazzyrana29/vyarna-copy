import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
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
  ACCOUNT = 'Account',
  ADDRESS = 'Address',
  PAYMENT = 'Payment',
}

const CheckoutModal: FC<CheckoutModalProps> = ({ visible, onClose }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const hasAddress = useUserStore((s) => s.hasAddress());
  const { items, getTotalCents } = useCartStore();

  const [step, setStep] = useState<Step>(Step.ACCOUNT);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  useEffect(() => {
    if (visible) {
      if (isLoggedIn) {
        if (hasAddress) {
          setStep(Step.PAYMENT);
        } else {
          setStep(Step.ADDRESS);
        }
      } else {
        setStep(Step.ACCOUNT);
        setAuthMode('signup');
      }
    }
  }, [visible, isLoggedIn, hasAddress]);

  const breadcrumbs = [Step.ACCOUNT, Step.ADDRESS, Step.PAYMENT];

  const renderBreadcrumbs = () => (
    <View className="flex-row justify-center items-center space-x-2 mt-2">
      {breadcrumbs.map((s, idx) => (
        <React.Fragment key={s}>
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              step === s ? 'bg-primary border-primary' : 'bg-white border-gray-300'
            }`}
          >
            <Text className={`text-xs ${step === s ? 'text-white' : 'text-gray-500'}`}>{idx + 1}</Text>
          </View>
          {idx < breadcrumbs.length - 1 && <View className="w-8 h-px bg-gray-300" />}
        </React.Fragment>
      ))}
    </View>
  );

  const closeAll = () => {
    onClose();
  };

  const handleAuthComplete = () => {
    setStep(Step.ADDRESS);
  };

  const handleAddressSaved = () => {
    setStep(Step.PAYMENT);
  };

  const renderContent = () => {
    switch (step) {
      case Step.ACCOUNT:
        return authMode === 'signup' ? (
          <SignupForm onComplete={handleAuthComplete} onShowLogin={() => setAuthMode('login')} />
        ) : (
          <LoginForm onComplete={handleAuthComplete} onShowSignup={() => setAuthMode('signup')} />
        );
      case Step.ADDRESS:
        return (
          <ScrollView className="flex-1 p-4">
            <UserAddressForm onSave={handleAddressSaved} />
          </ScrollView>
        );
      case Step.PAYMENT:
        return (
          <ScrollView className="flex-1">
            <View className="p-4">
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
            </View>
            <View className="p-4 border-t">
              <StripePaymentForm visible onSuccess={closeAll} onCancel={closeAll} />
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        className={`flex-1 bg-black bg-opacity-50 ${isMobile ? 'justify-end' : 'justify-center items-center'}`}
      >
        <View
          className={`bg-white ${isMobile ? 'w-full max-h-[90%] rounded-t-xl' : 'rounded-xl w-[90%] max-w-3xl h-[90%]'}`}
        >
          <View className="p-4 border-b sticky top-0 bg-white z-10">
            <Text className="text-lg font-bold text-center">{step}</Text>
            {renderBreadcrumbs()}
          </View>
          <View className="flex-1">{renderContent()}</View>
          <View className="p-4 border-t">
            <TouchableOpacity onPress={closeAll} className="bg-secondary py-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;
