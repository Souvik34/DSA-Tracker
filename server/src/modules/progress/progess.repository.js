import { pool } from "../../db/index.js";

export const getUserProgressRepo = async (userId) => {
  const result = await pool.query(
    `SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE difficulty = 'easy') as easy,
        COUNT(*) FILTER (WHERE difficulty = 'medium') as medium,
        COUNT(*) FILTER (WHERE difficulty = 'hard') as hard
     FROM solved_problems
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};