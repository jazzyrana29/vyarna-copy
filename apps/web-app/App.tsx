// App.tsx
import type { FC } from 'react';
import './global.css';
import 'react-native-get-random-values';
import { AppNavigator } from './src/navigation/AppNavigator';
import { HelmetProvider } from 'react-helmet-async';
import LoadingOverlay from './src/components/LoadingOverlay';
import WebsocketsMessages from './src/components/WebsocketsMessages';
import Cart from './src/components/Cart';
// Toast displays brief messages on screen.
//
// <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
//   <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 8, borderRadius: 4 }}>
//     <Text style={{ color: 'white' }}>Message here</Text>
//   </View>
// </View>
import Toast from './src/components/Toast';
import { useCartStore } from './src/store/cartStore';
import { useProductSelectorStore } from './src/store/productSelectorStore';

interface AppProps {
  showSocketMessages?: boolean;
}

const App: FC<AppProps> = ({ showSocketMessages = true }) => {
  // Initialize WebSocket connection and listeners
  // const { connectionError } = useWebSocketConnection();

  const { isOpen, closeCart } = useCartStore();
  const openSelector = useProductSelectorStore((s) => s.open);

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
        onBackToProducts={openSelector}
      />
      <LoadingOverlay />
      {/** Toasts appear at the bottom of the screen */}
      <Toast />
    </HelmetProvider>
  );
};

export default App;
