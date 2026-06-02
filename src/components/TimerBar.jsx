import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants/COLORS';

export default function TimerBar({ timeLeft, totalTime }) {
  const widthAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    widthAnim.setValue(timeLeft / totalTime);
  }, [timeLeft, totalTime]);

  const ratio = timeLeft / totalTime;
  let color = COLORS.timerGreen;
  if (ratio < 0.3) color = COLORS.timerRed;
  else if (ratio < 0.6) color = COLORS.timerYellow;

  const widthPercent = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.bar, { width: widthPercent, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});
