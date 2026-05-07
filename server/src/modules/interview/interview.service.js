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