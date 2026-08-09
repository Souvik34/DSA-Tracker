import redisClient from "../../config/redis.js";

import {
    getTopicStrengthRepo,
    getStrongTopicsRepo,
    getDifficultyDistributionRepo,
    getTopicDistributionRepo,
    getRecentActivityRepo
} from "../dashboard/dashboard.repository.js";
import {
   getMentorProblemsRepo
} from "../problems/problems.repository.js";
import {
    generateMentorAdvice
} from "./mentor.ai.service.js";

import {
    findFocusTopic
} from "./topicScore.js";

export const getMentorRecommendation = async (userId) => {

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


   const focusTopic =
    findFocusTopic(topicStrength);

console.log("FOCUS TOPIC:", focusTopic);


console.log(
    "FETCHING MENTOR PROBLEMS",
    userId,
    focusTopic?.topic
);


const mentorProblems =
    focusTopic
        ? await getMentorProblemsRepo(
              userId,
              focusTopic.topic,
              5
          )
        : [];


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

    strongTopics:
        strongTopics.slice(0,3),

    difficulty,

    recentProblems:
        recentActivity.slice(0,5),

    topics:
        topics.slice(0,5)

};


    /* ---------------- Dynamic Cache Key ---------------- */

   const cacheKey = [
    "mentor-ai",
    userId,
    focusTopic?.topic ?? "none",
    focusTopic?.type ?? "none",
    focusTopic?.score ?? 0,
    focusTopic?.confidence ?? 0
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


    /* ---------------- Response ---------------- */

   return {

    recommendation,

    aiAdvice,

    mentorProblems,

    profile: {

        focusTopic,

        strongTopics,

        difficulty,

        topics,

        recentActivity

    }

};

};