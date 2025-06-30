import React, { FC } from "react";
import { ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "../types";
import Footer from "../components/Footer";
import { JSX } from "react/jsx-runtime";
import { getBaseUrl } from "src/utils/env";
import { Helmet } from "react-helmet-async";
import Section from "src/components/Section";
import { NAV_ROUTE_HOME } from "src/constants/routes";

const baseUrl = getBaseUrl();

const NewsAndUpdatesScreen: FC = (): JSX.Element => {
  const navigation = useNavigation<FoundationNavProp>();

  return (
    <>
      <Helmet>
        <title>Silvia Chavarría González Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The Silvia Chavarría González Foundation supports and empowers verified human breast milk providers through solidarity, structure, and lasting value."
        />
        <meta
          property="og:title"
          content="Silvia Chavarría González Foundation"
        />
        <meta
          property="og:description"
          content="Dedicated to improving the lives of the women who share life. Learn more, support the mission, and join the movement."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/home/foundationHero.jpg`}
        />
        <meta property="og:url" content={baseUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Silvia Chavarría González Foundation"
        />
        <meta
          name="twitter:description"
          content="Structural solidarity. Long-term impact. Built to serve the women who provide."
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/assets/images/home/foundationHero.jpg`}
        />
        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <Animatable.View animation="fadeIn" delay={100}>
          <Section
            image={require("../assets/images/home/foundationHero.jpg")}
            title="TO BE MADE"
            imageCaption=""
            text={<>WORK IN POROGRESS</>}
            linkText="GO TO HOME PAGE."
            onPressLink={() => navigation.navigate(NAV_ROUTE_HOME)}
            reverse={true}
          />
        </Animatable.View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default NewsAndUpdatesScreen;
