import { pipeline, TextToAudioPipelineType } from "@xenova/transformers";
import { Request, Response } from "express";
import { encodeWAV } from "../../utils/wav";

const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';

class SpeechSynth {
  static instance: Promise<TextToAudioPipelineType> | undefined = undefined;

  static async getInstance(progress_callback = undefined) {
    if (!this.instance) {
      this.instance = pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false, progress_callback });
    }
    return this.instance;
  }
}

export async function postTTS(req: Request, res: Response) {
  let synth: TextToAudioPipelineType;
  try {
    synth = await SpeechSynth.getInstance();
  } catch (_) {
    res.status(500)
      .send("Internal server error, failed to load TTS model");
    return;
  }

  const text: string | undefined = req.body.text;

  if(typeof text !== "string") {
    res.status(400)
      .send("TTS input must be passed in the \"text\" field of the json body.");
    return;
  }

  if(text.length <= 0) {
    res.status(400)
      .send("Text cannot be empty.");
    return;
  }

  let result;
  try {
    result = await synth(text, { speaker_embeddings });
  } catch (_) {
    res.status(500)
      .send("Internal server error, failed to parse TTS input");
    return;
  }

  const wav = encodeWAV(result.audio, result.sampling_rate);

  res.set('Content-Type', 'audio/wav');
  res.send(Buffer.from(wav));
}
