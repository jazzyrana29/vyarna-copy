// App.tsx
import type { FC } from 'react';
import './global.css';
import 'react-native-get-random-values';
import { AppNavigator } from './src/navigation/AppNavigator';
import { HelmetProvider } from 'react-helmet-async';
import LoadingOverlay from './src/components/LoadingOverlay';
import WebsocketsMessages from './src/components/WebsocketsMessages';
import Cart from './src/components/Cart';
import { useCartStore } from './src/store/cartStore';

interface AppProps {
  showSocketMessages?: boolean;
}

const App: FC<AppProps> = ({ showSocketMessages = true }) => {
  // Initialize WebSocket connection and listeners
  // const { connectionError } = useWebSocketConnection();

  const { isOpen, closeCart } = useCartStore();

  return (
    <HelmetProvider>
      {/* Connection Status Indicator (optional) */}
      {/*{connectionError && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'fixed',*/}
      {/*      top: 0,*/}
      {/*      left: 0,*/}
      {/*      right: 0,*/}
      {/*      backgroundColor: '#ff6b6b',*/}
      {/*      color: 'white',*/}
      {/*      padding: '8px',*/}
      {/*      textAlign: 'center',*/}
      {/*      fontSize: '14px',*/}
      {/*      zIndex: 9999,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Connection Error: {connectionError}*/}
      {/*  </div>*/}
      {/*)}*/}

      {showSocketMessages && <WebsocketsMessages />}
      <AppNavigator />
      <Cart
        visible={isOpen}
        onClose={closeCart}
        onBackToProducts={() => {}}
      />
      <LoadingOverlay />
    </HelmetProvider>
  );
};

export default App;
