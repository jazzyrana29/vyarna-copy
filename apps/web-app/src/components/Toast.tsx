import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useToastStore } from '../store/toastStore';

const COLORS = {
  success: '#4caf50',
  error: '#f44336',
  info: '#2196f3',
  warning: '#ff9800',
} as const;

const ICONS = {
  success: 'check-circle',
  error: 'error',
  info: 'info',
  warning: 'warning',
} as const;

const Toast = () => {
  const toast = useToastStore((s) => s.toast);
  if (!toast) return null;
  const { message, type } = toast;

  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS[type],
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 4,
        }}
      >
        <Icon
          name={ICONS[type] as string}
          size={20}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: 'white' }}>{message}</Text>
      </View>
    </View>
  );
};

export default Toast;
