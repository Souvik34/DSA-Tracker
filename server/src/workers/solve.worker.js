import { Worker } from "bullmq";
import { connection } from "../config/bullmq.redis.js";
import { addSolvedProblemService } from "../modules/progress/progress.service.js";
import { insertRevisionRepo } from "../modules/revision/revision.repository.js";
import redisClient from "../config/redis.js";

export const solveWorker = new Worker(
  "solve-problem",
  async (job) => {
    const { userId, problemId, difficulty, timeTaken } = job.data;
console.log("WORKER DATA", {
 userId,
 problemId,
 difficulty,
 timeTaken
});
    console.log("Processing job:", job.id);

    /* ---------- VALIDATION ---------- */
    if (!userId || !problemId || !difficulty) {
      throw new Error("Invalid job data");
    }

    try {
      /* ---------- CORE LOGIC ---------- */
      await addSolvedProblemService(userId, problemId, difficulty , timeTaken);
      await insertRevisionRepo(userId, problemId);

    /* ---------- CACHE INVALIDATION ---------- */
await Promise.all([

    redisClient.del(`progress:stats:${userId}`),

    redisClient.del(`revision:due:${userId}`),

    redisClient.del(`revision:all:${userId}`),

    redisClient.del(`dashboard:${userId}`),

    redisClient.del(`mentor-ai:${userId}`),

]);
      console.log(
        `Job completed: ${job.id} | user ${userId} solved problem ${problemId}`
      );

    } catch (err) {
      console.error("Worker error:", err);
      throw err; // IMPORTANT for retry
    }
  },
  {
    connection,
    concurrency: 5,
  }
);

/* ---------- EVENTS ---------- */
solveWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

solveWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

/* ---------- GRACEFUL SHUTDOWN ---------- */
process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await solveWorker.close();
  process.exit(0);
});