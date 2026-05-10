import {
  createInterviewSessionRepo,
  insertInterviewMessageRepo,
} from "./interview.repository.js";
import { generateStructuredQuestion } from "./questionGenerator.ai.js";
import { generateCodeReview } from "./codeReview.ai.js";
import { evaluateCode } from "./codeEvaluation.service.js";
// import { interviewBrain } from "./interview.brain.js";
import {
  getInterruptQuestion,
} from "./interview.interrupts.js";
import {
  getInterviewSessionRepo,
  getInterviewMessagesRepo,
  //   insertInterviewMessageRepo,
} from "./interview.repository.js";

import {
  detectInterviewPhase,
} from "./interview.phase.js";

// import { generateFollowUpQuestion } from "./interview.ai.js";

import {
  createInterviewFeedbackRepo,
  endInterviewSessionRepo,
} from "./interview.repository.js";

import { generateInterviewFeedback } from "./interview.ai.js";
export const startInterviewService = async ({
  userId,
  type,
  difficulty,
  language,
}) => {
  const rawQuestion = await generateStructuredQuestion({
    difficulty,
    language,
  });

  let parsedQuestion;

  try {
    const cleaned = rawQuestion
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    parsedQuestion = JSON.parse(cleaned);
  } catch (err) {
    console.error("Question parse error:", rawQuestion);

    throw new Error("Failed to generate interview question");
  }

  const title = parsedQuestion.title;

  const session = await createInterviewSessionRepo({
    userId,
    type,
    difficulty,
    language,
    title,
    currentQuestion: JSON.stringify(parsedQuestion),
  });

  await insertInterviewMessageRepo({
    sessionId: session.id,
    sender: "ai",
    message: parsedQuestion.problem,
  });

  return {
    session,
    firstQuestion: parsedQuestion,
  };
};

export const sendInterviewMessageService = async ({ sessionId, message }) => {
  const session = await getInterviewSessionRepo(sessionId);

  if (!session) {
    throw new Error("Interview session not found");
  }

  // save user message
  await insertInterviewMessageRepo({
    sessionId,
    sender: "user",
    message,
  });
  let evaluation = null;

  // detect if user sent code (simple MVP detection)
  const looksLikeCode =
    message.includes("function") ||
    message.includes("class") ||
    message.includes("return") ||
    message.includes("for") ||
    message.includes("while") ||
    message.includes("{") ||
    message.includes("};") ||
    message.includes("public static") ||
    message.includes("def ");

    if (looksLikeCode && session.type === "DSA") {

  let currentQuestion = {};

  try {

    currentQuestion = JSON.parse(
      session.current_question
    );

  } catch (err) {

    console.error(
      "Question parse failed",
      err
    );
  }

  const testCases =
    currentQuestion.testCases || [];

  if (!testCases.length) {
    throw new Error(
      "No testcases available"
    );
  }

  evaluation = await evaluateCode({
    language: session.language,
    code: message,
    testCases
  });
}
  // fetch updated conversation
  const messages = await getInterviewMessagesRepo(sessionId);
  const phase =
  detectInterviewPhase({
    messages,
    evaluation,
  });

//   let review = null;

// if (
//   evaluation &&
//   looksLikeCode
// ) {

//   let currentQuestion = {};

//   try {

//     currentQuestion = JSON.parse(
//       session.current_question
//     );

//   } catch (err) {

//     console.error(err);
//   }

//   const rawReview =
//     await generateCodeReview({
//       question: currentQuestion,
//       code: message,
//       evaluation,
//       messages,
//     });

//   try {

//     const cleaned =
//       rawReview
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//     review =
//       JSON.parse(cleaned);

//   } catch (err) {

//     console.error(
//       "Review parse failed",
//       rawReview
//     );
//   }
// }

  // const action = interviewBrain({ messages });

// let aiReply;

// if (
//   phase === "OPTIMIZATION_PHASE"
// ) {

//   aiReply =
//     "Your solution passes current testcases. Can you optimize the time or space complexity further?";

// }
// else if (
//   phase === "DEBUGGING_PHASE"
// ) {

//   aiReply =
//     "Your solution is failing some testcases. Try debugging edge cases and walk through your logic carefully.";

// }
// else if (
//   review?.interviewerResponse
// ) {

//   aiReply =
//     review.interviewerResponse;

// }
// else {

//   // switch (action) {

//   //   case "GIVE_HINT":
//   //     aiReply =
//   //       "I'll guide you step by step. Start with brute force approach. What would you try first?";
//   //     break;

//   //   case "PUSH_USER_THINKING":
//   //     aiReply =
//   //       "Take a moment. Break the problem into smaller subproblems before coding.";
//   //     break;

//   //   case "CHALLENGE_APPROACH":
//   //     aiReply =
//   //       "Good direction. Can you analyze time and space complexity of your approach?";
//   //     break;

//   //   case "ASK_EDGE_CASES":
//   //     aiReply =
//   //       "Nice progress. What edge cases might break your solution?";
//   //     break;

//   //   default:
//   //     aiReply =
//   //       await generateFollowUpQuestion({
//   //         type: session.type,
//   //         difficulty: session.difficulty,
//   //         messages
//   //       });
//   // }
// }


let aiReply =
  getInterruptQuestion({
    phase,
    evaluation,
    message
  });

if (!aiReply) {
  aiReply = "Continue.";
}

  // save AI response
  await insertInterviewMessageRepo({
    sessionId,
    sender: "ai",
    message: aiReply,
  });

return {
  aiReply,
  evaluation, 
};
};
export const endInterviewService = async (sessionId) => {
  const session = await getInterviewSessionRepo(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const messages = await getInterviewMessagesRepo(sessionId);

  const rawFeedback = await generateInterviewFeedback({
    type: session.type,
    difficulty: session.difficulty,
    messages,
  });

  let feedback;

  try {
    const cleaned = rawFeedback
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    feedback = JSON.parse(cleaned);
  } catch (err) {
    console.error("Feedback parse failed:", rawFeedback);

    feedback = {
      overallScore: 0,
      communicationScore: 0,
      problemSolvingScore: 0,
      optimizationScore: 0,
      strengths: "Could not evaluate properly",
      weaknesses: "Parsing issue",
      finalFeedback: "System evaluation issue",
    };
  }

  await createInterviewFeedbackRepo({
    sessionId,

    overallScore: feedback.overallScore,

    communicationScore: feedback.communicationScore,

    problemSolvingScore: feedback.problemSolvingScore,

    optimizationScore: feedback.optimizationScore,

    strengths: feedback.strengths,

    weaknesses: feedback.weaknesses,

    finalFeedback: feedback.finalFeedback,
  });

  await endInterviewSessionRepo(sessionId);

  return feedback;
};
