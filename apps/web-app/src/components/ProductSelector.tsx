// src/components/ProductSelector.tsx
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  socketAddCartItem,
  socketCreateCart,
  useSalesCommerce,
} from '../hooks/useSalesCommerce';
import { socketCreateSession } from '../api/session';
import { GetProductsDto } from 'ez-utils';
import { useCartStore } from '../store/cartStore';
import { usePaymentStore } from '../store/paymentStore';
import { formatMoney } from '../utils/currency';

interface Product {
  productId: string;
  name: string;
  description: string;
  images: string[];
  active: boolean;
  priceCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductSelectorProps {
  visible: boolean;
  room: string;
  onClose: () => void;
}

const ProductSelector: FC<ProductSelectorProps> = ({
  visible,
  room,
  onClose,
}) => {
  const { products, error: productsError } = useSalesCommerce(room, {
    active: true,
  } as GetProductsDto);
  const { addItem, openCart, cartId, setCartId, getItemCount } = useCartStore();

  const { sessionId, setSessionId } = usePaymentStore();
  const [loading, setLoading] = useState(true);
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (productsError || products.length > 0) {
      setLoading(false);
    }
  }, [productsError, products]);

  const handleAddToCart = async (product: Product) => {
    setAddError(null);
    setIsAdding(true);

    let sessId = sessionId;
    if (!sessId) {
      try {
        const session = await socketCreateSession('person-session', { personId: null }, { skipLoading: true });
        sessId = session.sessionId;
        setSessionId(sessId);
      } catch (e) {
        console.error('Session error', e);
        setIsAdding(false);
        return;
      }
    }

    let currentCartId = cartId;
    try {
      if (!currentCartId) {
        const cart = await socketCreateCart('sales-commerce', { sessionId: sessId }, { skipLoading: true });
        currentCartId = cart.cartId;
        setCartId(cart.cartId);
      }
      if (currentCartId) {
        await socketAddCartItem(
          'sales-commerce',
          {
            cartId: currentCartId,
            productId: product.productId,
            quantity: 1,
          },
          { skipLoading: true },
        );
      }
    } catch (err: any) {
      console.error('Cart error', err);
      setAddError(err.message || 'Failed to add item');
      setIsAdding(false);
      return;
    }

    // Step 3: add minimal item data locally
    addItem({
      id: product.productId,
      name: product.name,
      description: product.description,
      image: product.images[0]
        ? { uri: product.images[0] }
        : require('../assets/images/preorder/value_proposition.png'),
      priceCents: product.priceCents,
      currency: product.currency,
    });

    setIsAdding(false);
    onClose();
    openCart();
  };


  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md" style={{ position: 'relative' }}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-primary">
                Choose Your Pack
              </Text>
              <Pressable onPress={onClose}>
                <Text className="text-2xl text-secondary">×</Text>
              </Pressable>
            </View>

            {/* Error */}
            {productsError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <Text className="text-red-800 font-semibold mb-2">
                  Failed to Load Products
                </Text>
                <Text className="text-red-700 text-sm mb-3">
                  {String(productsError)}
                </Text>
                <TouchableOpacity
                  className="bg-red-600 px-4 py-2 rounded"
                  onPress={() => setLoading(true)}
                >
                  <Text className="text-white font-semibold text-center">
                    Retry
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {addError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <Text className="text-red-800 font-semibold mb-1">Failed to add item</Text>
                <Text className="text-red-700 text-sm">{addError}</Text>
              </View>
            )}

            {/* Loading */}
            {loading && !productsError && (
              <View className="flex-row items-center justify-center py-8">
                <ActivityIndicator size="large" color="#5AC8FA" />
                <Text className="ml-3 text-secondary">Loading products…</Text>
              </View>
            )}

            {/* Products List */}
            {!loading && !productsError && (
              <View>
                {products.map((p) => (
                  <View
                    key={p.productId}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <View className="flex-row items-center mb-3">
                      <Image
                        source={
                          p.images[0]
                            ? { uri: p.images[0] }
                            : require('../assets/images/preorder/value_proposition.png')
                        }
                        style={{ width: 60, height: 60 }}
                        resizeMode="contain"
                      />
                      <View className="flex-1 ml-3">
                        <Text className="text-lg font-semibold">{p.name}</Text>
                        <Text className="text-sm text-secondary">
                          {p.description}
                        </Text>
                        <Text className="text-base font-bold text-primary mt-1">
                          {formatMoney(p.priceCents, p.currency)}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-end">
                      <TouchableOpacity
                        className="bg-primary px-4 py-2 rounded-lg"
                        onPress={() => handleAddToCart(p)}
                      >
                        <Text className="text-white font-semibold">Add to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* View Cart Button */}
                <View className="flex-row justify-center mt-4">
                  <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${getItemCount() > 0 ? 'bg-primary' : 'bg-secondary'}`}
                    onPress={() => {
                      onClose();
                      openCart();
                    }}
                    disabled={getItemCount() === 0}
                  >
                    <Text className="text-white font-bold text-center text-base">
                      View Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {isAdding && (
            <View className="absolute inset-0 bg-white bg-opacity-60 rounded-xl items-center justify-center">
              <ActivityIndicator size="large" color="#5AC8FA" />
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

export default ProductSelector;
