// components/ProductSelector.tsx
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
import { useSalesCommerce } from '../hooks/useSalesCommerce';

import { GetProductsDto } from 'ez-utils';
import { useCartStore } from '../store/cartStore';

interface Product {
  productId: string;
  name: string;
  description: string;
  images: string[];
  active: boolean;
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
  const { addItem, openCart } = useCartStore();
  const { products, error } = useSalesCommerce(room, {
    active: true,
  } as GetProductsDto);
  const [loading, setLoading] = useState(true);

  // Stop loading once we have data or an error
  useEffect(() => {
    if (error || products.length > 0) {
      setLoading(false);
    }
  }, [error, products]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.productId,
      name: product.name,
      description: product.description,
      image: product.images[0]
        ? { uri: product.images[0] }
        : require('../assets/images/preorder/value_proposition.png'),
    });
    onClose();
    openCart();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
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
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <Text className="text-red-800 font-semibold mb-2">
                Failed to Load Products
              </Text>
              <Text className="text-red-700 text-sm mb-3">{error}</Text>
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
          {loading && !error && (
            <View className="flex-row items-center justify-center py-8">
              <ActivityIndicator size="large" color="#5AC8FA" />
              <Text className="ml-3 text-secondary">Loading products…</Text>
            </View>
          )}

          {/* Products */}
          {!loading &&
            !error &&
            products.map((p) => (
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
                    <Text className="text-lg font-semibold text-neutralText">
                      {p.name}
                    </Text>
                    <Text className="text-sm text-secondary">
                      {p.description}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-end">
                  <TouchableOpacity
                    className="bg-primary px-4 py-2 rounded-lg"
                    onPress={() => handleAddToCart(p)}
                  >
                    <Text className="text-white font-semibold">
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          {/* View Cart */}
          {!loading && !error && (
            <TouchableOpacity
              className="bg-secondary w-full py-3 rounded-lg mt-2"
              onPress={() => {
                onClose();
                openCart();
              }}
            >
              <Text className="text-white font-bold text-center text-base">
                View Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ProductSelector;
