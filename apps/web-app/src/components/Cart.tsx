import type { FC } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCartStore } from '../store/cartStore';

interface CartProps {
  visible: boolean;
  onClose: () => void;
  onBackToProducts: () => void;
}

const Cart: FC<CartProps> = ({ visible, onClose, onBackToProducts }) => {
  const { items, removeItem, updateQuantity, resetCart, getTotal } =
    useCartStore();

  const handleProceedToPayment = () => {
    console.log('Proceed to payment with items:', items);
    console.log('Total amount:', getTotal());
    onClose();
  };

  const handleBackToProducts = () => {
    onClose(); // Close cart first
    onBackToProducts(); // Then open product selector
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md max-h-[80%]">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={handleBackToProducts} className="p-1">
              <Text className="text-2xl text-primary">←</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-primary">Your Cart</Text>
            <Pressable onPress={onClose} className="p-1">
              <Text className="text-2xl text-secondary">×</Text>
            </Pressable>
          </View>

          {items.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-lg text-secondary mb-4">
                Your cart is empty
              </Text>
              <Text className="text-sm text-neutralText text-center mb-6">
                Add some Vyarna products to get started!
              </Text>
              <TouchableOpacity
                className="bg-primary px-6 py-3 rounded-lg"
                onPress={handleBackToProducts}
              >
                <Text className="text-white font-semibold">
                  Browse Products
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollView className="max-h-64 mb-4">
                {items.map((item) => (
                  <View
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <View className="flex-row items-center mb-3">
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                      />
                      <View className="flex-1 ml-3">
                        <Text className="text-base font-semibold text-neutralText">
                          {item.name}
                        </Text>
                        <Text className="text-xs text-secondary">
                          {item.description}
                        </Text>
                        <Text className="text-sm font-bold text-primary">
                          ${item.price.toFixed(2)} each
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Text className="text-lg font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="mx-3 text-base font-semibold">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                          onPress={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Text className="text-lg font-bold">+</Text>
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row items-center">
                        <Text className="text-base font-bold text-primary mr-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          className="bg-red-100 px-2 py-1 rounded"
                          onPress={() => removeItem(item.id)}
                        >
                          <Text className="text-red-600 text-xs">Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Cart Summary */}
              <View className="border-t border-gray-200 pt-4 mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold text-neutralText">
                    Total:
                  </Text>
                  <Text className="text-xl font-bold text-primary">
                    ${getTotal().toFixed(2)}
                  </Text>
                </View>
                <Text className="text-sm text-secondary text-center">
                  {items.reduce((count, item) => count + item.quantity, 0)}{' '}
                  item(s) in cart
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="space-y-3">
                <TouchableOpacity
                  className="bg-accent w-full py-3 rounded-lg"
                  onPress={handleProceedToPayment}
                >
                  <Text className="text-white font-bold text-center text-base">
                    Proceed to Payment
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-200 w-full py-3 rounded-lg"
                  onPress={resetCart}
                >
                  <Text className="text-neutralText font-semibold text-center text-base">
                    Reset Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Cart;
