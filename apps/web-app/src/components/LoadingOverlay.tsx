import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { createPortal } from 'react-dom';
import { useLoadingStore } from '../store/loadingStore';

const LoadingOverlay = () => {
  const isLoading = useLoadingStore((s) => s.isLoading);
  if (!isLoading) return null;

  const overlay = (
    <View
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );

  if (Platform.OS === 'web') {
    return createPortal(overlay, document.body);
  }

  return overlay;
};

export default LoadingOverlay;
