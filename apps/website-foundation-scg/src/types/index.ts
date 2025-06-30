// src/types/index.ts

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
} from "../constants/routes";

export type RootStackParamList = {
  [NAV_ROUTE_HOME]: undefined;
  [NAV_ROUTE_ABOUT]: undefined;
  [NAV_ROUTE_PROGRAMS]: undefined;
  [NAV_ROUTE_PROVIDER_VOICES]: undefined;
  [NAV_ROUTE_SHAREHOLDER]: undefined;
  [NAV_ROUTE_INVOLVED]: undefined;
  [NAV_ROUTE_NEWS]: undefined;
  [NAV_ROUTE_CONTACT]: undefined;
  [NAV_ROUTE_VYARNA]: undefined;
};

export type FoundationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
