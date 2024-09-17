import { Button, Text, TextInput, View } from "react-native";
import * as Speech from 'expo-speech';
import { useEffect, useState } from "react";
import { Audio } from 'expo-av';

function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function Index() {
  const [text, setText] = useState("");
  const [sound, setSound] = useState<any>();

  async function playSound(audio: Blob) {
    console.log('Loading Sound');

    const { sound } = await Audio.Sound.createAsync({
      uri: `data:audio/wav;base64,${audio.arrayBuffer()}`,
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const serverTTS = async () => {
    const response = await fetch(`http://127.0.0.1:3000/api/tts`, {
      method: "POST",
      headers: {
	"Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const audio = await response.blob();

    console.log(audio);

    playSound(audio);
  };

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
      <Button
	title="Server-side native TTS"
	onPress={serverTTS}/>
    </View>
  );
}
