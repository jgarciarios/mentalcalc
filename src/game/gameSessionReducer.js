import { calculateScore } from './scoreEngine';

const initialState = {
  score: 0,
  currentIndex: 0,
  answers: [],
  status: 'idle',
  lastScoreResult: null,
  roundSize: 10,
};

function applyAnswer(state, isCorrect, timeUsed, timeLimit) {
  const scoreResult = calculateScore({ isCorrect, timeUsed, timeLimit });
  const newScore = state.score + scoreResult.points;
  const newAnswers = [...state.answers, { isCorrect, timeUsed, scoreResult }];
  const nextIndex = state.currentIndex + 1;
  const isFinished = nextIndex >= state.roundSize;

  return {
    ...state,
    score: newScore,
    currentIndex: isFinished ? state.currentIndex : nextIndex,
    answers: newAnswers,
    lastScoreResult: scoreResult,
    status: isFinished ? 'finished' : 'playing',
  };
}

export function gameSessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        status: 'playing',
        roundSize: action.roundSize || 10,
      };

    case 'SUBMIT_ANSWER':
      return applyAnswer(state, action.isCorrect, action.timeUsed, action.timeLimit);

    case 'TIMEOUT':
      return applyAnswer(state, false, action.timeLimit, action.timeLimit);

    case 'END_GAME':
      return { ...state, status: 'finished' };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}
