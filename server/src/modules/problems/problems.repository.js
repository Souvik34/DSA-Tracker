import pool from '../../db/db.js';
import redisClient from "../../config/redis.js";

export const getAllProblemsRepo = async (params) => {
  const { difficulty, topic, page, limit, search } = params;

 
  const cacheKey = `problems:${difficulty || "all"}:${topic || "all"}:${page}:${limit}:${search || "none"}`;

  // 1. Check cache
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log(" Cache HIT");
    return JSON.parse(cachedData);
  }

  console.log(" Cache MISS");

  // 2. Build query
  let query = "SELECT * FROM problems WHERE 1=1";
  const values = [];

  if (difficulty) {
    values.push(difficulty);
    query += ` AND difficulty = $${values.length}`;
  }

  if (topic) {
    values.push(topic);
    query += ` AND topic = $${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  const offset = (page - 1) * limit;

  values.push(limit);
  values.push(offset);

  query += ` ORDER BY id ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await pool.query(query, values);


  await redisClient.set(cacheKey, JSON.stringify(result.rows), {
    EX: 60,
  });

  return result.rows;
};