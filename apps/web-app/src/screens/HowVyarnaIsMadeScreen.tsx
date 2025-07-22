import React, { FC } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { NAV_ROUTE_PREORDER } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { BenefitsNavProp } from "src/types";
import Section from "src/components/Section";
import BoosterCartButton from "../components/BoosterCartButton";

export const HowVyarnaIsMadeScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();

  const steps = [
    {
      icon: require("../assets/images/HowVyarnaIsMade/collect.png"),
      title: "Collect",
      text: "Screened, verified providers share their extra milk. It’s frozen and kept under strict temperature control to preserve key elements.\n\nWe work only with healthy, ethically compensated providers, using medical-grade storage and transport protocols.",
    },
    {
      icon: require("../assets/images/HowVyarnaIsMade/test.png"),
      title: "Test",
      text: "Each batch is rigorously tested for contaminants, pathogens, and toxins. Only clean, high-quality milk proceeds to the next stage.\n\nWe use ISO-aligned lab procedures and third-party verification for safety.",
    },
    {
      icon: require("../assets/images/HowVyarnaIsMade/concentrate.png"),
      title: "Concentrate",
      text: "We gently remove water through freeze-drying. This preserves the essential sugars, proteins, and structures without heat or additives.\n\nThis method avoids damage caused by pasteurization or spray-drying.",
    },
    {
      icon: require("../assets/images/HowVyarnaIsMade/combine.png"),
      title: "Combine",
      text: "We blend milk from multiple providers to reflect the natural variation in breast milk—capturing more of its original richness.\n\nThis creates a broader spectrum of natural milk information in every scoop.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/HowVyarnaIsMade/lab.jpeg")}
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
                HOW VYARNA IS MADE
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Real milk. Carefully preserved. Naturally diverse.
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                We keep what matters—and leave everything else behind.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_IS_MADE_TOP}
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
            🔬 Help us bring this to market
          </Text>
          <Text className="text-base text-neutral-700 mb-4">
            Your preorder helps us scale our ethical testing and preparation
            infrastructure. Be among the first to receive your Booster pack.
          </Text>
          <BoosterCartButton label="Reserve My First Pack" />
        </View>

        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Text className="text-lg text-gray-700 text-center">
            Vyarna was designed to preserve the most important parts of breast
            milk—its complexity, its diversity, and its value. Here's how we do
            it, step by step.
          </Text>
        </View>

        {/* Process */}
        <View className="py-16 px-4 bg-white">
          <View className="flex-row flex-wrap justify-between max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <View
                key={index}
                className="w-full md:w-1/4 items-center mb-12 px-4"
              >
                <Image
                  source={step.icon}
                  style={{ height: 64, width: 64, marginBottom: 16 }}
                />
                <Text className="text-xl font-semibold mb-2">{step.title}</Text>
                <Text className="text-center text-sm text-gray-700">
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Batch Testing Assurance */}
        <View className="mb-12 bg-[#e0f2ff] py-16 text-center px-4 max-w-3xl mx-auto">
          <Section
            title="Every bit is tested, tracked, and traceable."
            image={require("../assets/images/HowVyarnaIsMade/tested_quality.png")} // Replace with your actual icon or image
            text={`🧪 Pathogen screening: bacteria, viruses, toxins
🔗 Batch codes logged, time-stamped, archived
📜 Aligned with ISO and Codex Alimentarius
🧊 Shelf-stable for years — no cold chain needed`}
            reverse={true}
          />
        </View>

        {/* Email Capture */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title={"📬 Be the first to know when Vyarna launches."}
            description={
              "💡 Commercial launch planned in USA, 2026.\n🛡️ Not a medicine. No health claims. Just the good stuff of breast milk."
            }
            formId={TagsEnum.SIGNUP_IS_MADE_MIDDLE}
          />
        </View>

        <View className="py-8 px-4 max-w-3xl mx-auto text-center">
          <Text className="text-2xl font-bold mb-4">
            Why This Process Matters
          </Text>
          <Text className="text-base text-gray-700">
            Most formulas try to mimic the nutrient composition of breast
            milk—but can’t replicate its natural diversity, bioactive signals,
            or microbe-specific sugars. By preserving real milk and combining it
            from multiple providers, Vyarna offers something no synthetic
            product can: the authentic informational richness of human milk.
          </Text>
        </View>

        {/* Comparison Table */}
        <View className="py-16 px-4 bg-white">
          <View className="max-w-4xl mx-auto text-center">
            <Text className="text-2xl font-bold mb-6">
              Not formula. Not synthetic. This is human milk.
            </Text>
            <View className="border rounded-lg p-6 bg-gray-50">
              <View className="flex-row font-semibold text-gray-700">
                <Text className="w-1/3">Feature</Text>
                <Text className="w-1/3 text-center">Formula</Text>
                <Text className="w-1/3 text-center">Vyarna</Text>
              </View>
              {[
                ["Real milk components", "❌", "✅"],
                ["Sourced from humans", "❌", "✅"],
                ["Cold-chain free", "✅", "✅"],
                ["Synthetic additives", "✅", "❌"],
                ["Natural diversity", "❌", "✅"],
                ["Patented process", "❌", "✅"],
              ].map((row, index) => (
                <View
                  key={index}
                  className="flex-row mt-2 text-sm text-gray-600"
                >
                  <Text className="w-1/3">{row[0]}</Text>
                  <Text className="w-1/3 text-center">{row[1]}</Text>
                  <Text className="w-1/3 text-center">{row[2]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="mb-12 bg-[#e0f2ff] py-16 text-center px-4 max-w-3xl mx-auto">
          <Section
            image={require("../assets/images/HowVyarnaIsMade/from_communit_to_child.png")}
            title="From mother to mother. From community to child."
            text={`Vyarna was created to make it easier for families to include more of what breast milk offers—without guilt, without hassle, and without compromise.`}
          />
        </View>
        {/* Final CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Join the waitlist"
            description="Vyarna is launching soon. Sign up to get early access, updates, and behind-the-scenes news."
            formId={TagsEnum.SIGNUP_IS_MADE_BOTTOM}
          />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default HowVyarnaIsMadeScreen;
