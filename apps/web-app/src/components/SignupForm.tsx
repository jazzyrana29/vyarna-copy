import React, { FC, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { socketCreatePerson } from '../api/person';
import { socketLoginSession } from '../api/session';
import {
  CreatePersonDto,
  LoginSessionDto,
  LoginSessionResponseDto,
} from 'ez-utils';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';
import { useSessionStore } from '../store/sessionStore';
import { useLoadingStore } from '../store/loadingStore';
import { showToast } from '../store/toastStore';

export interface SignupFormProps {
  onComplete: () => void;
  onShowLogin: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ onComplete, onShowLogin }) => {
  const setUserDetails = useUserStore((s) => s.setUserDetails);
  const login = useUserStore((s) => s.login);
  const setSession = useSessionStore((s) => s.setSession);
  const { start: startLoading, stop: stopLoading } = useLoadingStore.getState();

  const [values, setValues] = useState({
    nameFirst: '',
    nameMiddle: '',
    nameLastFirst: '',
    nameLastSecond: '',
    email: '',
    password: '',
    addInActiveCampaign: true,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    nameFirst: values.nameFirst.trim() ? undefined : 'Enter first name.',
    nameLastFirst: values.nameLastFirst.trim()
      ? undefined
      : 'Enter last name.',
    email: emailRegex.test(values.email) ? undefined : 'Enter valid email.',
    password: values.password.length < 4 ? 'Enter password.' : undefined,
  } as Record<string, string | undefined>;

  const isValid =
    !errors.nameFirst &&
    !errors.nameLastFirst &&
    !errors.email &&
    !errors.password;

  const handleChange = (field: string) => (text: string) =>
    setValues((v) => ({ ...v, [field]: text }));

  const handleBlur = (field: string) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const showLogin = () => {
    setTouched({});
    setMessage(null);
    onShowLogin();
  };

  const submit = async () => {
    if (!isValid) return;
    setMessage(null);

    const dto: CreatePersonDto = {
      nameFirst: values.nameFirst,
      nameMiddle: values.nameMiddle || undefined,
      nameLastFirst: values.nameLastFirst,
      nameLastSecond: values.nameLastSecond || undefined,
      email: values.email,
      password: values.password,
      roles: ['client'],
      addInActiveCampaign: values.addInActiveCampaign,
    } as CreatePersonDto;

    try {
      startLoading();
      const person = await socketCreatePerson('signup', dto, {
        skipLoading: true,
      });
      setUserDetails({
        ...person,
        email: values.email,
        addInActiveCampaign: values.addInActiveCampaign,
      });

      let ip = '';
      let loc = '';
      try {
        const ipRes = await axios.get('https://api.ipify.org/?format=json');
        ip = ipRes.data.ip;
        const locRes = await Location.getCurrentPositionAsync({});
        loc = `${locRes.coords.latitude},${locRes.coords.longitude}`;
      } catch (err) {
        console.warn('Failed to get location or IP', err);
      }

      const loginDto: LoginSessionDto = {
        email: values.email,
        password: values.password,
        ipAddress: ip,
        location: loc,
      } as any;

      const result: LoginSessionResponseDto = await socketLoginSession(
        'login',
        loginDto,
        { skipLoading: true },
      );
      setSession(result.session);
      login(result.person);
      showToast('Signup successful', 'success');
      onComplete();
    } catch (err: any) {
      setMessage(err.message);
      showToast(err.message || 'Signup failed', 'error');
    } finally {
      stopLoading();
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-xl font-bold text-primary mb-4 text-center">
        Create Account
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
        <Text className="text-accent text-sm mb-2">{errors.nameLastFirst}</Text>
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

      <Text className="mb-1 text-neutralText">
        Password<Text className="text-accent">*</Text>
      </Text>
      <TextInput
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={() => handleBlur('password')}
        className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-1"
        placeholder="Password"
        placeholderTextColor={colors.paper}
        secureTextEntry
      />
      {touched.password && errors.password && (
        <Text className="text-accent text-sm mb-2">{errors.password}</Text>
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
            className={`w-4 h-4 border rounded items-center justify-center ${values.addInActiveCampaign ? 'bg-primary' : 'bg-white'}`}
          >
            {values.addInActiveCampaign && (
              <Text className="text-white text-xs">✓</Text>
            )}
          </View>
        </Pressable>
        <Text className="flex-1 text-xs text-neutralText">
          I agree to receive emails from Vyarna, including updates, product
          announcements, and special offers. I understand I can unsubscribe at
          any time
        </Text>
      </View>

      <TouchableOpacity
        onPress={submit}
        className={`px-4 py-2 rounded-lg ${isValid ? 'bg-primary' : 'bg-secondary'}`}
        disabled={!isValid}
      >
        <Text className="text-white text-center">Sign Up</Text>
      </TouchableOpacity>
      {message && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-2 mt-2">
          <Text className="text-red-700 text-center text-sm">{message}</Text>
        </View>
      )}
      <TouchableOpacity onPress={showLogin} className="mt-4">
        <Text className="text-primary text-center text-sm">
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupForm;
