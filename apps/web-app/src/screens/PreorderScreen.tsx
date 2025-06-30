import React, { FC } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";

const PreorderScreen: FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/preorder/preorder_hero.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
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
              <TouchableOpacity className="bg-[#7ecaf8] px-6 py-3 rounded-full mt-6">
                <Text className="text-white font-bold text-base">
                  Preorder Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* What You Get */}
        <Section
          title="What’s In the Box"
          text={`• 150 x 1g Vyarna Booster packets (One month supply!)\n• Individually sealed and shelf-stable\n• Mix into bottle, food, or spoon\n• Includes usage guide and baby-safe scoop`}
          image={require("../assets/images/preorder/box_contents.jpg")}
        />

        {/* Trust Section */}
        <View className="my-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            reverse
            title="Verified Providers. Transparent Testing."
            text={`We work only with screened, compensated providers. Each batch is lab-tested, freeze-dried in our facility, and traceable to origin.\n\nWe’re redefining trust in early nutrition.`}
            image={require("../assets/images/preorder/provider_trust.png")}
          />
        </View>

        {/* Value Section */}
        <Section
          title="More Than a Product — A New Standard"
          text={`Vyarna blends milk from diverse providers to concentrate immune and microbiome signals. It’s real milk, made accessible.\n\nNo synthetics. No cold chain. Just powerful simplicity.`}
          image={require("../assets/images/preorder/value_proposition.png")}
        />

        {/* Final CTA */}
        <View className="text-center mb-12">
          <Text className="text-2xl font-bold text-[#d6336c] mb-2">
            Reserve Your Booster Pack
          </Text>
          <Text className="text-base text-neutral-700 mb-4 max-w-2xl mx-auto">
            We are producing limited launch inventory for 2026. Preorder now to
            lock your place—and your discount.
          </Text>
          <TouchableOpacity
            className="bg-[#7ecaf8] px-6 py-3 rounded-full"
            onPress={() => {
              // Add your checkout link or form integration here
            }}
          >
            <Text className="text-white font-bold text-base">Preorder Now</Text>
          </TouchableOpacity>
        </View>

        {/* Email fallback CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Not Ready Yet?"
            description="Leave your email and we’ll let you know before we run out of early inventory."
            formId={TagsEnum.SIGNUP_PREORDER_BOTTOM}
          />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default PreorderScreen;
