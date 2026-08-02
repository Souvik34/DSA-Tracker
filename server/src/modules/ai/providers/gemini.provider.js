import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODELS = [
    "gemini-3.5-flash",
    "gemini-2.5-flash",
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

        } catch (err) {

            console.log(`Failed: ${model}`);

            lastError = err;

           if (err.status === 503) {
    continue;
}

throw err;
        }

    }

    throw lastError;
}