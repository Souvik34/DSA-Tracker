import pool from "../../db/index.js";


export const getWeakTopicRepo = async (userId) => {
  const result = await pool.query(
    `SELECT topic, COUNT(*) as count
     FROM solved_problems
     WHERE user_id = $1
     GROUP BY topic
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