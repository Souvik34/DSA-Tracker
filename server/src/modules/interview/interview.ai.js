import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});



export const generateInterviewQuestion = async ({
  type,
  difficulty,
  language,
}) => {

  const prompt = `
You are an expert technical interviewer.

Generate ONE ${difficulty} level ${type} interview question.

Rules:
- Do not provide solution
- Keep it realistic
- Keep it concise

If type is DSA:
- include problem statement
- include constraints
- include examples

If type is system design:
- ask realistic architecture problem
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};

export const generateFollowUpQuestion = async ({
  type,
  difficulty,
  messages,
}) => {

  const formattedConversation =
    messages
      .map(
        (msg) =>
          `${msg.sender}: ${msg.message}`
      )
      .join("\n");



  const prompt = `
You are a real technical interviewer.

Interview Type:
${type}

Difficulty:
${difficulty}

Conversation:
${formattedConversation}

Your task:
- Ask ONE realistic follow-up question
- Be concise
- Ask about optimization, edge cases,
  scalability, tradeoffs, or reasoning
- Never provide full solutions
- Behave like a real interviewer
`;



  const result =
    await model.generateContent(prompt);

  return result.response.text();
};