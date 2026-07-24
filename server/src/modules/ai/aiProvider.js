import { generateWithGemini } from "./providers/gemini.provider.js";

export async function generateAI(prompt) {
    return await generateWithGemini(prompt);
}