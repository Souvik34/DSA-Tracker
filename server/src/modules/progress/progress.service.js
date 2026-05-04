import pool from "../../db/index.js";
import { getUserProgressRepo } from "./progress.repository.js";


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

  await pool.query(
    `INSERT INTO solved_problems (user_id, problem_id, difficulty)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, problem_id) DO NOTHING`,
    [userId, problemId, difficulty]
  );
};