import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constants/COLORS';
import { GAME_MODES, DIFFICULTIES } from '../constants/GAME_CONFIG';
import { saveGameResult } from '../storage/statsStorage';

export default function ResultScreen({ navigation, route }) {
  const { score, answers, mode, difficulty, roundSize } = route.params;

  const stats = useMemo(() => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    const avgTime =
      answers.length > 0
        ? (answers.reduce((sum, a) => sum + a.timeUsed, 0) / answers.length).toFixed(1)
        : 0;
    return { correctCount, accuracy, avgTime };
  }, [answers]);

  useEffect(() => {
    saveGameResult({
      score,
      mode,
      difficulty,
      correctCount: stats.correctCount,
      totalQuestions: answers.length,
      date: new Date().toISOString(),
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>¡Ronda terminada!</Text>
      <Text style={styles.subtitle}>
        {GAME_MODES[mode]?.label} · {DIFFICULTIES[difficulty]?.label}
      </Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Puntaje final</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.correctCount}/{answers.length}</Text>
          <Text style={styles.statLabel}>Correctas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.accuracy}%</Text>
          <Text style={styles.statLabel}>Precisión</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.avgTime}s</Text>
          <Text style={styles.statLabel}>Tiempo promedio</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.btnPrimaryText}>Jugar de nuevo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.btnSecondaryText}>Inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingBottom: 40 },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  scoreCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  scoreLabel: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 8 },
  scoreValue: { color: COLORS.accent, fontSize: 56, fontWeight: 'bold' },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: { color: COLORS.text, fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, textAlign: 'center' },
  buttons: { gap: 12 },
  btnPrimary: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPrimaryText: { color: COLORS.black, fontSize: 17, fontWeight: 'bold' },
  btnSecondary: {
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: { color: COLORS.text, fontSize: 16 },
});
