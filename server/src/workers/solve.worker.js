import { Worker } from "bullmq";
import { connection } from "../config/bullmq.redis.js";

import { addSolvedProblemService } from "../modules/progress/progress.service.js";
import { insertRevisionRepo } from "../modules/revision/revision.repository.js";

export const solveWorker = new Worker(
  "solve-problem",
  async (job) => {
    const { userId, problemId, difficulty } = job.data;

    console.log("Processing job:", job.id);

    try {
    
      await addSolvedProblemService(userId, difficulty);

      await insertRevisionRepo(userId, problemId);

      console.log("Job completed:", job.id);

    } catch (err) {
      console.error("Worker error:", err);
      throw err;
    }
  },
  {
    connection,
    concurrency: 5,
  }
);



solveWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

solveWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err.message);
});