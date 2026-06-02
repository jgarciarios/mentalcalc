import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';

export default function SpeedRunHUD({ timeLeft, answered }) {
  const isLow = timeLeft <= 10;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={[styles.timeValue, isLow && styles.timeValueRed]}>{timeLeft}</Text>
        <Text style={styles.label}>segundos</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.answeredValue}>{answered}</Text>
        <Text style={styles.label}>respondidas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingVertical: 16,
  },
  item: { alignItems: 'center' },
  timeValue: { fontSize: 40, fontWeight: 'bold', color: COLORS.text },
  timeValueRed: { color: COLORS.timerRed },
  answeredValue: { fontSize: 40, fontWeight: 'bold', color: COLORS.accent },
  label: { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },
  divider: { width: 1, height: 50, backgroundColor: COLORS.border },
});
