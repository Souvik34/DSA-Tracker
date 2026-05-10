import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateCodeReview =
  async ({
    question,
    code,
    evaluation,
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
You are a senior FAANG interviewer.

Analyze the candidate's solution.

QUESTION:
${JSON.stringify(question)}

CANDIDATE CODE:
${code}

TESTCASE EVALUATION:
${JSON.stringify(evaluation)}

INTERVIEW CONVERSATION:
${formattedConversation}

IMPORTANT:
- Do NOT reveal full optimal solution
- Do NOT rewrite full code
- Behave like real interviewer
- Give concise feedback

Return STRICT JSON ONLY.

FORMAT:

{
  "correctness": "",
  "optimization": "",
  "edgeCases": "",
  "codeQuality": "",
  "interviewerResponse": ""
}
`;

    const result =
      await model.generateContent(prompt);

    return result.response.text();
  };