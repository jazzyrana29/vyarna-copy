import React from 'react';
import { View, Text } from 'react-native';
import { useToastStore } from '../store/toastStore';

const Toast = () => {
  const message = useToastStore((s) => s.message);
  if (!message) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: 'white' }}>{message}</Text>
      </View>
    </View>
  );
};

export default Toast;
