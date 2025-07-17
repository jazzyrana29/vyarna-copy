import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NAV_ROUTE_LOGIN } from '../constants/routes';
import { socketCreatePerson } from '../api/person';
import { CreatePersonDto } from 'ez-utils';
import { colors } from '../theme/color';
import { useUserStore } from '../store/userStore';

const SignupScreen = () => {
  const setUserDetails = useUserStore((s) => s.setUserDetails);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  type FormValues = {
    nameFirst: string;
    nameMiddle?: string;
    nameLastFirst: string;
    nameLastSecond?: string;
    email: string;
    password: string;
    addInActiveCampaign: boolean;
  };

  const [values, setValues] = useState<FormValues>({
    nameFirst: '',
    nameMiddle: '',
    nameLastFirst: '',
    nameLastSecond: '',
    email: '',
    password: '',
    addInActiveCampaign: false,
  });
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    nameFirst: false,
    nameMiddle: false,
    nameLastFirst: false,
    nameLastSecond: false,
    email: false,
    password: false,
    addInActiveCampaign: false,
  });
  const [message, setMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    nameFirst:
      values.nameFirst.trim().length === 0 ? 'Enter first name.' : undefined,
    nameLastFirst:
      values.nameLastFirst.trim().length === 0 ? 'Enter last name.' : undefined,
    email: emailRegex.test(values.email) ? undefined : 'Enter valid email.',
    password: values.password.length < 4 ? 'Enter password.' : undefined,
  } as Record<keyof FormValues, string | undefined>;

  const isValid =
    !errors.nameFirst &&
    !errors.nameLastFirst &&
    !errors.email &&
    !errors.password;

  const handleChange = (field: keyof FormValues) => (text: any) => {
    setValues((v) => ({ ...v, [field]: text }));
  };
  const handleBlur = (field: keyof FormValues) => {
    setTouched((t) => ({ ...t, [field]: true }));
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
      const person = await socketCreatePerson('signup', dto);
      setUserDetails({
        ...person,
        addInActiveCampaign: values.addInActiveCampaign,
      });
      setMessage('Signup successful');
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
          padding: 16,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              flex: isMobile ? 0.5 : 1,
              backgroundColor: 'fff',
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
            <Text className="text-center text-neutralText">
              Join Vyarna today and discover our features.
            </Text>
          </View>

          {isMobile ? (
            <View className="h-px bg-gray-200 mx-4 my-2" />
          ) : (
            <View className="w-px bg-gray-200" />
          )}

          <View style={{ flex: 1, padding: 24 }}>
            {/* First Name */}
            <Text
              className={`mb-1 ${touched.nameFirst && errors.nameFirst ? 'text-accent' : 'text-neutralText'}`}
            >
              First Name<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.nameFirst}
              onChangeText={handleChange('nameFirst')}
              onBlur={() => handleBlur('nameFirst')}
              className={`w-full h-11 bg-white rounded border ${touched.nameFirst && errors.nameFirst ? 'border-red-500' : 'border-gray-300'} px-3 mb-1`}
              placeholder="First Name"
              placeholderTextColor={colors.paper}
            />
            {touched.nameFirst && errors.nameFirst && (
              <Text className="text-accent text-sm mb-2">
                {errors.nameFirst}
              </Text>
            )}

            {/* Middle Name */}
            <Text className="mb-1 text-neutralText">Middle Name</Text>
            <TextInput
              value={values.nameMiddle}
              onChangeText={handleChange('nameMiddle')}
              onBlur={() => handleBlur('nameMiddle')}
              className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-4"
              placeholder="Middle Name (optional)"
              placeholderTextColor={colors.paper}
            />

            {/* Last Name */}
            <Text
              className={`mb-1 ${touched.nameLastFirst && errors.nameLastFirst ? 'text-accent' : 'text-neutralText'}`}
            >
              Last First Name<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.nameLastFirst}
              onChangeText={handleChange('nameLastFirst')}
              onBlur={() => handleBlur('nameLastFirst')}
              className={`w-full h-11 bg-white rounded border ${touched.nameLastFirst && errors.nameLastFirst ? 'border-red-500' : 'border-gray-300'} px-3 mb-1`}
              placeholder="Last First Name"
              placeholderTextColor={colors.paper}
            />
            {touched.nameLastFirst && errors.nameLastFirst && (
              <Text className="text-accent text-sm mb-2">
                {errors.nameLastFirst}
              </Text>
            )}

            {/* Second Last Name */}
            <Text className="mb-1 text-neutralText">Second Last Name</Text>
            <TextInput
              value={values.nameLastSecond}
              onChangeText={handleChange('nameLastSecond')}
              onBlur={() => handleBlur('nameLastSecond')}
              className="w-full h-11 bg-white rounded border border-gray-300 px-3 mb-4"
              placeholder="Second Last Name (optional)"
              placeholderTextColor={colors.paper}
            />

            {/* Email */}
            <Text
              className={`mb-1 ${touched.email && errors.email ? 'text-accent' : 'text-neutralText'}`}
            >
              Email<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full h-11 bg-white rounded border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} px-3 mb-1`}
              placeholder="you@example.com"
              placeholderTextColor={colors.paper}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text className="text-accent text-sm mb-2">{errors.email}</Text>
            )}

            {/* Password */}
            <Text
              className={`mb-1 ${touched.password && errors.password ? 'text-accent' : 'text-neutralText'}`}
            >
              Password<Text className="text-accent">*</Text>
            </Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              className={`w-full h-11 bg-white rounded border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} px-3 mb-1`}
              placeholder="Password"
              placeholderTextColor={colors.paper}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text className="text-accent text-sm mb-2">
                {errors.password}
              </Text>
            )}

            {/* Checkbox */}
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
                I agree to receive emails from Vyarna, including updates,
                product announcements, and special offers. I understand I can
                unsubscribe at any time
              </Text>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              onPress={submit}
              className={`px-4 py-2 rounded-lg ${isValid ? 'bg-primary' : 'bg-secondary'}`}
              disabled={!isValid}
            >
              <Text className="text-white text-center">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(NAV_ROUTE_LOGIN as never)}
              className="mt-4"
            >
              <Text className="text-primary text-center text-sm">
                Already have an account? Login
              </Text>
            </TouchableOpacity>

            {message && <Text style={{ marginTop: 8 }}>{message}</Text>}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
