import { HfInference } from "@huggingface/inference"
import { HF_ACCESS_TOKEN } from './codes.js';
import { Emotions } from "@/types/Story";
const hf = new HfInference(HF_ACCESS_TOKEN)

export async function emotionClassification(sentence){
  const result = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: [
      sentence
    ],
    parameters: { 
      candidate_labels: Object.values(Emotions)
    }
  })

  return result[0];
}

