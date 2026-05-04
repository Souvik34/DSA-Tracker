import { Worker } from "bullmq";
import { connection } from "../config/bullmq.redis.js";
import { addSolvedProblemService } from "../modules/progress/progress.service.js";
import { insertRevisionRepo } from "../modules/revision/revision.repository.js";
import redisClient from "../config/redis.js";

export const solveWorker = new Worker(
  "solve-problem",
  async (job) => {
    const { userId, problemId, difficulty } = job.data;

    console.log("Processing job:", job.id);

    /* ---------- VALIDATION ---------- */
    if (!userId || !problemId || !difficulty) {
      throw new Error("Invalid job data");
    }

    try {
      /* ---------- CORE LOGIC ---------- */
      await addSolvedProblemService(userId, problemId, difficulty);
      await insertRevisionRepo(userId, problemId);

      /* ---------- CACHE INVALIDATION ---------- */
      await redisClient.del(`progress:stats:${userId}`);
      await redisClient.del(`revision:due:${userId}`);
      await redisClient.del(`revision:all:${userId}`);
      await redisClient.del(`dashboard:${userId}`);

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

    /* ---------- CLEANUP ---------- */
    removeOnComplete: true,   // prevent Redis memory bloat
    removeOnFail: 100,       // keep last 100 failed jobs for debugging
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