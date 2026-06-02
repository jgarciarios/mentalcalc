import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/COLORS';
import { DIFFICULTIES, SPEEDRUN_TOTAL_TIME } from '../constants/GAME_CONFIG';
import { useGameSession } from '../hooks/useGameSession';
import TimerBar from '../components/TimerBar';
import FeedbackOverlay from '../components/FeedbackOverlay';
import OperationDisplay from '../components/OperationDisplay';
import ClassicInput from '../components/answer-modes/ClassicInput';
import TrueFalseButtons from '../components/answer-modes/TrueFalseButtons';
import MultipleChoiceGrid from '../components/answer-modes/MultipleChoiceGrid';
import SpeedRunHUD from '../components/answer-modes/SpeedRunHUD';

export default function GameScreen({ navigation, route }) {
  const { difficulty, mode, roundSize } = route.params;
  const diffConfig = DIFFICULTIES[difficulty];

  const { state, currentOperation, choices, proposedResult, timeLeft, submitAnswer, endSpeedrun } =
    useGameSession({ mode, difficultyKey: difficulty, roundSize });

  const [showingFeedback, setShowingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackCorrect, setFeedbackCorrect] = useState(true);

  useEffect(() => {
    if (state.status === 'finished') {
      navigation.replace('Result', {
        score: state.score,
        answers: state.answers,
        mode,
        difficulty,
        roundSize: state.answers.length,
      });
    }
  }, [state.status]);

  useEffect(() => {
    if (state.lastScoreResult) {
      setFeedbackText(state.lastScoreResult.label);
      setFeedbackCorrect(state.lastScoreResult.points > 0);
      setShowingFeedback(true);
      const t = setTimeout(() => setShowingFeedback(false), 800);
      return () => clearTimeout(t);
    }
  }, [state.lastScoreResult]);

  useEffect(() => {
    if (mode === 'SPEEDRUN' && timeLeft === 0) {
      endSpeedrun();
    }
  }, [timeLeft]);

  if (!currentOperation) return null;

  const totalTime = mode === 'SPEEDRUN' ? SPEEDRUN_TOTAL_TIME : diffConfig.timeLimit;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <FeedbackOverlay
          visible={showingFeedback}
          text={feedbackText}
          isCorrect={feedbackCorrect}
        />

        <View style={styles.topBar}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Puntaje</Text>
            <Text style={styles.scoreValue}>{state.score}</Text>
          </View>
          <View style={styles.diffBox}>
            <Text style={styles.diffText}>{diffConfig.label}</Text>
          </View>
        </View>

        {mode === 'SPEEDRUN' ? (
          <SpeedRunHUD timeLeft={timeLeft} answered={state.answers.length} />
        ) : (
          <View style={styles.timerSection}>
            <TimerBar timeLeft={timeLeft} totalTime={totalTime} />
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        )}

        <OperationDisplay
          displayString={currentOperation.displayString}
          questionNumber={state.currentIndex + 1}
          total={roundSize}
        />

        <View style={styles.answerSection}>
          {mode === 'CLASSIC' && <ClassicInput onAnswer={submitAnswer} />}
          {mode === 'TRUE_FALSE' && (
            <TrueFalseButtons proposedResult={proposedResult} onAnswer={submitAnswer} />
          )}
          {mode === 'MULTIPLE_CHOICE' && (
            <MultipleChoiceGrid choices={choices} onAnswer={submitAnswer} />
          )}
          {mode === 'SPEEDRUN' && <ClassicInput onAnswer={submitAnswer} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 16 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scoreBox: {},
  scoreLabel: { color: COLORS.textSecondary, fontSize: 12 },
  scoreValue: { color: COLORS.accent, fontSize: 28, fontWeight: 'bold' },
  diffBox: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  diffText: { color: COLORS.textSecondary, fontSize: 13 },
  timerSection: { marginBottom: 8 },
  timerText: { color: COLORS.textSecondary, fontSize: 13, textAlign: 'right', marginTop: 4 },
  answerSection: { flex: 1, justifyContent: 'center' },
});
