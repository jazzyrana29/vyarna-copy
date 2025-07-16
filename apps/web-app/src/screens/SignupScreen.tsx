import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { socketCreatePerson } from '../api/person';
import { CreatePersonDto } from 'ez-utils';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    setMessage(null);
    const dto: CreatePersonDto = {
      email,
      password,
      nameFirst: first,
      nameLastFirst: last,
      roles: ['client'],
      isDeleted: false,
    } as any;
    try {
      await socketCreatePerson('signup', dto);
      setMessage('Signup successful');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="First Name" value={first} onChangeText={setFirst} style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TextInput placeholder="Last Name" value={last} onChangeText={setLast} style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, marginBottom:8,padding:4 }} />
      <TouchableOpacity onPress={submit} style={{ backgroundColor: '#7ecaf8', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
      {message && <Text style={{ marginTop: 8 }}>{message}</Text>}
    </View>
  );
};

export default SignupScreen;
