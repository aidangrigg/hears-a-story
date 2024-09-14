import { HfInference } from "@huggingface/inference";

export class TTS {
  private inference: HfInference;

  public constructor () {
    this.inference = new HfInference(process.env.EXPO_PUBLIC_HF_ACCESS_TOKEN);
  }

  public async genBlob(prompt: string) {
    try {
      console.log(`[tts] Generating tts for prompt: "${prompt}"`);

      const result = await this.inference.textToSpeech({
	inputs: prompt
      });

      console.log("[tts] Successfully generated tts message");
      return result;

    } catch (error) {
      console.error("[tts] ", error);
    }
  }
}
