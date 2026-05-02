import pool from "../../db/db.js";
import redisClient from "../../config/redis.js";



const normalize = (val) => {
  if (!val || val.length === 0) return "all";
  if (Array.isArray(val)) return [...val].sort().join(",");
  return val;
};



export const getAllProblemsRepo = async (params) => {
  const {
    difficulty,
    topic,
    page = 1,
    limit = 50,
    search = ""
  } = params;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const cacheKey =
    `problems:v1:` +
    `d:${normalize(difficulty)}:` +
    `t:${normalize(topic)}:` +
    `p:${pageNum}:l:${limitNum}:s:${search || "none"}`;

  /* ---------- REDIS GET ---------- */
  let cachedData;

  try {
    cachedData = await redisClient.get(cacheKey);
  } catch (err) {
    console.error("Redis GET error:", err);
  }

  if (cachedData) {
    console.log("CACHE HIT");
    return JSON.parse(cachedData);
  }

  console.log("CACHE MISS");

  /* ---------- SQL QUERY ---------- */
  let query = "SELECT * FROM problems WHERE 1=1";
  const values = [];

  if (difficulty?.length) {
    values.push(difficulty);
    query += ` AND difficulty = ANY($${values.length})`;
  }

  if (topic?.length) {
    values.push(topic);
    query += ` AND topic = ANY($${values.length})`;
  }

  if (search) {
    values.push(`%${search}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  const offset = (pageNum - 1) * limitNum;

  values.push(limitNum);
  values.push(offset);

  query += ` ORDER BY id ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await pool.query(query, values);

  try {
    await redisClient.setEx(
      cacheKey,
      300, // 5 min TTL
      JSON.stringify(result.rows)
    );
  } catch (err) {
    console.error("Redis SET error:", err);
  }

  return result.rows;
};



export const getProblemByIdRepo = async (id) => {
  const cacheKey = `problem:${id}`;

  let cached;

  try {
    cached = await redisClient.get(cacheKey);
  } catch (err) {
    console.error("Redis GET error:", err);
  }

  if (cached) return JSON.parse(cached);

  const result = await pool.query(
    "SELECT * FROM problems WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) return null;

  try {
    await redisClient.setEx(cacheKey, 300, JSON.stringify(result.rows[0]));
  } catch (err) {
    console.error("Redis SET error:", err);
  }

  return result.rows[0];
};


export const createProblemRepo = async (data) => {
  const {
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform
  } = data;

  const result = await pool.query(
    `INSERT INTO problems 
    (title, question_link, difficulty, topic, tags, platform)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [
      title,
      question_link,
      difficulty,
      topic,
      tags,
      platform
    ]
  );

  try {
    await redisClient.del(`problem:${result.rows[0].id}`);
  } catch (err) {
    console.error("Redis delete error:", err);
  }

  return result.rows[0];
};

export const insertSolvedProblemRepo = async (userId, difficulty) => {
  await pool.query(
    `INSERT INTO solved_problems (user_id, difficulty)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, difficulty]
  );


  await redisClient.del(`progress:stats:${userId}`);
};