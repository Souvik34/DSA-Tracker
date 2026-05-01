import { getUserProgressRepo } from "./progress.repository.js";
export const getUserProgressService = async (userId) => {
 if (!userId || isNaN(userId)) {
  throw new Error("Valid userId is required");
}

  return await getUserProgressRepo(userId);
};