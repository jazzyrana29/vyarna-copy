import React, { FC } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import Footer from "../components/Footer";
import Email from "../components/Email";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { BenefitsNavProp } from "../types";
import PreorderCTA from "../components/PreorderCTA";

const ContactScreen: FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/ContactUs/contact_hero.png")}
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
                WE ARE LISTENING
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Whether you’re a parent, provider, researcher, or partner — we
                want to hear from you. Vyarna is built on trust, care, and
                collaboration.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Send us a message or join our list for updates and access."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_CONTACT_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <PreorderCTA />

        <View className="bg-[#f9fafb] p-6 rounded-xl shadow-sm mb-12 max-w-2xl mx-auto">
          <Text className="text-lg font-semibold text-[#7ecaf8] mb-4 text-center">
            Direct Contacts
          </Text>
          <Text className="text-base text-neutral-700 text-center mb-2">
            📩 General inquiries:{" "}
            <Text
              className="text-blue-600 underline"
              onPress={() => Linking.openURL("mailto:hello@vyarna.com")}
            >
              hello@vyarna.com
            </Text>
          </Text>
          <Text className="text-base text-neutral-700 text-center mb-2">
            💼 Investor relations:{" "}
            <Text
              className="text-blue-600 underline"
              onPress={() => Linking.openURL("mailto:invest@vyarna.com")}
            >
              invest@vyarna.com
            </Text>
          </Text>
          <Text className="text-base text-neutral-700 text-center mb-2">
            👶 Provider onboarding:{" "}
            <Text
              className="text-blue-600 underline"
              onPress={() => Linking.openURL("mailto:provider@vyarna.com")}
            >
              provider@vyarna.com
            </Text>
          </Text>
        </View>

        <Email
          title="Stay in the Loop"
          description="Sign up for early access, product updates, research insights, and provider opportunities."
          formId={TagsEnum.SIGNUP_CONTACT_BOTTOM}
        />

        <View className="my-12 text-center max-w-2xl mx-auto">
          <Text className="text-lg text-neutral-700">
            We’re here to support you. Expect human replies, transparency, and
            thoughtful communication.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ContactScreen;
