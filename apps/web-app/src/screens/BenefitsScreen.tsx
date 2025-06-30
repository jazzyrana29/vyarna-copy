import React, { FC, JSX } from "react";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Animatable from "react-native-animatable";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { TagsEnum } from "../enums/tags.enum";
import { NAV_ROUTE_PREORDER } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { BenefitsNavProp } from "src/types";

const IFRAME_LINK = "https://www.youtube.com/embed/1PgHmLarU7c";
const IFRAME_LINK_2 = "https://youtube.com/embed/8G8zWXWNFeA";
const IFRAME_LINK_3 = "https://youtube.com/embed/gDJFxi17WV0";

const BenefitsScreen: FC = (): JSX.Element => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          {/* Hero Section */}
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
              <Image
                source={require("../assets/images/benefits/benefits_vyarna.png")}
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
                  EVERY BABY DESERVES BREAST MILK'S BENEFITS
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  Even if they don’t breastfeed.
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  That’s the reason Vyarna exists.
                </Text>
                <View className="mt-6 w-full max-w-md">
                  <Email
                    title="📬 Join the waitlist — and reserve your launch discount."
                    description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                    formId={TagsEnum.SIGNUP_BENEFITS_TOP}
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
              Real milk. Real benefits. Reserved just for you.
            </Text>
            <Text className="text-base text-neutral-700 mb-4">
              Preorder your first Vyarna Booster pack and be part of a new era
              in infant nutrition.
            </Text>
            <TouchableOpacity
              className="bg-[#7ecaf8] px-6 py-3 rounded-full"
              onPress={() => navigation.navigate(NAV_ROUTE_PREORDER)}
            >
              <Text className="text-white font-bold text-base">
                Preorder Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section 1 */}
          <Animatable.View animation="fadeInDown" delay={200}>
            <View className="w-full flex-col md:flex-row items-center mb-6 px-4 py-4 max-w-screen-xl mx-auto">
              <View className="w-full md:w-1/2 md:mr-5">
                <Text className="text-2xl font-bold text-primary text-center md:text-left">
                  BREAST MILK HELPS BRAIN GROWTH
                </Text>
                <Text className="text-base font-bold text-neutralText text-center md:text-left mb-2">
                  Vyarna brings real milk components into every bottle — made
                  accessible for more families.
                </Text>
                <Animatable.View animation="fadeInUp" delay={1200}>
                  {Platform.OS !== "web" ? (
                    <WebView
                      source={{ uri: IFRAME_LINK }}
                      style={{ flex: 1 }}
                      javaScriptEnabled
                      domStorageEnabled
                    />
                  ) : (
                    <iframe
                      src={IFRAME_LINK}
                      style={{ minHeight: 250 }}
                      title="Vyarna Booster Video"
                    />
                  )}
                </Animatable.View>
              </View>
              <View className="w-full md:w-1/2 h-full rounded-lg overflow-hidden mt-4 md:mt-0 items-center">
                <Animatable.View animation="fadeInUp" delay={1200}>
                  <Text className="text-base font-bold text-neutralText text-center md:text-left mb-2">
                    Breast milk contains components that may support cognitive
                    development
                  </Text>
                  <Text className="text-secondary text-center md:text-left">
                    {`Studies suggest breast milk may support early brain development. A 2022 study found that babies who received breast milk for at least three months scored 15% higher in cognitive tests at age 5.

Breast milk is the best you can give a baby. It is packed with antibodies, microbiome and so many other things that help babies grow and supports early development. However, not all parents are able to breastfeed. Breastfeeding can be hard.

Vyarna is made from real breast milk—gently preserved and lab-tested for purity and quality. It’s a practical way to include human milk in more feeding routines.`}
                  </Text>
                </Animatable.View>
              </View>
            </View>
          </Animatable.View>
          <View className="px-6 py-8 max-w-3xl mx-auto">
            <Email
              title={"MY BABY NEEDS THIS, HOW DO I GET VYARNA?"}
              description={
                "Sign up to reserve your Booster and help bring Vyarna to families who need it most."
              }
              formId={TagsEnum.SIGNUP_BENEFITS_MIDDLE}
            />
          </View>

          {/* Section 2 */}
          <Animatable.View animation="fadeInDown" delay={200}>
            <View className="w-full flex-col md:flex-row items-center mb-6 px-4 py-4 max-w-screen-xl mx-auto">
              <View className="w-full md:w-1/2 md:mr-5">
                <Text className="text-2xl font-bold text-primary text-center md:text-left mb-2">
                  IMMUNE SYSTEM
                </Text>
                <Animatable.View animation="fadeInUp" delay={1200}>
                  {Platform.OS !== "web" ? (
                    <WebView
                      source={{ uri: IFRAME_LINK_2 }}
                      style={{ flex: 1 }}
                      javaScriptEnabled
                      domStorageEnabled
                    />
                  ) : (
                    <iframe
                      src={IFRAME_LINK_2}
                      style={{ minHeight: 250 }}
                      title="Vyarna Booster Video"
                    />
                  )}
                </Animatable.View>
              </View>
              <View className="w-full md:w-1/2 h-full rounded-lg overflow-hidden mt-4 md:mt-0 items-center">
                <Animatable.View animation="fadeInUp" delay={1200}>
                  <Text className="text-base font-bold text-neutralText text-center md:text-left mb-2">
                    Breast milk naturally contains protective components
                  </Text>
                  <Text className="text-secondary text-center md:text-left">
                    {`It was once believed that babies only received immunity from their mothers during the breastfeeding phase, primarily through proteins like antibodies. This immunity was thought to end once breastfeeding ceased. However, recent research reveals that immunity can be transferred long-term, even beyond breastfeeding.

Surprisingly, this protection doesn’t come from antibodies but from immune cells in the mother’s milk. Breast milk naturally contains immune cells and protective factors that support infant development. These components are present in the milk used to make Vyarna.

Vyarna is made from 100% natural breast milk that is processed to preserve all the best bioactive compounds. Our process preserves the naturally occurring elements found in verified breast milk—without synthetic additives or preservatives.`}
                  </Text>
                </Animatable.View>
              </View>
            </View>
          </Animatable.View>
          <View className="px-6 py-8 max-w-3xl mx-auto">
            <Email
              title={"VYARNA IS COMING SOON"}
              description={
                "Sign-up to our email to be the first to know when Vyarna is available. Get special early bird prices when we start delivering to your doorstep."
              }
              formId={TagsEnum.SIGNUP_BENEFITS_MIDDLE}
            />
          </View>

          {/* Section 3 */}
          <Animatable.View animation="fadeInDown" delay={200}>
            <View className="w-full flex-col md:flex-row items-center mb-6 px-4 py-4 max-w-screen-xl mx-auto">
              <View className="w-full md:w-1/2 md:mr-5">
                <Text className="text-2xl font-bold text-primary text-center md:text-left mb-2">
                  MICROBIOME DIVERSITY
                </Text>
                <Animatable.View animation="fadeInUp" delay={1200}>
                  {Platform.OS !== "web" ? (
                    <WebView
                      source={{ uri: IFRAME_LINK_3 }}
                      style={{ flex: 1 }}
                      javaScriptEnabled
                      domStorageEnabled
                    />
                  ) : (
                    <iframe
                      src={IFRAME_LINK_3}
                      style={{ minHeight: 250 }}
                      title="Vyarna Booster Video"
                    />
                  )}
                </Animatable.View>
              </View>
              <View className="w-full md:w-1/2 h-full rounded-lg overflow-hidden mt-4 md:mt-0 items-center">
                <Animatable.View animation="fadeInUp" delay={1200}>
                  <Text className="text-base font-bold text-neutralText text-center md:text-left mb-2">
                    Breast milk supports the infant microbiome
                  </Text>
                  <Text className="text-secondary text-center md:text-left">
                    {`“…I think it’s important to acknowledge that human breast milk is the perfect food and there’s parts of it that we don’t understand or are just beginning to understand that were designed to make it the perfect food, galvanized through millions of years of human evolution.”

– Will Bulsiewicz MD MSC @theguthealthmd

Breastmilk seeds and nurtures the microbiome with beneficial bacteria, until it is fully mature. A balanced microbiome is part of early-life development. Beneficial gut bacteria may play a role in overall digestive health.

Vyarna preserves this microbial diversity through a gentle freeze-drying process that retains naturally occurring components found in verified human milk.`}
                  </Text>
                </Animatable.View>
              </View>
            </View>
          </Animatable.View>
          <View className="px-6 py-8 max-w-3xl mx-auto">
            <Email
              title={"Share in the future of infant health."}
              description={
                "Sign up to get early access to Vyarna, plus updates on our science, launch, and impact."
              }
              formId={TagsEnum.SIGNUP_BENEFITS_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default BenefitsScreen;
