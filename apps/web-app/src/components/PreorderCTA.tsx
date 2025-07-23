import React from 'react';
import { Image, Text, View } from 'react-native';
import BoosterCartButton from './BoosterCartButton';

export default function PreorderCTA(): JSX.Element {
  return (
    <View className="mb-12 bg-[#fff5f7] px-6 py-8 rounded-xl shadow-md text-center max-w-3xl mx-auto">
      <Image
        source={require('../assets/images/preorder/box_contents.jpg')}
        style={{ width: '100%', height: 200, resizeMode: 'cover' }}
        className="rounded-lg mb-4"
      />
      <Text className="text-2xl font-bold text-[#d6336c] mb-2">
        🎁 Preorder Your Vyarna Booster Box
      </Text>
      <Text className="text-base text-neutral-700 mb-4">
        Be among the first to experience Vyarna — real breast milk, freeze-dried and ready to elevate your baby's routine. Lab-tested. Shelf-stable. Ethically sourced.
      </Text>
      <Text className="text-base text-neutral-700 mb-4">
        🚀 Launch Booster Box – 150 Packets{"\n"}
        Includes 150 one-gram packets of verified, tested breast milk. Mix into formula, food, or serve on its own.
      </Text>
      <Text className="text-base text-neutral-700 mb-4 whitespace-pre-line">
        ✅ Freeze-dried, not pasteurized{"\n"}
        ✅ 3-year shelf life{"\n"}
        ✅ Rigorously screened for viruses, bacteria, drugs, and adulteration{"\n"}
        ✅ No cold chain required
      </Text>
      <Text className="text-lg font-bold text-[#d6336c] mb-1">Launch Price: $200</Text>
      <Text className="text-base text-neutral-700 mb-4">(normally $300)</Text>
      <BoosterCartButton label="Preorder My Box Now" />
      <Text className="text-sm text-neutral-700 mt-4 whitespace-pre-line">
        💡 Limited-time preorder pricing. Every packet supports the Vyarna network of providers, co-sharers, and families.{"\n"}
        🍼 4.5% of equity is reserved for the children who started lactation. You’re not just buying — you're building a future.
      </Text>
    </View>
  );
}
