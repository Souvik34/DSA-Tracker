import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildDashboardPrompt } from "./prompt.service.js";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const generateDashboardInsights = async (
  dashboardData
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = buildDashboardPrompt(dashboardData);

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return response;

  } catch (err) {
    console.error("AI Error:", err.message);
    throw new Error("Failed to generate AI insights");
  }
};