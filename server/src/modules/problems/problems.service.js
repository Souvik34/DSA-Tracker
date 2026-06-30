import * as problemRepository from "./problems.repository.js";

export const getAllProblems = async (filters) => {
  return await problemRepository.getAllProblemsRepo(filters);
};

export const getProblemById = async (id) => {
  return await problemRepository.getProblemByIdRepo(id);
};

export const createProblem = async (data) => {
  const {
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform,
  } = data;

  return await problemRepository.createProblemRepo({
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform,
  });
};
export const getProgress = async (userId) => {
  return await problemRepository.getProgressRepo(userId);
};