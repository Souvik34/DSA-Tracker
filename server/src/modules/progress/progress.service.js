import { getUserProgressRepo } from "./progress.repository.js";

export const getUserProgressService = async (userId) => {
  return await getUserProgressRepo(userId);
};