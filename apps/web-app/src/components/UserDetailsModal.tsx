// src/components/UserDetailsModal.tsx
import React, { FC, useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/color';
import { UserDetails, useUserStore } from '../store/userStore';

export interface UserDetailsModalProps {
  visible: boolean;
  onSave: (details: UserDetails) => void;
  onClose: () => void;
}

const UserDetailsModal: FC<UserDetailsModalProps> = ({
  visible,
  onSave,
  onClose,
}) => {
  const userDetails = useUserStore((s) => s.userDetails);
  const setUserDetails = useUserStore((s) => s.setUserDetails);

  const [nameFirst, setNameFirst] = useState(userDetails?.nameFirst || '');
  const [nameMiddle, setNameMiddle] = useState(userDetails?.nameMiddle || '');
  const [nameLastFirst, setNameLastFirst] = useState(
    userDetails?.nameLastFirst || '',
  );
  const [nameLastSecond, setNameLastSecond] = useState(
    userDetails?.nameLastSecond || '',
  );
  const [email, setEmail] = useState(userDetails?.email || '');

  // Populate inputs whenever the modal opens
  useEffect(() => {
    if (visible) {
      setNameFirst(userDetails?.nameFirst || '');
      setNameMiddle(userDetails?.nameMiddle || '');
      setNameLastFirst(userDetails?.nameLastFirst || '');
      setNameLastSecond(userDetails?.nameLastSecond || '');
      setEmail(userDetails?.email || '');
    }
  }, [visible, userDetails]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFirstValid = nameFirst.trim().length > 0;
  const isLastValid = nameLastFirst.trim().length > 0;
  const isEmailValid = emailRegex.test(email);
  const isValid = isFirstValid && isLastValid && isEmailValid;

  const handleSubmit = () => {
    if (!isValid) return;
    const details: UserDetails = {
      nameFirst,
      nameMiddle,
      nameLastFirst,
      nameLastSecond,
      email,
    };
    setUserDetails(details);
    onSave(details);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md">
          <Text className="text-xl font-bold text-primary mb-4">
            Your Details
          </Text>

          <Text className="mb-1 text-secondary">First Name</Text>
          <TextInput
            value={nameFirst}
            onChangeText={setNameFirst}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="First Name"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-secondary">Middle Name</Text>
          <TextInput
            value={nameMiddle}
            onChangeText={setNameMiddle}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Middle Name (optional)"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-secondary">Last Name</Text>
          <TextInput
            value={nameLastFirst}
            onChangeText={setNameLastFirst}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Last Name"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-secondary">Second Last Name</Text>
          <TextInput
            value={nameLastSecond}
            onChangeText={setNameLastSecond}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Second Last Name (optional)"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-secondary">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded p-2 mb-6"
            placeholder="you@example.com"
            placeholderTextColor={colors.paper}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onClose} className="mr-4 py-2">
              <Text className="text-secondary">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className={`px-4 py-2 rounded-lg ${isValid ? 'bg-primary' : 'bg-secondary'}`}
              disabled={!isValid}
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserDetailsModal;
