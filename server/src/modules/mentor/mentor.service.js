import redisClient from "../../config/redis.js";

import {
    getTopicStrengthRepo,
    getStrongTopicsRepo,
    getDifficultyDistributionRepo,
    getTopicDistributionRepo,
    getRecentActivityRepo
} from "../dashboard/dashboard.repository.js";
import {
    getMentorProblemsRepo,
    getMentorProblemsByIdsRepo
} from "../problems/problems.repository.js";
import {
    generateMentorAdvice
} from "./mentor.ai.service.js";

import {
    findFocusTopic,
    calculateTopicScore
} from "./topicScore.js";
export const getMentorRecommendation = async (userId) => {
const snapshotCacheKey = `mentor-snapshot:${userId}`;

const cachedSnapshot =
    await redisClient.get(snapshotCacheKey);

const existingSnapshot = cachedSnapshot
    ? JSON.parse(cachedSnapshot)
    : null;

const existingPlan = existingSnapshot?.mentorPlan;
const completedProblemIds =
    existingPlan?.completedProblemIds || [];
    const planCompleted =
    existingPlan?.problemIds?.length > 0 &&
    existingPlan.problemIds.every((id) =>
        completedProblemIds.includes(id)
    );
const [
    topicStrength,
    strongTopics,
    difficulty,
    topics,
    recentActivity
] = await Promise.all([
    getTopicStrengthRepo(userId),
    getStrongTopicsRepo(userId),
    getDifficultyDistributionRepo(userId),
    getTopicDistributionRepo(userId),
    getRecentActivityRepo(userId)
]);

let mentorProblems = [];

let focusTopic;
let isNewPlan = !existingPlan || planCompleted;
if (
    existingPlan?.problemIds?.length > 0 &&
    !planCompleted
) {

    const remainingProblemIds =
        existingPlan.problemIds.filter(
            (id) => !completedProblemIds.includes(id)
        );

    mentorProblems =
        await getMentorProblemsByIdsRepo(
            remainingProblemIds
        );

    if (mentorProblems.length > 0) {

        focusTopic =
            topicStrength.find(
                (topic) =>
                    topic.topic === existingPlan.topic
            ) || findFocusTopic(topicStrength);

    }

}

if (!mentorProblems.length) {

    isNewPlan = true;

    const rankedTopics = topicStrength
        .map(topic => calculateTopicScore(topic))
        .sort((a, b) => a.score - b.score);

    focusTopic = null;
    mentorProblems = [];

    for (const topic of rankedTopics) {

        const problems = await getMentorProblemsRepo(
            userId,
            topic.topic,
            5
        );

        if (problems.length > 0) {

            focusTopic = topic;
            mentorProblems = problems;

            break;
        }
    }
}
console.log(
    "MENTOR PROBLEMS RESULT",
    mentorProblems
);
    /* ---------------- Recommendation ---------------- */

    let recommendation;

    if (!focusTopic) {

        recommendation = {

            title: "Start your DSA journey",

            summary:
                "Begin solving problems to unlock personalized guidance.",

            priority: "Getting Started",

            actions: [

                "Practice arrays and strings",

                "Build daily solving habit"

            ]

        };

    }

    else if (focusTopic.type === "coverage_gap") {

        recommendation = {

            title: `Explore ${focusTopic.topic}`,

            summary:
                `You have limited practice in ${focusTopic.topic}. Build more exposure before evaluating mastery.`,

            priority: focusTopic.topic,

            confidence: focusTopic.confidence,

            actions: [

                `Solve beginner ${focusTopic.topic} problems`,

                `Learn common ${focusTopic.topic} patterns`,

                `Add this topic to your revision cycle`

            ]

        };

    }

    else {

        recommendation = {

            title: `Improve ${focusTopic.topic}`,

            summary:
                `You have practiced ${focusTopic.topic}, but your performance needs improvement.`,

            priority: focusTopic.topic,

            confidence: focusTopic.confidence,

            actions: [

                "Review mistakes",

                "Solve medium level problems",

                "Attempt timed practice"

            ]

        };

    }


    /* ---------------- AI Profile ---------------- */

const aiProfile = {
    recommendation,
    focusTopic,
    strongTopics: strongTopics.slice(0, 3),
    difficulty,
    recentProblems: recentActivity.slice(0, 5),
    topics: topics.slice(0, 5),

    mentorProblems: mentorProblems.map((problem) => ({
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        topic: problem.topic
    }))
};

    /* ---------------- Dynamic Cache Key ---------------- */
const problemIds = mentorProblems
    .map((problem) => problem.id)
    .join(",");
   const cacheKey = [
    "mentor-ai",
    userId,
    focusTopic?.topic ?? "none",
    focusTopic?.type ?? "none",
    focusTopic?.score ?? 0,
    focusTopic?.confidence ?? 0,
       problemIds
].join(":");


    /* ---------------- AI Cache ---------------- */

    let aiAdvice;

    const cachedAdvice =
        await redisClient.get(cacheKey);

    if (cachedAdvice) {

        console.log("MENTOR AI CACHE HIT");

        aiAdvice =
            JSON.parse(cachedAdvice);

    }

    else {

        console.log("MENTOR AI CACHE MISS");

        aiAdvice =
            await generateMentorAdvice(aiProfile);

        await redisClient.setEx(

            cacheKey,

            60 * 60 * 24,

            JSON.stringify(aiAdvice)

        );

    }

const snapshot = {
    recommendation,
    aiAdvice,
    mentorProblems,
    profile: {
        focusTopic,
        strongTopics,
        difficulty,
        topics,
        recentActivity
    },
mentorPlan: {
    topic: focusTopic?.topic ?? null,

    problemIds: mentorProblems.map(
        (problem) => problem.id
    ),

    completedProblemIds: isNewPlan
        ? []
        : completedProblemIds
}
};
await redisClient.set(
    snapshotCacheKey,
    JSON.stringify(snapshot)
);


return snapshot;
    /* ---------------- Response ---------------- */

};

export const completeMentorProblem = async (
  userId,
  problemId
) => {
  const snapshotCacheKey = `mentor-snapshot:${userId}`;

  console.log("========== MENTOR COMPLETION ==========");
  console.log("USER:", userId);
  console.log("PROBLEM:", problemId);

  const cached = await redisClient.get(snapshotCacheKey);

  console.log("MENTOR SNAPSHOT EXISTS:", !!cached);

  if (!cached) {
    throw new Error("No active mentor plan");
  }

  const snapshot = JSON.parse(cached);

  const plan = snapshot.mentorPlan;

  console.log("MENTOR PLAN:", plan);

  if (!plan?.problemIds?.includes(Number(problemId))) {
    throw new Error(
      "Problem is not part of the current mentor plan"
    );
  }

  if (!plan.completedProblemIds) {
    plan.completedProblemIds = [];
  }

  if (
    !plan.completedProblemIds.includes(
      Number(problemId)
    )
  ) {
    plan.completedProblemIds.push(
      Number(problemId)
    );
  }

  snapshot.mentorPlan = plan;

  await redisClient.set(
    snapshotCacheKey,
    JSON.stringify(snapshot)
  );
await redisClient.del(`dashboard:${userId}`);
  console.log(
    "UPDATED COMPLETED IDS:",
    plan.completedProblemIds
  );

  console.log("========================================");

  return snapshot.mentorPlan;
};