import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/color';
import { createContact } from '../api/contact';
import { TagsEnum } from '../enums/tags.enum';

type EmailProps = {
  title: string;
  description: string;
  className?: string;
  formId?: TagsEnum;
};

const Email: FC<EmailProps> = ({
                                 title,
                                 description,
                                 className = '',
                                 formId = TagsEnum.SIGNUP_ABOUT_TOP,
                               }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [firstTouched, setFirstTouched] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>('');
  const [lastTouched, setLastTouched] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFirstValid = firstName.trim().length > 0;
  const isLastValid = lastName.trim().length > 0;
  const isEmailValid = emailRegex.test(email);
  const isValid = isFirstValid && isLastValid && isEmailValid;

  const showAlert = (title: string, message: string): void => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const sendEmail = async (): Promise<void> => {
    if (!isValid || isLoading) return;
    setIsLoading(true);
    try {
      // something for email + name
      await createContact({
        email,
        firstName,
        lastName,
        formId,
      });
      console.log('Sending email...', formId);
      // showAlert("Success", "Contact created successfully");
      // Reset form
      setFirstName('');
      setFirstTouched(false);
      setLastName('');
      setLastTouched(false);
      setEmail('');
      setEmailTouched(false);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || '';
      console.error('Error:', errorMsg);
      showAlert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={`flex-1 bg-primary justify-center items-center p-4 ${className}`}
    >
      <View className="w-full max-w-md items-center">
        <Text className="text-base font-bold text-neutralText mb-2 text-center">
          {title}
        </Text>
        <Text className="text-sm text-neutralText mb-4 text-center">
          {description}
        </Text>

        <View className="w-full">
          {/* First & Last Name Fields */}
          <View className="flex-row space-x-2 mb-4">
            <View className="flex-1">
              <TextInput
                className="w-full h-11 bg-white rounded px-3"
                placeholder="First Name"
                placeholderTextColor={colors.paper}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                onBlur={() => setFirstTouched(true)}
                editable={!isLoading}
              />
              {firstTouched && !isFirstValid && (
                <Text className="text-accent mt-2 text-sm">
                  Enter first name.
                </Text>
              )}
            </View>
            <View className="flex-1">
              <TextInput
                className="w-full h-11 bg-white rounded px-3"
                placeholder="Last Name"
                placeholderTextColor={colors.paper}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                onBlur={() => setLastTouched(true)}
                editable={!isLoading}
              />
              {lastTouched && !isLastValid && (
                <Text className="text-accent mt-2 text-sm">
                  Enter last name.
                </Text>
              )}
            </View>
          </View>

          {/* Email & Button */}
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 h-11 bg-white rounded px-3 mr-2 w-2/3"
              placeholder="Enter your email"
              placeholderTextColor={colors.paper}
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => setEmailTouched(true)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity
              className={`h-11 px-4 rounded justify-center items-center md:w-1/3 ${
                isValid && !isLoading ? 'bg-blue-800' : 'bg-secondary'
              }`}
              onPress={sendEmail}
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  minimumFontScale={0.7}
                  ellipsizeMode="clip"
                  className={`text-base font-semibold ${'text-white'}`}
                  style={{ flexShrink: 1, fontSize: 16 }}
                >
                  Get Vyarna
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {emailTouched && !isEmailValid && (
            <Text className="text-accent mt-2 text-sm">
              Please enter a valid email address.
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Email;
