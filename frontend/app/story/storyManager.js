//NOTE: NEEDS ACCESS TOKEN TO RUN - HF_ACCESS_TOKEN - WILL NEED TO SET UP ENVIRONMENT VARIABLES/SECRETS

// Description: This file contains the logic for story generation.
    //function to generate the story given a prompt
    //for later - "long term memory" management


import { HfInference } from "@huggingface/inference";

//ADJUST FOR EXPO COMPATIBILITY -
//import * as dotenv from "dotenv";
//dotenv.config();
// console.log('Environment Variables Loaded:');
// console.log('HUGGINGFACE_API_KEY:', process.env.HF_ACCESS_TOKEN);


//Specify Hugging Face Access Token
//const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN; -- NEED TO SET UP ENVIRONMENT VARIABLES/SECRETS, adjust for expo compatibility

//Initialise the Hugging Face Interface Class
//const inference = new HfInference(HF_ACCESS_TOKEN);


async function generateStory(prompt){
    try{
        //Define the model
        const model = "google/gemma-2-2b-it";

        //Use the model
        const result = await inference.textGeneration({
            model: model,
            inputs: prompt,
            parameters: {
                max_length: 200, // Adjust the length as needed
                do_sample: true, // Enables sampling, can be true or false
                top_k: 50, // Limits the sampling to the top k tokens
                top_p: 0.95 // Nucleus sampling parameter, consider using it for better control
              }
        });

        //Log the result
        console.log(result);
    } catch (error) {
        console.error('Error generating text:', error);
    }
}

//generateStory("You are an author. Write a new, complete short story about a cat who solves crimes.");