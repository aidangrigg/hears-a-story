//NOTE: NEEDS ACCESS TOKEN TO RUN - HF_ACCESS_TOKEN - Create a codes.js file in the same directory with the hugging face access token (HF_ACCESS_TOKEN)

// Description: This file contains the logic for story generation.

import endingsData from './endings.json' with { type: 'json' };
import milestonesData from './milestones.json' with { type: 'json' };
import introductionData from './introductions.json' with { type: 'json' };
import goalsData from './goals.json' with { type: 'json' };

import * as Storage from "./storage";

// import { createInterface } from 'readline'; //for testing with user input

import { HfInference } from "@huggingface/inference";
import { HF_ACCESS_TOKEN } from './codes.js'; //add a codes.js file in the same directory with the access token

export class StoryGenerator {
    constructor(story) {
        const genre = story.genre;
        const length = story.length;

        this.milestones = milestonesData[genre][length]; // Set milestones based on genre and length
        this.endings = endingsData[genre]; // Set possible endings based on genre
        this.introduction = introductionData[genre]; // Set introduction based on genre
        this.goal = goalsData[genre]; // Set introduction based on genre

        this.inference = new HfInference(HF_ACCESS_TOKEN);
    }

    // Will return an intro if it is a new story, otherwise returns nothing
    async initialize() {
        const story = await Storage.getCurrentStory();

        if (story.responses.length <= 0) { // if the story is new, insert the introduction
            await Storage.addStoryResponse(Storage.StoryResponseType.NARRATOR, this.introduction);
            return this.introduction;
        }
    }

    async generateText(prompt){
        try{
            let result = "";
            //Use the model
            for await (const chunk of this.inference.chatCompletionStream({
                model: "microsoft/Phi-3-mini-4k-instruct",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
                bad_words_ids: [[50256]]  //Prevents the end-of-text token from cutting it off
            })) {
                // Append each chunk's content to the result
                result += chunk.choices[0]?.delta?.content || "";
            }
            // Log the full result after all chunks are processed
            console.log("Generated story part:", result);
            return result;
        } catch (error) {
            console.error('Error generating text:', error);
        }
    }

    async generateParsedText(prompt){
        try{
            let result = "";
            //Use the model
            for await (const chunk of this.inference.chatCompletionStream({
                model: "microsoft/Phi-3-mini-4k-instruct",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
                bad_words_ids: [[50256]]  //Prevents the end-of-text token from cutting it off
            })) {
                // Append each chunk's content to the result
                result += chunk.choices[0]?.delta?.content || "";
            }
            // Log the full result after all chunks are processed
            //console.log("Generated story part:", result);

            // Use a regular expression to match everything between [Story] and [/Story]
            const storyMatch = result.match(/\[Story\](.*?)\[\/Story\]/s);

            if (storyMatch && storyMatch[1]) {
            const extractedStory = storyMatch[1].trim();
            console.log("Extracted story - ", extractedStory);
            return extractedStory;
            } else {
            console.log("No story found in the response!");
            }

            return result; //backup if the parsing fails
        } catch (error) {
            console.error('Error generating text:', error);
        }
    }

    async memoryRetrieval({userResponse, sentiment, memoryStream}){ //retrieves relevant parts of the memory stream
        console.log('Retrieving relevant parts of the memory stream...');
        const prompt = `You are tasked with evaluating the memory stream from the protagonist's journey. Review the user's latest response to the story and their emotional sentiment (e.g., excited, fearful, curious). 
        Based on their response and emotions, select which past observations or actions from the memory stream are most likely to be affected or revisited. 
        Then, explain how these observations should evolve or change in light of the user's response.
        
        **Memory Stream**: ${memoryStream}
        
        **User's Response**: ${userResponse}
        
        **User's Emotional Sentiment**: ${sentiment}
        
        **Based on the above, do the following**:
        
        Create a brief summary of the memory stream observations that are most relevant to the user's response and emotional state.`;
    
        return await this.generateText(prompt);
    }

    async continueStory({ userResponse, sentiment}){ //Generate next part of the story
        // Store the user response
        await Storage.addStoryResponse(Storage.StoryResponseType.USER, userResponse);
        
        const context = this.memoryRetrieval({
            userResponse,
            sentiment
        });
        
        console.log('Continuing the story...');
        let prompt = ``;
	let story = await Storage.getCurrentStory();
	const nextMilestone = this.milestones[story.milestoneIndex];

	if (story === null) {
	    console.error("[storyManager::continueStory] Called without a current story set!");
	    return;
	}

        if (story.isFinished) {
            return "";
        }

        if (story.milestoneIndex == this.milestones.length - 1) { //end the story with a relevant ending
            console.log('Ending the story...');
            prompt = `You are creating an ending for an interactive "choose your own adventure" story and must generate **one concise paragraph** in response to the user's recent decision.

            In your response, **do not** include any additional instructions or explanations; only include the story content. 
            
            **Your response must:**
            - Consider the context and goal of the story.
            - React to the user's emotional state.
            - Include the current state of the story based on the user decision.
            - Find the most relevant ending based on the user's choices and emotional state. Build upon past actions and observations to lead the story towards this moment without it feeling abrupt.
            - Follow a similar structure to the example output.
            - **Wrap the story part in [Story] and [/Story] tags. This is mandatory.**
            
            **Context**: ${context} 

            **Goal**: ${this.goal}
            
            **User decision**: ${userResponse}
            
            **Emotional State**: ${sentiment}

            **Possible Endings**: ${this.endings}
            
            **Example Output**:
            "[Story]With bated breath, you and your crew execute the heist with precision, every move planned down to the last detail. As the final alarm remains silent, a wave of exhilaration washes over you. The tension that gripped your team moments before dissolves into laughter and cheers as you gather in a hidden location to celebrate your victory. Glancing at your teammates, you can hardly believe the audacity of what you've just pulled off. The thrill of success courses through your veins, and as you raise your glass, you know this will be a tale for the ages. What will you do next with your newfound fortune? ~END~[/Story]
            `;
            story.isFinished = true;
        } else if(story.promptsSinceLastMilestone < 1) { //standard prompt - can change the threshold (1 standard prompt between every milestone prompt)
            console.log('Continuing the story with a standard prompt...');
            prompt = `You are continuing an interactive "choose your own adventure" story and must generate **one concise paragraph** in response to the user's recent decision.

            In your response, **do not** include any additional instructions or explanations; only include the story content. 
            
            **Your response must:**
            - Consider the context and goal of the story.
            - React to the user's emotional state.
            - Avoid literal references to the context, such as "array[4]"
            - Include the current state of the story based on the user decision.
            - End with a relevant open-ended question to encourage the user to choose their next action.
            - Follow a similar structure to the example output.
            - **Wrap the story part in [Story] and [/Story] tags. This is mandatory.**
            
            **Context**: ${context} 

            **Goal**: ${this.goal}
            
            **User decision**: ${userResponse}
            
            **Emotional State**: ${sentiment}
            
            **Example Output**:
            "[Story]You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches. What do you choose to do next?[/Story]"
            `;
	    
            story.promptsSinceLastMilestone++;
        } else { //push for the story to reach the next milestone
            console.log('Continuing the story with a milestone prompt...');
            console.log('Milestone:', nextMilestone);
            prompt = `You are continuing an interactive "choose your own adventure" story and must generate **one concise paragraph** in response to the user's recent decision.

            In your response, **do not** include any additional instructions or explanations; only include the story content. 
            
            **Your response must:**
            - Consider the context and goal of the story.
            - React to the user's emotional state.
            - Avoid literal references to the context, such as "array[4]"
            - Include the current state of the story based on the user decision.
            - End with a relevant open-ended question to encourage the user to choose their next action.
            - Ensure the story progresses naturally toward the milestone by smoothly incorporating it into the narrative. Use the user's input and emotional state to guide this progression. The milestone should feel like a key turning point or significant development in the story. Build upon past actions and observations to lead the story towards this moment without it feeling abrupt.
            - Follow a similar structure to the example output.
            - **Wrap the story part in [Story] and [/Story] tags. This is mandatory.**
            
            **Context**: ${context} 

            **Goal**: ${this.goal}
            
            **User decision**: ${userResponse}
            
            **Emotional State**: ${sentiment}
            
            **Milestone**: ${nextMilestone}
            
            **Example Output**:
            "[Story]You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches. What do you choose to do next?[/Story]"
            `;
            story.promptsSinceLastMilestone = 0;
            story.milestoneIndex++;
        }
        // update all the indexes
        await Storage.setStory(story.id, story);
	
        const result = await this.generateParsedText(prompt);
        const memoryStreamFragments = await this.populateMemoryStream(result);

        const responseId = await Storage.addStoryResponse(Storage.StoryResponseType.NARRATOR, result);

        // if we fail to parse the memory stream, ignore it and keep the story moving.
        if (!memoryStreamFragments) {
            return result;
        }

        for(const fragment of memoryStreamFragments) {
            await Storage.addMemoryStreamFragment(
                responseId,
                fragment.observation,
                fragment.location
            );
        }
        
        return result;
    }

    async populateMemoryStream(storyPart) { //creates observations based on the most recent part of the story (NOTE - there still needs to be a way to add these to the memory stream)
        console.log('Populating memory stream with observations based on the story excerpt');

        const prompt = `You are an assistant tasked with creating a **memory stream**. Only include observations that have a direct impact on the user’s current decisions, actions, or future planning. Avoid repetitive or trivial details like smells or minor actions unless they directly affect the story's progression.

        For each part of the story, generate **key observations** by prioritizing:
        - Major decisions or actions.
        - Critical environmental changes that could affect future choices.
        - Time-sensitive details that would impact upcoming events.
        
        Do not include minor or irrelevant details.
        
        Format your observations like this:
        [
          {
            "observation": "<What the user observes or does in this part of the story>",
            "location": "<Location in the story>"
          },
        ]
        
        Based on the following story excerpt, generate the key memory stream:        
        "${storyPart}"
        `;
        let result = await this.generateText(prompt);

        //Remove any backticks or markdown formatting
        let cleanedResult = result.replace(/```json|```/g, '').trim();

        // Clean the JSON string
        let jsonString = this.cleanJsonString(cleanedResult);

        // Attempt to parse the cleaned JSON
        try {
            let parsedData = JSON.parse(jsonString);
            console.log('Parsed Data:', parsedData);
            return parsedData;

        } catch (error) {
            console.error('Error parsing JSON:', error.message);
            console.log('Raw Output:', jsonString); // Log the problematic output for review
            return;
        }
    }

    cleanJsonString(jsonString) {
        // Remove any trailing commas before closing brackets
        return jsonString.replace(/,(\s*[\]}])/g, '$1');
    }
}

// //EXAMPLE
// //Story Generation Process: intro -> loop(populateMemoryStream -> User Response -> memoryRetrieval -> continueStory)
// const shortCrimeStory = new StoryGenerator('crime', 'short');
// let intro = shortCrimeStory.introduction;
// console.log('Introduction:', intro);
// await shortCrimeStory.populateMemoryStream(intro);

// const rl = createInterface({ //for testing with user input
//     input: process.stdin,
//     output: process.stdout
// });

// let promptCounter = 0;
// const userSentiments = ['excited', 'curious', 'sad', 'confident', 'suspicious', 'nervous', 'surprised', 'excited'];

// function askQuestion() {
//     rl.question('User Decision: ', async (userDecision) => {
//         let context = await shortCrimeStory.memoryRetrieval({
//             userResponse: userDecision, 
//             sentiment: userSentiments[promptCounter]
//         });

//         await shortCrimeStory.continueStory({
//             context: context, 
//             userResponse: userDecision, 
//             sentiment: userSentiments[promptCounter]
//         });

//         await shortCrimeStory.populateMemoryStream();

//         promptCounter++;

//         if (promptCounter < userSentiments.length) {
//             askQuestion();
//         } else {
//             rl.close(); // Close the interface after all questions are asked
//         }
//     });
// }

// // Start the process by asking the first question
// askQuestion();
