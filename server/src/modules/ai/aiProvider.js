import { generateWithGemini } from "./providers/gemini.provider.js";
import { generateWithOpenRouter } from "./providers/openrouter.provider.js";

export async function generateAI(prompt) {

    try {

        console.log("========== GEMINI ==========");

        return await generateWithGemini(prompt);

    } catch (err) {

        console.log("Gemini unavailable.");

        console.log("========== OPENROUTER ==========");

        return await generateWithOpenRouter(prompt);
    }
}