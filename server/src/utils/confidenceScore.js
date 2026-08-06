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

  const limit = expectedTime[difficulty] ?? 30;

  // Time penalty
  if (timeTaken > limit) {
    score -= Math.min(35, (timeTaken - limit) * 2);
  }

  // Bonus for very quick solves
  if (timeTaken <= limit * 0.4) {
    score += 5;
  }

  // Clamp
  score = Math.max(0, Math.min(100, score));

  return Math.round(score);
};