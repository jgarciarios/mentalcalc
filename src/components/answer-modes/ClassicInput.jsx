import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';

const ROWS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['⌫', '0', '✓'],
];

export default function ClassicInput({ onAnswer }) {
  const [input, setInput] = useState('');

  function handlePress(key) {
    if (key === '⌫') {
      setInput(prev => prev.slice(0, -1));
    } else if (key === '✓') {
      if (input !== '') {
        onAnswer(Number(input));
        setInput('');
      }
    } else {
      if (input.length < 6) {
        setInput(prev => prev + key);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input || '?'}</Text>
      </View>
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.key, key === '✓' && styles.confirmKey]}
              onPress={() => handlePress(key)}
            >
              <Text style={[styles.keyText, key === '✓' && styles.confirmText]}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  display: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  displayText: { color: COLORS.text, fontSize: 36, fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  key: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmKey: { backgroundColor: COLORS.accent },
  keyText: { color: COLORS.text, fontSize: 22, fontWeight: '600' },
  confirmText: { color: COLORS.black, fontWeight: 'bold' },
});
