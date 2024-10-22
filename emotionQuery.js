

// Import node-fetch package to use fetch in Node.js
    //const fetch = require('node-fetch'); 
import fetch from 'node-fetch';


// Define the async function to send the API request
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),  // Convert data to JSON string
        }
    );
    const result = await response.json();  // Parse JSON response
    console.log("result complete");
    return result;
}

// Call the query function and handle the result
query({ "inputs": "I like you. I love you" }).then((response) => {
    console.log(JSON.stringify(response, null, 2));  // Print JSON response in terminal
}).catch((error) => {
    console.error("Error:", error);  // Handle any errors
});