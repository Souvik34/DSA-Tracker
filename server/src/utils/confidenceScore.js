

export const calculateConfidenceScore = ({
  difficulty,
  timeTaken = 0,
}) => {
  const expectedTime = {
    Easy: 15,
    Medium: 30,
    Hard: 45,
  };

  let score = 100;

  const normalizedDifficulty =
    difficulty?.charAt(0).toUpperCase() +
    difficulty?.slice(1).toLowerCase();

  const limit = expectedTime[normalizedDifficulty] ?? 30;

  const safeTime = Math.max(0, Number(timeTaken) || 0);

  // Time penalty
  if (safeTime > limit) {
    score -= Math.min(
      35,
      (safeTime - limit) * 2
    );
  }

  // Bonus for very quick solves
  if (safeTime <= limit * 0.4) {
    score += 5;
  }

  return Math.round(
    Math.max(0, Math.min(100, score))
  );
};


/**
 * Combines the user's previous confidence
 * with the score from their latest attempt.
 *
 * The old confidence has more weight because
 * it represents accumulated evidence.
 */
export const calculateUpdatedConfidence = ({
  currentConfidence,
  attemptScore,
  revisionCount = 0,
}) => {
  const current = Math.max(
    0,
    Math.min(100, Number(currentConfidence) || 0)
  );

  const attempt = Math.max(
    0,
    Math.min(100, Number(attemptScore) || 0)
  );

  /**
   * More recent revision attempts should
   * gradually carry more weight.
   *
   * Revision 0 -> 30%
   * Revision 1 -> 30%
   * Revision 2 -> 35%
   * Revision 3 -> 40%
   * ...
   */
  const attemptWeight = Math.min(
    0.5,
    0.3 + Math.max(0, revisionCount - 1) * 0.05
  );

  const currentWeight = 1 - attemptWeight;

  const newConfidence =
    current * currentWeight +
    attempt * attemptWeight;

  return Math.round(
    Math.max(0, Math.min(100, newConfidence))
  );
};