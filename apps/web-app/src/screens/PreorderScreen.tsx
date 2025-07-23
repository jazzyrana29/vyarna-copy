'use client';

import { type FC } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Email from '../components/Email';
import Footer from '../components/Footer';
import Section from '../components/Section';
import PreorderCTA from '../components/PreorderCTA';
import ProductSelector from '../components/ProductSelector';
import { useCartStore } from '../store/cartStore';
import { useProductSelectorStore } from '../store/productSelectorStore';
import { TagsEnum } from '../enums/tags.enum';
import * as Animatable from 'react-native-animatable';

const PreorderScreen: FC = () => {
  const { getItemCount } = useCartStore();
  const visible = useProductSelectorStore((s) => s.visible);
  const openSelector = useProductSelectorStore((s) => s.open);
  const closeSelector = useProductSelectorStore((s) => s.close);

  const handlePreorderClick = () => {
    openSelector();
  };


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require('../assets/images/preorder/preorder_hero.png')}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
            <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
            <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <Text className="text-white text-3xl md:text-5xl font-bold leading-snug drop-shadow-lg max-w-2xl">
                Secure Your First Pack of Vyarna
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Limited early inventory. Verified providers. Real
                milk—reinvented.
              </Text>
              <TouchableOpacity
                className="bg-[#7ecaf8] px-6 py-3 rounded-full mt-6"
                onPress={handlePreorderClick}
              >
                <Text className="text-white font-bold text-base">Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />


        {/* Cart Summary (if items in cart) */}
        {getItemCount() > 0 && (
          <View className="mb-12 bg-[#e8f4fd] px-6 py-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-bold text-primary">
                  {getItemCount()} item(s) in cart
                </Text>
                {/*<Text className="text-base text-neutralText">*/}
                {/*  Total: ${getTotal().toFixed(2)}*/}
                {/*</Text>*/}
                {/*{getTotalSavings() > 0 && (*/}
                {/*  <Text className="text-sm text-green-600">*/}
                {/*    You're saving ${getTotalSavings().toFixed(2)}!*/}
                {/*  </Text>*/}
                {/*)}*/}
              </View>
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-lg"
                onPress={() => useCartStore.getState().openCart()}
              >
                <Text className="text-white font-semibold">View Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* What You Get */}
        <Section
          title="What's In the Box"
          text={`• 150 x 1g Vyarna Booster packets (One month supply!)\n• Individually sealed and shelf-stable\n• Mix into bottle, food, or spoon\n• Includes usage guide and baby-safe scoop`}
          image={require('../assets/images/preorder/box_contents.jpg')}
        />

        {/* Trust Section */}
        <View className="my-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            reverse
            title="Verified Providers. Transparent Testing."
            text={`We work only with screened, compensated providers. Each batch is lab-tested, freeze-dried in our facility, and traceable to origin.\n\nWe're redefining trust in early nutrition.`}
            image={require('../assets/images/preorder/provider_trust.png')}
          />
        </View>

        {/* Value Section */}
        <Section
          title="More Than a Product — A New Standard"
          text={`Vyarna blends milk from diverse providers to concentrate immune and microbiome signals. It's real milk, made accessible.\n\nNo synthetics. No cold chain. Just powerful simplicity.`}
          image={require('../assets/images/preorder/value_proposition.png')}
        />

        {/* Final CTA */}
        <PreorderCTA />

        {/* Email fallback CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Not Ready Yet?"
            description="Leave your email and we'll let you know before we run out of early inventory."
            formId={TagsEnum.SIGNUP_PREORDER_BOTTOM}
          />
        </View>
      </View>
      {/* Product Selector Modal */}
      {visible && (
        <ProductSelector
          room={'get-products'}
          visible={visible}
          onClose={closeSelector}
        />
      )}

      <Footer />
    </ScrollView>
  );
};

export default PreorderScreen;
