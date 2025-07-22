import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { socketAddBoosterPackInCart } from '../api/commerce';
import { useCartStore } from '../store/cartStore';
import { usePaymentStore } from '../store/paymentStore';
import { showToast } from '../store/toastStore';

interface Props {
  label?: string;
}

export default function BoosterCartButton({ label = 'Reserve My First Pack' }: Props) {
  const { addItem, openCart, setCartId } = useCartStore();
  const { sessionId, setSessionId } = usePaymentStore();

  const handlePress = async () => {
    try {
      const result = await socketAddBoosterPackInCart('sales-commerce', { sessionId });
      if (result.sessionId && !sessionId) setSessionId(result.sessionId);
      if (result.cart) setCartId(result.cart.cartId);
      if (result.product) {
        addItem({
          id: result.product.productId,
          name: result.product.name,
          description: result.product.description,
          image: result.product.images && result.product.images[0]
            ? { uri: result.product.images[0] }
            : undefined,
          priceCents: result.product.priceCents,
          currency: result.product.currency,
        });
      }
      openCart();
    } catch (e: any) {
      showToast(e.message || 'Failed to add to cart', 'error');
    }
  };

  return (
    <TouchableOpacity className="bg-[#7ecaf8] px-6 py-3 rounded-full" onPress={handlePress}>
      <Text className="text-white font-bold text-base">{label}</Text>
    </TouchableOpacity>
  );
}
