import React, { FC } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { TagsEnum } from "../enums/tags.enum";
import { BenefitsNavProp } from "../types";
import BoosterCartButton from "../components/BoosterCartButton";
import { NAV_ROUTE_PREORDER } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";

const AboutScreen: FC = () => {
  const navigation = useNavigation<BenefitsNavProp>();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <Animatable.View animation="fadeIn" delay={100}>
          <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm">
            <Image
              source={require("../assets/images/teams/our_team_hero.png")}
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
                THE PEOPLE BEHIND THE PURPOSE
              </Text>
              <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                We’re a multidisciplinary team of scientists, designers, and
                builders working to make breast milk’s benefits accessible to
                all families.
              </Text>
              <View className="mt-6 w-full max-w-md">
                <Email
                  title="📬 Join the waitlist — and reserve your launch discount."
                  description="💡 Commercial launch planned in 2026. Early supporters get special pricing."
                  formId={TagsEnum.SIGNUP_ABOUT_TOP}
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

        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm ">
          <Section
            title="Team Vyarna"
            text={`Vyarna is more than a product—it’s a movement. Our team blends deep expertise in biosciences, infant health, food safety, technology, and ethical sourcing. We are united by one goal: to create a healthier future, powered by real milk.`}
            image={require("../assets/images/teams/dream_team.png")}
          />
        </View>

        <View className="mb-12 py-4 md:py-6 rounded-lg shadow-sm">
          <View className="w-full flex-col md:flex-row justify-center items-start mb-6 px-4 max-w-screen-xl mx-auto">
            {[
              {
                src: require("../assets/images/teams/PedroAlvarado.png"),
                name: "Pedro Alvarado",
                role: "Founder / C.E.O.",
                linkedin: "https://linkedin.com/in/pedroalvaradochavarria",
                education:
                  "B.A. Psychology – M.Sc. Health Care Information Systems",
                bio: [
                  "Sales-Driven Entrepreneur",
                  "Innovative Product Designer",
                  "Customer-First Product Manager",
                  "15+ years as Software Architect",
                  "Passionate about bio-information.",
                ],
              },
              {
                src: require("../assets/images/teams/KhusbhaktKhan.png"),
                name: "Dr. Khushbukhat Khan",
                role: "Lead Researcher",
                linkedin:
                  "https://linkedin.com/in/khushbukhat-khan-ph-d-45680063 ",
                education:
                  "Ph.D. Applied Biosciences – M.Sc. Molecular Biology – M.Sc. Forensic Science – B.Sc. Biotechnology",
                bio: [
                  "Senior Researcher with hands-on experience in experimental design, Molecular docking, MTT assay, Flow Cytometry, PCR Primer Design, Real-Time Polymerase Chain Reaction (qPCR), Bioinformatics, Genotyping, MD simulations, Metabolomics, Mammalian Cell Culture",
                ],
              },
            ].map((member, idx) => (
              <View key={idx} className="w-full md:w-1/2 p-4 items-center">
                <View className="w-96 h-96 rounded-full border-2 border-gray-300 mb-4">
                  <Image
                    source={member.src}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 9999,
                    }}
                  />
                </View>

                <Text className="text-xl font-bold text-primary mb-1 text-center">
                  {member.name}
                </Text>
                <Text className="text-base font-semibold mb-2 text-center">
                  {member.role}
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(member.linkedin)}
                >
                  <Text className="text-sm text-pink-500 mb-2 underline">
                    {member.linkedin.replace("https://", "")}
                  </Text>
                </TouchableOpacity>
                <Text className="text-xs text-neutralText italic mb-2 text-center">
                  {member.education}
                </Text>
                {member.bio.map((line, i) => (
                  <Text key={i} className="text-secondary text-center mb-1">
                    • {line}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <View className="px-6 py-8 max-w-3xl mx-auto">
            <Email
              title={"VYARNA IS COMING SOON"}
              description={
                "Sign-up to our email to be the first to know when Vyarna is available. Get special early bird prices when we start delivering to your doorstep."
              }
              formId={TagsEnum.SIGNUP_ABOUT_BOTTOM}
            />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};
export default AboutScreen;
