import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateWithGemini(prompt) {

    const result = await ai.models.generateContent({
        // model: "gemini-2.5-flash",
        model: "gemini-flash-latest",
        contents: prompt,
    });

    return result.text;
}