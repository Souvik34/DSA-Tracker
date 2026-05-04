import * as problemRepository from "./problems.repository.js";

export const getAllProblems = async (filters) => {
  return await problemRepository.getAllProblems(filters);
};

export const getProblemById = async (id) => {
  return await problemRepository.getProblemById(id);
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

  return await problemRepository.createProblem({
    title,
    question_link,
    difficulty,
    topic,
    tags,
    platform,
  });
};