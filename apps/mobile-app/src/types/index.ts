// src/types/index.ts

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  NAV_ROUTE_ABOUT,
  NAV_ROUTE_AUDIENCE,
  NAV_ROUTE_BENEFITS,
  NAV_ROUTE_BIOHACKERS,
  NAV_ROUTE_COMPANY,
  NAV_ROUTE_CONTACT,
  NAV_ROUTE_FAQ,
  NAV_ROUTE_HOME,
  NAV_ROUTE_INVESTORS,
  NAV_ROUTE_IS_MADE,
  NAV_ROUTE_PARENTS,
  NAV_ROUTE_PREORDER,
  NAV_ROUTE_PRODUCT,
  NAV_ROUTE_PROVIDERS,
  NAV_ROUTE_SUPPORT,
  NAV_ROUTE_USE,
  NAV_ROUTE_VALUES,
} from "../constants/routes";

export type RootStackParamList = {
  [NAV_ROUTE_HOME]: undefined;
  [NAV_ROUTE_BENEFITS]: undefined;
  [NAV_ROUTE_IS_MADE]: undefined;
  [NAV_ROUTE_USE]: undefined;
  [NAV_ROUTE_ABOUT]: undefined;
  [NAV_ROUTE_CONTACT]: undefined;
  [NAV_ROUTE_PARENTS]: undefined;
  [NAV_ROUTE_BIOHACKERS]: undefined;
  [NAV_ROUTE_PROVIDERS]: undefined;
  [NAV_ROUTE_PREORDER]: undefined;
  [NAV_ROUTE_VALUES]: undefined;
  [NAV_ROUTE_INVESTORS]: undefined;
  [NAV_ROUTE_FAQ]: undefined;
  [NAV_ROUTE_AUDIENCE]: undefined;
  [NAV_ROUTE_COMPANY]: undefined;
  [NAV_ROUTE_SUPPORT]: undefined;
  [NAV_ROUTE_PRODUCT]: undefined;
};

export type BenefitsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof NAV_ROUTE_BENEFITS
>;
