import { GoogleGenerativeAI } from "@google/generative-ai";

async function ai(prompt) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        // Check the structure of the response
        console.log("AI Result:", result);  // Log the whole result to see its structure

        if (result && result.response && result.response.text) {
            const response = await result.response.text();
            return response;  // Return the AI response text
        } else {
            console.error("Error: Unexpected response structure", result);
            return "No response from AI model.";
        }

    } catch (error) {
        console.error("Error in AI function:", error.message);
        throw error;  // Rethrow to be caught in the controller
    }
}

export { ai };
