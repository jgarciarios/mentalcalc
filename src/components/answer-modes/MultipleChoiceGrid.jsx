import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';

export default function MultipleChoiceGrid({ choices, onAnswer }) {
  const [selected, setSelected] = useState(null);

  function handlePress(choice) {
    if (selected !== null) return;
    setSelected(choice);
    setTimeout(() => {
      onAnswer(choice);
      setSelected(null);
    }, 300);
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {choices.map((choice, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.option, selected !== null && styles.optionDisabled]}
            onPress={() => handlePress(choice)}
            disabled={selected !== null}
          >
            <Text style={styles.optionText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionDisabled: { opacity: 0.5 },
  optionText: { color: COLORS.text, fontSize: 28, fontWeight: 'bold' },
});
