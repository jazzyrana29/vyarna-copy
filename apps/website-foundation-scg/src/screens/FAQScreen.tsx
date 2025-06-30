import React, { FC } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import Footer from "../components/Footer";
import Email from "../components/Email";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";

const categorizedFaqs = [
  {
    category: "About the Foundation",
    items: [
      {
        question: "What is the Silvia Chavarría González Foundation?",
        answer:
          "It’s a nonprofit that holds equity in Vyarna on behalf of verified human milk providers. It was created to ensure that the women whose milk powers the Vyarna product are included, honored, and eventually in control.",
      },
      {
        question: "Why is it named after Silvia Chavarría González?",
        answer:
          "The Foundation is named after a Costa Rican mathematician and activist who believed in dignity, equity, and structural justice. Her values inspired the very existence of the Foundation.",
      },
      {
        question: "Is this just symbolic?",
        answer:
          "No. The Foundation is not a gesture — it’s a legal structure with real rights. It holds 4.5% of Vyarna’s equity and is governed by principles of transparency, non-extraction, and provider participation.",
      },
    ],
  },
  {
    category: "Governance & Equity",
    items: [
      {
        question: "Who controls the Foundation?",
        answer:
          "Until a liquidity event (e.g. IPO), the Foundation is safeguarded by trustees and stewards. After that, governance transitions to verified milk providers who will elect representatives and vote on key decisions.",
      },
      {
        question: "What happens to the equity?",
        answer:
          "It’s held in trust and cannot be sold or diluted. After a liquidity event, verified providers will collectively decide how that equity is used.",
      },
      {
        question: "Can I get dividends or money from the Foundation?",
        answer:
          "Not at this stage. Until the liquidity event, the equity generates no dividends. Once provider governance begins, any distributions will follow a transparent process co-designed by providers.",
      },
    ],
  },
  {
    category: "Participation & Eligibility",
    items: [
      {
        question: "Who qualifies as a beneficiary?",
        answer:
          "Any individual who has provided verified milk to Vyarna is a beneficiary. It doesn’t matter where you live or how much milk you provided. If your milk passed the testing protocol, you qualify.",
      },
      {
        question: "Do I need to do anything to stay eligible?",
        answer:
          "No. Once you qualify, you remain a beneficiary even if you stop pumping or leave the program. No ongoing participation is required.",
      },
      {
        question: "How will I be invited to vote or participate?",
        answer:
          "When the governance system activates, you’ll receive direct communications through the Vyarna app or secure email. We’re building the tools to make this easy and inclusive.",
      },
    ],
  },
  {
    category: "Future Programs & Feedback",
    items: [
      {
        question: "What kind of programs will the Foundation offer?",
        answer:
          "Programs are still being shaped — and we want your input. They may include wellness stipends, educational grants, health services, or community-building platforms.",
      },
      {
        question: "Can I help design the programs?",
        answer:
          "Yes. As a provider, your voice is essential. We’ll be inviting feedback and co-design sessions as soon as governance activation begins.",
      },
    ],
  },
  {
    category: "Legal, Privacy & Transparency",
    items: [
      {
        question: "Is this Foundation connected to the government?",
        answer:
          "No. It’s a private, independently registered nonprofit based in Estonia — chosen for its strong legal protections and transparency requirements.",
      },
      {
        question: "How can I be sure this isn’t a scam?",
        answer:
          "The Foundation is publicly registered, its equity is audited, and all bylaws and governance protocols are published. Nothing is hidden.",
      },
      {
        question: "Where can I read the bylaws?",
        answer:
          "As soon as the provider governance system begins, all documents will be made available inside the app and on this website.",
      },
    ],
  },
];

const FAQScreen: FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/FAQ/foundationHero.jpg")}
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
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                About governance, eligibility, equity and what comes next.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Get Updates on Governance and Participation"
                  description="We’ll let you know when voting opens, programs launch, and providers gain full shareholder rights."
                  formId={TagsEnum.SIGNUP_FAQ_TOP}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        <View className="h-16 md:h-20" />

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
            description="We’re here to help. Contact us directly or sign up for updates."
            formId={TagsEnum.SIGNUP_FAQ_BOTTOM}
          />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default FAQScreen;
