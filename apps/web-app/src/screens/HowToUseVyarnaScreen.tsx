import React, { FC, JSX } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import PreorderCTA from "../components/PreorderCTA";

export const HowToUseVyarnaScreen: FC = (): JSX.Element => {
  const steps = [
    {
      img: require("../assets/images/steps/step_1.jpg"),
      label: "1. Add water & formula powder",
    },
    {
      img: require("../assets/images/steps/step_2.png"),
      label: "2. Shake in a Booster envelope",
    },
    {
      img: require("../assets/images/steps/step_3.jpg"),
      label: "3. Feed your baby",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/HowToUse/VyarnaBox.jpg")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
            <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <Text className="text-white text-3xl md:text-5xl font-bold leading-snug drop-shadow-lg">
                HOW TO USE VYARNA
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Vyarna fits into your feeding routine—whether you use formula,
                pumped milk, or solids.
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                No fridge. No prep time. No stress.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_USE_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>
        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <PreorderCTA />

        {/* Visual Steps */}
        <View className="max-w-screen-xl mx-auto px-4">
          <View className="flex flex-col md:flex-row gap-6 mb-10">
            {steps.map((step, idx) => (
              <View key={idx} className="w-full md:w-1/3 text-center">
                <Image
                  source={step.img}
                  style={{
                    width: "100%",
                    height: 200,
                    resizeMode: "contain",
                    borderRadius: 8,
                  }}
                />
                <Text className="text-sm mt-2 font-bold text-center text-neutral-700">
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Email Capture */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title={"Still using formula alone? You don’t have to."}
            description={
              "Join thousands of early supporters bringing the best of breast milk back into the bottle.💡 Preorders open now. Launch discount included."
            }
            formId={TagsEnum.SIGNUP_USE_MIDDLE}
          />
        </View>

        {/* Common Usage Methods */}
        <View className="mt-12 max-w-screen-xl mx-auto px-4 space-y-8 text-base text-neutral-800 leading-relaxed">
          <Text className="text-xl font-bold text-center text-[#7ecaf8] mb-4">
            Four easy ways to use Vyarna:
          </Text>
          <View className="space-y-6 text-gray-700 text-base">
            <View>
              <Text className="font-bold mb-1">🍼 With Formula</Text>
              <Text>
                Prepare your baby's formula as usual. Then open one Vyarna
                Booster and stir or shake it in. That's it.
              </Text>
            </View>
            <View>
              <Text className="font-bold mb-1">🥣 With Pumped Milk</Text>
              <Text>
                Add Vyarna to freshly pumped or previously chilled milk. Shake
                gently. You can serve immediately or store as you normally
                would.
              </Text>
            </View>
            <View>
              <Text className="font-bold mb-1">
                🥄 With Solids or Spoon Feeding
              </Text>
              <Text>
                Mix a packet into soft foods like oatmeal or purées. Or stir
                into a teaspoon of water and offer by spoon, dropper, or
                syringe.
              </Text>
            </View>
            <View>
              <Text className="font-bold mb-1">🤱 Before Breastfeeding</Text>
              <Text>
                Apply a small amount of mixed Vyarna liquid to the nipple or use
                a supplemental nursing system if guided by a lactation
                consultant.
              </Text>
            </View>
          </View>
        </View>

        {/* Usage Guidelines Section */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            image={require("../assets/images/home/boosterPack.png")}
            title="Usage Guidelines"
            text={`• One envelope = one gram of pure breast milk concentrate.\n• Use up to 5 times per day depending on feeding frequency.\n• Mix only with lukewarm or room-temperature liquids.\n• Do not microwave. Store unused packets in a dry place.`}
          />
        </View>

        {/* Summary Line */}
        <Text className="text-center mt-10 text-base font-medium text-gray-700">
          No learning curve. No cold chain. Just real human milk — ready when
          you are.
        </Text>

        {/* Final CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Let’s get you started."
            description="Get early access, how-to videos, and your first chance to reserve a Booster pack. Real milk. Real easy. Real impact."
            formId={TagsEnum.SIGNUP_USE_BOTTOM}
          />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default HowToUseVyarnaScreen;
