import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { pipeline } from '@xenova/transformers';
import { useAudioStream } from 'react-audio-stream';
import wavefile from 'wavefile';

export default function HomeScreen() {
  const sendBlob = (data: Blob) => {
    console.log(speechToText(data))
  }

  async function speechToText(audio: Blob){
    // const wavefile = require("wavefile");
    // let {pipeline} = require("@xenova/transformers");
    // Pipe for STT and Buffer for fetching audio
    let pipe = await pipeline("automatic-speech-recognition", "Xenova/whisper-base")
    // Once useAudioStream is in place use Buffer.from(await blob.arrayBuffer)
    let buffer = Buffer.from(await audio.arrayBuffer())
    // console.log(buffer)
    let wav = new wavefile.WaveFile(buffer);
    wav.toBitDepth('32f'); // Pipeline expects input as a Float32Array
    wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
    let audioData = wav.getSamples();
    if (Array.isArray(audioData)) {
      if (audioData.length > 1) {
        const SCALING_FACTOR = Math.sqrt(2);
  
        // Merge channels (into first channel to save memory)
        for (let i = 0; i < audioData[0].length; ++i) {
          audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
        }
      }
  
      // Select first channel
      audioData = audioData[0];
      const output = await pipe(audioData)
      console.log(output)
      // return await pipe(audioData);
    }
  }

  const { startStream, stopStream } = useAudioStream(sendBlob)
  return (
    <div>
      <button
        onClick={() => {
          startStream()
        }}
      >
        start stream
      </button>
      <button
        onClick={() => {
          stopStream()
        }}
      >
        stop stream
      </button>
    </div>
  );
}