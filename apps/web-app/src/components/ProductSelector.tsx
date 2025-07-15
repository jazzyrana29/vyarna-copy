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
import { useCurrency } from '../hooks/useCurrency';
import { GetProductsDto } from 'ez-utils';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import UserDetailsModal from './UserDetailsModal';
import { formatMoney } from '../utils/currency';

interface Product {
  productId: string;
  name: string;
  description: string;
  images: string[];
  active: boolean;
  priceCents: number;
  targetCurrency: string;
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
  const currency = useCurrency();
  const { products, error: productsError } = useSalesCommerce(room, {
    active: true,
    targetCurrency: currency,
  } as GetProductsDto);
  const { addItem, openCart, cartId, setCartId, getItemCount } = useCartStore();

  const person = useUserStore((s) => s.userDetails);
  const contactLoading = false;
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productsError || products.length > 0) {
      setLoading(false);
    }
  }, [productsError, products]);

  const handleAddToCart = async (product: Product) => {
    if (!person) {
      setPendingProduct(product);
      setShowUserModal(true);
      return;
    }

    let currentCartId = cartId;
    try {
      if (!currentCartId && person.personId) {
        const cart = await socketCreateCart('sales-commerce', { personId: person.personId });
        currentCartId = cart.cartId;
        setCartId(cart.cartId);
      }
      if (currentCartId) {
        await socketAddCartItem('sales-commerce', {
          cartId: currentCartId,
          variantId: product.productId,
          quantity: 1,
        });
      }
    } catch (err) {
      console.error('Cart error', err);
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
      currency: product.targetCurrency,
    });

    // Step 4: close modal & open cart
    onClose();
    openCart();
  };

  // when user details are saved, retry pending product
  const handleUserSaved = () => {
    setShowUserModal(false);
    if (pendingProduct) {
      handleAddToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md">
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
                          {formatMoney(p.priceCents, p.targetCurrency)}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-end">
                      <TouchableOpacity
                        className="bg-primary px-4 py-2 rounded-lg"
                        onPress={() => handleAddToCart(p)}
                        disabled={contactLoading}
                      >
                        {contactLoading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text className="text-white font-semibold">
                            Add to Cart
                          </Text>
                        )}
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
        </View>
      </Modal>

      {/* User Details Modal */}
      <UserDetailsModal
        visible={showUserModal}
        onSave={handleUserSaved}
        onClose={() => setShowUserModal(false)}
      />
    </>
  );
};

export default ProductSelector;
