import React, { FC } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { useNavigation } from "@react-navigation/native";
import { BenefitsNavProp } from "../types";
import { NAV_ROUTE_USE, NAV_ROUTE_PREORDER } from "../constants/routes";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import BoosterCartButton from "../components/BoosterCartButton";

export const ForParentsScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/forParents/feeding_bonding.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
            <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <Text className="text-white text-3xl md:text-5xl max-w-2xl  font-bold leading-snug drop-shadow-lg">
                BECAUSE FEEDING YOUR BABY SHOULDN'T COME WITH GUILT
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Whether you’re formula-feeding, supplementing, or weaning,
                Vyarna helps you include more of what matters—real human milk,
                made simple.
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Add one Booster to formula, pumped milk, or solids. No judgment.
                Just real milk, made flexible.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_PARENTS_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <View className="mb-12 bg-[#fff5f7] px-6 py-8 rounded-xl shadow-md text-center max-w-3xl mx-auto">
          <Text className="text-2xl font-bold text-[#d6336c] mb-2">
            Support Our Provider Network.
          </Text>
          <Text className="text-base text-neutral-700 mb-4">
            Your purchase helps equip and compensate verified milk providers.
          </Text>
          <BoosterCartButton label="Preorder Now" />
        </View>

        {/* Why Parents Use Vyarna */}
        <View className="mb-12">
          <Text className="text-xl md:text-2xl font-bold text-[#7ecaf8] text-center mb-4">
            Why Parents Use Vyarna
          </Text>
          <View className="space-y-4 max-w-xl mx-auto text-base text-neutral-700">
            <Text>• I wanted to give my baby more than formula.</Text>
            <Text>
              • I can’t breastfeed, but I still wanted to give breast milk.
            </Text>
            <Text>• My supply dropped when I returned to work.</Text>
            <Text>• I’m pumping, but it’s not enough.</Text>
            <Text>
              • I want to support my baby’s development with real breast milk.
            </Text>
          </View>
        </View>

        {/* How Vyarna Helps */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            image={require("../assets/images/forParents/VYARNA_FEED.png")}
            title="How Vyarna Helps"
            text={`• Sourced from verified providers\n• Freeze-dried to preserve what matters\n• Shelf-stable, single-gram packets\n• Blended for microbiome diversity\n• Tested, tracked, traceable\n• Add to any bottle, cup, or spoon`}
          />
        </View>

        {/* CTA Email Sign-up */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="You're not alone — and you're doing great."
            description="Sign up to hear how other parents are using Vyarna, and get early access to Booster packs when we launch."
            formId={TagsEnum.SIGNUP_PARENTS_MIDDLE}
          />
        </View>

        {/* How to Use Teaser */}
        <Section
          image={require("../assets/images/forParents/family_moment.png")}
          title="Simple to Use—Every Day"
          text={`Add it to formula, mix into soft foods, or apply before nursing. No cold chain. No stress.
            
Vyarna slips into your routine. Mix it into formula, stir it into oatmeal, or dissolve it in water and offer by spoon.
            
No fridge. No learning curve. Just breast milk—delivered the modern way.
            
            `}
          linkText="Learn how to use Vyarna."
          onPressLink={() => navigation.navigate(NAV_ROUTE_USE)}
          reverse={true}
        />
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Why We Created Vyarna"
            text={`Vyarna was designed for real life—because feeding isn’t always easy, and formula alone doesn’t offer the full spectrum of what human milk can do.
            
With Vyarna, you can boost every bottle, bowl, or spoon with milk-borne bio-information from screened, diverse, verified providers.
            
No guilt. No cold chain. Just a new kind of nutritional confidence.`}
            image={require("../assets/images/forParents/booster_in_kitchen.png")}
          />
        </View>

        {/* CTA Email Sign-up */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Give Your Baby the Best"
            description="Join thousands of parents adding Vyarna to their feeding routine. Sign up to get early access, updates, and special pricing."
            formId={TagsEnum.SIGNUP_PARENTS_BOTTOM}
          />
        </View>

        {/* Final Message */}
        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            Every baby deserves access to breast milk’s complexity—even if you
            can’t breastfeed. Vyarna helps you bridge the gap.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ForParentsScreen;
