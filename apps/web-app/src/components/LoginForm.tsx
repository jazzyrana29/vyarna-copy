import React, { FC, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { socketLoginSession } from '../api/session';
import { LoginSessionDto, LoginSessionResponseDto } from 'ez-utils';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';
import { useSessionStore } from '../store/sessionStore';

export interface LoginFormProps {
  onComplete: () => void;
  onShowSignup: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onComplete, onShowSignup }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [message, setMessage] = useState<string | null>(null);
  const login = useUserStore((s) => s.login);
  const setSession = useSessionStore((s) => s.setSession);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    email: emailRegex.test(values.email) ? undefined : 'Enter valid email.',
    password: values.password.length < 4 ? 'Enter password.' : undefined,
  } as Record<keyof typeof values, string | undefined>;

  const isValid = !errors.email && !errors.password;

  const handleChange = (field: keyof typeof values) => (text: string) =>
    setValues((v) => ({ ...v, [field]: text }));

  const handleBlur = (field: keyof typeof values) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const showSignup = () => {
    setTouched({ email: false, password: false });
    setMessage(null);
    onShowSignup();
  };

  const submit = async () => {
    if (!isValid) return;
    setMessage(null);

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

    const dto: LoginSessionDto = {
      email: values.email,
      password: values.password,
      ipAddress: ip,
      location: loc,
    } as any;

    try {
      const result: LoginSessionResponseDto = await socketLoginSession('login', dto);
      setSession(result.session);
      login(result.person);
      onComplete();
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-xl font-bold text-primary mb-4 text-center">Login</Text>
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

      <TouchableOpacity
        onPress={submit}
        className={`px-4 py-2 mt-2 rounded-lg ${isValid ? 'bg-primary' : 'bg-secondary'}`}
        disabled={!isValid}
      >
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
      {message && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-2 mt-2">
          <Text className="text-red-700 text-center text-sm">{message}</Text>
        </View>
      )}
      <TouchableOpacity onPress={showSignup} className="mt-4">
        <Text className="text-primary text-center text-sm">
          Need an account? Sign up
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginForm;
