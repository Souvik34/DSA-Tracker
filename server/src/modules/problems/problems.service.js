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

export const addBookmark = async (userId, problemId) => {
  return await problemRepository.addBookmarkRepo(
    userId,
    problemId
  );
};

export const removeBookmark = async (userId, problemId) => {
  return await problemRepository.removeBookmarkRepo(
    userId,
    problemId
  );
};

export const getBookmarks = async (userId) => {
  return await problemRepository.getBookmarksRepo(
    userId
  );
};

export const saveNotes = async (
  userId,
  problemId,
  notes
) => {
  return await problemRepository.saveNotesRepo(
    userId,
    problemId,
    notes
  );
};

export const getNotes = async (userId) => {
  return await problemRepository.getNotesRepo(userId);
};

export const getProblemNotes = async (
  userId,
  problemId
) => {
  return await problemRepository.getProblemNotesRepo(
    userId,
    problemId
  );
};