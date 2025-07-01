import React, { FC, JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BenefitsScreen from "../screens/BenefitsScreen";
import HowToUseVyarnaScreen from "../screens/HowToUseVyarnaScreen";
import AboutScreen from "../screens/AboutScreen";
import ForParentsScreen from "../screens/ForParentsScreen";
import ForProvidersScreen from "../screens/ForProvidersScreen";
import ForBiohackersScreen from "../screens/ForBiohackersScreen";
import OurValuesScreen from "../screens/OurValuesScreen";
import PreorderScreen from "../screens/PreorderScreen";
import InvestorsScreen from "../screens/InvestorsScreen";
import ContactScreen from "../screens/ContactScreen";
import HowVyarnaIsMadeScreen from "../screens/HowVyarnaIsMadeScreen";
import Navbar, { NavItem } from "../components/Navbar";
import {
  NAV_ROUTE_ABOUT,
  NAV_ROUTE_BENEFITS,
  NAV_ROUTE_BIOHACKERS,
  NAV_ROUTE_CONTACT,
  NAV_ROUTE_FAQ,
  NAV_ROUTE_HOME,
  NAV_ROUTE_INVESTORS,
  NAV_ROUTE_IS_MADE,
  NAV_ROUTE_PARENTS,
  NAV_ROUTE_PREORDER,
  NAV_ROUTE_PROVIDERS,
  NAV_ROUTE_USE,
  NAV_ROUTE_VALUES,
} from "../constants/routes";
import { RootStackParamList } from "../types";
import { Text, View } from "react-native";
import FAQScreen from "../screens/FAQScreen";
import { getBaseUrl } from "src/utils/env";

const baseUrl = getBaseUrl();

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: FC = (): JSX.Element => {
  const linking = {
    prefixes: [baseUrl],
    config: {
      screens: {
        [NAV_ROUTE_HOME]: "",
        [NAV_ROUTE_BENEFITS]: "the-benefits-of-breast-milk",
        [NAV_ROUTE_USE]: "how-to-use-vyarna",
        [NAV_ROUTE_IS_MADE]: "how-vyarna-is-made",
        [NAV_ROUTE_PARENTS]: "for-parents",
        [NAV_ROUTE_PROVIDERS]: "for-providers",
        [NAV_ROUTE_BIOHACKERS]: "for-biohackers",
        [NAV_ROUTE_VALUES]: "our-values",
        [NAV_ROUTE_PREORDER]: "preorder",
        [NAV_ROUTE_FAQ]: "frequently-asked-questions",
        [NAV_ROUTE_INVESTORS]: "for-investors",
        [NAV_ROUTE_ABOUT]: "about-us",
        [NAV_ROUTE_CONTACT]: "contact",
      },
    },
  };

  // Define nav items for the Navbar using route constants
  const navItems: NavItem[] = [
    { key: NAV_ROUTE_HOME, label: "Home" },
    { key: NAV_ROUTE_BENEFITS, label: "Breast Milk Benefits" },
    {
      key: "product",
      label: "Product",
      children: [
        { key: NAV_ROUTE_IS_MADE, label: "How It's Made" },
        { key: NAV_ROUTE_USE, label: "How to Use" },
      ],
    },
    {
      key: "audience",
      label: "For You",
      children: [
        { key: NAV_ROUTE_PARENTS, label: "For Parents" },
        { key: NAV_ROUTE_PROVIDERS, label: "For Providers" },
        { key: NAV_ROUTE_BIOHACKERS, label: "For Biohackers" },
      ],
    },
    {
      key: "company",
      label: "Company",
      children: [
        { key: NAV_ROUTE_VALUES, label: "Our Values" },
        { key: NAV_ROUTE_ABOUT, label: "About Us" },
        { key: NAV_ROUTE_CONTACT, label: "Contact" },
      ],
    },
    {
      key: "support",
      label: "Support",
      children: [
        { key: NAV_ROUTE_FAQ, label: "FAQ" },
        { key: NAV_ROUTE_PREORDER, label: "Preorder" },
      ],
    },
    {
      key: NAV_ROUTE_INVESTORS,
      label: "Investors",
    },
  ];

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <View style={{ flex: 1 }}>
        <Navbar items={navItems} />
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NAV_ROUTE_HOME} component={HomeScreen} />
            <Stack.Screen
              name={NAV_ROUTE_BENEFITS}
              component={BenefitsScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_USE}
              component={HowToUseVyarnaScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_IS_MADE}
              component={HowVyarnaIsMadeScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_PARENTS}
              component={ForParentsScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_PROVIDERS}
              component={ForProvidersScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_BIOHACKERS}
              component={ForBiohackersScreen}
            />
            <Stack.Screen name={NAV_ROUTE_VALUES} component={OurValuesScreen} />
            <Stack.Screen
              name={NAV_ROUTE_PREORDER}
              component={PreorderScreen}
            />
            <Stack.Screen name={NAV_ROUTE_FAQ} component={FAQScreen} />
            <Stack.Screen
              name={NAV_ROUTE_INVESTORS}
              component={InvestorsScreen}
            />
            <Stack.Screen name={NAV_ROUTE_ABOUT} component={AboutScreen} />
            <Stack.Screen name={NAV_ROUTE_CONTACT} component={ContactScreen} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
};
