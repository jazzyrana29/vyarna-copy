import React, { FC } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { TagsEnum } from "../enums/tags.enum";
import { useNavigation } from "@react-navigation/native";
import { BenefitsNavProp } from "../types";
import * as Animatable from "react-native-animatable";
import { NAV_ROUTE_PREORDER } from "../constants/routes";
import PreorderCTA from "../components/PreorderCTA";

export const ForProvidersScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/forProviders/provider_hero.png")}
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
                SHARE LIFE. BECOME A VYARNA PROVIDER.
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Vyarna connects verified mothers with families who need breast
                milk's unique benefits. Your extra milk can make a lasting
                impact.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Want to become a Vyarna Provider?"
                  description="Join our waitlist to get early access to onboarding, compensation details, and exclusive provider tools."
                  formId={TagsEnum.SIGNUP_PROVIDERS_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <PreorderCTA />

        {/* Why Providers Join */}
        <View className="mb-12">
          <Text className="text-xl md:text-2xl font-bold text-[#7ecaf8] text-center mb-4">
            Why Mothers Choose to Share
          </Text>
          <View className="space-y-4 max-w-xl mx-auto text-base text-neutral-700">
            <Text>• I had extra milk and wanted to help others.</Text>
            <Text>
              • I wanted to support babies whose parents couldn’t breastfeed.
            </Text>
            <Text>
              • I was looking for a safe and ethical way to contribute.
            </Text>
            <Text>• I believe in the power of shared health.</Text>
          </View>
        </View>

        {/* How It Works */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="How the Program Works"
            text={`• Screening and verification process to ensure safety and quality.\n• We provide containers, instructions, and logistics support.\n• Milk is picked up or shipped frozen.\n• You’re compensated and part of a broader mission.\n• All batches are tested, tracked, and traceable.`}
            image={require("../assets/images/forProviders/how_it_works.png")}
          />
        </View>
        {/* CTA Email Sign-up */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Want to help other families thrive?"
            description="Sign up to learn how to become a verified Vyarna provider. We’ll walk you through the process—and the impact you’ll make."
            formId={TagsEnum.SIGNUP_PROVIDERS_MIDDLE}
          />
        </View>

        {/* What Makes Vyarna Different */}
        <Section
          title="What Makes Vyarna Different"
          text={`• Ethically structured and medically guided.\n• Providers retain a stake in the platform's success.\n• 4.5% of equity reserved for providers.\n• We preserve the value of milk by preserving its complexity.\n• Transparent process with respect at every step.`}
          image={require("../assets/images/forProviders/value_equity.png")}
          reverse={true}
        />

        {/* Provider Impact */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Your Impact"
            text={`Every gram of your milk adds microbial diversity, immune strength, and developmental resilience to a baby’s bottle.\n\nYou’re not just feeding a baby. You’re contributing to a next-generation solution for health and nutrition.`}
            image={require("../assets/images/forProviders/provider_impact.png")}
          />
        </View>

        {/* CTA Email Sign-up */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="This isn’t just milk. It’s a mission."
            description="Join a growing network of trusted, well-compensated providers. Together, we’re expanding access to the benefits of breast milk."
            formId={TagsEnum.SIGNUP_PROVIDERS_BOTTOM}
          />
        </View>

        {/* Final Message */}
        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            Sharing your milk isn’t just generous—it’s transformative. Vyarna
            gives you a safe, respectful, and meaningful way to make a
            difference.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ForProvidersScreen;
