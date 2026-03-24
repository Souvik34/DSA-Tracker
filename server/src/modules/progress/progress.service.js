import { getDueRevisionsRepo } from "../revision/revision.repository.js";

export const getProblemsService = async (params, userId) => {
  const dueRevisions = await getDueRevisionsRepo(userId);

  if (dueRevisions.length > 0) {
    return {
      blocked: true,
      message: "Complete your revisions first",
      revisions: dueRevisions,
    };
  }

  return await getAllProblemsRepo(params);
};