import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  padding: 32px 24px;
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
`;

const Question = styled.h2`
  font-size: 2rem;
  margin-bottom: 24px;
  color: var(--primary-color);
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  width: 120px;
  text-align: center;
`;

const Button = styled.button`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  }
`;

const Score = styled.div`
  font-size: 1.1rem;
  margin: 18px 0 8px 0;
  color: #333;
`;

const Timer = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 12px;
`;

const Feedback = styled.div`
  font-size: 1.1rem;
  margin-top: 10px;
  color: ${({ correct }) => (correct ? '#4CAF50' : '#F44336')};
  min-height: 24px;
`;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(level) {
  // Level: 1=easy, 2=medium, 3=hard
  let a, b, op, answer, text;
  const ops = ['+', '-', '×', '÷'];
  op = ops[getRandomInt(0, level === 1 ? 1 : (level === 2 ? 2 : 3))];
  if (op === '+') {
    a = getRandomInt(10, level === 1 ? 50 : 100);
    b = getRandomInt(10, level === 1 ? 50 : 100);
    answer = a + b;
    text = `${a} + ${b}`;
  } else if (op === '-') {
    a = getRandomInt(20, level === 1 ? 80 : 150);
    b = getRandomInt(10, a);
    answer = a - b;
    text = `${a} - ${b}`;
  } else if (op === '×') {
    a = getRandomInt(2, level === 2 ? 12 : 20);
    b = getRandomInt(2, level === 2 ? 12 : 20);
    answer = a * b;
    text = `${a} × ${b}`;
  } else {
    b = getRandomInt(2, level === 3 ? 20 : 12);
    answer = getRandomInt(2, level === 3 ? 20 : 12);
    a = b * answer;
    text = `${a} ÷ ${b}`;
  }
  return { text, answer };
}

const LEVELS = [
  { label: 'Easy', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Hard', value: 3 },
];

const MentalCalculationGame = () => {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState(() => generateQuestion(1));
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(null);
  const [timer, setTimer] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const timerRef = useRef();

  React.useEffect(() => {
    if (gameActive && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setGameActive(false);
      setFeedback('⏰ Time is up!');
      setCorrect(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, gameActive]);

  const startGame = () => {
    setScore(0);
    setAttempts(0);
    setTimer(30);
    setGameActive(true);
    setFeedback('');
    setCorrect(null);
    setQuestion(generateQuestion(level));
    setUserAnswer('');
  };

  const handleAnswer = () => {
    if (!gameActive) return;
    const isCorrect = Number(userAnswer) === question.answer;
    setCorrect(isCorrect);
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Wrong! The answer was ${question.answer}`);
    setScore(s => isCorrect ? s + 1 : s);
    setAttempts(a => a + 1);
    setTimeout(() => {
      setQuestion(generateQuestion(level));
      setUserAnswer('');
      setFeedback('');
      setCorrect(null);
    }, 900);
  };

  const handleInput = e => {
    setUserAnswer(e.target.value.replace(/[^0-9-]/g, ''));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleAnswer();
  };

  const handleLevelChange = e => {
    setLevel(Number(e.target.value));
    setQuestion(generateQuestion(Number(e.target.value)));
    setUserAnswer('');
    setScore(0);
    setAttempts(0);
    setFeedback('');
    setCorrect(null);
    setGameActive(false);
    setTimer(30);
  };

  return (
    <GameContainer>
      <h1>Mental Calculation Game</h1>
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="level">Difficulty: </label>
        <select id="level" value={level} onChange={handleLevelChange} disabled={gameActive}>
          {LEVELS.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>
      <Timer>Time Left: {timer}s</Timer>
      <Score>Score: {score} / {attempts}</Score>
      <Question>{question.text}</Question>
      <Input
        type="text"
        value={userAnswer}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={!gameActive || timer === 0}
        autoFocus
        placeholder="Your answer"
      />
      <Button onClick={handleAnswer} disabled={!gameActive || timer === 0}>Submit</Button>
      <Feedback correct={correct}>{feedback}</Feedback>
      <div style={{ marginTop: 24 }}>
        <Button onClick={startGame} disabled={gameActive && timer > 0}>
          {attempts === 0 ? 'Start Game' : 'Restart'}
        </Button>
      </div>
    </GameContainer>
  );
};

export default MentalCalculationGame;
