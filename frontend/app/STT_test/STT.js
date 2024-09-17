import { pipeline } from '@xenova/transformers';
import wavefile from 'wavefile';

// Following import used as hook to capture audio streams from a user's microphone and sending them as Blob chunks at specified time intervals
// import { useAudioStream } from 'react-audio-stream' 

// Pipe for STT and Buffer for fetching audio
let pipe = await pipeline("automatic-speech-recognition")

// Once useAudioStream is in place use Buffer.from(await blob.arrayBuffer)
let buffer = Buffer.from(await fetch("https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav").then(x => x.arrayBuffer()))

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
}


let output = await pipe(audioData);
console.log(output);