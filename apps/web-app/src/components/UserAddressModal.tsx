import React, { FC, useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';
import { AddressType, PhysicalAddressDto } from 'ez-utils';

export interface UserAddressModalProps {
  visible: boolean;
  onSave: (address: PhysicalAddressDto) => void;
  onClose: () => void;
}

const emptyAddress: PhysicalAddressDto = {
  addressId: '',
  personId: '',
  addressType: AddressType.HOME,
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  isPrimary: true,
};

const UserAddressModal: FC<UserAddressModalProps> = ({ visible, onSave, onClose }) => {
  const existing = useUserStore((s) => s.userDetails?.addresses?.find((a) => a.isPrimary));
  const [values, setValues] = useState<PhysicalAddressDto>(existing || emptyAddress);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (visible) {
      setValues(existing || emptyAddress);
      setTouched({});
    }
  }, [visible, existing]);

  const errors = {
    addressLine1: values.addressLine1.trim() ? undefined : 'Enter address line 1',
    city: values.city.trim() ? undefined : 'Enter city',
    state: values.state.trim() ? undefined : 'Enter state',
    postalCode: values.postalCode.trim() ? undefined : 'Enter postal code',
    country: values.country.trim() ? undefined : 'Enter country',
  };

  const isValid =
    !errors.addressLine1 && !errors.city && !errors.state && !errors.postalCode && !errors.country;

  const handleChange = (field: keyof PhysicalAddressDto) => (text: string) =>
    setValues((v) => ({ ...v, [field]: text }));

  const handleBlur = (field: keyof PhysicalAddressDto) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = () => {
    if (!isValid) return;
    onSave(values);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md">
          <Text className="text-xl font-bold text-primary mb-4">Shipping Address</Text>
          <Text className="mb-1 text-neutralText">Address Line 1<Text className="text-accent">*</Text></Text>
          <TextInput
            value={values.addressLine1}
            onChangeText={handleChange('addressLine1')}
            onBlur={() => handleBlur('addressLine1')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="Street address"
            placeholderTextColor={colors.paper}
          />
          {touched.addressLine1 && errors.addressLine1 && (
            <Text className="text-accent text-sm mb-2">{errors.addressLine1}</Text>
          )}

          <Text className="mb-1 text-neutralText">Address Line 2</Text>
          <TextInput
            value={values.addressLine2 || ''}
            onChangeText={handleChange('addressLine2')}
            onBlur={() => handleBlur('addressLine2')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-4"
            placeholder="Apartment, suite, etc."
            placeholderTextColor={colors.paper}
          />

          <Text className="mb-1 text-neutralText">City<Text className="text-accent">*</Text></Text>
          <TextInput
            value={values.city}
            onChangeText={handleChange('city')}
            onBlur={() => handleBlur('city')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="City"
            placeholderTextColor={colors.paper}
          />
          {touched.city && errors.city && (
            <Text className="text-accent text-sm mb-2">{errors.city}</Text>
          )}

          <Text className="mb-1 text-neutralText">State<Text className="text-accent">*</Text></Text>
          <TextInput
            value={values.state}
            onChangeText={handleChange('state')}
            onBlur={() => handleBlur('state')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="State"
            placeholderTextColor={colors.paper}
          />
          {touched.state && errors.state && (
            <Text className="text-accent text-sm mb-2">{errors.state}</Text>
          )}

          <Text className="mb-1 text-neutralText">Postal Code<Text className="text-accent">*</Text></Text>
          <TextInput
            value={values.postalCode}
            onChangeText={handleChange('postalCode')}
            onBlur={() => handleBlur('postalCode')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="Postal Code"
            placeholderTextColor={colors.paper}
          />
          {touched.postalCode && errors.postalCode && (
            <Text className="text-accent text-sm mb-2">{errors.postalCode}</Text>
          )}

          <Text className="mb-1 text-neutralText">Country<Text className="text-accent">*</Text></Text>
          <TextInput
            value={values.country}
            onChangeText={handleChange('country')}
            onBlur={() => handleBlur('country')}
            className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
            placeholder="Country"
            placeholderTextColor={colors.paper}
          />
          {touched.country && errors.country && (
            <Text className="text-accent text-sm mb-2">{errors.country}</Text>
          )}

          <View className="flex-row justify-end mt-4">
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

export default UserAddressModal;
