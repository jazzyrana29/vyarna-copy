import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { formatMoney } from '../utils/currency';

const OrderSummary: React.FC = () => {
  const { items, getTotalCents, getItemCount } = useCartStore();

  if (items.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-xl font-bold text-primary mb-2">Order Summary</Text>
      <ScrollView className="max-h-40 mb-2">
        {items.map((item) => (
          <View key={item.id} className="flex-row justify-between mb-1">
            <Text className="flex-1 mr-2 text-sm text-neutralText">
              {item.name} x {item.quantity}
            </Text>
            <Text className="text-sm font-semibold text-primary">
              {formatMoney(item.priceCents * item.quantity, item.currency)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-between border-t border-gray-200 pt-2">
        <Text className="font-semibold text-neutralText">
          {getItemCount()} item(s)
        </Text>
        <Text className="font-bold text-primary">
          {formatMoney(getTotalCents(), items[0]?.currency || 'usd')}
        </Text>
      </View>
    </View>
  );
};

export default OrderSummary;
