import pool from "../../../db/db.js";

export const insertLeetCodeActivityRepo = async (
  userId,
  problem
) => {
  const {
    problemTitle,
    problemSlug,
    difficulty,
    topics,
    solvedAt,
  } = problem;

  await pool.query(
    `
    INSERT INTO leetcode_activity
    (
      user_id,
      problem_title,
      problem_slug,
      difficulty,
      topics,
      solved_at
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id, problem_slug)
    DO UPDATE SET
      problem_title = EXCLUDED.problem_title,
      difficulty = EXCLUDED.difficulty,
      topics = EXCLUDED.topics,
      solved_at = EXCLUDED.solved_at
    `,
    [
      userId,
      problemTitle,
      problemSlug,
      difficulty,
      topics || [],
      solvedAt,
    ]
  );
};