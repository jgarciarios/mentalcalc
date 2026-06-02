export const DIFFICULTIES = {
  EASY: {
    label: 'Fácil',
    timeLimit: 15,
    minNum: 1,
    maxNum: 20,
    operators: ['+', '-'],
  },
  MEDIUM: {
    label: 'Medio',
    timeLimit: 10,
    minNum: 1,
    maxNum: 50,
    operators: ['+', '-', '×'],
  },
  HARD: {
    label: 'Difícil',
    timeLimit: 6,
    minNum: 1,
    maxNum: 100,
    operators: ['+', '-', '×', '÷'],
  },
};

export const GAME_MODES = {
  CLASSIC: { label: 'Clásico', description: 'Ingresá el resultado' },
  TRUE_FALSE: { label: 'Verdadero / Falso', description: '¿Es correcto?' },
  MULTIPLE_CHOICE: { label: 'Múltiple Choice', description: 'Elegí la opción correcta' },
  SPEEDRUN: { label: 'Contra Reloj', description: 'Respondé todo lo que puedas en 60s' },
};

export const SCORE_RULES = {
  FAST_CORRECT: 100,
  NORMAL_CORRECT: 70,
  WRONG: -30,
  TIMEOUT: -50,
};

export const ROUND_SIZES = [5, 10, 15, 20];
export const DEFAULT_ROUND_SIZE = 10;
export const SPEEDRUN_TOTAL_TIME = 60;
