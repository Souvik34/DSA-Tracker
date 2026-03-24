import { getUserProgressRepo } from "./progress.repository.js";

export const getUserProgressService = async (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  return await getUserProgressRepo(userId);
};