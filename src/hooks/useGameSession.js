import { useReducer, useEffect, useRef, useState } from 'react';
import { gameSessionReducer } from '../game/gameSessionReducer';
import { generateOperation } from '../game/operationGenerator';
import { generateDistractors } from '../game/distractorGenerator';
import { DIFFICULTIES, SPEEDRUN_TOTAL_TIME } from '../constants/GAME_CONFIG';
import { useCountdown } from './useCountdown';

export function useGameSession({ mode, difficultyKey, roundSize }) {
  const timeLimit = mode === 'SPEEDRUN'
    ? SPEEDRUN_TOTAL_TIME
    : DIFFICULTIES[difficultyKey].timeLimit;

  const [state, dispatch] = useReducer(gameSessionReducer, {
    score: 0,
    currentIndex: 0,
    answers: [],
    status: 'idle',
    lastScoreResult: null,
    roundSize: mode === 'SPEEDRUN' ? 9999 : roundSize,
  });

  const operationRef = useRef(null);
  const proposedResultRef = useRef(null);
  const speedrunStartedRef = useRef(false);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [choices, setChoices] = useState([]);
  const [proposedResult, setProposedResult] = useState(null);

  function buildQuestion(diffKey) {
    const op = generateOperation(diffKey);
    operationRef.current = op;

    if (mode === 'TRUE_FALSE') {
      const showWrong = Math.random() < 0.5;
      let proposed;
      if (showWrong) {
        const distractors = generateDistractors(op.result, diffKey);
        proposed = distractors[0];
      } else {
        proposed = op.result;
      }
      proposedResultRef.current = proposed;
      setProposedResult(proposed);
      setChoices([]);
    } else if (mode === 'MULTIPLE_CHOICE') {
      const distractors = generateDistractors(op.result, diffKey);
      const all = [op.result, ...distractors].sort(() => Math.random() - 0.5);
      setChoices(all);
      setProposedResult(null);
    } else {
      setChoices([]);
      setProposedResult(null);
    }

    setCurrentOperation(op);
  }

  const { timeLeft, start, reset } = useCountdown(timeLimit, () => {
    if (mode === 'SPEEDRUN') {
      dispatch({ type: 'END_GAME' });
    } else if (state.status === 'playing') {
      dispatch({ type: 'TIMEOUT', timeLimit });
    }
  });

  useEffect(() => {
    if (state.status === 'idle') {
      dispatch({ type: 'START_GAME', roundSize: mode === 'SPEEDRUN' ? 9999 : roundSize });
    }
  }, []);

  useEffect(() => {
    if (state.status === 'playing') {
      buildQuestion(difficultyKey);
      if (mode === 'SPEEDRUN') {
        if (!speedrunStartedRef.current) {
          speedrunStartedRef.current = true;
          reset(SPEEDRUN_TOTAL_TIME);
          start();
        }
      } else {
        reset(timeLimit);
        start();
      }
    }
  }, [state.status, state.currentIndex]);

  function submitAnswer(userAnswer) {
    if (state.status !== 'playing') return;

    const op = operationRef.current;
    if (!op) return;

    const perQ = DIFFICULTIES[difficultyKey].timeLimit;
    const elapsed = mode === 'SPEEDRUN' ? 0 : perQ - timeLeft;

    let isCorrect;
    if (mode === 'TRUE_FALSE') {
      isCorrect = userAnswer === (proposedResultRef.current === op.result);
    } else {
      isCorrect = Number(userAnswer) === op.result;
    }

    dispatch({ type: 'SUBMIT_ANSWER', isCorrect, timeUsed: elapsed, timeLimit: perQ });
  }

  function endSpeedrun() {
    dispatch({ type: 'END_GAME' });
  }

  return {
    state,
    currentOperation,
    choices,
    proposedResult,
    timeLeft,
    submitAnswer,
    endSpeedrun,
  };
}
