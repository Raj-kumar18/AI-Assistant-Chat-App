import { ai } from "../../ai.js";

const chatController = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        console.log("Received message:", message);  // Log incoming message

        const aiResponse = await ai(message);  // Call the AI function
        console.log("AI Response:", aiResponse);  // Log AI response

        res.status(200).json({ message: aiResponse });  // Send AI response

    } catch (error) {
        console.error("Error processing chat request:", error.message);  // Log detailed error
        res.status(500).json({ message: "Internal server error" });
    }
}

export { chatController };
