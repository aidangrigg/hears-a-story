//NOTE: NEEDS ACCESS TOKEN TO RUN - HF_ACCESS_TOKEN - Create a codes.js file in the same directory with the access token

// Description: This file contains the logic for story generation.
    //function to generate the story given a prompt
    //for later - "long term memory" management

import { HfInference } from "@huggingface/inference";
import { HF_ACCESS_TOKEN } from './codes.js'; //add a codes.js file in the same directory with the access token

console.log('ACCESS TOKEN:', HF_ACCESS_TOKEN);

//Initialise the Hugging Face Interface Class
const inference = new HfInference(HF_ACCESS_TOKEN);


async function generateStory(prompt){
    try{
        let result = "";
        //Use the model
        for await (const chunk of inference.chatCompletionStream({
            model: "microsoft/Phi-3-mini-4k-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
            bad_words_ids: [[50256]]  //Prevents the end-of-text token from cutting it off
        })) {
            // Append each chunk's content to the result
            result += chunk.choices[0]?.delta?.content || "";
        }
        // Log the full result after all chunks are processed
        console.log("Final result:", result);
        return result;
    } catch (error) {
        console.error('Error generating text:', error);
    }
}

async function generateNewStory(genre){
    const intial_prompt = `Generate an interactive "choose your own adventure" story in the ${genre} genre. Start with an engaging introduction that sets the scene and ends with an open-ended question for the user to choose their next action.

    Here's how it should start:

    "In a world of ${genre}, you find yourself in [describe the setting briefly]. As you explore, you encounter [describe an interesting scenario or conflict]. The story unfolds as follows:
    [Generate a short, engaging narrative that includes the initial scenario and sets up a decision point.]
    You are faced with a critical choice: [insert open-ended question related to the scenario].

    What do you do next?"

    `;

    return generateStory(intial_prompt);
}

async function continueStory({context, previous_response, new_decision, emotional_state}){
    const continue_prompt = `You are generating an interactive "choose your own adventure" story. Each prompt should include the current state of the story and present a new decision point based on the previous choice. 

    **Context**: ${context} 
    
    **New Decision**: The user's decision is to ${new_decision} and their emotional state is ${emotional_state}.
    
    **Example Output:**
    
    "You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. 
    The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake 
    with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches."
    "Now, you must choose which path to explore: the lake with the island or the ancient tree with the ladder. 
    What do you choose to do next?"
    `;

    //**Context**: [Include a brief recap of the user's last choice and the resulting scenario]
    //**Previous Response**: [Detail the outcome of the user's last decision]. - be sure to add this back in later
    //**New Decision**: [The user's decision that will lead to a new scenario and their emotional state (with sentiment analysis)].

    return generateStory(continue_prompt);
}

const new_story = await generateNewStory("dark fantasy");

console.log("\n next part \n");

let continued_story = await continueStory({
    context: new_story, 
    previous_response: new_story, 
    new_decision: "I guess I'll explore the dark portal", 
    emotional_state: "hesitant"
});