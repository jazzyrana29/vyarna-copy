import React, { FC } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { NAV_ROUTE_SHAREHOLDER } from "src/constants/routes";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "src/types";

const baseUrl = getBaseUrl();

const VyarnaPartnershipScreen: FC = () => {
  const navigation = useNavigation<FoundationNavProp>();
  return (
    <>
      <Helmet>
        <title>
          Partnership with Vyarna | Silvia Chavarría González Foundation
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="How the Silvia Chavarría González Foundation and Vyarna are structurally connected to protect providers and ensure long-term impact."
        />
        <meta property="og:title" content="Partnership with Vyarna" />
        <meta
          property="og:description"
          content="Learn how the Foundation and Vyarna support each other to protect and empower verified milk providers."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/vyarnaPartnership/foundationHero.jpg`}
        />
        <meta property="og:url" content={`${baseUrl}/vyarna-partnership`} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/vyarnaPartnership/foundationHero.jpg")}
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
                  A STRUCTURE TO REMEMBER
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  Vyarna and the Foundation are structurally linked to ensure
                  that milk providers are never forgotten.
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📢 Keep Me Informed"
                    description="Get notified when new governance updates, provider voting plans, and shareholder disclosures become available."
                    formId={TagsEnum.SIGNUP_VYARNA_PARTNERSHIP_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <Section
            title="Built to Remember"
            image={require("../assets/images/vyarnaPartnership/foundationShares.png")}
            imageCaption="Structure, not charity."
            text={
              <>
                Business has short-term memory. Boards change. CEOs change.
                Priorities shift.
                <br />
                <br />
                But milk providers? They’re constant. And essential.
                <br />
                <br />
                So Vyarna did something most companies don’t: It created a
                permanent <Text className="font-semibold">structure</Text> to
                remember.
                <br />
                <br />
                The Silvia Chavarría González Foundation exists to{" "}
                <Text className="font-semibold">
                  ensure that once a provider, always a provider
                </Text>
                . That the people whose biology powers Vyarna are not just
                compensated today—but recognized tomorrow, and protected long
                after the milk is given.
              </>
            }
          />

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              title="Symbiosis, Not Sponsorship"
              image={require("../assets/images/vyarnaPartnership/SilviaWithPedro.jpg")}
              imageCaption="Not a donation. A design."
              text={
                <>
                  This isn’t a CSR program. It’s structural.
                  <br />
                  <br />
                  <Text className="font-semibold">Vyarna's role:</Text>
                  <br />
                  • Builds the platform
                  <br />
                  • Generates income
                  <br />
                  • Transfers equity (4.5%) to the Foundation at the moment of
                  an early investor exit
                  <br />
                  • Commits to ethical sourcing, testing, and ongoing provider
                  support
                  <br />
                  <br />
                  <Text className="font-semibold">The Foundation’s role:</Text>
                  <br />
                  • Holds that equity in trust
                  <br />
                  • Protects provider rights through governance
                  <br />
                  • Develops long-term programs for visibility, care, and
                  solidarity
                  <br />
                  • Ensures that providers remain at the center—even as the
                  company grows
                  <br />
                  <br />
                  Each strengthens the other.{" "}
                  <Text className="font-semibold">
                    Vyarna’s commercial success funds the Foundation.
                  </Text>{" "}
                  The Foundation’s credibility supports Vyarna’s ethical
                  promise.
                </>
              }
              reverse
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📬 Stay Informed"
              description="Get updates on equity transfers, provider governance, and long-term program milestones."
              formId={TagsEnum.SIGNUP_VYARNA_PARTNERSHIP_MIDDLE}
            />
          </View>

          <Section
            title="Equity Means Voice"
            image={require("../assets/images/vyarnaPartnership/structureVoting.png")}
            imageCaption="Voting power embedded in the structure."
            text={
              <>
                The 4.5% equity stake held by the Foundation is not just
                financial—it is{" "}
                <Text className="font-semibold">governance</Text>.
                <br />
                <br />
                That equity comes with{" "}
                <Text className="font-semibold">voting rights</Text>. This means
                milk providers—through the Foundation—have a seat at the table.
                They don’t just receive support. They help shape direction. They
                cannot be ignored.
                <br />
                <br />
                Even as Vyarna scales, even as new investors arrive,{" "}
                <Text className="font-semibold">
                  provider voices remain embedded in decision-making
                </Text>
                —by legal design.
              </>
            }
          />
          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              title="What It Means for Providers"
              image={require("../assets/images/vyarnaPartnership/longTermInclusion.png")}
              imageCaption="Long-term inclusion."
              text={
                <>
                  If you're a milk provider, this structure means:
                  <br />
                  <br />
                  • You're not a one-time input—you’re part of a long-term story
                  <br />
                  • You don’t have to keep giving milk to keep being recognized
                  <br />
                  • You gain access to benefits that grow as Vyarna grows
                  <br />• You have{" "}
                  <Text className="font-semibold">influence</Text> over Vyarna’s
                  future—not just benefits from its past
                  <br />
                  <br />
                  The Foundation’s job is to make sure{" "}
                  <Text className="font-semibold">you’re not forgotten</Text>
                  —not by the next investor, not by the next executive, not by
                  time.
                </>
              }
              reverse={true}
              linkText="Our role as Shareholders."
              onPressLink={() => navigation.navigate(NAV_ROUTE_SHAREHOLDER)}
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📬 Stay Informed"
              description="Get updates on equity transfers, provider governance, and long-term program milestones."
              formId={TagsEnum.SIGNUP_VYARNA_PARTNERSHIP_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default VyarnaPartnershipScreen;
