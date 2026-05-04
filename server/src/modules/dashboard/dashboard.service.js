import redisClient from "../../config/redis.js";

import { getDueRevisionsRepo } from "../revision/revision.repository.js";
import {
  getWeakTopicRepo,
  getRecommendedProblemsRepo,
  getDailySolveRepo,
  getTopicDistributionRepo,
  getDifficultyDistributionRepo,
} from "./dashboard.repository.js";


const calculateStreak = (dailyData) => {
  if (!dailyData.length) return { streak: 0, longestStreak: 0 };

  const dates = dailyData.map(d =>
    new Date(d.date).toISOString().split("T")[0]
  );

  let current = 1;
  let longest = 1;

  for (let i = dates.length - 1; i > 0; i--) {
    const curr = new Date(dates[i]);
    const prev = new Date(dates[i - 1]);

    const diff = Math.floor((curr - prev) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return {
    streak: current,
    longestStreak: longest,
  };
};


export const getDashboardService = async (userId) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Valid userId is required");
  }

  const cacheKey = `dashboard:${userId}`;


  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("DASHBOARD CACHE HIT");
    return JSON.parse(cached);
  }

  console.log("DASHBOARD CACHE MISS");

  const [
    revisions,
    weak,
    dailySolve,
    topicDist,
    difficultyDist,
  ] = await Promise.all([
    getDueRevisionsRepo(userId),
    getWeakTopicRepo(userId),
    getDailySolveRepo(userId),
    getTopicDistributionRepo(userId),
    getDifficultyDistributionRepo(userId),
  ]);

  const weakTopic = weak?.topic || null;

  const recommendedProblems =
    await getRecommendedProblemsRepo(weakTopic);

  const { streak, longestStreak } = calculateStreak(dailySolve);

 
  const response = {
    revision: {
      dueCount: revisions.length,
      items: revisions,
    },
    weakTopic,
    recommendedProblems,
    analytics: {
      streak,
      longestStreak,
      dailySolve,
      topicDistribution: topicDist,
      difficultyDistribution: difficultyDist,
    },
  };

  await redisClient.setEx(
    cacheKey,
    300, 
    JSON.stringify(response)
  );

  return response;
};