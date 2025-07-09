// App.tsx
import type { FC } from 'react';
import './global.css';
import 'react-native-get-random-values';
import { AppNavigator } from './src/navigation/AppNavigator';
import { HelmetProvider } from 'react-helmet-async';
import { useWebSocketConnection } from './src/hooks/useWebSocketConnection';

const App: FC = () => {
  // Initialize WebSocket connection and listeners
  const { connectionError } = useWebSocketConnection();

  return (
    <HelmetProvider>
      {/* Connection Status Indicator (optional) */}
      {connectionError && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '8px',
            textAlign: 'center',
            fontSize: '14px',
            zIndex: 9999,
          }}
        >
          WebSocket Connection Error: {connectionError}
        </div>
      )}

      <AppNavigator />
    </HelmetProvider>
  );
};

export default App;
