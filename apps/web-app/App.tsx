// App.tsx
import React, { FC } from 'react';
import './global.css';
// App.tsx (or index.ts, whichever is first loaded)
import 'react-native-get-random-values';
import { AppNavigator } from './src/navigation/AppNavigator';
import { HelmetProvider } from 'react-helmet-async';
import { useMockWebSocket } from './src/hooks/useMockWebSocket';

const App: FC = () => {
  useMockWebSocket();

  return (
    <HelmetProvider>
      <AppNavigator />
    </HelmetProvider>
  );
};

export default App;
