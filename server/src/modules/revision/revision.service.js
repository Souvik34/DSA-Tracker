import {
  getDueRevisionsRepo,
  getAllRevisionsRepo,
  getRevisionByProblemRepo,
  getSolvedProblemForRevisionRepo,
  updateRevisionRepo,
  markCompletedRepo,
  updateConfidenceRepo,
} from "./revision.repository.js";

import { insertRevisionRepo } from "./revision.repository.js";
import {
  calculatePriorityScore,
  getPriorityLabel,
} from "../../utils/revisionPriority.js";
import {
  calculateConfidenceScore,
  calculateUpdatedConfidence,
} from "../../utils/confidenceScore.js";

const revisionIntervals = [1, 3, 7, 14, 30, 60, 90, 180];


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




export const markRevisionDoneService = async (
  userId,
  problemId,
  timeTaken = 0
) => {
  const current =
    await getRevisionByProblemRepo(
      userId,
      problemId
    );

  if (!current) {
    throw new Error(
      "Revision not found for this problem"
    );
  }

  if (current.is_completed) {
    return {
      completed: true,
      message: "Already completed",
    };
  }

  /**
   * We need the original solved-problem
   * information because that contains:
   *
   * - current confidence
   * - difficulty
   */
  const solvedProblem =
    await getSolvedProblemForRevisionRepo(
      userId,
      problemId
    );

  if (!solvedProblem) {
    throw new Error(
      "Solved problem data not found"
    );
  }

  const currentConfidence =
    Number(
      solvedProblem.confidence_rating
    ) || 0;

  const difficulty =
    solvedProblem.felt_difficulty ||
    "Medium";

  /**
   * Calculate how well the user performed
   * during THIS revision.
   */
  const attemptScore =
    calculateConfidenceScore({
      difficulty,
      timeTaken,
    });

  /**
   * Combine previous confidence with the
   * latest performance.
   */
  const newConfidence =
    calculateUpdatedConfidence({
      currentConfidence,
      attemptScore,
      revisionCount:
        current.revision_count,
    });

  /**
   * Persist new confidence.
   */
  await updateConfidenceRepo(
    userId,
    problemId,
    newConfidence
  );

  /**
   * Final revision in the sequence.
   */
  if (
    current.revision_count >=
    revisionIntervals.length - 1
  ) {
    await markCompletedRepo(
      userId,
      problemId
    );

    return {
      completed: true,
      previousConfidence:
        currentConfidence,
      attemptScore,
      confidence:
        newConfidence,
    };
  }

  const days =
    revisionIntervals[
      current.revision_count
    ] || 30;

  const nextDate = new Date();

  nextDate.setHours(0, 0, 0, 0);

  nextDate.setDate(
    nextDate.getDate() + days
  );

  await updateRevisionRepo(
    userId,
    problemId,
    nextDate
  );

  return {
    completed: false,
    previousConfidence:
      currentConfidence,
    attemptScore,
    confidence:
      newConfidence,
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

export const addRevisionService = async (userId, problemId) => {
  await insertRevisionRepo(userId, problemId);
};