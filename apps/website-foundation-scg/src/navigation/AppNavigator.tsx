import React, { FC, JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";

import Navbar, { NavItem } from "../components/Navbar";
import {
  NAV_ROUTE_HOME,
  NAV_ROUTE_ABOUT,
  NAV_ROUTE_PROGRAMS,
  NAV_ROUTE_PROVIDER_VOICES,
  NAV_ROUTE_SHAREHOLDER,
  NAV_ROUTE_INVOLVED,
  NAV_ROUTE_NEWS,
  NAV_ROUTE_CONTACT,
  NAV_ROUTE_VYARNA,
  NAV_ROUTE_FAQ,
  NAV_ROUTE_STRUCTURE,
} from "../constants/routes";
import { RootStackParamList } from "../types";
import { getBaseUrl } from "src/utils/env";

// Screens
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import StructureScreen from "../screens/StructureScreen";
import ProgramsScreen from "../screens/ProgramsScreen";
import ProviderVoicesScreen from "../screens/ProviderVoicesScreen";
import ShareholderScreen from "../screens/ShareholderScreen";
import GetInvolvedScreen from "../screens/GetInvolvedScreen";
import NewsAndUpdatesScreen from "../screens/NewsAndUpdatesScreen";
import ContactScreen from "../screens/ContactScreen";
import VyarnaPartnershipScreen from "../screens/VyarnaPartnershipScreen";
import FAQScreen from "../screens/FAQScreen";

const baseUrl = getBaseUrl();
const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: FC = (): JSX.Element => {
  const linking = {
    prefixes: [baseUrl],
    config: {
      screens: {
        [NAV_ROUTE_HOME]: "",
        [NAV_ROUTE_ABOUT]: "about-the-foundation",
        [NAV_ROUTE_PROGRAMS]: "programs-supported",
        [NAV_ROUTE_PROVIDER_VOICES]: "provider-voices",
        [NAV_ROUTE_SHAREHOLDER]: "shareholder-role",
        [NAV_ROUTE_INVOLVED]: "get-involved",
        [NAV_ROUTE_NEWS]: "news-and-updates",
        [NAV_ROUTE_VYARNA]: "vyarna-partnership",
        [NAV_ROUTE_FAQ]: "frequently-asked-questions",
        [NAV_ROUTE_STRUCTURE]: "internal-structure",
        [NAV_ROUTE_CONTACT]: "contact",
      },
    },
  };

  const navItems: NavItem[] = [
    { key: NAV_ROUTE_HOME, label: "Home", path: "" },

    {
      key: "foundation",
      label: "The Foundation",
      children: [
        { key: NAV_ROUTE_ABOUT, label: "About", path: "about-the-foundation" },
        {
          key: NAV_ROUTE_STRUCTURE,
          label: "Structure",
          path: "internal-structure",
        },
        {
          key: NAV_ROUTE_SHAREHOLDER,
          label: "Shareholder Role",
          path: "shareholder-role",
        },
        {
          key: NAV_ROUTE_VYARNA,
          label: "Vyarna Partnership",
          path: "vyarna-partnership",
        },
      ],
    },

    {
      key: "participate",
      label: "Participate",
      children: [
        {
          key: NAV_ROUTE_PROGRAMS,
          label: "Programs",
          path: "programs-supported",
        },
        {
          key: NAV_ROUTE_INVOLVED,
          label: "Get Involved",
          path: "get-involved",
        },
      ],
    },

    {
      key: "community",
      label: "Voices & News",
      children: [
        {
          key: NAV_ROUTE_PROVIDER_VOICES,
          label: "Provider Voices",
          path: "provider-voices",
        },
        {
          key: NAV_ROUTE_NEWS,
          label: "News & Updates",
          path: "news-and-updates",
        },
      ],
    },

    {
      key: "support",
      label: "Support",
      children: [
        {
          key: NAV_ROUTE_FAQ,
          label: "FAQ",
          path: "frequently-asked-questions",
        },
        { key: NAV_ROUTE_CONTACT, label: "Contact", path: "contact" },
      ],
    },
  ];

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <View style={{ flex: 1 }}>
        <Navbar items={navItems} />
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NAV_ROUTE_HOME} component={HomeScreen} />
            <Stack.Screen name={NAV_ROUTE_ABOUT} component={AboutScreen} />
            <Stack.Screen
              name={NAV_ROUTE_STRUCTURE}
              component={StructureScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_PROGRAMS}
              component={ProgramsScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_PROVIDER_VOICES}
              component={ProviderVoicesScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_SHAREHOLDER}
              component={ShareholderScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_INVOLVED}
              component={GetInvolvedScreen}
            />
            <Stack.Screen
              name={NAV_ROUTE_NEWS}
              component={NewsAndUpdatesScreen}
            />
            <Stack.Screen name={NAV_ROUTE_CONTACT} component={ContactScreen} />
            <Stack.Screen
              name={NAV_ROUTE_VYARNA}
              component={VyarnaPartnershipScreen}
            />
            <Stack.Screen name={NAV_ROUTE_FAQ} component={FAQScreen} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
};
