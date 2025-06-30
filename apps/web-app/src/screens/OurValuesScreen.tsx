import React, { FC } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { useNavigation } from "@react-navigation/native";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { BenefitsNavProp } from "../types";
import { NAV_ROUTE_PREORDER } from "../constants/routes";

const OurValuesScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/ourValues/our_values_hero.png")}
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
                OUR VALUES
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Vyarna was founded on ethical innovation, health equity, and
                long-term trust. These values guide how we source, test, and
                share every batch.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_VALUES_TOP}
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
            Be Part of the Movement
          </Text>
          <Text className="text-base text-neutral-700 mb-4">
            Your preorder helps us scale ethical sourcing, testing, and provider
            support.
          </Text>
          <TouchableOpacity
            className="bg-[#7ecaf8] px-6 py-3 rounded-full"
            onPress={() => navigation.navigate(NAV_ROUTE_PREORDER)}
          >
            <Text className="text-white font-bold text-base">Preorder Now</Text>
          </TouchableOpacity>
        </View>

        {/* Mission */}
        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Health Equity at the Core"
            text={`Every baby deserves access to the natural richness of human breast milk—regardless of who their parents are, how they feed, or where they live.\n\nVyarna exists to close that gap. Our mission is to make verified, real milk accessible and practical, even when breastfeeding isn't possible.`}
            image={require("../assets/images/ourValues/equity_mission.png")}
          />
        </View>
        {/* CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Share Life. Support Equity."
            description="Get occasional updates on our product launch, provider network, and health equity efforts."
            formId={TagsEnum.SIGNUP_VALUES_MIDDLE}
          />
        </View>

        {/* Ethics & Transparency */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Ethics. Accountability. Trust."
            text={`All our milk is screened, tracked, and traceable. We work with verified providers — compensated fairly, tracked responsibly, and honored for the value they share.\n\nWe are transparent about our processes and respectful of both the science and the people behind the milk.`}
            image={require("../assets/images/ourValues/ethics_transparency.png")}
            reverse={true}
          />
        </View>

        {/* Shared Value */}
        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Shared Success. Shared Value."
            text={`Vyarna isn’t just a company. It’s a shared-value approach to ethical growth.\n\n4.5% of equity is reserved for verified milk providers. An additional 4% of profits is shared among staff and providers.\n\nWe believe in collective investment—and collective reward.`}
            image={require("../assets/images/ourValues/shared_value.png")}
          />
        </View>

        {/* CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Be Part of Something Bigger"
            description="Join our mission-driven community and help bring ethical milk access to more families."
            formId={TagsEnum.SIGNUP_VALUES_BOTTOM}
          />
        </View>

        {/* Final Note */}
        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            We’re building something bigger than a product. We’re building a
            movement—grounded in science, designed for families.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default OurValuesScreen;
