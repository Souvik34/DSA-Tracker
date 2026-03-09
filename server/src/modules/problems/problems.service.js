import * as problemService from "./problem.service.js";

export const getAllProblems = async () => {
    return await problemService.getAllProblems();
};

export const getProblemById = async (id) => {
    return await problemService.getProblemById(id);
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