import {
  getUserProgressRepo,
  insertSolvedProblemRepo,
} from "./progress.repository.js";

export const getUserProgressService = async (userId) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Valid userId is required");
  }

  return await getUserProgressRepo(userId);
};

export const addSolvedProblemService = async (
  userId,
  problemId,
  difficulty
) => {
  if (!userId || !problemId || !difficulty) {
    throw new Error("Invalid input for solved problem");
  }

  await insertSolvedProblemRepo(userId, problemId, difficulty);
};