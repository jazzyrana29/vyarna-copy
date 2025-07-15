// src/components/UserDetailsModal.tsx
import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
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

  type FormValues = UserDetails & { addInActiveCampaign?: boolean };

  const [values, setValues] = useState<FormValues>({
    nameFirst: userDetails?.nameFirst || '',
    nameMiddle: userDetails?.nameMiddle || '',
    nameLastFirst: userDetails?.nameLastFirst || '',
    nameLastSecond: userDetails?.nameLastSecond || '',
    email: userDetails?.email || '',
    addInActiveCampaign: userDetails?.addInActiveCampaign || false,
  });
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    nameFirst: false,
    nameMiddle: false,
    nameLastFirst: false,
    nameLastSecond: false,
    email: false,
    addInActiveCampaign: false,
  });

  // Populate inputs whenever the modal opens
  useEffect(() => {
    if (visible) {
      setValues({
        nameFirst: userDetails?.nameFirst || '',
        nameMiddle: userDetails?.nameMiddle || '',
        nameLastFirst: userDetails?.nameLastFirst || '',
        nameLastSecond: userDetails?.nameLastSecond || '',
        email: userDetails?.email || '',
        addInActiveCampaign: userDetails?.addInActiveCampaign || false,
      });
      setTouched({
        nameFirst: false,
        nameMiddle: false,
        nameLastFirst: false,
        nameLastSecond: false,
        email: false,
        addInActiveCampaign: false,
      });
    }
  }, [visible, userDetails]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {
    nameFirst:
      values.nameFirst.trim().length === 0 ? 'Enter first name.' : undefined,
    nameLastFirst:
      values.nameLastFirst.trim().length === 0 ? 'Enter last name.' : undefined,
    email: emailRegex.test(values.email) ? undefined : 'Enter valid email.',
  } as Record<keyof FormValues, string | undefined>;

  const isValid = !errors.nameFirst && !errors.nameLastFirst && !errors.email;

  const handleChange = (field: keyof FormValues) => (text: any) => {
    setValues((v) => ({ ...v, [field]: text }));
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = () => {
    if (!isValid) return;
    const details: UserDetails = { ...values };
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

          <Text className="mb-1 text-neutralText">
            First Name<Text className="text-accent">*</Text>
          </Text>
          <TextInput
            value={values.nameFirst}
            onChangeText={handleChange('nameFirst')}
            onBlur={() => handleBlur('nameFirst')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="First Name"
            placeholderTextColor={colors.paper}
          />
          {touched.nameFirst && errors.nameFirst && (
            <Text className="text-accent text-sm mb-2">{errors.nameFirst}</Text>
          )}

          <Text className="mb-1 text-neutralText">Middle Name</Text>
          <TextInput
            value={values.nameMiddle}
            onChangeText={handleChange('nameMiddle')}
            onBlur={() => handleBlur('nameMiddle')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-4"
            placeholder="Middle Name (optional)"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-neutralText">
            Last Name<Text className="text-accent">*</Text>
          </Text>
          <TextInput
            value={values.nameLastFirst}
            onChangeText={handleChange('nameLastFirst')}
            onBlur={() => handleBlur('nameLastFirst')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="Last Name"
            placeholderTextColor={colors.paper}
          />
          {touched.nameLastFirst && errors.nameLastFirst && (
            <Text className="text-accent text-sm mb-2">
              {errors.nameLastFirst}
            </Text>
          )}

          <Text className="mb-1 text-neutralText">Second Last Name</Text>
          <TextInput
            value={values.nameLastSecond}
            onChangeText={handleChange('nameLastSecond')}
            onBlur={() => handleBlur('nameLastSecond')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-4"
            placeholder="Second Last Name (optional)"
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-neutralText">
            Email<Text className="text-accent">*</Text>
          </Text>
          <TextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => handleBlur('email')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="you@example.com"
            placeholderTextColor={colors.paper}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && (
            <Text className="text-accent text-sm mb-2">{errors.email}</Text>
          )}

          <View className="flex-row items-start mb-4 mt-2">
            <Pressable
              onPress={() =>
                setValues((v) => ({
                  ...v,
                  addInActiveCampaign: !v.addInActiveCampaign,
                }))
              }
              className="mr-2 mt-1"
            >
              <View
                className={`w-4 h-4 border rounded items-center justify-center ${
                  values.addInActiveCampaign ? 'bg-primary' : 'bg-white'
                }`}
              >
                {values.addInActiveCampaign && (
                  <Text className="text-white text-xs">✓</Text>
                )}
              </View>
            </Pressable>
            <Text className="flex-1 text-xs text-neutralText">
              I agree to receive emails from Vyarna, including updates, product
              announcements, and special offers. I understand I can unsubscribe
              at any time
            </Text>
          </View>

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
