import {
  createInterviewSessionRepo,
  insertInterviewMessageRepo,
} from "./interview.repository.js";

import {
  generateInterviewQuestion,
} from "./interview.ai.js";


import {
  getInterviewSessionRepo,
  getInterviewMessagesRepo,
//   insertInterviewMessageRepo,
} from "./interview.repository.js";

import {
  generateFollowUpQuestion,
} from "./interview.ai.js";


import {
  createInterviewFeedbackRepo,
  endInterviewSessionRepo,
} from "./interview.repository.js";

import {
  generateInterviewFeedback,
} from "./interview.ai.js";
export const startInterviewService = async ({
  userId,
  type,
  difficulty,
  language,
}) => {

  const question =
    await generateInterviewQuestion({
      type,
      difficulty,
      language,
    });

  const title =
    `${difficulty} ${type} interview`;



  const session =
    await createInterviewSessionRepo({
      userId,
      type,
      difficulty,
      language,
      title,
      currentQuestion: question,
    });



  await insertInterviewMessageRepo({
    sessionId: session.id,
    sender: "ai",
    message: question,
  });



  return {
    session,
    firstQuestion: question,
  };
};

export const sendInterviewMessageService =
  async ({
    sessionId,
    message,
  }) => {

    const session =
      await getInterviewSessionRepo(
        sessionId
      );

    if (!session) {
      throw new Error(
        "Interview session not found"
      );
    }



    await insertInterviewMessageRepo({
      sessionId,
      sender: "user",
      message,
    });



    const messages =
      await getInterviewMessagesRepo(
        sessionId
      );



    const aiReply =
      await generateFollowUpQuestion({
        type: session.type,
        difficulty: session.difficulty,
        messages,
      });



    await insertInterviewMessageRepo({
      sessionId,
      sender: "ai",
      message: aiReply,
    });



    return {
      aiReply,
    };
};

export const endInterviewService =
  async (sessionId) => {

    const session =
      await getInterviewSessionRepo(
        sessionId
      );

    if (!session) {
      throw new Error(
        "Session not found"
      );
    }



    const messages =
      await getInterviewMessagesRepo(
        sessionId
      );



    const rawFeedback =
      await generateInterviewFeedback({
        type: session.type,
        difficulty: session.difficulty,
        messages,
      });



    const cleaned =
      rawFeedback
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();



    const feedback =
      JSON.parse(cleaned);



    await createInterviewFeedbackRepo({
      sessionId,

      overallScore:
        feedback.overallScore,

      communicationScore:
        feedback.communicationScore,

      problemSolvingScore:
        feedback.problemSolvingScore,

      optimizationScore:
        feedback.optimizationScore,

      strengths:
        feedback.strengths,

      weaknesses:
        feedback.weaknesses,

      finalFeedback:
        feedback.finalFeedback,
    });



    await endInterviewSessionRepo(
      sessionId
    );



    return feedback;
};