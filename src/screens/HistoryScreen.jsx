import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../constants/COLORS';
import { GAME_MODES, DIFFICULTIES } from '../constants/GAME_CONFIG';
import { useStats } from '../hooks/useStats';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function HistoryScreen() {
  const { history, loading, clearData } = useStats();

  function handleClear() {
    Alert.alert(
      'Borrar historial',
      '¿Seguro que querés borrar todos los datos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: clearData },
      ]
    );
  }

  function renderItem({ item }) {
    const correctPct =
      item.totalQuestions > 0
        ? Math.round((item.correctCount / item.totalQuestions) * 100)
        : 0;
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemMode}>{GAME_MODES[item.mode]?.label ?? item.mode}</Text>
          <Text style={styles.itemDiff}>{DIFFICULTIES[item.difficulty]?.label ?? item.difficulty}</Text>
          <Text style={styles.itemDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemScore}>{item.score}</Text>
          <Text style={styles.itemAccuracy}>{correctPct}%</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={history}
      keyExtractor={(_, i) => String(i)}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>No hay partidas guardadas todavía.</Text>
        </View>
      }
      ListFooterComponent={
        history.length > 0 ? (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearText}>Borrar historial</Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: 16, paddingBottom: 32 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemLeft: {},
  itemMode: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  itemDiff: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  itemDate: { color: COLORS.textMuted, fontSize: 11, marginTop: 4 },
  itemRight: { alignItems: 'flex-end' },
  itemScore: { color: COLORS.accent, fontSize: 24, fontWeight: 'bold' },
  itemAccuracy: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
  clearBtn: {
    marginTop: 24,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.wrong,
    alignItems: 'center',
  },
  clearText: { color: COLORS.wrong, fontSize: 15 },
});
