import React, { FC } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Email from "../components/Email";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { BenefitsNavProp } from "../types";
import PreorderCTA from "../components/PreorderCTA";

const InvestorsScreen: FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/investors/investor_hero.png")}
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
                INVEST IN THE FUTURE OF INFANT HEALTH
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Vyarna is building a new category: verified human milk
                supplementation. We combine ethical sourcing, protected IP, and
                a defensible, science-backed brand.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_INVESTORS_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <PreorderCTA />

        {/* Market Opportunity */}
        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Market Timing & Category Creation"
            text={`Infant nutrition is a $90B market stuck in formula thinking. Vyarna redefines what’s possible with real milk, shelf-stable and safe.\n\nVyarna introduces a new product class: breast milk boosters—real milk, shelf-stable, traceable, and safe.\n\nWe are first-to-market with a patented format and regulatory roadmap already underway.`}
            image={require("../assets/images/investors/market_opportunity.png")}
          />
        </View>

        {/* Our Edge */}
        <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="A Defensible Advantage"
            text={`Vyarna combines scientific credibility, modern branding, and proprietary processing IP.\n\nWe own our supply chain, incentivize verified providers, and maintain strict safety protocols in line with Codex and ISO standards.\n\nNo other company combines provider equity, microbiome diversity, and shelf-stable safety in a single, consumer-ready format.`}
            image={require("../assets/images/investors/defensible_edge.png")}
            reverse={true}
          />
        </View>

        {/* CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Start the Conversation"
            description="oin aligned investors shaping the next evolution in infant nutrition. Get the full pitch deck and regulatory path."
            formId={TagsEnum.SIGNUP_INVESTORS_MIDDLE}
          />
        </View>

        {/* Use of Funds */}
        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm">
          <Section
            title="Capital Efficient, Milestone-Focused"
            text={`Funds will accelerate FDA-aligned safety testing, product finalization, freeze-drying scale-up, and targeted customer acquisition.\n\nOur pilot is validated. Your capital powers commercialization.`}
            image={require("../assets/images/investors/use_of_funds.png")}
          />
        </View>

        {/* Pitch Deck & Contact Prompt */}
        <View className="bg-[#f9fafb] py-8 px-6 rounded-xl shadow-sm mb-12">
          <Text className="text-xl font-bold text-[#7ecaf8] text-center mb-2">
            Request Our Investor Materials
          </Text>
          <Text className="text-base text-center text-gray-700 max-w-2xl mx-auto mb-4">
            Get the full pitch deck, financial model, and regulatory timeline by
            submitting your email below. For direct contact, email us at{" "}
            <Text
              className="text-blue-600 underline"
              onPress={() => Linking.openURL("mailto:investors@vyarna.com")}
            >
              investors@vyarna.com
            </Text>
            .
          </Text>
        </View>

        {/* CTA */}
        <View className="px-6 py-8 max-w-3xl mx-auto">
          <Email
            title="Let’s Talk."
            description="We're closing out our current round with mission-aligned partners. Let us know if you'd like to review the deck and data room."
            formId={TagsEnum.SIGNUP_INVESTORS_BOTTOM}
          />
        </View>

        {/* Final Note */}
        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            Investing in Vyarna means backing a platform with societal impact,
            scientific depth, and global scale.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default InvestorsScreen;
