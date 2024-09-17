import { Button, Text, TextInput, View } from "react-native";
import * as Speech from 'expo-speech';
import { useState } from "react";

export default function Index() {
  const [text, setText] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
	placeholder="Text to speak!"
	value={text}
	onChangeText={setText}/>
      <Button
	title="Client-side native TTS"
	onPress={() => Speech.speak(text)}/>
    </View>
  );
}
