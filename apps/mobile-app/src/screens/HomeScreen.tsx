import React, { FC } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import {
  NAV_ROUTE_BENEFITS,
  NAV_ROUTE_IS_MADE,
  NAV_ROUTE_PARENTS,
  NAV_ROUTE_VALUES,
} from '../constants/routes';
import { BenefitsNavProp } from '../types';
import Email from '../components/Email';
import Footer from '../components/Footer';
import { JSX } from 'react/jsx-runtime';
import Section from '../components/Section';
import PreorderCTA from '../components/PreorderCTA';
import { Helmet } from 'react-helmet-async';
import { TagsEnum } from '../enums/tags.enum';
import { EXPO_PUBLIC_BASE_URL } from '@env';

const steps = [
  {
    img: require('../assets/images/steps/step_1.jpg'),
    label: '1. Add water & formula powder',
  },
  {
    img: require('../assets/images/steps/step_2.png'),
    label: '2. Shake in a Booster envelope',
  },
  {
    img: require('../assets/images/steps/step_3.jpg'),
    label: '3. Feed your baby',
  },
];

const baseUrl = EXPO_PUBLIC_BASE_URL;

const HomeScreen: FC = (): JSX.Element => {
  const navigation = useNavigation<BenefitsNavProp>();

  const structuredData: any = [];

  return (
    <>
      <Helmet>
        <title>Glow Baby – Real Breast Milk. Reinvented.</title>
        <meta
          name="description"
          content="Glow Baby is freeze-dried brilliance — simple, safe, and ready when you are. Made from real, screened breast milk for modern families."
        />
        <meta
          property="og:title"
          content="Glow Baby – Real Breast Milk. Reinvented."
        />
        <meta
          property="og:description"
          content="Glow Baby is freeze-dried breast milk—lab-tested, shelf-stable, and ready to add to formula, food, or nursing. Now accepting waitlist preorders."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/home/boosterBox.jpg`}
        />
        <meta property="og:url" content={baseUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Glow Baby – Real Breast Milk. Reinvented."
        />
        <meta
          name="twitter:description"
          content="Glow Baby is freeze-dried brilliance — simple, safe, and ready when you are."
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/assets/images/home/boosterBox.jpg`}
        />
        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        {structuredData.map(
          (schema: any, idx: React.Key | null | undefined) => (
            <script key={idx} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ),
        )}
      </Helmet>
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          {/* Hero Section */}
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
              <Image
                source={require('../assets/images/home/vyarnasharelife.jpg')}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
              <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
              <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <Text className="text-white text-3xl md:text-5xl font-bold leading-snug drop-shadow-lg">
                  REAL BREAST MILK.{'\n'}REINVENTED FOR MODERN LIFE.
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  Glow Baby is freeze-dried breast milk—lab-tested,
                  shelf-stable, and ready to add to formula, food, or nursing.
                  Now accepting waitlist preorders.
                </Text>
                <View className="mt-6 w-full max-w-md">
                  <Email
                    title="📬 Join the waitlist — and reserve your launch discount."
                    description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                    formId={TagsEnum.SIGNUP_HOME_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          {/* Spacer */}
          <View className="h-16 md:h-20" />

          {/* Pre-Purchase CTA Section */}
          <PreorderCTA />

          {/* How to Use */}
          <Animatable.View
            animation="fadeInUp"
            delay={300}
            className="pt-4 pb-16 md:pb-20 px-4 max-w-screen-xl mx-auto mb-12"
          >
            <Text className="text-xl md:text-2xl font-bold text-[#7ecaf8] text-center mb-3 border-b border-gray-200 pb-2">
              How to use Glow Baby
            </Text>
            <Text className="text-base text-center text-black mb-10">
              Glow Baby fits into your feeding routine—no matter how you feed
              your baby.
            </Text>
            <View className="flex flex-col md:flex-row gap-6">
              {steps.map((step, idx) => (
                <View key={idx} className="w-full md:w-1/3 text-center">
                  <Image
                    source={step.img}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'contain',
                      borderRadius: 8,
                    }}
                  />
                  <Text className="text-sm mt-2 text-neutral-700">
                    {step.label}
                  </Text>
                </View>
              ))}
            </View>
            <Text className="text-base text-center text-black font-medium mt-10">
              No learning curve. No cold chain. Just one scoop of real human
              milk, ready when you are.
            </Text>
          </Animatable.View>

          {/* Divider */}
          <View className="h-16 md:h-20" />
          <View className="w-16 h-1 bg-[#7ecaf8] mx-auto mb-8 rounded-full" />

          {/* Sections */}
          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require('../assets/images/home/boosterPack.png')}
              title="What is Glow Baby?"
              text={`Glow Baby is real breast milk, freeze-dried into 1g Boosters you can add to formula, foods, or use on their own.

✅ Verified providers
✅ No cold chain
✅ Mixes into any routine
✅ Rich in bioactive benefits

One pacekt. Real breast milk. Ready when you are.`}
            />
          </View>

          {/* Final CTA */}
          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="Get Early Access"
              description="Sign up to reserve your Booster pack, share with friends, and help launch Glow Baby into the world."
              formId={TagsEnum.SIGNUP_HOME_MIDDLE}
            />
          </View>

          <View className="mb-12">
            <Section
              image={require('../assets/images/home/breastFeeding.jpg')}
              title="What makes breast milk special?"
              text={`Breast milk isn’t just nutrition. It’s full of natural components that respond to a baby’s needs—complex sugars, cellular signals, protective factors, and more. It’s dynamic, diverse, and deeply personal. Glow Baby was created to preserve that complexity and make it available in moments when direct breastfeeding isn’t an option—or isn’t enough.`}
              linkText="Find out about the benefits of breast milk."
              onPressLink={() => navigation.navigate(NAV_ROUTE_BENEFITS)}
              reverse={true}
            />
          </View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require('../assets/images/home/boosterBox.jpg')}
              title="How is Glow Baby made?"
              text={`We created a process that keeps what matters—and nothing else.

1. Collect  
Ethically sourced milk from verified providers who meet strict safety and health standards.

2. Test  
Four separate safety gates with 100+ checks for pathogens, contaminants, and quality. Only passing milk moves on.

3. Concentrate  
Water is gently removed by low-temperature freeze-drying to preserve nutrients and bioactives.

4. Combine  
Milk from multiple providers is blended to reflect the natural diversity of the human microbiome.

5. Pack & Ship  
Single-gram Booster sachets are sealed, QR-coded, and shelf-stable for 24 months. Every batch is tested, tracked, and traceable. No formulas. No synthetics. Just the good stuff, preserved.`}
              linkText="Find out more about how Glow Baby is made."
              onPressLink={() => navigation.navigate(NAV_ROUTE_IS_MADE)}
            />
          </View>

          <View className="mb-12">
            <Section
              image={require('../assets/images/home/forParents.jpg')}
              title="Who it's for"
              text={`Formula-feeding?
Pumping and worried it’s not enough?
Want more diversity without more stress?

Glow Baby fits your routine.`}
              linkText="Glow Baby For Parents."
              onPressLink={() => navigation.navigate(NAV_ROUTE_PARENTS)}
              reverse={true}
            />
          </View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require('../assets/images/home/children.jpg')}
              title="Our values"
              text={`Glow Baby isn’t just a product. It’s a way to share health and value.  
- 4% of profits reserved for providers and staff  
- 4.5% equity for all verified milk providers  
- 4.5% equity reserved for the children that started the lactation process  
- 35% held by foundations for mission integrity`}
              linkText="Find out more about our values."
              onPressLink={() => navigation.navigate(NAV_ROUTE_VALUES)}
            />
          </View>

          {/* Final CTA */}
          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="Join the waitlist"
              description="Glow Baby is launching soon. Sign up to get early access, updates, and behind-the-scenes news."
              formId={TagsEnum.SIGNUP_HOME_BOTTOM}
            />
          </View>
        </View>

        <Footer />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
