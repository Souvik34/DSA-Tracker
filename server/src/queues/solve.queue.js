import { Queue } from "bullmq";
import redisClient from "../config/redis.js";


export const solveQueue = new Queue("solve-problem", {
  connection: redisClient,
});