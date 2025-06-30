import React, { FC } from "react";
import { ScrollView, Text, View, Linking, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "../types";
import {
  NAV_ROUTE_PROVIDER_VOICES,
  NAV_ROUTE_ABOUT,
  NAV_ROUTE_STRUCTURE,
} from "src/constants/routes";

const baseUrl = getBaseUrl();

const HomeScreen: FC = () => {
  const navigation = useNavigation<FoundationNavProp>();

  return (
    <>
      <Helmet>
        <title>Silvia Chavarría González Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The Silvia Chavarría González Foundation supports and empowers verified human breast milk providers through structure, equity, and long-term solidarity."
        />
        <meta
          property="og:title"
          content="Silvia Chavarría González Foundation"
        />
        <meta
          property="og:description"
          content="Learn more about how the Foundation operates, who it serves, and how milk providers can participate."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/home/foundationHero.jpg`}
        />
        <meta property="og:url" content={baseUrl} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="w-full md:max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          {/* Hero Section */}
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/home/foundationHero.jpg")}
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
                  A STRUCTURE BUILT FOR PROVIDERS
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  The Silvia Chavarría González Foundation was designed before
                  the product, before the launch, before the first gram of
                  breast milk ever shipped. Its purpose is to make sure verified
                  milk providers are not just acknowledged —- but included.{" "}
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📫 Stay Informed"
                    description="Get updates on programs, governance milestones, and provider participation."
                    formId={TagsEnum.SIGNUP_HOME_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <View className="h-16 md:h-20" />
          <View className="mb-12  py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/home/SilviaWithPedro.jpg")}
              imageCaption="Silvia Chavarría-González while pregnant with Pedro Alvarado-Chavarría, founder of Vyarna."
              title="Our Story"
              text={
                <>
                  Founded in honor of Silvia Chavarría-González, this Foundation
                  carries forward a legacy of care, courage, and conviction. It
                  is named after a woman who lived with integrity and raised her
                  children with the belief that generosity and justice belong
                  together.
                  {"\n\n"}Most foundations are built to serve others. This one
                  is built to be governed by the very people it serves. The
                  Silvia Chavarría-González Foundation is not charity. It is
                  structure. It is equity. It is a tool of long-term power
                  redistribution—created specifically for women who provide
                  human breast milk.
                  {"\n\n"}Through an innovative legal model, the Foundation
                  holds equity in{" "}
                  <Text
                    className="text-blue-600 underline"
                    onPress={() => Linking.openURL("https://www.vyarna.com")}
                  >
                    Vyarna
                  </Text>
                  —a deep-tech health company that transforms verified breast
                  milk into shelf-stable nutritional powder. That equity is not
                  symbolic. It is real ownership, held in trust for verified
                  providers around the world. The Foundation’s job is to steward
                  that ownership wisely, transparently, and in alignment with
                  the interests of the women whose biology makes the product
                  possible.
                  {"\n\n"}If you are a milk provider and want to learn more
                  about becoming part of this model,{" "}
                  <Text
                    className="text-blue-600 underline"
                    onPress={() =>
                      Linking.openURL("https://www.vyarna.com/for-providers")
                    }
                  >
                    visit this page
                  </Text>
                  .{"\n\n"}We believe milk providers are not just caregivers.
                  They are workers. They are decision-makers. They are the
                  biological and economic source of something irreplaceable—and
                  they deserve more than applause. They deserve structure. And
                  eventually, full control.
                </>
              }
              linkText="Learn more about the foundation."
              onPressLink={() => navigation.navigate(NAV_ROUTE_ABOUT)}
            />
          </View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/home/purposeSection.png")}
              title="Purpose & Beneficiaries"
              imageCaption="Milk provider tools and testing documentation — made visible."
              text={
                <>
                  The purpose of the Silvia Chavarría González Foundation is
                  clear:
                  {"\n\n"}
                  <Text className="italic">
                    To improve the quality of life of those who have provided
                    their breast milk to Vyarna — by offering open and
                    transparent access to services, recognition, and benefits
                    that honor their contribution and ensure ongoing support
                    rooted in solidarity and dignity.
                  </Text>
                  {"\n\n"}
                  That means real infrastructure — not charity. It means
                  building systems that respect, uplift, and eventually transfer
                  power to the women whose milk makes Vyarna possible. From
                  visibility and acknowledgment to long-term equity and
                  participatory governance, the Foundation ensures that
                  providers are not forgotten once the milk is collected. They
                  remain at the center of the story.
                  {"\n\n"}
                  The beneficiaries of the Foundation are exclusively those
                  individuals who have provided verified breast milk to Vyarna.
                  Eligibility is determined through transparent internal
                  contribution records and testing protocols. No future
                  participation is required to retain beneficiary status. No one
                  is excluded based on geography, income, or continued
                  engagement.
                  {"\n\n"}
                  All verified providers are treated with equal standing. Every
                  program, service, and governance right is built around one
                  idea: that milk provision is not just a biological act — it is
                  an economic and ethical one. And it deserves a structure to
                  match.
                </>
              }
              linkText="Our role as Shareholders."
              onPressLink={() => navigation.navigate(NAV_ROUTE_SHAREHOLDER)}
              reverse={true}
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="💌 Be Part of the Movement"
              description="Sign up for program announcements, governance updates, and provider initiatives."
              formId={TagsEnum.SIGNUP_HOME_MIDDLE}
            />
          </View>

          <View className="mb-12  py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/home/providerStories.jpg")}
              title="Provider Voices"
              imageCaption="Silvia Chavarría-González being carried by her mother, Dora Gonzalez-Volio"
              text={
                <>
                  Milk providers govern this foundation. Not
                  metaphorically—legally. Not symbolically—structurally. From
                  the beginning, the Silvia Chavarría González Foundation was
                  designed to recognize the intelligence, agency, and leadership
                  of the women who share life through their milk.
                  {"\n\n"}We believe stories are strategy. The lived experience
                  of providers guides not only the programs we offer, but also
                  the values we defend. Their words have helped shape how the{" "}
                  <Text
                    className="text-blue-600 underline"
                    onPress={() => Linking.openURL("https://www.vyarna.com")}
                  >
                    Vyarna
                  </Text>{" "}
                  product is explained to the world, how risk is distributed,
                  and how dividends will eventually be shared.
                  {"\n\n"}Some providers are single mothers. Others are
                  scientists. Some live in cities; others in rural villages. But
                  all of them carry knowledge that is valuable—not just
                  emotionally, but practically, biologically, and economically.
                  This foundation exists to make that knowledge visible. And
                  audible.
                  {"\n\n"}If you are a milk provider or considering becoming
                  one, your voice belongs here. Not just as testimony—but as
                  leadership.
                  {"\n\n"}You can explore some of those voices, in their own
                  words, below.
                </>
              }
              reverse={true}
              linkText="Hear from the providers."
              onPressLink={() => navigation.navigate(NAV_ROUTE_PROVIDER_VOICES)}
            />
          </View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/home/foundationShares.jpg")}
              title="Structure & Ethics"
              imageCaption="Silvia Chavarría-González"
              text={
                <>
                  The Silvia Chavarría González Foundation is not an advisory
                  body. It is a legal entity—registered as an Estonian
                  nonprofit. It holds equity in{" "}
                  <Text
                    className="text-blue-600 underline"
                    onPress={() => Linking.openURL("https://www.vyarna.com")}
                  >
                    Vyarna
                  </Text>
                  . Not for the board. Not for future investors. For providers.{" "}
                  {"\n\n"}That equity is currently non-voting. But once a major
                  liquidity event occurs (like an IPO or investor exit), the
                  power flips: equity voting rights transfer directly to
                  verified providers.
                  {"\n\n"}Until then, providers already govern the Foundation’s
                  actions. That structure is secure, documented, and auditable.
                  {"\n\n"}This is not philanthropy. This is protection. This is
                  how you delay power until a platform is strong enough to hand
                  it over. We call it stewardship. And it’s how we make sure
                  providers aren’t left behind when the spotlight shifts.
                </>
              }
              linkText="Understand our governance."
              onPressLink={() => navigation.navigate(NAV_ROUTE_STRUCTURE)}
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="Stay Connected"
              description="Subscribe to provider updates, voice recordings, and structural milestones."
              formId={TagsEnum.SIGNUP_HOME_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
