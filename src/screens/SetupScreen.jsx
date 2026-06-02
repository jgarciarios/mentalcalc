import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constants/COLORS';
import { DIFFICULTIES, GAME_MODES, ROUND_SIZES, DEFAULT_ROUND_SIZE } from '../constants/GAME_CONFIG';

export default function SetupScreen({ navigation }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('EASY');
  const [selectedMode, setSelectedMode] = useState('CLASSIC');
  const [roundSize, setRoundSize] = useState(DEFAULT_ROUND_SIZE);

  function handleStart() {
    navigation.navigate('Game', {
      difficulty: selectedDifficulty,
      mode: selectedMode,
      roundSize: selectedMode === 'SPEEDRUN' ? 9999 : roundSize,
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Dificultad</Text>
      <View style={styles.optionRow}>
        {Object.entries(DIFFICULTIES).map(([key, val]) => (
          <TouchableOpacity
            key={key}
            style={[styles.optionBtn, selectedDifficulty === key && styles.optionBtnActive]}
            onPress={() => setSelectedDifficulty(key)}
          >
            <Text style={[styles.optionText, selectedDifficulty === key && styles.optionTextActive]}>
              {val.label}
            </Text>
            <Text style={styles.optionSub}>{val.timeLimit}s por pregunta</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Modo de Juego</Text>
      <View style={styles.optionColumn}>
        {Object.entries(GAME_MODES).map(([key, val]) => (
          <TouchableOpacity
            key={key}
            style={[styles.modeBtn, selectedMode === key && styles.modeBtnActive]}
            onPress={() => setSelectedMode(key)}
          >
            <Text style={[styles.modeText, selectedMode === key && styles.modeTextActive]}>
              {val.label}
            </Text>
            <Text style={styles.modeSub}>{val.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMode !== 'SPEEDRUN' && (
        <>
          <Text style={styles.sectionTitle}>Rondas</Text>
          <View style={styles.optionRow}>
            {ROUND_SIZES.map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.roundBtn, roundSize === size && styles.optionBtnActive]}
                onPress={() => setRoundSize(size)}
              >
                <Text style={[styles.roundText, roundSize === size && styles.optionTextActive]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startBtnText}>¡Empezar!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 24,
  },
  optionRow: { flexDirection: 'row', gap: 10 },
  optionBtn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionBtnActive: { borderColor: COLORS.accent, backgroundColor: COLORS.surfaceAlt },
  optionText: { color: COLORS.text, fontWeight: '600', fontSize: 14 },
  optionTextActive: { color: COLORS.accent },
  optionSub: { color: COLORS.textMuted, fontSize: 11, marginTop: 4 },
  optionColumn: { gap: 10 },
  modeBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modeBtnActive: { borderColor: COLORS.accent, backgroundColor: COLORS.surfaceAlt },
  modeText: { color: COLORS.text, fontWeight: '600', fontSize: 15 },
  modeTextActive: { color: COLORS.accent },
  modeSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  roundBtn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roundText: { color: COLORS.text, fontWeight: '600', fontSize: 18 },
  startBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 36,
  },
  startBtnText: { color: COLORS.black, fontSize: 18, fontWeight: 'bold' },
});
