import { pipeline, TextToAudioPipelineType } from "@xenova/transformers";
import { Request, Response } from "express";
import { encodeWAV } from "../../utils/wav";

const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';

class SpeechSynth {
  static instance: Promise<TextToAudioPipelineType> | undefined = undefined;

  static async getInstance(progress_callback = undefined) {
    if(!this.instance) {
      this.instance = pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false, progress_callback });
    }
    return this.instance;
  }
}

export async function postTTS(req: Request, res: Response) {
  const synth = await SpeechSynth.getInstance()

  console.log(req.body);

  const text = req.body.text | "hello, your text did not send" ;
  
  const result = await synth(req.body.text, { speaker_embeddings });

  const wav = encodeWAV(result.audio, result.sampling_rate);

  res.set('Content-Type', 'audio/wav');
  res.send(Buffer.from(wav));
};
