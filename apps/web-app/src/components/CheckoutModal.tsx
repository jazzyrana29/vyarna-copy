import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import UserAddressForm from './UserAddressForm';
import StripePaymentForm from './StripePaymentForm';
import { useUserStore } from '../store/userStore';

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

  const breadcrumbs = [Step.ACCOUNT];
  if (!hasAddress) breadcrumbs.push(Step.ADDRESS);
  breadcrumbs.push(Step.PAYMENT);

  const renderBreadcrumbs = () => (
    <View className="flex-row justify-center items-center space-x-2 mt-2">
      {breadcrumbs.map((s, idx) => (
        <React.Fragment key={s}>
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              step === s
                ? 'bg-primary border-primary'
                : 'bg-white border-gray-300'
            }`}
          >
            <Text
              className={`text-xs ${step === s ? 'text-white' : 'text-gray-500'}`}
            >
              {idx + 1}
            </Text>
          </View>
          {idx < breadcrumbs.length - 1 && (
            <View className="w-8 h-px bg-gray-300" />
          )}
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
          <SignupForm
            onComplete={handleAuthComplete}
            onShowLogin={() => setAuthMode('login')}
          />
        ) : (
          <LoginForm
            onComplete={handleAuthComplete}
            onShowSignup={() => setAuthMode('signup')}
          />
        );
      case Step.ADDRESS:
        return (
          <ScrollView className="p-4">
            <UserAddressForm onSave={handleAddressSaved} />
          </ScrollView>
        );
      case Step.PAYMENT:
        return (
          <View className="flex-1 p-4">
            <StripePaymentForm
              visible
              onSuccess={closeAll}
              onCancel={closeAll}
              onEditAddress={() => setStep(Step.ADDRESS)}
            />
          </View>
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
          <View className="p-4 border-b sticky top-0 bg-white z-10 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-lg font-bold text-center">{step}</Text>
              {renderBreadcrumbs()}
            </View>
            <Pressable onPress={closeAll} className="p-1">
              <Text className="text-2xl text-secondary cursor-pointer">×</Text>
            </Pressable>
          </View>
          <View className="flex-1">{renderContent()}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;
