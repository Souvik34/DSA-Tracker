import { INTERVIEW_PROMPTS } from "./interview.prompt.js";
import { generateAI } from "../ai/aiProvider.js";

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

  return await generateAI(prompt);
};

export const generateFollowUpQuestion = async ({
  type,
  difficulty,
  messages,
}) => {

  const formattedConversation = (messages ?? [])
    .map(msg => `${msg.sender}: ${msg.message}`)
    .join("\n");

  const prompt = INTERVIEW_PROMPTS.FOLLOW_UP({
    type,
    difficulty,
    conversation: formattedConversation,
  });

  return await generateAI(prompt);
};

export const generateInterviewFeedback = async ({
  type,
  difficulty,
  conversation = [],
  expectedConcepts = [],
  expectedComplexity = {},
  interviewGuide = {},
}) => {

  const formattedConversation = conversation
    .map(msg => `${msg.sender}: ${msg.message}`)
    .join("\n");

  const prompt = `
You are a FAANG technical interviewer.

Evaluate this interview.

Interview Type: ${type}
Difficulty: ${difficulty}

Expected Concepts:
${JSON.stringify(expectedConcepts)}

Expected Complexity:
${JSON.stringify(expectedComplexity)}

Interview Guide:
${JSON.stringify(interviewGuide)}

Conversation:
${formattedConversation}

Score the candidate based on:
- Communication
- Problem Solving
- Code Quality
- Optimization
- Overall Performance

CRITICAL RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- No code fences.

JSON FORMAT:
{
  "overallScore": 0,
  "communicationScore": 0,
  "problemSolvingScore": 0,
  "optimizationScore": 0,
  "strengths": [
    ""
  ],
  "weaknesses": [
    ""
  ],
  "finalFeedback": ""
}
`;

  return await generateAI(prompt);
};