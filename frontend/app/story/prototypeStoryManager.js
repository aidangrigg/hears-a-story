//PROTOTYPE STORY MANAGER
// Description: This file contains the logic for story generation

//HOW TO USE:
    //NOTE: NEEDS ACCESS TOKEN TO RUN - Create a codes.js file in the same directory with the hugging face access token (HF_ACCESS_TOKEN) 
    // Create a PrototypeStoryGenerator instance with a genre
    // Run generateNewStory to start a new story
    // Run continueStory to continue the story based on user decisions - with user_decision and emotional_state as params


    import { HfInference } from "@huggingface/inference";
    import { HF_ACCESS_TOKEN } from './codes.js'; //*add a codes.js file in the same directory with the access token*

    import { createInterface } from 'readline'; //for testing with user input
    
    console.log("Running Prototype story manager... \n");
 
    class PrototypeStoryGenerator{
        constructor(genre){
            this.genre = genre;
            this.context = ""; //all the story context
            this.inference = new HfInference(HF_ACCESS_TOKEN);
        }

        async generateText(prompt){
            try{
                let result = "";
                //Use the model
                for await (const chunk of this.inference.chatCompletionStream({
                    model: "microsoft/Phi-3-mini-4k-instruct",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 500,
                    bad_words_ids: [[50256]],  //Prevents the end-of-text token from cutting it off
                    temperature: 0.5 //for randomness and creativity, higher values are more random
                })) {
                    // Append each chunk's content to the result
                    result += chunk.choices[0]?.delta?.content || "";
                }
                // Log the full result after all chunks are processed
                console.log("", result);
                return result;
            } catch (error) {
                console.error('Error generating text:', error);
            }
        }

        async generateNewStory(){ //generate the initial story
            const initialPrompt = `Generate an interactive "choose your own adventure" story in the ${this.genre} genre. Start with an engaging introduction that sets the scene, incorporates a conflict, and seamlessly integrates decision points into the narrative. Ensure the story ends with an open-ended question inviting the user to choose their next action without listing options in a labeled format.

            Here's how it should start:

            In a world of ${this.genre}, you find yourself in [describe the setting briefly]. As you explore, you encounter [describe an interesting scenario or conflict]. The story unfolds as follows: 
            [Generate a short, engaging narrative that includes the initial scenario and sets up a decision point without labeling the choices explicitly. Ensure the narrative emphasizes the gravity of the decision while maintaining a fluid storytelling style.]
            You stand at a critical juncture, wondering whether to [first implicit choice] or to [second implicit choice]. 
            What will you do next?`;

        
            const result = await this.generateText(initialPrompt);
            this.context += `Narration: ${result} \n`;
            return result;
        }


        async continueStory({user_decision, emotional_state}){
            this.context += `User Decision: ${user_decision} \n`;
            console.log("Context: ", this.context);
            console.log("Continuing the story...");

            // const continue_prompt = `You are generating an interactive "choose your own adventure" story. Each prompt should include the current state of the story and present a new decision point based on the previous choice. 
            // The story should be based on the following:
        
            // **Context**: ${this.context} 
            
            // **New Decision**: The user's decision is to ${user_decision} and their emotional state is ${emotional_state}.
            
            // **Example Output:**
            
            // "You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. 
            // The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake 
            // with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches."
            // "Now, you must choose which path to explore: the lake with the island or the ancient tree with the ladder. 
            // What do you choose to do next?"
            // `;

            const continue_prompt = `
            You are generating an interactive "choose your own adventure" story. Each response should continue the narrative based on the previous choice while incorporating the current state of the story. 

            Use the following details:

            - **Context**: ${this.context}
            - The user's decision is to ${user_decision}, and their emotional state is ${emotional_state}.

            Generate a narrative that:
            1. Begins with the consequences of the user's decision, seamlessly transitioning from the last part of the story.
            2. Describes the environment and any relevant characters reacting to the decision.
            3. Presents a new decision point for the user without explicitly labeling it.
            4. Ends with an open-ended question that prompts the user for their next action.

            For example, the output could be structured like this:

            "You enthusiastically decided to enter the glowing portal. Stepping through, you find yourself in a shimmering, otherworldly landscape. 
            The sky is a swirl of colors, and strange, floating islands drift by. You notice two paths: one leads to a crystal-clear lake 
            with a mysterious island in the center, and the other to a towering, ancient tree with a ladder leading up to its branches. 
            What do you choose to do next?"
            `;
            
            const result = await this.generateText(continue_prompt);
            this.context += `Narration: ${result} \n`;
            return result;
        }
    }


    //EXAMPLE USAGE WITH COMMAND LINE INPUT
    const story = new PrototypeStoryGenerator("adventure");

    const new_story = await story.generateNewStory();

    const rl = createInterface({ //for testing with user input
        input: process.stdin,
        output: process.stdout
    });

    //first decision
    rl.question('User Decision: ', async (user_decision) => {
        await story.continueStory({
            user_decision: user_decision, 
            emotional_state: "hesitant"
        });
        
        //second decision
        rl.question('User Decision: ', async (user_decision) => {
            await story.continueStory({
                user_decision: user_decision, 
                emotional_state: "excited"
            });
            rl.close();
        });
    });