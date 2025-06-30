// components/WikiEditor.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import Markdown from "react-native-markdown-display";

interface WikiEditorProps {
  initialText: string;
  onSubmitEdit: (text: string) => void;
  isEditable: boolean;
}

const WikiEditor: React.FC<WikiEditorProps> = ({
  initialText,
  onSubmitEdit,
  isEditable,
}) => {
  const [text, setText] = useState(initialText);

  return (
    <View className="p-4 bg-white rounded-md shadow-sm space-y-4">
      {isEditable ? (
        <>
          <TextInput
            multiline
            numberOfLines={20}
            editable={true}
            className="border border-gray-300 p-2 rounded-md text-base"
            value={text}
            onChangeText={setText}
          />
          <Button
            title="Submit Suggested Edit"
            onPress={() => {
              if (text.trim().length === 0) {
                Alert.alert("Cannot submit empty text.");
                return;
              }
              onSubmitEdit(text);
            }}
          />
        </>
      ) : (
        <Markdown>{text}</Markdown>
      )}
    </View>
  );
};

export default WikiEditor;
