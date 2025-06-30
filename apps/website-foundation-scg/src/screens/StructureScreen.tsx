import React, { FC } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Email from "../components/Email";
import Section from "../components/Section";
import { getBaseUrl } from "src/utils/env";
import { TagsEnum } from "../enums/tags.enum";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FoundationNavProp } from "../types";
import { NAV_ROUTE_SHAREHOLDER } from "src/constants/routes";
import WikiEditor from "../components/WikiEditor";

const baseUrl = getBaseUrl();

const StructureScreen: FC = () => {
  const navigation = useNavigation<FoundationNavProp>();

  return (
    <>
      <Helmet>
        <title>Foundation Governance Structure</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Learn how verified milk providers govern the Foundation through a scalable, nested pod structure."
        />
        <meta property="og:title" content="Foundation Governance Structure" />
        <meta
          property="og:description"
          content="Explore how decisions are made, how equity is managed, and how providers are structurally empowered."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/structure/structureHero.png`}
        />
        <meta property="og:url" content={baseUrl} />
      </Helmet>

      <ScrollView className="flex-1 bg-white">
        <View className="max-w-screen-xl mx-auto px-4 py-8 font-raleway">
          <Animatable.View animation="fadeIn" delay={100}>
            <View className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-sm mb-16">
              <Image
                source={require("../assets/images/structure/structureHero.png")}
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
                  HOW STRUCTURE CREATES SOLIDARITY
                </Text>
                <Text className="text-white text-base md:text-lg mt-4 max-w-2xl drop-shadow-md">
                  The Silvia Chavarría González Foundation is built around a
                  structure that protects provider equity, distributes power,
                  and grows with trust.
                </Text>
                <View className="py-16 px-4 max-w-screen-xl mx-auto">
                  <Email
                    title="📫 Stay Informed"
                    description="Get updates on programs, governance milestones, and provider participation."
                    formId={TagsEnum.SIGNUP_STRUCTURE_TOP}
                  />
                </View>
              </View>
            </View>
          </Animatable.View>

          <View className="mb-12 bg-[#f9fafb] py-4 md:py-6 rounded-lg shadow-sm">
            <Section
              image={require("../assets/images/structure/podSystem.png")}
              imageCaption="Nested Pod structure — building upward from verified participation."
              title="Built from the Ground Up: The Pod System."
              text={
                <>
                  Our structure is designed for real participation. It begins
                  with the Pod.
                  {"\n\n"}
                  -- A Pod is a local group of 9 verified milk providers. Each
                  Pod receives its own budget. Each Pod decides what matters
                  most. Health access, child care, local advocacy. Pod members
                  vote on what to prioritize. Every decision is documented. Each
                  Pod sends a representative to speak for them at the DecaPod.
                  {"\n\n"}
                  -- 10 Pods form a DecaPod (90 providers). Here, Pods
                  coordinate on goals too large to manage alone. DecaPods
                  receive a separate budget and can jointly launch programs,
                  research, or local campaigns. Each DecaPod sends a
                  representative to speak for them at the CentoPod.
                  {"\n\n"}
                  -- 10 DecaPods form a CentoPod (900 providers). CentoPods
                  create power at scale. They can coordinate regional-level
                  negotiations, amplify advocacy efforts, or build longer-term
                  projects across regions. Each CentoPod sends a representative
                  to speak for them at the MegaPod.
                  {"\n\n"}
                  -- 10 CentoPods form a MegaPod (9,000 providers). MegaPods are
                  multiregional structures. They receive their own budget and
                  vote independently. Each MegaPod sets its own
                  priorities—aligned to providers in their parts of the world.
                  Each MegaPod sends a representative to speak for them at the
                  Foundation’s Global Congress.
                  {"\n\n"}
                  -- Foundation’s Global Congress. This is the highest governing
                  body. It is empowered to vote on equity distribution, legal
                  decisions, and all cross-region priorities.
                  {"\n\n"}
                  Participation is verified. Voting is logged. Power builds from
                  the bottom.
                </>
              }
            />
          </View>

          <Section
            title="Equity Held in Trust"
            image={require("../assets/images/structure/equityGovernance.png")}
            imageCaption="Equity is not distributed — it is democratically governed."
            text={
              <>
                The Foundation holds 4.5% of Vyarna’s equity. It is not divided.
                It is not sold. It is protected for future distribution by the
                people who created the value in the first place: verified milk
                providers.
                {"\n\n"}
                That distribution does not begin immediately. It is deferred
                until a future liquidity event — such as an IPO or major
                investor exit. This protects early investors, especially
                individuals who took personal financial risks. A $2,000
                investment from a working mother often represents months of
                savings. A $200,000 investment from a venture firm rarely does.
                {"\n\n"}
                Until that point, the equity remains in trust. The Foundation
                operates with stewardship, not control. The value is preserved —
                not extracted — and no dividends are issued.
                {"\n\n"}
                The current governance framework is open for review. Anyone —
                especially future beneficiaries — can read the full structural
                document and propose amendments. All suggestions are publicly
                logged and must be reviewed by the Foundation's provisional
                Structural Committee.
                {"\n\n"}
                If you want to understand the governing terms or make a change,
                the full text is included below. Propose edits directly via our
                wiki platform. All voices are welcome — especially those that
                will inherit the structure.
              </>
            }
            reverse={true}
            linkText="Our role as Shareholders."
            onPressLink={() => navigation.navigate(NAV_ROUTE_SHAREHOLDER)}
          />

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📫 Stay Connected"
              description="Get notified as provider governance grows and new programs are launched."
              formId={TagsEnum.SIGNUP_STRUCTURE_MIDDLE}
            />
          </View>

          <Section
            image={require("../assets/images/structure/wiki.png")}
            imageCaption="Collaborative editing of structural documents using verified logins."
            title="Shared Rules, Open Editing"
            text={
              <>
                The Foundation’s governing rules aren’t static. They are living
                documents, open to proposal and revision by the very people they
                will affect.
                {"\n\n"}
                Any verified provider — or public reader — can now suggest edits
                directly on this page using our built-in wiki interface. All
                proposed changes are logged and attributed.
                {"\n\n"}
                Submissions are reviewed by the provisional Structural Review
                Committee — initially composed of
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/jcmendozagarcia/",
                    )
                  }
                >
                  {" Juan Carlos Mendoza-García"}
                </Text>
                ,
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL("https://www.linkedin.com/in/muguika/")
                  }
                >
                  {" Karla Córdoba-Brenes "}
                </Text>
                , and
                <Text
                  className="text-blue-600 underline"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/pedroalvaradochavarria/",
                    )
                  }
                >
                  {" Pedro Alvarado-Chavarría "}
                </Text>
                — until formal governance by providers is fully operational.
                {"\n\n"}
                No hidden edits. No closed doors. Everyone is invited to read,
                reflect, and participate.
              </>
            }
          />

          <WikiEditor
            initialText={`# Silvia Chavarría González Foundation – Governing Charter

## 1. Purpose of the Foundation

The Silvia Chavarría González Foundation exists to hold and steward equity in Vyarna on behalf of verified women who have shared their breast milk through the Vyarna system. It ensures that this equity is governed transparently, redistributed ethically, and used to uplift the needs and priorities of milk providers worldwide.

---

## 2. Scope of Stewardship

- The Foundation holds 4.5% equity in Vyarna.
- This equity is not divided or distributed until a liquidity event (e.g. IPO or acquisition).
- The Foundation does not issue dividends or use the equity for operational expenses.
- The equity is safeguarded in trust for verified milk providers who participate in the Vyarna ecosystem.

---

## 3. Structure of Representation

### a. Pods
- The base unit is a **Pod**: a group of 9 verified milk providers in geographic or thematic proximity.
- Each Pod receives its own operating budget.
- Pods are autonomous in deciding how to use their budget and which priorities to pursue.
- Each Pod elects a representative.

### b. DecaPods
- 10 Pods = 1 DecaPod (90 providers).
- DecaPods manage coordination at the local-regional level.
- Each DecaPod elects one representative to the CentoPod.

### c. CentoPods
- 10 DecaPods = 1 CentoPod (900 providers).
- CentoPods aggregate regional priorities and enable scale negotiations.
- Each CentoPod elects one representative to the MegaPod.

### d. MegaPods
- 10 CentoPods = 1 MegaPod (9,000 providers).
- MegaPods are the highest layer of regional coordination.
- Each MegaPod has its own budget and governance protocol.
- Each MegaPod elects one representative to the Foundation’s **Global Congress**.

### e. Global Congress
- The Global Congress is composed of one representative per MegaPod.
- This body holds final authority over equity governance, amendments to this Charter, and all cross-regional decisions.

---

## 4. Amendment Process

- This Charter is a living document.
- Any verified provider may propose edits via the Foundation’s public wiki.
- Proposed edits are reviewed by the **Structural Review Committee** until full provider governance is in place.

**Current Committee Members:**
- [Juan Carlos Mendoza](https://www.linkedin.com/in/jcmendozagarcia/)
- [Karla Córdoba-Brenes](https://www.linkedin.com/in/muguika/)
- [Pedro Alvarado-Chavarría](https://www.linkedin.com/in/pedroalvaradochavarria/)

- Once provider participation reaches quorum, future amendments will be voted on by the Global Congress.

---

## 5. Eligibility to Benefit

- Any woman who has verifiably shared breast milk through the Vyarna system may become a beneficiary.
- No further action is required to maintain beneficiary status.
- Geography, income level, or continued participation do not affect eligibility.
- All beneficiary records are managed transparently via the Vyarna platform.

---

## 6. Guiding Principles

- Equity is held in trust, not in ownership.
- Governance begins at the grassroots level and builds upward.
- All voting and financial decisions are logged and auditable.
- Respect, transparency, and participation are non-negotiable values.
`}
            onSubmitEdit={(editedText) => {
              // Replace this with API POST request or Firebase update
              console.log("User submitted edit:", editedText);
              alert("Your edit has been submitted for review. Thank you!");
            }}
            isEditable={true} // toggle this based on login/verification
          />

          <View className="py-16 px-4 max-w-screen-xl mx-auto">
            <Email
              title="📫 Stay Connected"
              description="Get notified as provider governance grows and new programs are launched."
              formId={TagsEnum.SIGNUP_STRUCTURE_BOTTOM}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default StructureScreen;
