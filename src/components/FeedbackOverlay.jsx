import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants/COLORS';

export default function FeedbackOverlay({ visible, text, isCorrect }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(0);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 400, useNativeDriver: true }),
      ]).start(() => {
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
      });
    } else {
      opacity.setValue(0);
    }
  }, [visible, text]);

  const color = isCorrect ? COLORS.correct : COLORS.wrong;

  return (
    <Animated.Text
      pointerEvents="none"
      style={[styles.text, { color, opacity, transform: [{ translateY }] }]}
    >
      {text}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    fontSize: 32,
    fontWeight: 'bold',
    zIndex: 99,
  },
});
