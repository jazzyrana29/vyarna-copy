import React, { FC } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";

const baseUrl = getBaseUrl();

const ProgramsScreen: FC = () => {
  return (
    <>
      <Helmet>
        <title>Programs – Silvia Chavarría González Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Explore the program areas being developed by the Foundation, shaped by feedback from verified milk providers."
        />
        <meta property="og:title" content="Foundation Programs" />
        <meta
          property="og:description"
          content="The Silvia Chavarría González Foundation is co-designing its support programs with the verified milk providers it serves."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/programs/foundationHero.jpg`}
        />
        <meta property="og:url" content={`${baseUrl}/programs`} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/programs/foundationHero.jpg")}
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
                  Programs Built with Providers
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  The Foundation doesn’t prescribe — it listens. Programs will
                  be shaped through real input from those who matter most.
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📫 Stay Informed"
                    description="Get updates on programs, governance milestones, and provider participation."
                    formId={TagsEnum.SIGNUP_PROGRAMS_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <Section
            image={require("../assets/images/programs/SilviaWithPedro.jpg")}
            imageCaption="An evolving future: shaped by the people it serves."
            title="A Future Shaped by Providers"
            text={
              <>
                The Silvia Chavarría González Foundation was created with one
                purpose: to serve the needs of verified breast milk providers.
                But instead of assuming what those needs are, we’ve chosen a
                different path.
                {"\n\n"}
                We are building the programs{" "}
                <Text className="font-semibold">with you, not for you</Text>.
                {"\n\n"}
                We believe real support starts with listening. That’s why the
                Foundation has not pre-selected a fixed set of benefits or
                services. Instead, we are actively gathering feedback from
                providers, researchers, and health professionals to shape a set
                of offerings that are practical, respectful, and
                provider-driven.
              </>
            }
          />

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/programs/purposeSection.png")}
              imageCaption="Examples under exploration, shaped by provider voice."
              title="A Few Areas We’re Exploring"
              text={
                <>
                  While nothing is finalized, some early ideas include:
                  {"\n\n"}• Education Support — grants or stipends for studies
                  or certification.{"\n"}• Health and Wellness Access — support
                  for physical and mental health.{"\n"}• Economic Empowerment
                  Tools — access to legal or cooperative frameworks.{"\n"}•
                  Research and Policy Participation — contributions to science
                  and public narrative.
                </>
              }
              reverse={true}
            />
          </View>

          <Section
            image={require("../assets/images/programs/livingProcess.png")}
            imageCaption="Pod-based governance and feedback infrastructure in progress."
            title="A Living Process"
            text={
              <>
                Program decisions will ultimately be guided by the{" "}
                <Text className="font-semibold">
                  Pod-based governance model
                </Text>
                . Verified providers will help decide what gets funded, how
                resources are prioritized, and which new ideas to test.
                {"\n\n"}
                Until the full governance model is activated, you can help shape
                our roadmap:
                {"\n\n"}
                📣{" "}
                <Text className="font-semibold">
                  Submit an idea, request, or dream.
                </Text>
                {"\n\n"}
                We are listening. The Foundation is still in its formative
                stage, and your input will influence how it grows.
              </>
            }
          />

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="💡 Suggest a Program Idea"
              description="Your voice matters. Let us know what kind of support would help you — or someone like you."
              formId={TagsEnum.SIGNUP_PROGRAMS_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default ProgramsScreen;
