import { getDueRevisionsRepo } from "../revision/revision.repository.js";
import {
  getWeakTopicRepo,
  getRecommendedProblemsRepo,
  getDailySolveRepo,
  getTopicDistributionRepo,
  getDifficultyDistributionRepo,
} from "./dashboard.repository.js";

export const getDashboardService = async (userId) => {


  const revisions = await getDueRevisionsRepo(userId);


  const weak = await getWeakTopicRepo(userId);
  const weakTopic = weak?.topic || null;

 
  const recommendedProblems =
    await getRecommendedProblemsRepo(weakTopic);

  
  return {
    revision: {
      dueCount: revisions.length,
      items: revisions,
    },
    weakTopic,
    recommendedProblems,
  };
};

const calculateStreak = (dailyData) => {
  if (!dailyData.length) return { streak: 0, longestStreak: 0 };

  let streak = 0;
  let longest = 0;
  let current = 0;

  const dates = dailyData.map(d => new Date(d.date).toDateString());

  for (let i = dates.length - 1; i >= 0; i--) {
    current++;
    longest = Math.max(longest, current);

    const today = new Date(dates[i]);
    const prev = new Date(dates[i - 1]);

    if (!prev) break;

    const diff = (today - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      continue;
    } else {
      current = 0;
    }
  }

  streak = current;
  return { streak, longestStreak: longest };
};

export const getDashboardService = async (userId) => {

  const [
    revisions,
    weak,
    dailySolve,
    topicDist,
    difficultyDist
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

  return {
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
};