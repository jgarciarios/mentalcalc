import { useState, useEffect } from 'react';
import { getHistory, getBestScores, getPlayerStats, clearAllData } from '../storage/statsStorage';

export function useStats() {
  const [history, setHistory] = useState([]);
  const [bestScores, setBestScores] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [h, b, s] = await Promise.all([
        getHistory(),
        getBestScores(),
        getPlayerStats(),
      ]);
      setHistory(h);
      setBestScores(b);
      setStats(s);
      setLoading(false);
    }
    load();
  }, []);

  async function clearData() {
    await clearAllData();
    setHistory([]);
    setBestScores([]);
    setStats({ gamesPlayed: 0, totalCorrect: 0, totalQuestions: 0, totalScore: 0 });
  }

  return { history, bestScores, stats, loading, clearData };
}
