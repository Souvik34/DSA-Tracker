import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`Redis reconnect attempt: ${retries}`);
      return Math.min(retries * 50, 2000);
    },
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis ready");
});

redisClient.on("end", () => {
  console.log("Redis disconnected");
});



export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected");
  }
};

export const disconnectRedis = async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
};

export const getOrSetCache = async (key, ttl, callback) => {
  try {
    const cached = await redisClient.get(key);

    if (cached) {
      console.log("CACHE HIT");
      return JSON.parse(cached);
    }

    console.log("CACHE MISS");

    const data = await callback();

    await redisClient.setEx(key, ttl, JSON.stringify(data));

    return data;
  } catch (err) {
    console.error("Redis cache error:", err);


    return await callback();
  }
};

export default redisClient;