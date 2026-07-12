import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Say hello in one sentence.",
    });

    console.log(result.text);
  } catch (err) {
    console.error(err);
  }
}

test();