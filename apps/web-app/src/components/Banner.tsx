import React from "react";
import { ImageBackground, ImageSourcePropType, Text, View } from "react-native";

interface BannerProps {
  imageSource: ImageSourcePropType;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  imageSource,
  title,
  subtitle,
  children,
}) => (
  <ImageBackground
    source={imageSource}
    resizeMode="cover"
    style={{
      width: "100%",
      height: "auto",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 30,
    }}
  >
    <View className="bg-white bg-opacity-95 p-6 rounded-xl shadow-xl max-w-2xl w-[90%] text-center">
      <Text className="text-3xl font-bold text-center text-primary mb-4">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-base text-center text-neutralText mb-8">
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  </ImageBackground>
);

export default Banner;
