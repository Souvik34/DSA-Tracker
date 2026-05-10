import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERVIEW_PROMPTS } from "./interview.prompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateInterviewQuestion = async ({
  type,
  difficulty,
  language,
}) => {

  const prompt = INTERVIEW_PROMPTS.QUESTION({
    type,
    difficulty,
    language,
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateFollowUpQuestion = async ({
  type,
  difficulty,
  messages,
}) => {

  const formattedConversation = messages
    .map((msg) => `${msg.sender}: ${msg.message}`)
    .join("\n");

  const prompt = INTERVIEW_PROMPTS.FOLLOW_UP({
    type,
    difficulty,
    conversation: formattedConversation,
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateInterviewFeedback = async ({
  type,
  difficulty,
  messages,
}) => {

  const formattedConversation = messages
    .map((msg) => `${msg.sender}: ${msg.message}`)
    .join("\n");

  const prompt = `
You are a FAANG technical interviewer.

Evaluate this interview.

Interview Type: ${type}
Difficulty: ${difficulty}

Conversation:
${formattedConversation}

CRITICAL RULES:
- Return ONLY valid JSON
- No markdown
- No explanation text
- No extra characters

JSON FORMAT:
{
  "overallScore": 0,
  "communicationScore": 0,
  "problemSolvingScore": 0,
  "optimizationScore": 0,
  "strengths": "",
  "weaknesses": "",
  "finalFeedback": ""
}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};