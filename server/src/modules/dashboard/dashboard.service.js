import { getDueRevisionsRepo } from "../revision/revision.repository.js";
import {
  getWeakTopicRepo,
  getRecommendedProblemsRepo,
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