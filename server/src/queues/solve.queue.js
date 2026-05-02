
import { Queue } from "bullmq";

export const solveQueue = new Queue("solve-problem", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});