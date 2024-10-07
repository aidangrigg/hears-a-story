//NOTE: NEEDS ACCESS TOKEN TO RUN - HF_ACCESS_TOKEN - Create a codes.js file in the same directory with the hugging face access token (HF_ACCESS_TOKEN)

// Description: This file contains the logic for story generation.

import endingsData from './endings.json' assert { type: 'json' };
import milestonesData from './milestones.json' assert { type: 'json' };
import introductionData from './introductions.json' assert { type: 'json' };

import { HfInference } from "@huggingface/inference";
import { HF_ACCESS_TOKEN } from './codes.js'; //add a codes.js file in the same directory with the access token

class StoryGenerator {
    constructor(genre, length) {
      this.memoryStream = [];
      this.promptCount = 1;
      this.milestones = milestonesData[genre][length]; // Set milestones based on genre and length
      this.endings = endingsData[genre]; // Set possible endings based on genre
      this.introduction = introductionData[genre]; // Set introduction based on genre
      this.currentMilestone = this.milestones[0];

      this.HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
      this.inference = new HfInference(HF_ACCESS_TOKEN);
    }

    getIntroduction() {
        return this.introduction;
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
            console.log("Generated story part:", result);

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

    async memoryRetrieval({userResponse, sentiment}){ //retrieves relevant parts of the memory stream
        console.log('Retrieving relevant parts of the memory stream...');
        const prompt = `
        Here's a detailed AI prompt to help the AI agent determine which observations from the memory stream will be affected by the user's response and feelings, and how:
        
        Prompt for AI Agent:
        
        "You are tasked with evaluating the memory stream from the protagonist's journey. Review the user's latest response to the story and their emotional sentiment (e.g., excited, fearful, curious). 
        Based on their response and emotions, select which past observations or actions from the memory stream are most likely to be affected or revisited. 
        Then, explain how these observations should evolve or change in light of the user's response.
        
        **Memory Stream**: ${this.memoryStream}
        
        **User's Response**: ${userResponse}
        
        **User's Emotional Sentiment**: ${sentiment}
        
        **Based on the above, do the following**:
        
        Based on the user's response and emotional state, identify key observations from the memory stream that are most affected. 
        Update these observations to reflect the impact of the user's actions and emotions. 
        Then, briefly explain how these changes influence the next part of the story.`;
    
        return await this.generateText(prompt);
    }

    async continueStory({context, userResponse, sentiment}){ //Generate next part of the story
        console.log('Continuing the story...');
        const continue_prompt = `You are continuing an interactive "choose your own adventure" story and must generate **one concise paragraph** in response to the user's recent decision.

        In your response, **do not** include any additional instructions or explanations; only include the story content. 
        
        **Your response must:**
        - Consider the context of the story.
        - React to the user's emotional state.
        - Include the current state of the story based on the user decision.
        - End with a relevant open-ended question to encourage the user to choose their next action.
        - Follow a similar structure to the example output.
        - **Wrap the story part in [Story] and [/Story] tags. This is mandatory.**
        
        **Context**: ${context} 
        
        **User decision**: ${userResponse}
        
        **Emotional State**: ${sentiment}
        
        **Current Milestone**: ${this.currentMilestone}
        
        **Example Output**:
        "[Story]You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches. What do you choose to do next?[/Story]"
        `;
        
        this.promptCount++;

        return await this.generateParsedText(continue_prompt);
    
    }

    async updateNextMilestone(context){
        // Update the next milestone based on the recent AI output
        console.log("Updating the next milestone based on the recent AI output...");

        prompt = `**Context**: ${context}

        **Previous Milestone**: ${this.currentMilestone}

        **Milestones**: ${this.milestones}

        Given the context and previous milestone, output the index for the milestone that best matches the current story progress.
        `
        try{
            let result = "";
            //Use the model
            for await (const chunk of this.inference.chatCompletionStream({
                model: "microsoft/Phi-3-mini-4k-instruct",
                messages: [{ role: "user", content: context }],
                max_tokens: 500,
                bad_words_ids: [[50256]]  //Prevents the end-of-text token from cutting it off
            })) {
                // Append each chunk's content to the result
                result += chunk.choices[0]?.delta?.content || "";
            }
            // Log the full result after all chunks are processed
            console.log("Current Milestone:", result);

            // If the result is a valid and different milestone, update the current milestone
            if (this.milestones.includes(result) && result != this.currentMilestone) { //*Check whether I'm referring to the index or value here
                this.currentMilestone = result;
            }

            return result;

        } catch (error) {
            console.error('Error generating text:', error);
        }
    }

    async populateMemoryStream(storyExerpt){ //creates observations based on the most recent part of the story (NOTE - there still needs to be a way to add these to the memory stream)
        console.log('Populating memory stream with observations based on the story excerpt');

        const prompt = `You are an assistant tasked with creating a memory stream based on a given part of a story. The memory stream should contain key observations about the user's current situation, decisions, and environment.

        For each part of the story provided, return a list of observations formatted as follows:
        - Each observation should include the "prompt_no", which corresponds to the story prompt number.
        - Each observation should be direct and capture key details such as actions, decisions, and environment.
        - The "location" field should describe where the user is at that moment.
        
        Here's the format to follow:
        [
          {
            "prompt_no": X,
            "observation": "<What the user observes or does in this part of the story>",
            "location": "<Location in the story>"
          },
          ...
        ]
        
        Based on the following story excerpt, generate the memory stream:
        "${storyExerpt}"
        `;
        return await this.generateText(prompt);
    }
}  


//EXAMPLE
const shortCrimeStory = new StoryGenerator('crime', 'short');
let intro = shortCrimeStory.generateText(shortCrimeStory.getIntroduction());
shortCrimeStory.continueStory({context: intro, userResponse: 'create a distraction', sentiment: 'determined'});
