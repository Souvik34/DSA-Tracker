import pool from "../../db/db.js";



export const createInterviewSessionRepo = async ({
  userId,
  type,
  difficulty,
  language,
  title,
  currentQuestion,
}) => {

  const result = await pool.query(
    `
    INSERT INTO interview_sessions
    (
      user_id,
      type,
      difficulty,
      language,
      title,
      current_question
    )

    VALUES ($1, $2, $3, $4, $5, $6)

    RETURNING *
    `,
    [
      userId,
      type,
      difficulty,
      language,
      title,
      currentQuestion,
    ]
  );

  return result.rows[0];
};



export const insertInterviewMessageRepo = async ({
  sessionId,
  sender,
  message,
}) => {

  const result = await pool.query(
    `
    INSERT INTO interview_messages
    (
      session_id,
      sender,
      message
    )

    VALUES ($1, $2, $3)

    RETURNING *
    `,
    [
      sessionId,
      sender,
      message,
    ]
  );

  return result.rows[0];
};



export const getInterviewSessionRepo = async (
  sessionId
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM interview_sessions
    WHERE id = $1
    `,
    [sessionId]
  );

  return result.rows[0];
};



export const getInterviewMessagesRepo = async (
  sessionId
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM interview_messages
    WHERE session_id = $1
    ORDER BY created_at ASC
    `,
    [sessionId]
  );

  return result.rows;
};

export const createInterviewFeedbackRepo =
  async ({
    sessionId,
    overallScore,
    communicationScore,
    problemSolvingScore,
    optimizationScore,
    strengths,
    weaknesses,
    finalFeedback,
  }) => {

    const result = await pool.query(
      `
      INSERT INTO interview_feedback
      (
        session_id,
        overall_score,
        communication_score,
        problem_solving_score,
        optimization_score,
        strengths,
        weaknesses,
        final_feedback
      )

      VALUES
      (
        $1, $2, $3, $4,
        $5, $6, $7, $8
      )

      RETURNING *
      `,
      [
        sessionId,
        overallScore,
        communicationScore,
        problemSolvingScore,
        optimizationScore,
        strengths,
        weaknesses,
        finalFeedback,
      ]
    );

    return result.rows[0];
};

export const endInterviewSessionRepo =
  async (sessionId) => {

    await pool.query(
      `
      UPDATE interview_sessions
      SET
        status = 'completed',
        ended_at = NOW()

      WHERE id = $1
      `,
      [sessionId]
    );
};