import type { FC } from "react"
import { Modal, View, Text, TouchableOpacity, Pressable, Image } from "react-native"
import { useCartStore } from "../store/cartStore"

interface ProductSelectorProps {
  visible: boolean
  onClose: () => void
}

const ProductSelector: FC<ProductSelectorProps> = ({ visible, onClose }) => {
  const { addItem, openCart } = useCartStore()

  const products = [
    {
      id: "single-booster",
      name: "Vyarna Booster",
      description: "Single 1g booster",
      price: 1.4,
      originalPrice: 2.0,
      image: require("../assets/images/preorder/value_proposition.png"),
    },
    {
      id: "booster-box",
      name: "Vyarna Booster Box",
      description: "150 x 1g boosters",
      price: 200.0,
      originalPrice: 300.0,
      image: require("../assets/images/preorder/box_contents.jpg"),
    },
  ]

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem(product)
    onClose()
    openCart()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md">
          {/* Modal Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-primary">Choose Your Pack</Text>
            <Pressable onPress={onClose}>
              <Text className="text-2xl text-secondary">×</Text>
            </Pressable>
          </View>

          {/* Products */}
          {products.map((product) => (
            <View key={product.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Image source={product.image} style={{ width: 60, height: 60 }} resizeMode="contain" />
                <View className="flex-1 ml-3">
                  <Text className="text-lg font-semibold text-neutralText">{product.name}</Text>
                  <Text className="text-sm text-secondary">{product.description}</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-secondary line-through">${product.originalPrice.toFixed(2)}</Text>
                  <Text className="text-lg font-bold text-primary">${product.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg" onPress={() => handleAddToCart(product)}>
                  <Text className="text-white font-semibold">Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* View Cart Button */}
          <TouchableOpacity
            className="bg-secondary w-full py-3 rounded-lg mt-2"
            onPress={() => {
              onClose()
              openCart()
            }}
          >
            <Text className="text-white font-bold text-center text-base">View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ProductSelector
