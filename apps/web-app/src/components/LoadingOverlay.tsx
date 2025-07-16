import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useLoadingStore } from '../store/loadingStore';

const LoadingOverlay = () => {
  const isLoading = useLoadingStore((s) => s.isLoading);
  if (!isLoading) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default LoadingOverlay;
