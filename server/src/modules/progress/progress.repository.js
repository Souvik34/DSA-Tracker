import pool from "../../db/db.js";
// import { pool } from "../../db/index.js";
import redisClient from "../../config/redis.js";

export const getUserProgressRepo = async (userId) => {
  const cacheKey = `progress:stats:${userId}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("CACHE HIT");
    return JSON.parse(cached);
  }

  console.log("CACHE MISS");

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

  await redisClient.setEx(
    cacheKey,
    300,
    JSON.stringify(result.rows[0])
  );

  return result.rows[0];
};


export const insertSolvedProblemRepo = async (
  userId,
  problemId,
  difficulty
) => {
  await pool.query(
    `INSERT INTO solved_problems (user_id, problem_id, difficulty)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, problem_id) DO NOTHING`,
    [userId, problemId, difficulty]
  );
};