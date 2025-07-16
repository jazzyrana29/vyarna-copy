import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { socketLoginSession } from '../api/session';
import { LoginSessionDto } from 'ez-utils';
import { NAV_ROUTE_SIGNUP } from '../constants/routes';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const submit = async () => {
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
    const dto: LoginSessionDto = { email, password, ipAddress: ip, location: loc } as any;
    try {
      await socketLoginSession('login', dto);
      setMessage('Login successful');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <View
      style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', padding: 16 }}
    >
      <View style={{ flex: 1, alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Image
          source={require('../assets/images/logo-full.png')}
          style={{ width: 200, height: 200, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text>Welcome to Vyarna. Enter your credentials to continue.</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{ borderWidth: 1, marginBottom: 8, padding: 4 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, marginBottom: 8, padding: 4 }}
        />
        <TouchableOpacity
          onPress={submit}
          style={{ backgroundColor: '#7ecaf8', padding: 10 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAV_ROUTE_SIGNUP as never)}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: '#5AC8FA', textAlign: 'center' }}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
        {message && <Text style={{ marginTop: 8 }}>{message}</Text>}
      </View>
    </View>
  );
};

export default LoginScreen;
