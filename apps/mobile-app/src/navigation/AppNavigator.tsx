import React, { FC, JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

import Navbar, { NavItem } from '../components/Navbar';
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
} from '../constants/routes';
import { RootStackParamList } from '../types';
import { Text, View } from 'react-native';

import { getBaseUrl } from 'src/utils/env';
import WebsocketsMessages from '../components/WebsocketsMessages';

const baseUrl = getBaseUrl();

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: FC = (): JSX.Element => {
  const linking = {
    prefixes: [baseUrl],
    config: {
      screens: {
        [NAV_ROUTE_HOME]: '',
        [NAV_ROUTE_BENEFITS]: 'the-benefits-of-breast-milk',
      },
    },
  };

  // Define nav items for the Navbar using route constants
  const navItems: NavItem[] = [
    { key: NAV_ROUTE_HOME, label: 'Home' },
    { key: NAV_ROUTE_BENEFITS, label: 'Breast Milk Benefits' },
    {
      key: 'product',
      label: 'Product',
      children: [
        { key: NAV_ROUTE_IS_MADE, label: "How It's Made" },
        { key: NAV_ROUTE_USE, label: 'How to Use' },
      ],
    },
    {
      key: 'audience',
      label: 'For You',
      children: [
        { key: NAV_ROUTE_PARENTS, label: 'For Parents' },
        { key: NAV_ROUTE_PROVIDERS, label: 'For Providers' },
        { key: NAV_ROUTE_BIOHACKERS, label: 'For Biohackers' },
      ],
    },
    {
      key: 'company',
      label: 'Company',
      children: [
        { key: NAV_ROUTE_VALUES, label: 'Our Values' },
        { key: NAV_ROUTE_ABOUT, label: 'About Us' },
        { key: NAV_ROUTE_CONTACT, label: 'Contact' },
      ],
    },
    {
      key: 'support',
      label: 'Support',
      children: [
        { key: NAV_ROUTE_FAQ, label: 'FAQ' },
        { key: NAV_ROUTE_PREORDER, label: 'Preorder' },
      ],
    },
    {
      key: NAV_ROUTE_INVESTORS,
      label: 'Investors',
    },
  ];

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <WebsocketsMessages />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator
            // remove your standalone <Navbar /> here
            screenOptions={({}) => ({
              header: () => <Navbar items={navItems} />,
              headerShown: true,
            })}
          >
            <Stack.Screen name={NAV_ROUTE_HOME} component={HomeScreen} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
};
