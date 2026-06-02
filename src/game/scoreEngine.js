import { SCORE_RULES } from '../constants/GAME_CONFIG';

export function calculateScore({ isCorrect, timeUsed, timeLimit }) {
  if (timeUsed >= timeLimit) {
    return { points: SCORE_RULES.TIMEOUT, label: 'Tiempo agotado' };
  }
  if (!isCorrect) {
    return { points: SCORE_RULES.WRONG, label: 'Incorrecto' };
  }
  if (timeUsed / timeLimit < 0.75) {
    return { points: SCORE_RULES.FAST_CORRECT, label: '¡Rápido!' };
  }
  return { points: SCORE_RULES.NORMAL_CORRECT, label: 'Correcto' };
}
