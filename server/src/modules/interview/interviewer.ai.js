import { generateWithGemini }
from "../ai/providers/gemini.provider.js";
export const generateInterviewerResponse = async ({
    phase,
    interviewGuide,
    expectedConcepts,
    conversation,
    candidateMessage,
    candidateCode,
    evaluation,
    codeAnalysis,
    interruptReason
})=> {

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

Candidate Code:

${candidateCode || "No code submitted"}

Code Analysis:

${JSON.stringify(codeAnalysis)}

Current Interview Phase:

${phase}
CONFIDENTIAL INTERVIEWER NOTES
(These are ONLY for evaluation. Never reveal them.)

Expected Concepts:
${JSON.stringify(expectedConcepts)}

Interview Guide:
${JSON.stringify(interviewGuide)}

Evaluation:

${JSON.stringify(evaluation)}

Interrupt Reason:

${interruptReason}

Rules:

1. You are an interviewer, NOT a tutor.

2. Never reveal the intended algorithm, data structure, or solution.

3. The Expected Concepts and Interview Guide are confidential interviewer notes.
   Never mention or paraphrase them.

4. Never say words like:
   Sliding Window,
   Two Pointers,
   Binary Search,
   Prefix Sum,
   HashMap,
   Heap,
   DFS,
   BFS,
   Dynamic Programming,
   Greedy,
   unless the candidate has already explicitly mentioned or implemented them.

5. During CODING phase, respond ONLY to what is visible in the candidate's code.

6. Never assume the candidate's intended algorithm.

7. If the candidate writes placeholder or invalid code,
   ask them to explain their reasoning instead of suggesting an approach.

8. If compilation errors exist,
   ask about fixing them without suggesting the algorithm.

9. Ask ONLY ONE interviewer question.

10. Maximum two sentences.

11. Never write code.

12. Never give implementation hints unless the candidate is completely stuck.

13. If the candidate is progressing correctly,
    ask why they chose that implementation instead of suggesting the next step.

14. Behave exactly like a real Google L5 interviewer.

Return ONLY JSON.

{
    "reply":"",
    "nextFocus":""
}
`;

try {

   const text =
    await generateWithGemini(prompt);

return text;
}

catch (err) {

    console.error("Interviewer AI Error:", err);

    let reply;

    switch (interruptReason) {

        case "USER_IMPLEMENTED_MAIN_ALGORITHM":
            reply =
                "I noticed you've started implementing the core logic. Can you explain why you chose this approach?";
            break;

        case "FIRST_WORKING_IMPLEMENTATION":
            reply =
                "Walk me through the implementation you've written so far.";
            break;

        case "FAILED_HIDDEN_TESTCASE":
            reply =
                "Your approach seems close. Which edge cases do you think could still fail?";
            break;

        default:
            reply =
                "Continue coding. I'll interrupt if I notice something important.";
    }

    return JSON.stringify({

        reply,

        nextFocus: "discussion"

    });

}

return result.text;
};