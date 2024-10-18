import { HfInference } from "@huggingface/inference"
import { HF_ACCESS_TOKEN } from './codes.js';
const hf = new HfInference(HF_ACCESS_TOKEN)

async function emotionClassification(sentence){
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

const test_string = `I can't believe my little brother really chose to sing that song on my birthday.`

emotionClassification(test_string).then((result) =>{
  // console.log(result);
  console.log("Testing string is: " + test_string + "\n")
  console.log("Top 3 Emotions: \n")
  for (let i = 0; i < 3; i++) {
    console.log(i+1 + ". Emotion: " + result["labels"][i] + " | " + "Confidence: " + (result["scores"][i]*100).toString().substring(0,4) + "%\n")
  }
})

