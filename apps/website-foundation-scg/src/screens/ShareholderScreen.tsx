import React, { FC } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "../types";
import { NAV_ROUTE_STRUCTURE } from "src/constants/routes";

const baseUrl = getBaseUrl();

const ShareholderScreen: FC = () => {
  const navigation = useNavigation<FoundationNavProp>();

  return (
    <>
      <Helmet>
        <title>Shareholder Role – Silvia Chavarría González Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The Foundation will become a shareholder of Vyarna upon a liquidity event. Learn how that transition is structured and what responsibilities come with it."
        />
        <meta property="og:title" content="Shareholder Role" />
        <meta
          property="og:description"
          content="Learn how equity in Vyarna is held in trust and what the Foundation’s shareholder responsibilities will be."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/home/foundationShares.jpg`}
        />
        <meta property="og:url" content={`${baseUrl}/shareholder-role`} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/home/foundationShares.jpg")}
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
                  Shareholding as Stewardship
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  The Silvia Chavarría González Foundation will become a formal
                  shareholder of Vyarna only after the earliest investors exit.
                  Until then, equity is held in trust.
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📢 Keep Me Informed"
                    description="Get notified when new governance updates, provider voting plans, and shareholder disclosures become available."
                    formId={TagsEnum.SIGNUP_SHAREHOLDERS_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/shareholderRole/SilviaWithPedro.jpg")}
              imageCaption="Silvia Chavarría-González while pregnant with Pedro Alvarado-Chavarría."
              title="Equity, Not Symbolism"
              text={
                <>
                  The Silvia Chavarría González Foundation does not currently
                  hold shares in Vyarna. The equity is held in trust by Pedro
                  Alvarado-Chavarría, founder of Vyarna, with a legal and moral
                  commitment to transfer it to the Foundation.
                  {"\n\n"}
                  That transfer will occur after an early investor exit—such as
                  an IPO or buyout—when the earliest risk-takers have had a
                  chance to realize returns.
                  {"\n\n"}
                  No shares will be assigned to individuals. They will be
                  transferred to the Foundation as a legal entity, which will
                  govern them in line with its Charter—for the benefit of
                  verified milk providers.
                </>
              }
              linkText="Understand our governance."
              onPressLink={() => navigation.navigate(NAV_ROUTE_STRUCTURE)}
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="✨ Join the Waitlist for Voting Rights"
              description="We’ll notify you when we begin the transition to provider-led governance."
              formId={TagsEnum.SIGNUP_SHAREHOLDERS_MIDDLE}
            />
          </View>

          <Section
            image={require("../assets/images/shareholderRole/equityGovernance.png")}
            imageCaption="Shareholding decisions require discipline, timing, and care."
            title="The Duty of a Shareholder"
            text={
              <>
                The Foundation’s future shareholder role is not ceremonial. It
                will hold voting rights, approve dividends, and influence
                Vyarna’s direction. But these rights must be exercised wisely.
                {"\n\n"}
                We believe in a for-profit structure that fuels nonprofit
                outcomes. Vyarna must succeed commercially for the Foundation to
                distribute long-term value.
                {"\n\n"}
                Governance will be guided by strategy, not slogans. We aim to
                demonstrate what ethical capitalism looks like when built to
                redistribute—not extract—wealth.
              </>
            }
            reverse={true}
          />

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/shareholderRole/equiteyTransfer.png")}
              imageCaption="Equity is safeguarded until the moment it can be governed."
              title="A Transfer With Teeth"
              text={
                <>
                  The equity transfer to the Foundation is contractual and
                  irreversible. Once triggered, the Foundation will gain full
                  shareholder rights—permanently.
                  {"\n\n"}
                  We are preparing for that future now: building bylaws,
                  reviewing scenarios, and engaging future stakeholders.
                  {"\n\n"}
                  Once the shares arrive, the Foundation will be ready—not just
                  to receive them, but to steward them.
                </>
              }
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="✨ Join the Waitlist for Voting Rights"
              description="We’ll notify you when we begin the transition to provider-led governance."
              formId={TagsEnum.SIGNUP_SHAREHOLDERS_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default ShareholderScreen;
