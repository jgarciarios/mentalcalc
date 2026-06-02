import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/COLORS';

export default function TrueFalseButtons({ proposedResult, onAnswer }) {
  return (
    <View style={styles.container}>
      <Text style={styles.proposed}>¿El resultado es {proposedResult}?</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.btnTrue]} onPress={() => onAnswer(true)}>
          <Text style={styles.btnText}>✓ Verdadero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnFalse]} onPress={() => onAnswer(false)}>
          <Text style={styles.btnText}>✗ Falso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  proposed: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  row: { flexDirection: 'row', gap: 14 },
  btn: {
    flex: 1,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnTrue: { backgroundColor: COLORS.correct },
  btnFalse: { backgroundColor: COLORS.wrong },
  btnText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});
