import React, { FC, ReactNode, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";

interface SectionProps {
  image?: ImageSourcePropType;
  imageCaption?: string;
  title: string;
  text: ReactNode;
  linkText?: string;
  onPressLink?: () => void;
  reverse?: boolean;
}

const Section: FC<SectionProps> = ({
  image,
  imageCaption,
  title,
  text,
  linkText,
  onPressLink,
  reverse = false,
}) => {
  const { width } = useWindowDimensions();
  const PAGE_HORIZONTAL_PADDING = 16 * 2; // 16px left + 16px right
  const mobileWidth = width - PAGE_HORIZONTAL_PADDING;
  const [textHeight, setTextHeight] = useState<number | undefined>(undefined);

  const isMobile = width < 768;

  const onTextLayout = (event: LayoutChangeEvent): void => {
    if (!isMobile) {
      const { height } = event.nativeEvent.layout;
      setTextHeight(height);
    }
  };

  return (
    <View style={{ overflow: "hidden" }} className="w-full">
      <View
        className={`flex flex-col md:flex-row items-start gap-y-8 gap-x-12 py-8 md:py-12 px-0 md:px-0 w-full md:max-w-screen-xl md:mx-auto ${reverse ? "md:flex-row-reverse" : ""}`}
      >
        {image && (
          <View
            className="w-full md:w-[45%] flex-shrink flex items-center justify-center"
            style={!isMobile ? { height: textHeight } : {}}
          >
            <Image
              source={image}
              style={
                !isMobile
                  ? {
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }
                  : {
                      width: mobileWidth,
                      height: mobileWidth * (3 / 4), // your 4:3 frame
                      resizeMode: "cover",
                    }
              }
              className="rounded-lg"
            />
            {imageCaption && (
              <Text className="text-sm text-gray-500 mt-2 text-center md:text-left">
                {imageCaption}
              </Text>
            )}
          </View>
        )}

        <View
          className="w-full md:w-[55%] flex-shrink overflow-hidden"
          onLayout={onTextLayout}
        >
          <Text className="text-2xl font-bold mb-4">{title}</Text>
          <Text
            className="text-base leading-relaxed whitespace-pre-line break-words"
            style={{ flexShrink: 1 }}
          >
            {text}
            {linkText && onPressLink && (
              <Text
                onPress={onPressLink}
                className="text-[#7ecaf8] underline ml-1"
              >
                {linkText}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Section;
