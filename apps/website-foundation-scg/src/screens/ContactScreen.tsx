import React, { FC } from "react";
import { ScrollView, Text, View, Linking, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";

const baseUrl = getBaseUrl();

const ContactScreen: FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Silvia Chavarría González Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Reach out to the Silvia Chavarría González Foundation. Whether you're a milk provider, researcher, or ally, we want to hear from you."
        />
        <meta property="og:title" content="Contact the Foundation" />
        <meta
          property="og:description"
          content="Have questions or want to get involved? Contact the Silvia Chavarría González Foundation."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/contact/foundationContact.jpg`}
        />
        <meta property="og:url" content={baseUrl + "/contact"} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/contact/foundationContact.jpg")}
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
                  We’d Love to Hear From You
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  Whether you’re a provider, partner, researcher, or just
                  curious, we welcome your questions and connections.
                </Text>
              </View>
            </View>
          </Animatable.View>

          <Section
            title="General Contact"
            text={
              <>
                We’re a small team with a big mission. If you have questions,
                ideas, or want to learn more about the Foundation, please reach
                out.
                {"\n\n"}Email:{" "}
                <Text
                  className="text-blue-600"
                  onPress={() =>
                    Linking.openURL("mailto:hello@silviachavarriagonzalez.com")
                  }
                >
                  hello@silviachavarriagonzalez.com
                </Text>
              </>
            }
          />

          <Section
            title="Media & Research"
            text={
              <>
                For press or academic inquiries:
                {"\n\n"}Media:{" "}
                <Text
                  className="text-blue-600"
                  onPress={() =>
                    Linking.openURL("mailto:media@silviachavarriagonzalez.com")
                  }
                >
                  media@silviachavarriagonzalez.com
                </Text>
                {"\n"}Research:{" "}
                <Text
                  className="text-blue-600"
                  onPress={() =>
                    Linking.openURL(
                      "mailto:research@silviachavarriagonzalez.com",
                    )
                  }
                >
                  research@silviachavarriagonzalez.com
                </Text>
              </>
            }
          />

          <Section
            title="Provider Participation"
            text={
              <>
                Are you a verified milk provider or thinking about becoming one?
                We’re building programs and governance pathways for you.
                {"\n\n"}You can:
                {"\n"}- Read our governing charter
                {"\n"}- Visit the structure page
                {"\n"}- Or simply ask us a question above
              </>
            }
          />

          <Section
            title="Global Location"
            text={
              <>
                We’re registered in Estonia, but our mission is global.
                {"\n\n"}We collaborate across borders and time zones to build a
                structure that works for all verified providers, no matter where
                they are.
              </>
            }
          />

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📬 Receive Foundation Updates"
              description="Be the first to know when new rules, representatives, or voting processes go live."
              formId={TagsEnum.SIGNUP_CONTACT_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default ContactScreen;
