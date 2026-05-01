import { Worker } from "bullmq";
import redisClient from "../config/redis.js";
import pool from "../db/index.js";

export const solveWorker = new Worker(
  "solve-problem",
  async (job) => {
    const { userId, problemId, difficulty } = job.data;

    console.log("Processing solve job:", job.id);

    try {
    
    
      await pool.query(
        `INSERT INTO solved_problems (user_id, difficulty)
         VALUES ($1, $2)`,
        [userId, difficulty]
      );

      await pool.query(
        `INSERT INTO revision_queue (user_id, problem_id, next_revision_date)
         VALUES ($1, $2, CURRENT_DATE + INTERVAL '1 day')
         ON CONFLICT (user_id, problem_id) DO NOTHING`,
        [userId, problemId]
      );

     
      await redisClient.del(`progress:stats:${userId}`);
      await redisClient.del(`revision:due:${userId}`);
      await redisClient.del(`revision:all:${userId}`);

      console.log("Solve job completed:", job.id);

    } catch (err) {
      console.error(" Worker error:", err);

      
      throw err;
    }
  },
  {
    connection: redisClient,
    concurrency: 5,
  }
);