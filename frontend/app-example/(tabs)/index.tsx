import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState, useEffect} from 'react';
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent,} from "expo-speech-recognition";

export default function HomeScreen() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  let [timeoutID] = useState(Number)

  function transcriptCheck(){
    ExpoSpeechRecognitionModule.stop();
  }

  useSpeechRecognitionEvent("start", () => {
    setRecognizing(true);
  })
  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
    setTimeout(handleStart, 2000)
  })
  useSpeechRecognitionEvent("result", (event) => {
    window.clearTimeout(timeoutID)
    if (event.isFinal){
      setTranscript(transcript => {
        console.log(transcript + `\n` + event.results[0]?.transcript)
        return transcript + `\n` + event.results[0]?.transcript;
      });
      timeoutID = (window.setTimeout(transcriptCheck, 4000))
    }
    // console.log(event);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: true,
      requiresOnDeviceRecognition: false,
      addsPunctuation: true,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  };
  
  return (
    <div>
      {!recognizing ? (
        <button title="Start" onClick={handleStart}>Start Recording</button>
      ) : (
        <button title="Stop" onClick={ExpoSpeechRecognitionModule.abort}>Stop Recording</button>
      )}
      <p style={{whiteSpace: "pre"}}>{transcript}</p>
    </div>
  );
}