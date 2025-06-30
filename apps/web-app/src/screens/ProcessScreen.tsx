import React, { FC, JSX } from "react";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Animatable from "react-native-animatable";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { TagsEnum } from "../enums/tags.enum";

const IFRAME_LINK = "https://www.youtube.com/embed/1PgHmLarU7c";
export const ProcessScreen: FC = (): JSX.Element => (
  <>
    <ScrollView className={`flex-1  py-6`}>
      <Animatable.View animation="fadeInDown" delay={200}>
        <View
          className={`w-full flex-col md:flex-row items-center mb-6 px-8 py-4`}
        >
          <View className="w-full md:w-1/2 md:mr-5">
            <Text
              className={`text-2xl font-bold text-primary text-center md:text-left `}
            >
              SAFETY FIRST
            </Text>
            <Text
              className={`text-base font-bold text-neutralText text-center md:text-left mb-2`}
            >
              Vyarna Gives Every Baby the Benefts of Breast Milk.
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
          {/* Video Embed */}
          <View
            className={`w-full md:w-1/2 h-full rounded-lg overflow-hidden  mt-4 md:mt-0 items-center`}
          >
            <Animatable.View animation="fadeInUp" delay={1200}>
              <Text
                className={`text-base font-bold text-neutralText text-center md:text-left mb-2`}
              >
                No Pathogens
              </Text>
              <Text className="text-secondary text-center md:text-left">
                {`All the breast milk that is utilized for vyarna has been thoroughly tested to guarantee that it is safe to consume. Our strict protocol ensures that no drugs, diseases or other toxic things will ever be in Vyarna

Vyarna is made from 100% natural breast milk that is processed to preserve all the best bioactive compounds, especially those needed for immune defenses.`}
              </Text>

              <Text
                className={`text-base font-bold text-neutralText text-center md:text-left my-4`}
              >
                All the Great things!
              </Text>
              <Text className="text-secondary text-center md:text-left">
                {`Vyarna Information Booster is GUARANTEED to have which concentrations of bio-information diversity. .`}
              </Text>
            </Animatable.View>{" "}
          </View>
        </View>
        {/* Text */}
      </Animatable.View>

      <Email
        title={"VYARNA IS COMING SOON"}
        description={
          "Sign-up to our email to be the first to know when Vyarna is available. Get special early bird prices when we start delivering to your doorstep."
        }
        formId={TagsEnum.SIGNUP_IS_MADE_MIDDLE}
      />

      <Animatable.View animation="fadeInDown" delay={200}>
        <View className="w-full flex-col md:flex-row justify-center items-start mb-6 px-8">
          {[
            {
              src: require("../assets/images/process/provider.png"),
              title: "PROVIDERS",
              desc: "Providers will be treated with the utmost respect, paid fairly, and will have the opportunity to work with us in a holistic way.",
            },
            {
              src: require("../assets/images/process/children.jpg"),
              title: "CHILDREN",
              desc: "Children of Vyarna’s providers will be protected in nourishment and in access to Vyarna’s benefits.",
            },
            {
              src: require("../assets/images/process/consumers.png"),
              title: "CONSUMERS",
              desc: "The consumers of the Vyarna Boosters will receive only products of the utmost quality. They are what sparked our project.",
            },
          ].map((item, idx) => (
            <View key={idx} className="w-full md:w-1/3 p-4 items-center">
              <Image
                source={item.src}
                className="w-40 h-40 rounded-full border-2 border-gray-300 mb-4"
                resizeMode="cover"
              />
              <Text className="text-xl font-bold mb-2 text-center">
                {item.title}
              </Text>
              <Text className="text-secondary text-center">{item.desc}</Text>
            </View>
          ))}
        </View>
      </Animatable.View>

      <Email
        title={"MY BABY NEEDS THIS, HOW DO I GET VYARNA?"}
        description={
          "We're launching within the next few months. Please be sure to submit your email to be the first to get notified about the launch. Get special early bird prices when we start delivering to your doorstep."
        }
        formId={TagsEnum.SIGNUP_IS_MADE_BOTTOM}
      />

      <Footer />
    </ScrollView>
  </>
);

export default ProcessScreen;
