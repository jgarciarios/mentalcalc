const VARIATION = { EASY: 5, MEDIUM: 10, HARD: 15 };

export function generateDistractors(correctResult, difficultyKey) {
  const range = VARIATION[difficultyKey] || 10;
  const used = new Set([correctResult]);
  const distractors = [];

  while (distractors.length < 3) {
    const offset = Math.floor(Math.random() * range * 2) - range;
    const candidate = correctResult + offset;
    if (candidate !== correctResult && candidate >= 0 && !used.has(candidate)) {
      used.add(candidate);
      distractors.push(candidate);
    }
  }

  return distractors;
}
