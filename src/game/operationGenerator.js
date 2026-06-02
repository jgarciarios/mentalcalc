import { DIFFICULTIES } from '../constants/GAME_CONFIG';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateOperation(difficultyKey) {
  const config = DIFFICULTIES[difficultyKey];
  const { minNum, maxNum, operators } = config;

  const operator = operators[Math.floor(Math.random() * operators.length)];

  let operand1, operand2, result;

  switch (operator) {
    case '+':
      operand1 = randomInt(minNum, maxNum);
      operand2 = randomInt(minNum, maxNum);
      result = operand1 + operand2;
      break;
    case '-':
      operand1 = randomInt(minNum, maxNum);
      operand2 = randomInt(minNum, operand1);
      result = operand1 - operand2;
      break;
    case '×':
      operand1 = randomInt(minNum, Math.min(maxNum, 12));
      operand2 = randomInt(minNum, Math.min(maxNum, 12));
      result = operand1 * operand2;
      break;
    case '÷':
      result = randomInt(minNum, Math.min(maxNum, 12));
      operand2 = randomInt(2, Math.min(maxNum, 12));
      operand1 = result * operand2;
      break;
    default:
      operand1 = randomInt(minNum, maxNum);
      operand2 = randomInt(minNum, maxNum);
      result = operand1 + operand2;
  }

  return {
    operand1,
    operand2,
    operator,
    result,
    displayString: `${operand1} ${operator} ${operand2}`,
  };
}
