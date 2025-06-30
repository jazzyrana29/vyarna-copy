import React, { FC } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";
import {
  NAV_ROUTE_ABOUT,
  NAV_ROUTE_STRUCTURE,
  NAV_ROUTE_PROGRAMS,
  NAV_ROUTE_CONTACT,
  NAV_ROUTE_PROVIDER_VOICES,
  NAV_ROUTE_SHAREHOLDER,
  NAV_ROUTE_INVOLVED,
  NAV_ROUTE_NEWS,
  NAV_ROUTE_VYARNA,
} from "../constants/routes";
import Constants from "expo-constants";

const { youtubeLink, instagramLink, facebookLink, tiktokLink, linkedinLink } =
  Constants.expoConfig?.extra || {};

const followLinks = [
  { name: "TikTok", url: tiktokLink },
  { name: "Instagram", url: instagramLink },
  { name: "Facebook", url: facebookLink },
  { name: "YouTube", url: youtubeLink },
  { name: "LinkedIn", url: linkedinLink },
];

const navLinks1 = [
  { name: "Programs", route: NAV_ROUTE_PROGRAMS },
  { name: "Provider Voices", route: NAV_ROUTE_PROVIDER_VOICES },
  { name: "Get Involved", route: NAV_ROUTE_INVOLVED },
];

const navLinks2 = [
  { name: "Vyarna Partnership", route: NAV_ROUTE_VYARNA },
  { name: "Shareholder Role", route: NAV_ROUTE_SHAREHOLDER },
  { name: "News", route: NAV_ROUTE_NEWS },
];

const navLinks3 = [
  { name: "About", route: NAV_ROUTE_ABOUT },
  { name: "Structure", route: NAV_ROUTE_STRUCTURE },
  { name: "Contact", route: NAV_ROUTE_CONTACT },
];

const Footer: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  const handleExternal = (url: string): void => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  const handleNavigate = (routeName: keyof RootStackParamList): void => {
    navigation.navigate(routeName);
  };

  const footerSections = [
    { title: "What We Do", links: navLinks1 },
    { title: "Governance & Impact", links: navLinks2 },
    { title: "Foundation", links: navLinks3 },
  ];

  return (
    <View className="bg-white px-6 pt-12 pb-8 border-t border-gray-200 mt-16">
      <View className="max-w-screen-xl mx-auto w-full flex flex-col gap-y-12">
        <View className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {footerSections.map((section, idx) => (
            <View key={idx}>
              <Text className="font-bold text-lg mb-3">{section.title}</Text>
              {section.links.map((link) => {
                const isActive = route.name === link.route;
                return (
                  <TouchableOpacity
                    key={link.name}
                    onPress={() => handleNavigate(link.route)}
                  >
                    <Text
                      className={`${
                        isActive ? "text-primary underline" : "text-gray-500"
                      } hover:underline hover:text-primary mb-1`}
                    >
                      {link.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <View>
            <Text className="font-bold text-lg mb-3">Follow Us</Text>
            {followLinks.map((link) => (
              <TouchableOpacity
                key={link.name}
                onPress={() => handleExternal(link.url)}
              >
                <Text className="text-pink-500 hover:underline mb-1">
                  {link.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex flex-col items-center justify-center text-center mt-6">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 64, height: 64, resizeMode: "contain" }}
          />
          <Text className="font-bold text-xl mt-2">
            Silvia Chavarría Gonzalez Foundation
          </Text>
          <Text className="text-gray-500 text-sm">
            In Honor. In Solidarity.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
