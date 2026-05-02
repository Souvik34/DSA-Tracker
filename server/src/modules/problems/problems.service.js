import * as problemRepository from "./problems.repository.js";

export const getAllProblems = async (filters) => {
    return await problemRepository.getAllProblems(filters);
};

export const getProblemById = async (id) => {
    return await problemRepository.getProblemById(id);
}

export const createProblem = async (data) => {

      const {
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform
  } = data;
   return await problemRepository.createProblem({
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform
  });
};

import { insertSolvedProblemRepo } from "./progress.repository.js";

export const addSolvedProblemService = async (userId, difficulty) => {
  if (!userId || !difficulty) {
    throw new Error("Invalid solve data");
  }

  await insertSolvedProblemRepo(userId, difficulty);
};