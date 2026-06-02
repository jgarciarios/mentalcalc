import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './keys';

async function load(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}

export async function saveGameResult(result) {
  const history = (await load(STORAGE_KEYS.HISTORY)) || [];
  history.unshift(result);
  await save(STORAGE_KEYS.HISTORY, history.slice(0, 20));

  const bestScores = (await load(STORAGE_KEYS.BEST_SCORES)) || [];
  bestScores.push({ score: result.score, mode: result.mode, difficulty: result.difficulty, date: result.date });
  bestScores.sort((a, b) => b.score - a.score);
  await save(STORAGE_KEYS.BEST_SCORES, bestScores.slice(0, 10));

  const stats = (await load(STORAGE_KEYS.STATS)) || {
    gamesPlayed: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    totalScore: 0,
  };
  stats.gamesPlayed += 1;
  stats.totalCorrect += result.correctCount;
  stats.totalQuestions += result.totalQuestions;
  stats.totalScore += result.score;
  await save(STORAGE_KEYS.STATS, stats);
}

export async function getHistory() {
  return (await load(STORAGE_KEYS.HISTORY)) || [];
}

export async function getBestScores() {
  return (await load(STORAGE_KEYS.BEST_SCORES)) || [];
}

export async function getPlayerStats() {
  return (await load(STORAGE_KEYS.STATS)) || {
    gamesPlayed: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    totalScore: 0,
  };
}

export async function clearAllData() {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.HISTORY,
      STORAGE_KEYS.BEST_SCORES,
      STORAGE_KEYS.STATS,
    ]);
  } catch {
  }
}
