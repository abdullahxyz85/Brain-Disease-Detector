import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    pointer-events: none;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PatternDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 15px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const PatternItem = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid ${props => props.isQuestion ? '#ffeb3b' : 'transparent'};
  animation: ${props => props.isQuestion ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const OptionButton = styled.button`
  padding: 20px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  color: ${props => props.timeLeft < 10 ? '#ff4444' : '#4caf50'};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => (props.progress / props.total) * 100}%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.3s ease;
  }
`;

const PatternRecognitionGame = ({ onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [currentPattern, setCurrentPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');

  const patterns = {
    1: { // Number sequences
      type: 'numbers',
      sequences: [
        [2, 4, 6, 8, '?'], // Even numbers
        [1, 3, 5, 7, '?'], // Odd numbers
        [5, 10, 15, 20, '?'], // Multiples of 5
        [1, 4, 9, 16, '?'], // Perfect squares
      ]
    },
    2: { // Color patterns
      type: 'colors',
      sequences: [
        ['red', 'blue', 'red', 'blue', '?'],
        ['green', 'green', 'yellow', 'green', 'green', 'yellow', '?'],
        ['purple', 'orange', 'purple', 'orange', '?'],
        ['pink', 'cyan', 'pink', 'cyan', '?'],
      ]
    },
    3: { // Shape patterns
      type: 'shapes',
      sequences: [
        ['●', '▲', '■', '●', '▲', '■', '?'],
        ['♦', '♦', '♣', '♦', '♦', '♣', '?'],
        ['◆', '○', '△', '◆', '○', '△', '?'],
        ['★', '♠', '★', '♠', '?'],
      ]
    }
  };

  const colorMap = {
    'red': '#e74c3c',
    'blue': '#3498db',
    'green': '#2ecc71',
    'yellow': '#f1c40f',
    'purple': '#9b59b6',
    'orange': '#e67e22',
    'pink': '#e91e63',
    'cyan': '#00bcd4'
  };

  const generatePattern = useCallback(() => {
    const levelData = patterns[Math.min(currentLevel, 3)];
    const randomPattern = levelData.sequences[Math.floor(Math.random() * levelData.sequences.length)];
    
    // Generate correct answer
    let correctAnswer;
    if (levelData.type === 'numbers') {
      const sequence = randomPattern.slice(0, -1);
      if (sequence.every((num, i) => i === 0 || num === sequence[i-1] + 2)) {
        correctAnswer = sequence[sequence.length - 1] + 2;
      } else if (sequence.every((num, i) => i === 0 || num === sequence[i-1] + 5)) {
        correctAnswer = sequence[sequence.length - 1] + 5;
      } else if (sequence.every((num, i) => i === 0 || num === (i+1) * (i+1))) {
        correctAnswer = (sequence.length + 1) * (sequence.length + 1);
      } else {
        correctAnswer = sequence[sequence.length - 1] + (sequence[1] - sequence[0]);
      }
    } else if (levelData.type === 'colors') {
      const sequence = randomPattern.slice(0, -1);
      if (sequence.length >= 2) {
        correctAnswer = sequence[sequence.length % (sequence.length >= 4 ? 2 : sequence.length)];
      }
    } else if (levelData.type === 'shapes') {
      const sequence = randomPattern.slice(0, -1);
      const patternLength = sequence.findIndex((item, i) => i > 0 && item === sequence[0]);
      if (patternLength > 0) {
        correctAnswer = sequence[(sequence.length) % patternLength];
      } else {
        correctAnswer = sequence[0];
      }
    }

    // Generate wrong options
    const wrongOptions = [];
    if (levelData.type === 'numbers') {
      wrongOptions.push(correctAnswer + 1, correctAnswer - 1);
    } else if (levelData.type === 'colors') {
      const allColors = Object.keys(colorMap);
      wrongOptions.push(...allColors.filter(c => c !== correctAnswer).slice(0, 2));
    } else if (levelData.type === 'shapes') {
      const allShapes = ['●', '▲', '■', '♦', '♣', '◆', '○', '△', '★', '♠'];
      wrongOptions.push(...allShapes.filter(s => s !== correctAnswer).slice(0, 2));
    }

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setCurrentPattern(randomPattern);
    setOptions(allOptions);
  }, [currentLevel, patterns, colorMap]);

  const handleAnswer = useCallback((selectedOption) => {
    const pattern = currentPattern.slice(0, -1);
    let correctAnswer;
    
    // Calculate correct answer based on pattern type
    const levelData = patterns[Math.min(currentLevel, 3)];
    if (levelData.type === 'numbers') {
      if (pattern.every((num, i) => i === 0 || num === pattern[i-1] + 2)) {
        correctAnswer = pattern[pattern.length - 1] + 2;
      } else if (pattern.every((num, i) => i === 0 || num === pattern[i-1] + 5)) {
        correctAnswer = pattern[pattern.length - 1] + 5;
      } else if (pattern.every((num, i) => i === 0 || num === (i+1) * (i+1))) {
        correctAnswer = (pattern.length + 1) * (pattern.length + 1);
      } else {
        correctAnswer = pattern[pattern.length - 1] + (pattern[1] - pattern[0]);
      }
    } else if (levelData.type === 'colors') {
      if (pattern.length >= 2) {
        correctAnswer = pattern[pattern.length % (pattern.length >= 4 ? 2 : pattern.length)];
      }
    } else if (levelData.type === 'shapes') {
      const patternLength = pattern.findIndex((item, i) => i > 0 && item === pattern[0]);
      if (patternLength > 0) {
        correctAnswer = pattern[pattern.length % patternLength];
      } else {
        correctAnswer = pattern[0];
      }
    }

    if (selectedOption === correctAnswer) {
      setScore(prevScore => {
        const newScore = prevScore + 10;
        if (prevScore > 0 && newScore % 30 === 0) {
          setCurrentLevel(prevLevel => Math.min(prevLevel + 1, 3));
        }
        return newScore;
      });
      setFeedback('Correct! +10 points');
    } else {
      setFeedback(`Wrong! The correct answer was ${correctAnswer}`);
    }

    setTimeout(() => {
      setFeedback('');
      generatePattern();
    }, 1500);
  }, [currentPattern, currentLevel, patterns, generatePattern]);

  useEffect(() => {
    generatePattern();
  }, [currentLevel, generatePattern]);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const getItemColor = (item, index) => {
    const levelData = patterns[Math.min(currentLevel, 3)];
    if (levelData.type === 'colors' && item !== '?') {
      return colorMap[item] || '#666';
    } else if (levelData.type === 'numbers') {
      return `hsl(${(index * 60) % 360}, 70%, 50%)`;
    } else {
      return '#4a90e2';
    }
  };

  if (!gameActive) {
    return (
      <GameContainer>
        <Title>Pattern Recognition Complete!</Title>
        <GameArea>
          <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <div>Final Score: {score}</div>
            <div>Level Reached: {currentLevel}</div>
            <div style={{ marginTop: '20px' }}>
              <OptionButton onClick={onClose}>Return to Games</OptionButton>
            </div>
          </div>
        </GameArea>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Title>Pattern Recognition</Title>
      <ScoreDisplay>
        <div>Score: {score}</div>
        <Timer timeLeft={timeLeft}>Time: {timeLeft}s</Timer>
        <div>Level: {currentLevel}</div>
      </ScoreDisplay>
      <ProgressBar progress={score} total={100} />
      
      <GameArea>
        {feedback && (
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: feedback.includes('Correct') ? '#4caf50' : '#ff4444',
            marginBottom: '20px'
          }}>
            {feedback}
          </div>
        )}
        
        <div style={{ fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center' }}>
          What comes next in the pattern?
        </div>
        
        <PatternDisplay>
          {currentPattern.map((item, index) => (
            <PatternItem 
              key={index} 
              color={getItemColor(item, index)}
              isQuestion={item === '?'}
            >
              {item}
            </PatternItem>
          ))}
        </PatternDisplay>
        
        <OptionsContainer>
          {options.map((option, index) => (
            <OptionButton 
              key={index} 
              onClick={() => handleAnswer(option)}
              disabled={!!feedback}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>
      </GameArea>
    </GameContainer>
  );
};

export default PatternRecognitionGame;
