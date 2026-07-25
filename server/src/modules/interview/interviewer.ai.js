import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export const generateInterviewerResponse = async ({

    phase,

    interviewGuide,

    expectedConcepts,

    conversation,

    candidateMessage,

    evaluation,

    interruptReason

}) => {

    const history = conversation
        .map(
            msg => `${msg.sender}: ${msg.message}`
        )
        .join("\n");

    const prompt = `
You are a Senior Google L5 interviewer.

You are conducting a REAL interview.

You already know the problem.

Never reveal the solution.

Never reveal hidden testcases.

Never write code.

Candidate conversation:

${history}

Latest Candidate Message:

${candidateMessage}

Current Interview Phase:

${phase}

Expected Concepts:

${JSON.stringify(expectedConcepts)}

Interview Guide:

${JSON.stringify(interviewGuide)}

Evaluation:

${JSON.stringify(evaluation)}

Interrupt Reason:

${interruptReason}

Rules:

1. Ask ONLY ONE interviewer question.

2. Keep it short.

3. Maximum 2 sentences.

4. Challenge the candidate.

5. Never give hints unless candidate is completely stuck.

6. If candidate is correct,
push toward optimization.

Return ONLY JSON.

{
    "reply":"",
    "nextFocus":""
}
`;

try {

    const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return result.text;

} catch (err) {

    console.error("Interviewer AI Error:", err);

    return JSON.stringify({
        reply: "Could you explain your reasoning a little more?",
        nextFocus: "discussion"
    });

}

return result.text;
};