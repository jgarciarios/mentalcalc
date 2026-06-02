import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/COLORS';

export default function OperationDisplay({ displayString, questionNumber, total }) {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{questionNumber} / {total === 9999 ? '∞' : total}</Text>
      <Text style={styles.operation} adjustsFontSizeToFit numberOfLines={1}>
        {displayString} =
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  counter: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  operation: {
    color: COLORS.text,
    fontSize: 52,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
