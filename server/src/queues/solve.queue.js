import { Queue } from "bullmq";
import redisClient from "../config/redis.js";

// BullMQ uses ioredis-style connection
export const solveQueue = new Queue("solve-problem", {
  connection: redisClient,
});