import { HfInference } from "@huggingface/inference"
import { HF_ACCESS_TOKEN } from './codes.js';
const hf = new HfInference(HF_ACCESS_TOKEN)

export async function emotionClassification(sentence){
  const result = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: [
      sentence
    ],
    parameters: { 
        candidate_labels: ['Happy','Sad','Angry','Impressed','Anxious','Confident','Guilty','Surprised','Annoyed','Scared'] 
    }
  })

  return result[0];
}

