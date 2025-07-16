import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { socketLoginSession } from '../api/session';
import { LoginSessionDto } from 'ez-utils';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    setMessage(null);
    const dto: LoginSessionDto = { email, password } as any;
    try {
      await socketLoginSession('login', dto);
      setMessage('Login successful');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TouchableOpacity onPress={submit} style={{ backgroundColor: '#7ecaf8', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
      {message && <Text style={{ marginTop: 8 }}>{message}</Text>}
    </View>
  );
};

export default LoginScreen;
