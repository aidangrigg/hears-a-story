// import { pipeline } from '@xenova/transformers';
import { HfInference } from '@huggingface/inference';
import * as fs from 'fs';


const hf = new HfInference()
// import wavefile from 'wavefile';

// Following import used as hook to capture audio streams from a user's microphone and sending them as Blob chunks at specified time intervals
// import { useAudioStream } from 'react-audio-stream' 

async function speechToText(filename = "example_audio.wav"){
  // Pipe for STT and Buffer for fetching audio
  // const data = fs.readFileSync(filename);

  const response = await hf.automaticSpeechRecognition({
    model: 'Xenova/whisper-base',
    data: fs.readFileSync(filename)
  })

  // const response = await fetch(
	// 	"https://api-inference.huggingface.co/models/openai/whisper-large-v3",
	// 	{
	// 		headers: {
	// 			Authorization: "Bearer hf_***"
	// 			"Content-Type": "application/json",
	// 		},
	// 		method: "POST",
	// 		body: data,
	// 	}
	// );
	const result = await response.json();
	return result;

  // let pipe = await pipeline("automatic-speech-recognition", "Xenova/whisper-base")
  // // Once useAudioStream is in place use Buffer.from(await blob.arrayBuffer)
  // let buffer = Buffer.from(await fetch(audio).then(x => x.arrayBuffer()))
  // console.log(buffer)
  // let wav = new wavefile.WaveFile(buffer);
  // wav.toBitDepth('32f'); // Pipeline expects input as a Float32Array
  // wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
  // let audioData = wav.getSamples();
  // if (Array.isArray(audioData)) {
  //   if (audioData.length > 1) {
  //     const SCALING_FACTOR = Math.sqrt(2);

  //     // Merge channels (into first channel to save memory)
  //     for (let i = 0; i < audioData[0].length; ++i) {
  //       audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
  //     }
  //   }

  //   // Select first channel
  //   audioData = audioData[0];
  //   // console.log(await pipe(audioData))
  //   return await pipe(audioData);
  // }
}

let output = await speechToText("https://github.com/aidangrigg/hears-a-story/raw/refs/heads/zac/frontend/app/STT_test/example_audio.wav");
console.log(output);
