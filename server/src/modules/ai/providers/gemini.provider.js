import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODELS = [
    "gemini-3.5-flash",
    "gemini-flash-latest"
];

export async function generateWithGemini(prompt) {

    let lastError = null;

    for (const model of MODELS) {

        try {

            console.log(`Trying ${model}`);

            const result =
                await ai.models.generateContent({
                    model,
                    contents: prompt
                });

            console.log(`Success: ${model}`);

            return result.text;

            }catch (err) {

    console.log(`Failed: ${model}`);

    lastError = err;

    // Continue to next model for quota, overload, or retired model
    if ([404, 429, 500, 503].includes(err.status)) {
        continue;
    }

    throw err;
}
    }

    throw lastError;
}