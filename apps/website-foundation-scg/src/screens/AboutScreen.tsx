import React, { FC } from "react";
import { ScrollView, Text, View, Linking, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "../types";
import { NAV_ROUTE_STRUCTURE } from "src/constants/routes";

const baseUrl = getBaseUrl();

const AboutScreen: FC = () => {
  const navigation = useNavigation<FoundationNavProp>();

  return (
    <>
      <Helmet>
        <title>
          About the Foundation | Silvia Chavarría González Foundation
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Learn the founding story of the Silvia Chavarría González Foundation, who shaped its values and structure, and what legacy it aims to carry forward."
        />
        <meta property="og:title" content="About the Foundation" />
        <meta
          property="og:description"
          content="The origin, values, and legal structure behind the first foundation built for verified milk providers."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/about/foundationHero.jpg`}
        />
        <meta property="og:url" content={baseUrl + "/about-the-foundation"} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          {/* Hero Section */}
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/about/foundationHero.jpg")}
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
                  WHERE STRUCTURE MEETS STORY
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  The Foundation was not an afterthought. It was the first act.
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📫 Stay Informed"
                    description="Get updates on programs, governance milestones, and provider participation."
                    formId={TagsEnum.SIGNUP_ABOUT_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <Section
            image={require("../assets/images/about/foundationShares.png")}
            imageCaption="Where it began: a question of power and fairness."
            title="A Different Kind of Beginning"
            text={
              <>
                Before there was a product, there was a decision: this could not
                be just another startup.
                {"\n\n"}Most companies start with a pitch deck. Vyarna started
                with a question: What does justice look like when biology is
                involved?
                {"\n\n"}The idea for the Silvia Chavarría González Foundation
                was born from that question.{" "}
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/pedroalvaradochavarria/",
                    )
                  }
                >
                  Pedro Alvarado-Chavarría
                </Text>
                , founder of Vyarna, knew from the beginning that if human milk
                was going to be commercialized, the people who produced it
                couldn’t just be used — they had to be centered.
                {"\n\n"}That decision came before incorporation. Before
                branding. Before strategy decks. The Foundation was not a layer
                added later — it was part of the original architecture.
                {"\n\n"}Pedro didn’t build it alone. He reached out to trusted
                collaborators from his time in student politics at the
                University of Costa Rica.
                {"\n\n"}He asked{" "}
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/jcmendozagarcia/",
                    )
                  }
                >
                  Juan Carlos Mendoza García
                </Text>
                , a principled political leader and public servant, to help
                define a governance model that would stand the test of time.
                {"\n\n"}Juan Carlos introduced{" "}
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL("https://www.linkedin.com/in/muguika/")
                  }
                >
                  Karla Córdoba-Brenes
                </Text>
                , a strategist with deep knowledge of decentralized systems and
                ethics. Together, they shaped the Foundation’s backbone.
                {"\n\n"}This was never going to be a charity project. It was
                designed as structural equity — embedded from day one.
              </>
            }
          />

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/about/SilviaWithPedro.jpg")}
              imageCaption="Silvia Chavarría González while pregnant with Pedro Alvarado-Chavarría"
              title="The Name Behind the Mission"
              text={
                <>
                  The Foundation is named after Silvia Chavarría González — but
                  it is not a tribute. It is a continuation.
                  {"\n\n"}Silvia was born in 1952. She was a Costa Rican
                  mathematician, one of the first women in her field at the
                  University of Costa Rica (UCR). She earned a bachelor’s and
                  licenciatura in Pure Mathematics from UCR, then a master’s in
                  Applied Mathematics from Rice University in 1978 — at a time
                  when “applied mathematics” meant computing.
                  {"\n\n"}She returned to Costa Rica and became one of the
                  founding members of the UCR School of Computer Science.
                  {"\n\n"}Later, she earned another master’s degree — this time
                  in Gender and Cognition from the University of Wisconsin — and
                  upon returning, helped found the UCR Master’s in Gender
                  Studies. She also served as Director of ECCI (the UCR Computer
                  Science and Informatics School).
                  {"\n\n"}Silvia came from a background of privilege. Her
                  great-grandfather was{" "}
                  <Text
                    className="text-blue-600 underline"
                    onPress={() =>
                      Linking.openURL(
                        "https://en.wikipedia.org/wiki/Cleto_Gonz%C3%A1lez_V%C3%ADquez",
                      )
                    }
                  >
                    Cleto González Víquez
                  </Text>
                  , three-times president of Costa Rica. You can say that
                  political reform was in her blood. Silvia spent her life
                  dismantling unjust hierarchies, not reinforcing them.
                  {"\n\n"}She faced gender bias her entire career, especially in
                  male-dominated fields like mathematics and software. She never
                  stopped pushing for equity. Not in her teaching. Not in her
                  politics. Not in her home.
                  {"\n\n"}She passed away in 2008. Her son, Pedro, was 30.
                  {"\n\n"}He didn’t build the Foundation to honor her. He built
                  it because of her. Because she taught him — by example — that
                  fairness must be designed.
                </>
              }
              reverse={true}
            />
          </View>
          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="💌 Be Part of the Movement"
              description="Sign up for program announcements, governance updates, and provider initiatives."
              formId={TagsEnum.SIGNUP_ABOUT_MIDDLE}
            />
          </View>

          <Section
            image={require("../assets/images/about/PedroAlvaradoWithHisSon.jpg")}
            imageCaption="Pedro Alvarado-Chavarria with his son."
            title="Built for His Children, Designed for All"
            text={
              <>
                Pedro Alvarado-Chavarría is a founder, a father, and a systems
                thinker. Vyarna wasn’t an abstract biotech vision — it was a
                personal mission.
                {"\n\n"}He wanted his own children to have access to the
                benefits of breast milk, even though they didn’t receive it as
                babies. That gap sparked the product. But the deeper motivation
                was more radical: What if a for-profit company could be wired to
                support non-profit structures, permanently?
                {"\n\n"}Pedro doesn’t want to become a billionaire. He wants to
                build a successful business that earns money — and distributes
                it justly. A company that grows on capitalist terms, but returns
                its gains to the people who made them possible.
                {"\n\n"}That’s what the Foundation exists to do. Not to perform
                generosity, but to operationalize fairness.
                {"\n\n"}And that’s why its structure isn’t frozen. As providers
                join, they will be invited — systematically — to co-author the
                rules that govern their own collective future.
                {"\n\n"}It started with a mother. It will grow with many.
              </>
            }
          />

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/about/structurePolicy.png")}
              imageCaption="Not symbolic. Structural."
              title="What Happens Next"
              text={
                <>
                  The Foundation now holds 4.5% of Vyarna’s equity. That equity
                  is non-dilutable, cannot be sold, and is governed by bylaws
                  that prevent misuse. The shares are not held for executives or
                  institutions. They are held for one group only: verified milk
                  providers.
                  {"\n\n"}The current design includes a Pod-based voting
                  structure that can scale as providers join. But that design is
                  not final. It is provisional—meant to evolve with real
                  feedback.
                  {"\n\n"}As soon as providers are onboarded into Vyarna, they
                  will be invited to participate in the design of their own
                  governance. That is not a promise. It’s a protocol.
                  {"\n\n"}Until then, the Foundation remains in stewardship
                  mode: protecting value until it can be governed by the people
                  who made it possible.
                </>
              }
              reverse={true}
              linkText="Learn more about our structure."
              onPressLink={() => navigation.navigate(NAV_ROUTE_STRUCTURE)}
            />
          </View>

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📬 Be Part of the Next Chapter"
              description="Sign up for updates on provider participation, governance design, and Foundation milestones."
              formId={TagsEnum.SIGNUP_ABOUT_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default AboutScreen;
