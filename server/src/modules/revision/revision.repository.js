import pool from "../../db/index.js";
import redisClient from "../../config/redis.js";



export const insertRevisionRepo = async (userId, problemId) => {
  await pool.query(
    `INSERT INTO revision_queue (user_id, problem_id, next_revision_date)
     VALUES ($1, $2, CURRENT_DATE + INTERVAL '1 day')
     ON CONFLICT (user_id, problem_id) DO NOTHING`,
    [userId, problemId]
  );

 await redisClient.del(`revision:all:${userId}`);
await redisClient.del(`revision:due:${userId}`);
};



export const getDueRevisionsRepo = async (userId) => {
  const cacheKey = `revision:due:${userId}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("CACHE HIT (due revisions)");
    return JSON.parse(cached);
  }

  console.log("CACHE MISS (due revisions)");

  const result = await pool.query(
    `SELECT * FROM revision_queue
     WHERE user_id = $1
     AND is_completed = FALSE
     AND next_revision_date <= CURRENT_DATE
     ORDER BY next_revision_date ASC`,
    [userId]
  );

  await redisClient.setEx(
    cacheKey,
    300,
    JSON.stringify(result.rows)
  );

  return result.rows;
};

export const getAllRevisionsRepo = async (userId) => {
  const cacheKey = `revision:all:${userId}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("CACHE HIT (all revisions)");
    return JSON.parse(cached);
  }

  console.log("CACHE MISS (all revisions)");

  const result = await pool.query(
    `SELECT * FROM revision_queue
     WHERE user_id = $1
     ORDER BY next_revision_date ASC`,
    [userId]
  );

  await redisClient.setEx(
    cacheKey,
    300,
    JSON.stringify(result.rows)
  );

  return result.rows;
};


export const getRevisionByProblemRepo = async (userId, problemId) => {
  const result = await pool.query(
    `SELECT * FROM revision_queue
     WHERE user_id = $1 AND problem_id = $2`,
    [userId, problemId]
  );

  return result.rows[0];
};



export const updateRevisionRepo = async (userId, problemId, nextDate) => {
  await pool.query(
    `UPDATE revision_queue
     SET 
       revision_count = revision_count + 1,
       next_revision_date = $1
     WHERE user_id = $2 AND problem_id = $3`,
    [nextDate, userId, problemId]
  );

  
  await redisClient.del(`revision:due:${userId}`);
  await redisClient.del(`revision:all:${userId}`);
};

export const markCompletedRepo = async (userId, problemId) => {
  await pool.query(
    `UPDATE revision_queue
     SET is_completed = TRUE
     WHERE user_id = $1 AND problem_id = $2`,
    [userId, problemId]
  );


  await redisClient.del(`revision:due:${userId}`);
  await redisClient.del(`revision:all:${userId}`);
};