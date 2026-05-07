import {
  getDueRevisionsRepo,
  getAllRevisionsRepo,
  getRevisionByProblemRepo,
  updateRevisionRepo,
  markCompletedRepo,
} from "./revision.repository.js";
import {
  calculatePriorityScore,
  getPriorityLabel,
} from "../../utils/revisionPriority.js";

const revisionIntervals = [1, 2, 4, 8, 16, 30];


export const getDueRevisionsService = async (userId) => {

  if (!userId) {
    throw new Error("userId is required");
  }

  const revisions =
    await getDueRevisionsRepo(userId);

  const enriched = revisions.map((rev) => {

    const today = new Date();

    const nextDate =
      new Date(rev.next_revision_date);

    const overdueDays = Math.max(
      0,
      Math.floor(
        (today - nextDate)
        / (1000 * 60 * 60 * 24)
      )
    );

    const priorityScore =
      calculatePriorityScore({
        overdueDays,
        revisionCount: rev.revision_count,
        feltDifficulty:
          rev.felt_difficulty,
        confidenceRating:
          rev.confidence_rating,
      });

    return {
      ...rev,
      priorityScore,
      priorityLabel:
        getPriorityLabel(priorityScore),
    };
  });

  enriched.sort(
    (a, b) =>
      b.priorityScore - a.priorityScore
  );

  return enriched;
};


export const markRevisionDoneService = async (userId, problemId) => {
  const current = await getRevisionByProblemRepo(userId, problemId);

  if (!current) {
    throw new Error("Revision not found for this problem");
  }

  const { revision_count, is_completed } = current;

  if (is_completed) {
    return { message: "Already completed" };
  }

  if (revision_count >= revisionIntervals.length - 1) {
    await markCompletedRepo(userId, problemId);
    return { completed: true };
  }

  const days = revisionIntervals[revision_count] || 30;

  const nextDate = new Date();
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setDate(nextDate.getDate() + days);

  await updateRevisionRepo(userId, problemId, nextDate);

  return {
    nextRevisionInDays: days,
  };
};


export const getAllRevisionsService = async (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  const revisions = await getAllRevisionsRepo(userId);

  return revisions;
};