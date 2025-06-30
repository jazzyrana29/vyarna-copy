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
  NAV_ROUTE_BENEFITS,
  NAV_ROUTE_CONTACT,
  NAV_ROUTE_FAQ,
  NAV_ROUTE_INVESTORS,
  NAV_ROUTE_IS_MADE,
  NAV_ROUTE_PARENTS,
  NAV_ROUTE_BIOHACKERS,
  NAV_ROUTE_PROVIDERS,
  NAV_ROUTE_USE,
  NAV_ROUTE_VALUES,
} from "../constants/routes";
import Constants from "expo-constants";

const { youtubeLink, instagramLink, facebookLink, tiktokLink, linkedinLink } =
  Constants.expoConfig?.extra || {};

// Social media links
const followLinks = [
  { name: "TikTok", url: tiktokLink },
  { name: "Instagram", url: instagramLink },
  { name: "Facebook", url: facebookLink },
  { name: "YouTube", url: youtubeLink },
  { name: "LinkedIn", url: linkedinLink },
];

// Navigation link groups
const navLinks1 = [
  { name: "How Vyarna Is Made", route: NAV_ROUTE_IS_MADE },
  { name: "How To Use Vyarna", route: NAV_ROUTE_USE },
  { name: "The Benefits of Breast Milk", route: NAV_ROUTE_BENEFITS },
  { name: "Our Values", route: NAV_ROUTE_VALUES },
];

const navLinks2 = [
  { name: "Frequently Asked Questions", route: NAV_ROUTE_FAQ },
  { name: "Parents", route: NAV_ROUTE_PARENTS },
  { name: "Providers", route: NAV_ROUTE_PROVIDERS },
  { name: "Biohackers", route: NAV_ROUTE_BIOHACKERS },
  { name: "Investors", route: NAV_ROUTE_INVESTORS },
];

const navLinks3 = [
  { name: "About Us", route: NAV_ROUTE_ABOUT },
  { name: "Contact", route: NAV_ROUTE_CONTACT },
];

// Footer component
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

  // Section headings for navigation groups
  const footerSections = [
    { title: "How It Works", links: navLinks1 },
    { title: "For You", links: navLinks2 },
    { title: "Company", links: navLinks3 },
  ];

  return (
    <View className="bg-white px-6 pt-12 pb-8 border-t border-gray-200 mt-16">
      <View className="max-w-screen-xl mx-auto w-full flex flex-col gap-y-12">
        {/* Navigation Columns */}
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

          {/* Follow Us Column */}
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

        {/* Branding Bottom Row */}
        <View className="flex flex-col items-center justify-center text-center mt-6">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 64, height: 64, resizeMode: "contain" }}
          />
          <Text className="font-bold text-xl mt-2">Share Life</Text>
          <Text className="text-gray-500 text-sm">Vyarna OÜ • Estonia</Text>
          <Text className="text-gray-500 text-sm">Reg. 16524426</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
