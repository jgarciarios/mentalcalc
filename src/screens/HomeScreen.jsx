import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/COLORS';
import { useStats } from '../hooks/useStats';

export default function HomeScreen({ navigation }) {
  const { stats, loading, bestScores } = useStats();

  useFocusEffect(useCallback(() => {}, []));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧮 Cálculo Mental</Text>
        <Text style={styles.subtitle}>Poné a prueba tu mente</Text>
      </View>

      {!loading && stats && stats.gamesPlayed > 0 && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Tus estadísticas</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
              <Text style={styles.statLabel}>Partidas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {stats.totalQuestions > 0
                  ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
                  : 0}%
              </Text>
              <Text style={styles.statLabel}>Precisión</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {bestScores.length > 0 ? bestScores[0].score : 0}
              </Text>
              <Text style={styles.statLabel}>Mejor puntaje</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Setup')}>
          <Text style={styles.btnPrimaryText}>Jugar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('History')}>
          <Text style={styles.btnSecondaryText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  statsTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  buttons: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    color: COLORS.text,
    fontSize: 16,
  },
});
