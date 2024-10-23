import {emotionClassification} from "./emotionClassification.js"

function test(test_string){
  emotionClassification(test_string).then((result) =>{
    // console.log(result);
    console.log("Testing string is: " + test_string + "\n")
    console.log("Top 3 Emotions: \n")
    for (let i = 0; i < 3; i++) {
      console.log(i+1 + ". Emotion: " + result["labels"][i] + " | " + "Confidence: " + (result["scores"][i]*100).toString().substring(0,4) + "%\n")
    }
  })
}

// test(`I can't believe my little brother really chose to sing that song on my birthday`)
// test(`I'm going to kill that lich even if it costs me everything`)
// test(`I do feel bad about committing robbery but I can't afford to go to prison`)


