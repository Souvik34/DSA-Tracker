const revisionIntervals = [1, 2, 4, 8, 16, 30];

export const calculateNextRevisionDate = (revisionCount) => {
  const days =
    revisionIntervals[revisionCount] ||
    revisionIntervals[revisionIntervals.length - 1];

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
};