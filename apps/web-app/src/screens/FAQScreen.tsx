import React, { FC } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import Footer from "../components/Footer";
import Email from "../components/Email";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { BenefitsNavProp } from "../types";
import { NAV_ROUTE_PREORDER } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import BoosterCartButton from "../components/BoosterCartButton";

const categorizedFaqs = [
  {
    category: "Product Basics",
    items: [
      {
        question: "What is Vyarna?",
        answer:
          "Vyarna is a breast milk booster made from verified, freeze-dried human milk. It adds microbiome and immune benefits to formula, solids, or mixed feeding routines.",
      },
      {
        question: "Is this a formula replacement?",
        answer:
          "No. Vyarna is not a formula—it is real human milk in concentrated powder form. You add it to whatever feeding method you already use.",
      },
      {
        question: "What’s in a Vyarna Booster?",
        answer:
          "Just one thing: verified, freeze-dried human breast milk. No additives, no synthetics, no formulas.",
      },
      {
        question: "Is Vyarna pasteurized?",
        answer:
          "No. Vyarna uses freeze-drying instead of heat-based pasteurization to preserve key bioactive components that might otherwise be lost.",
      },
    ],
  },
  {
    category: "Safety & Testing",
    items: [
      {
        question: "Is Vyarna safe?",
        answer:
          "Yes. We follow rigorous testing protocols aligned with Codex Alimentarius and ISO food safety standards. Every scoop is screened for contaminants, pathogens, and integrity.",
      },
      {
        question: "How do I know it's safe?",
        answer:
          "Every batch is tested for pathogens, toxins, and tampering. Vyarna follows protocols aligned with ISO, Codex, and FDA preparation for infant-grade supplements.",
      },
      {
        question: "What kind of testing is done on the milk?",
        answer:
          "Milk is screened for pathogens, heavy metals, environmental toxins, and biological contaminants. Each provider is also re-verified regularly.",
      },
    ],
  },
  {
    category: "Sourcing & Ethics",
    items: [
      {
        question: "Where does the milk come from?",
        answer:
          "All milk comes from verified, screened mothers who pass strict safety criteria. Each batch is tested, tracked, and traceable.",
      },
      {
        question: "How is Vyarna different from donor milk?",
        answer:
          "Vyarna is made from milk sourced from verified providers, not anonymous donors. It is freeze-dried, tested for safety, and blended for consistent quality and microbiome diversity.",
      },
      {
        question: "Do you compensate your milk providers?",
        answer:
          "Yes. Vyarna providers are compensated fairly, and 4.5% of the company’s equity is reserved for verified providers.",
      },
    ],
  },
  {
    category: "Usage",
    items: [
      {
        question: "How do I use it?",
        answer:
          "Tear open one gram sachet. Mix it into formula, pumped milk, soft foods, or offer it with water via spoon or dropper. Use up to 5 times per day.",
      },
      {
        question: "Can I use Vyarna with formula-fed babies?",
        answer:
          "Yes. Vyarna is designed to enhance formula-fed routines by adding real human milk bio-information to every bottle.",
      },
      {
        question: "How many times a day can I give Vyarna?",
        answer:
          "You can use up to 5 grams (5 sachets) per day, typically one per feeding. Consult your pediatrician for personalized guidance.",
      },
      {
        question: "Can I breastfeed and still use Vyarna?",
        answer:
          "Absolutely. Many parents use Vyarna to supplement their own milk—especially during weaning, supply drops, or illness.",
      },
      {
        question: "Can I use Vyarna during illness or medical treatment?",
        answer:
          "Vyarna may be helpful when your baby is vulnerable or during recovery, but always consult your healthcare provider in those situations.",
      },
      {
        question: "Can Vyarna replace breastfeeding completely?",
        answer:
          "Vyarna is not intended to replace breastfeeding when it is possible. It’s designed to support families who need supplementation or can’t breastfeed exclusively.",
      },
    ],
  },
  {
    category: "Storage & Practical Info",
    items: [
      {
        question: "Do I need to refrigerate it?",
        answer:
          "No refrigeration required. Vyarna is shelf-stable for up to 24 months.",
      },
      {
        question: "What makes Vyarna shelf-stable?",
        answer:
          "Vyarna uses a gentle freeze-drying process that removes moisture without damaging milk's sensitive bioactive elements. That’s what keeps it stable without preservatives.",
      },
      {
        question: "Do I need to mix Vyarna with warm water?",
        answer:
          "No. Vyarna should be mixed with lukewarm or room-temperature liquids. Do not use hot water or microwave the product.",
      },
      {
        question: "Can I add Vyarna to cold milk or cold foods?",
        answer:
          "Yes. Vyarna can be added to cold liquids or foods, but it dissolves best in room-temperature or lukewarm conditions.",
      },
      {
        question: "How do I store Vyarna at home?",
        answer:
          "Keep Vyarna packets in a cool, dry place—like a cabinet or pantry. No refrigeration needed before opening. Use each sachet immediately after opening.",
      },
      {
        question: "Can I travel with Vyarna?",
        answer:
          "Absolutely. Vyarna is shelf-stable, lightweight, and requires no refrigeration—ideal for travel, daycare, or emergencies.",
      },
    ],
  },
  {
    category: "Availability & Launch",
    items: [
      {
        question: "When is Vyarna launching?",
        answer:
          "We are preparing for commercial launch in the USA in 2026. Join the waitlist for updates and early access.",
      },
      {
        question: "When will I be able to order Vyarna?",
        answer:
          "We're planning commercial launch in the United States in 2026. Join the waitlist to be the first to know when it’s available.",
      },
    ],
  },
  {
    category: "Nutrition & Regulations",
    items: [
      {
        question: "What age is Vyarna recommended for?",
        answer:
          "Vyarna is intended for infants from birth through early toddlerhood—especially during the first 1,000 days of life, a critical window for development.",
      },
      {
        question: "Does Vyarna taste like breast milk?",
        answer:
          "Vyarna retains the natural properties of human milk. Some parents describe it as slightly sweet, but it blends well into formula or foods without altering flavor significantly.",
      },
      {
        question: "Is Vyarna vegan or dairy-free?",
        answer:
          "No. Vyarna is made from real human milk and is not suitable for vegan or dairy-free diets. If your baby has allergies, consult your doctor first.",
      },
      {
        question: "Is Vyarna eligible for insurance or HSA reimbursement?",
        answer:
          "We are currently exploring partnerships and classification options. At launch, Vyarna may be eligible through medical use cases. Check with your provider.",
      },
    ],
  },
];

export const FAQScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/FAQ/faq_hero.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
            <View className="absolute inset-0 bg-gradient-to-b from-[#00000033] to-[#ffffff99]" />
            <View className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <Text className="text-white text-3xl md:text-5xl max-w-2xl  font-bold leading-snug drop-shadow-lg">
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                Everything you need to know about Vyarna—from how it works to
                how to use it.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_FAQ_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer */}
        <View className="h-16 md:h-20" />

        {/* Preorder CTA */}
        <View className="mb-12 bg-[#fff5f7] px-6 py-8 rounded-xl shadow-md text-center max-w-3xl mx-auto">
          <Text className="text-2xl font-bold text-[#d6336c] mb-2">
            Be Part of the Movement
          </Text>
          <Text className="text-base text-neutral-700 mb-4">
            Your preorder helps us scale ethical sourcing, testing, and provider
            support.
          </Text>
          <BoosterCartButton label="Preorder Now" />
        </View>

        <View className="max-w-screen-xl mx-auto px-4 py-8">
          {categorizedFaqs.map((group, idx) => (
            <View key={idx} className="mb-10">
              <Text className="text-2xl font-semibold text-[#7ecaf8] mb-4">
                {group.category}
              </Text>
              <View className="space-y-6">
                {group.items.map((faq, subIdx) => (
                  <View
                    key={subIdx}
                    className="bg-[#f9fafb] p-4 rounded-xl shadow-sm"
                  >
                    <Text className="text-lg font-semibold text-[#7ecaf8] mb-2">
                      {faq.question}
                    </Text>
                    <Text className="text-base text-neutral-700 leading-relaxed">
                      {faq.answer}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View className="px-6 py-8 max-w-3xl mx-auto">
            <Email
              title="Still have questions?"
              description="Get in touch or sign up to our newsletter for launch updates, product info, and more."
              formId={TagsEnum.SIGNUP_FAQ_BOTTOM}
            />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default FAQScreen;
