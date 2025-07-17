import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { socketLoginSession } from '../api/session';
import { LoginSessionDto } from 'ez-utils';
import { NAV_ROUTE_SIGNUP, NAV_ROUTE_HOME } from '../constants/routes';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { shallow } from 'zustand/shallow';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';

const LoginScreen = () => {
  // form state
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    {
      email: false,
      password: false,
    },
  );
  const [message, setMessage] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const prevRoute = useNavigationState((state) => state?.routes[state.index - 1]?.name);
  const { login, isLoggedIn } = useUserStore(
    (s) => ({
      login: s.login,
      isLoggedIn: s.isLoggedIn,
    }),
    shallow,
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace(NAV_ROUTE_HOME);
    }
  }, [isLoggedIn, navigation]);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // validation
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

  const submit = async () => {
    if (!isValid) return;
    setMessage(null);

    // fetch IP and location
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
      await socketLoginSession('login', dto);
      login();
      setMessage('Login successful');
      if (prevRoute && prevRoute !== NAV_ROUTE_SIGNUP) {
        navigation.goBack();
      } else {
        navigation.navigate(NAV_ROUTE_HOME);
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 24,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 800,
            flexDirection: isMobile ? 'column' : 'row',
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {/* Left panel */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <Image
              source={require('../assets/images/logo.png')}
              style={{ width: 180, height: 180, marginBottom: 16 }}
              resizeMode="contain"
            />
            <Text className="text-neutralText text-center">
              Welcome to Vyarna. Enter your credentials to continue.
            </Text>
          </View>

          {/* Divider */}
          {isMobile ? (
            <View className="h-px bg-gray-200 mx-4 my-2" />
          ) : (
            <View className="w-px bg-gray-200" />
          )}

          {/* Form panel */}
          <View style={{ flex: 1, padding: 24 }}>
            {/* Email */}
            <Text
              className={`mb-1 ${
                touched.email && errors.email
                  ? 'text-accent'
                  : 'text-neutralText'
              }`}
            >
              Email<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full h-11 bg-white rounded border ${
                touched.email && errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              } px-3 mb-1`}
              placeholder="Email"
              placeholderTextColor={colors.paper}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text className="text-accent text-sm mb-2">{errors.email}</Text>
            )}

            {/* Password */}
            <Text
              className={`mb-1 ${
                touched.password && errors.password
                  ? 'text-accent'
                  : 'text-neutralText'
              }`}
            >
              Password<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              className={`w-full h-11 bg-white rounded border ${
                touched.password && errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              } px-3 mb-1`}
              placeholder="Password"
              placeholderTextColor={colors.paper}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text className="text-accent text-sm mb-2">
                {errors.password}
              </Text>
            )}

            {/* Buttons */}
            <TouchableOpacity
              onPress={submit}
              className={`px-4 py-2 mt-4 rounded-lg ${
                isValid ? 'bg-primary' : 'bg-secondary'
              }`}
              disabled={!isValid}
            >
              <Text className="text-white text-center">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(NAV_ROUTE_SIGNUP)}
              className="mt-4"
            >
              <Text className="text-primary text-center text-sm">
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>

            {message && <Text style={{ marginTop: 8 }}>{message}</Text>}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
