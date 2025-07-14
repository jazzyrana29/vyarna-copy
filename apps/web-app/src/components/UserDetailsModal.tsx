// src/components/UserDetailsModal.tsx
import React, { FC, useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  const [firstName, setFirstName] = useState(userDetails?.firstName || '');
  const [lastName, setLastName] = useState(userDetails?.lastName || '');
  const [email, setEmail] = useState(userDetails?.email || '');

  // Populate inputs whenever the modal opens
  useEffect(() => {
    if (visible) {
      setFirstName(userDetails?.firstName || '');
      setLastName(userDetails?.lastName || '');
      setEmail(userDetails?.email || '');
    }
  }, [visible, userDetails]);

  const handleSubmit = () => {
    const details: UserDetails = { firstName, lastName, email };
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
            value={firstName}
            onChangeText={setFirstName}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="First Name"
          />

          <Text className="mb-1 text-secondary">Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Last Name"
          />

          <Text className="mb-1 text-secondary">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded p-2 mb-6"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onClose} className="mr-4 py-2">
              <Text className="text-secondary">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary px-4 py-2 rounded-lg"
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
