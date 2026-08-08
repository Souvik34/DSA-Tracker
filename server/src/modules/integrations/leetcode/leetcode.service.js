import {
  insertLeetCodeActivityRepo,
} from "./leetcode.repository.js";

export const syncLeetCodeActivityService = async (
  userId,
  problems
) => {
  if (!userId) {
    throw new Error("Valid userId is required");
  }

  if (!Array.isArray(problems)) {
    throw new Error("Problems must be an array");
  }

  for (const problem of problems) {
    if (
      !problem.problemTitle ||
      !problem.problemSlug
    ) {
      continue;
    }

    await insertLeetCodeActivityRepo(
      userId,
      problem
    );
  }

  return {
    synced: problems.length,
  };
};