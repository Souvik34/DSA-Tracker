import pool from "../../db/db.js";


export const getWeakTopicRepo = async (userId) => {
  const result = await pool.query(
    `SELECT p.topic, COUNT(*) as count
     FROM solved_problems sp
     JOIN problems p ON sp.problem_id = p.id
     WHERE sp.user_id = $1
     GROUP BY p.topic
     ORDER BY count ASC
     LIMIT 1`,
    [userId]
  );

  return result.rows[0] || null;
};

export const getRecommendedProblemsRepo = async (topic) => {
  if (!topic) return [];

  const result = await pool.query(
    `SELECT * FROM problems
     WHERE topic = $1
     LIMIT 2`,
    [topic]
  );

  return result.rows;
};

export const getDailySolveRepo = async (userId) => {
  const result = await pool.query(
    `SELECT DATE(solved_at) as date, COUNT(*) as count
     FROM solved_problems
     WHERE user_id = $1
     GROUP BY date
     ORDER BY date ASC`,
    [userId]
  );

  return result.rows;
};

export const getTopicDistributionRepo = async (userId) => {
  const result = await pool.query(
    `SELECT p.topic, COUNT(*) as count
     FROM solved_problems sp
     JOIN problems p ON sp.problem_id = p.id
     WHERE sp.user_id = $1
     GROUP BY p.topic
     ORDER BY count DESC`,
    [userId]
  );

  return result.rows;
};

export const getDifficultyDistributionRepo = async (userId) => {
  const result = await pool.query(
    `SELECT difficulty, COUNT(*) as count
     FROM solved_problems
     WHERE user_id = $1
     GROUP BY difficulty`,
    [userId]
  );

  return result.rows;
};