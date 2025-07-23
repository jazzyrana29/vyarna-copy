import React, { FC, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from 'country-state-city';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';
import { PhysicalAddressDto } from 'ez-utils';
import { socketCreateAddress } from 'src/api/address';
import { SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS } from 'src/constants/socketEvents';
import { showToast } from 'src/store/toastStore';

// Local copy of AddressType so we don't depend on ez-utils enums
enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export interface UserAddressFormProps {
  onSave: (address: PhysicalAddressDto) => void;
  onCancel: () => void;
}

const createEmptyAddress = (personId: string): PhysicalAddressDto => ({
  addressId: '',
  personId,
  addressType: AddressType.HOME,
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  isPrimary: true,
});

const UserAddressForm: FC<UserAddressFormProps> = ({ onSave, onCancel }) => {
  const personId = useUserStore((s) => (s.userDetails as any)?.personId || '');
  const existing = useUserStore((s) =>
    s.userDetails?.addresses?.find((a) => a.isPrimary),
  );

  const setAddress = useUserStore((s) => s.setAddress);
  const [values, setValues] = useState<PhysicalAddressDto>(
    existing || createEmptyAddress(personId),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('');

  // Reset form when existing changes
  useEffect(() => {
    setValues(existing || createEmptyAddress(personId));
    setTouched({});
  }, [existing, personId]);

  // Load countries once
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // After countries load, if we have an existing country, select its code
  useEffect(() => {
    if (values.country && countries.length) {
      const match = countries.find((c) => c.name === values.country);
      if (match) {
        setSelectedCountryCode(match.isoCode);
      }
    }
  }, [countries, values.country]);

  // When country changes, load states
  useEffect(() => {
    if (selectedCountryCode) {
      setStates(State.getStatesOfCountry(selectedCountryCode));
    } else {
      setStates([]);
    }
    setSelectedStateCode(''); // reset state selection
    setCities([]);
  }, [selectedCountryCode]);

  // After states load, if we have an existing state, select its code
  useEffect(() => {
    if (values.state && states.length) {
      const match = states.find((s) => s.name === values.state);
      if (match) {
        setSelectedStateCode(match.isoCode);
      }
    }
  }, [states, values.state]);

  // When state changes, load cities
  useEffect(() => {
    if (selectedCountryCode && selectedStateCode) {
      setCities(City.getCitiesOfState(selectedCountryCode, selectedStateCode));
    } else {
      setCities([]);
    }
  }, [selectedCountryCode, selectedStateCode]);

  // Validation
  const errors = {
    addressLine1: values.addressLine1.trim()
      ? undefined
      : 'Enter address line 1',
    country: values.country.trim() ? undefined : 'Enter country',
    state: values.state.trim() ? undefined : 'Enter state',
    city: values.city.trim() ? undefined : 'Enter city',
    postalCode: values.postalCode.trim() ? undefined : 'Enter postal code',
  };
  const isValid =
    !errors.addressLine1 &&
    !errors.country &&
    !errors.state &&
    !errors.city &&
    !errors.postalCode;

  // Handlers
  const handleChange = (field: keyof PhysicalAddressDto) => (text: string) =>
    setValues((v) => ({ ...v, [field]: text }));

  const handleCountrySelect = (code: string) => {
    const c = countries.find((ct) => ct.isoCode === code);
    setSelectedCountryCode(code);
    setValues((v) => ({ ...v, country: c ? c.name : '' }));
  };

  const handleStateSelect = (code: string) => {
    const s = states.find((st) => st.isoCode === code);
    setSelectedStateCode(code);
    setValues((v) => ({ ...v, state: s ? s.name : '' }));
  };

  const handleCitySelect = (cityName: string) => {
    setValues((v) => ({ ...v, city: cityName }));
  };

  const handleBlur = (field: keyof PhysicalAddressDto) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = async () => {
    if (!values.personId && personId) {
      values.personId = personId;
    }
    try {
      await socketCreateAddress(
        SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS,
        values,
      );
      setAddress(values);
    } catch (e) {
      console.error('Address save failed', e);
      showToast((e as Error).message || 'Address save failed', 'error');
      return;
    }
    showToast('Address saved', 'success');
    if (!isValid) return;
    onSave(values);
  };

  return (
    <View className="flex-1 bg-white rounded-xl">
      <ScrollView className="p-4 flex-grow">
        <Text className="text-xl font-bold text-primary mb-1">
          Shipping Address
        </Text>
        {values.isPrimary && (
          <Text className="text-xs text-primary font-semibold mb-3">
            Primary Address
          </Text>
        )}

        {/* Address Type */}
        <Text className="mb-1 text-neutralText">Address Type</Text>
        <View className="w-full h-11 bg-white rounded mb-4 justify-center px-2 border border-gray-300">
          <Picker
            selectedValue={values.addressType}
            onValueChange={(val) =>
              setValues((v) => ({ ...v, addressType: val as AddressType }))
            }
            className={'bg-white'}
          >
            {Object.values(AddressType).map((t) => (
              <Picker.Item key={t} label={t} value={t} />
            ))}
          </Picker>
        </View>

        {/* Address Line 1 */}
        <Text className="mb-1 text-neutralText">
          Address Line 1<Text className="text-accent">*</Text>
        </Text>
        <TextInput
          value={values.addressLine1}
          onChangeText={handleChange('addressLine1')}
          onBlur={() => handleBlur('addressLine1')}
          className="w-full h-11 bg-white rounded px-3 border border-gray-300 mb-4"
          placeholder="Street address"
          placeholderTextColor={colors.paper}
        />
        {touched.addressLine1 && errors.addressLine1 && (
          <Text className="text-accent text-sm mb-2">
            {errors.addressLine1}
          </Text>
        )}

        {/* Address Line 2 */}
        <Text className="mb-1 text-neutralText">Address Line 2</Text>
        <TextInput
          value={values.addressLine2}
          onChangeText={handleChange('addressLine2')}
          onBlur={() => handleBlur('addressLine2')}
          className="w-full h-11 bg-white rounded px-3 border border-gray-300 mb-4"
          placeholder="Apartment, suite, etc."
          placeholderTextColor={colors.paper}
        />

        {/* Country */}
        <Text className="mb-1 text-neutralText">
          Country<Text className="text-accent">*</Text>
        </Text>
        <View className="w-full h-11 bg-white rounded mb-4 justify-center px-2 border border-gray-300">
          <Picker
            selectedValue={selectedCountryCode}
            onValueChange={handleCountrySelect}
            className={'bg-white'}
          >
            <Picker.Item label="Select Country" value="" />
            {countries.map((c) => (
              <Picker.Item key={c.isoCode} label={c.name} value={c.isoCode} />
            ))}
          </Picker>
        </View>
        {touched.country && errors.country && (
          <Text className="text-accent text-sm mb-2">{errors.country}</Text>
        )}

        {/* State */}
        <Text className="mb-1 text-neutralText">
          State<Text className="text-accent">*</Text>
        </Text>
        <View className="w-full h-11 bg-white rounded mb-4 justify-center px-2 border border-gray-300">
          <Picker
            selectedValue={selectedStateCode}
            onValueChange={handleStateSelect}
            className={'bg-white'}
          >
            <Picker.Item label="Select State" value="" />
            {states.map((s) => (
              <Picker.Item key={s.isoCode} label={s.name} value={s.isoCode} />
            ))}
          </Picker>
        </View>
        {touched.state && errors.state && (
          <Text className="text-accent text-sm mb-2">{errors.state}</Text>
        )}

        {/* City */}
        <Text className="mb-1 text-neutralText">
          City<Text className="text-accent">*</Text>
        </Text>
        <View className="w-full h-11 bg-white rounded mb-4 justify-center px-2 border border-gray-300">
          <Picker
            selectedValue={values.city}
            onValueChange={handleCitySelect}
            className={'bg-white'}
          >
            <Picker.Item label="Select City" value="" />
            {cities.map((ct) => (
              <Picker.Item key={ct.name} label={ct.name} value={ct.name} />
            ))}
          </Picker>
        </View>
        {touched.city && errors.city && (
          <Text className="text-accent text-sm mb-2">{errors.city}</Text>
        )}

        {/* Postal Code */}
        <Text className="mb-1 text-neutralText">
          Postal Code<Text className="text-accent">*</Text>
        </Text>
        <TextInput
          value={values.postalCode}
          onChangeText={handleChange('postalCode')}
          onBlur={() => handleBlur('postalCode')}
          className="w-full h-11 bg-white rounded px-3 border border-gray-300 mb-1"
          placeholder="Postal Code"
          placeholderTextColor={colors.paper}
        />
        {touched.postalCode && errors.postalCode && (
          <Text className="text-accent text-sm mb-2">{errors.postalCode}</Text>
        )}
      </ScrollView>

      {/* Actions */}
      <View className="p-6 border-t border-gray-200">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg"
            onPress={onCancel}
          >
            <Text className="text-neutralText font-semibold text-center">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              isValid ? 'bg-primary' : 'bg-secondary opacity-50'
            }`}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            <Text className="text-white font-bold text-center">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserAddressForm;
