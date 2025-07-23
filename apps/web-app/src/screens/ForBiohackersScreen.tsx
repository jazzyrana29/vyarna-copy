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
import PreorderCTA from "../components/PreorderCTA";

export const ForBiohackersScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/forBiohackers/biohackers_hero.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
            <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <Text className="text-white text-3xl md:text-5xl max-w-2xl font-bold leading-snug drop-shadow-lg">
                BIOINFORMATION YOU CAN FEEL
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Human milk isn't just nutrition—it's communication. Vyarna is a
                new way to supplement your wellness stack with bioactive
                information from verified providers.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and unlock early access."
                  description="🧬 Built for wellness. Backed by biology."
                  formId={TagsEnum.SIGNUP_BIOHACKERS_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <PreorderCTA />

        {/* Why Biohackers Use Vyarna */}
        <View className="mb-12">
          <Text className="text-xl md:text-2xl font-bold text-[#7ecaf8] text-center mb-4">
            Why Biohackers Use Vyarna
          </Text>
          <View className="space-y-4 max-w-xl mx-auto text-base text-neutral-700">
            <Text>
              • To access a complex matrix of immune and microbial data
            </Text>
            <Text>
              • To experiment with the biointelligence of milk without needing a
              child
            </Text>
            <Text>
              • To support gut health and immunomodulation through human-derived
              molecules
            </Text>
            <Text>
              • To explore the synergy between human milk and other nootropics
              or probiotics
            </Text>
            <Text>
              • To push the boundaries of biological integration and wellness
            </Text>
          </View>
        </View>

        {/* How Vyarna Works */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="How Vyarna Works"
            text={`• Ethically sourced from verified providers
• Freeze-dried at low temperatures to preserve sensitive bioinformation
• Each batch screened for pathogens, non-human DNA, contaminants, and adulterants
• No additives. No preservatives. No cold chain.
• Fully traceable — down to provider, location, and timestamp
• Combined to reflect natural variation in milk-borne information`}
            image={require("../assets/images/forBiohackers/how_it_works.png")}
          />
        </View>

        {/* How Vyarna Works */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Why It’s Trusted"
            text={`• 4× safety testing across the supply chain: before, during, and after production
• Aligned with Codex Alimentarius and ISO 22000 food safety standards
• Every sachet is QR-coded and trackable to origin
• All providers undergo medical screening, health verification, and DNA trace-matching
• Stored in shelf-stable, single-gram packets for flexible use`}
            image={require("../assets/images/forBiohackers/why_trusted.png")}
            reverse={true}
          />
        </View>

        {/* Email CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Stay on the frontier."
            description="Sign up for exclusive updates, presale access, and scientific insights on human milk as a bioinformational supplement."
            formId={TagsEnum.SIGNUP_BIOHACKERS_MIDDLE}
          />
        </View>

        {/* How to Use */}
        <Section
          image={require("../assets/images/forBiohackers/how_to_use.png")}
          title="Easy to Add. Built to Stack."
          text={`Mix into smoothies, shakes, or adaptogenic blends. Dissolves easily in room temp liquids.\n\nNo fridge. No prep. Just complex milk intelligence in modern form.`}
          linkText="Learn how to use Vyarna."
          onPressLink={() => navigation.navigate(NAV_ROUTE_USE)}
          reverse={true}
        />

        {/* Origins */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Born From the Science of Breast Milk"
            text={`Human milk is nature’s most information-rich substance. It adapts to needs, contains immune cells, and encodes millions of years of bioevolution.

Vyarna captures that information for conscious, modern use.`}
            image={require("../assets/images/forBiohackers/origin_science.png")}
          />
        </View>

        {/* Final Email CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Real milk. Real molecules."
            description="Reserve your Booster supply now and help us bring biointelligent nutrition into the future."
            formId={TagsEnum.SIGNUP_BIOHACKERS_BOTTOM}
          />
        </View>

        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            Vyarna is for explorers of biology. If that’s you, you’re already
            part of the movement.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ForBiohackersScreen;
