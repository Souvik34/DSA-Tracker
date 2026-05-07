export const calculatePriorityScore = ({
  overdueDays,
  revisionCount,
  feltDifficulty,
  confidenceRating,
}) => {
  let score = 0;

  score += overdueDays * 2;

  score += revisionCount * 5;

  if (feltDifficulty && feltDifficulty === "hard") {
    score += 25;
  }

  if (feltDifficulty && feltDifficulty === "medium") {
    score += 10;
  }

  if (confidenceRating !== null && confidenceRating <= 2) return score;
};

export const getPriorityLabel = (score) => {
  if (score >= 70) {
    return "HIGH";
  }

  if (score >= 40) {
    return "MEDIUM";
  }

  return "LOW";
};
