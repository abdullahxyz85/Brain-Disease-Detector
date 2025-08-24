import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #ff9a56 0%, #ffad56 100%);
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

const WordDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.3);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 500px;
`;

const OptionButton = styled.button`
  padding: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.3rem;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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

const Instruction = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const WordAssociationGame = ({ onClose }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  const wordAssociations = {
    1: [ // Basic associations
      {
        word: 'SUN',
        correct: 'MOON',
        options: ['MOON', 'TREE', 'CAR', 'BOOK']
      },
      {
        word: 'HOT',
        correct: 'COLD',
        options: ['COLD', 'FAST', 'TALL', 'LOUD']
      },
      {
        word: 'DAY',
        correct: 'NIGHT',
        options: ['NIGHT', 'WATER', 'PHONE', 'CHAIR']
      },
      {
        word: 'FIRE',
        correct: 'WATER',
        options: ['WATER', 'PAPER', 'MUSIC', 'HAPPY']
      },
      {
        word: 'UP',
        correct: 'DOWN',
        options: ['DOWN', 'SIDE', 'ROUND', 'BLUE']
      }
    ],
    2: [ // Category associations
      {
        word: 'APPLE',
        correct: 'ORANGE',
        options: ['ORANGE', 'HAMMER', 'BICYCLE', 'PILLOW']
      },
      {
        word: 'DOCTOR',
        correct: 'NURSE',
        options: ['NURSE', 'PAINTER', 'MOUNTAIN', 'COMPUTER']
      },
      {
        word: 'VIOLIN',
        correct: 'PIANO',
        options: ['PIANO', 'TELESCOPE', 'SANDWICH', 'CLOUD']
      },
      {
        word: 'ROSE',
        correct: 'TULIP',
        options: ['TULIP', 'ROBOT', 'PIZZA', 'THUNDER']
      },
      {
        word: 'TIGER',
        correct: 'LION',
        options: ['LION', 'SPOON', 'WINDOW', 'BATTERY']
      }
    ],
    3: [ // Abstract associations
      {
        word: 'WISDOM',
        correct: 'KNOWLEDGE',
        options: ['KNOWLEDGE', 'BICYCLE', 'THUNDER', 'PICKLE']
      },
      {
        word: 'COURAGE',
        correct: 'BRAVERY',
        options: ['BRAVERY', 'ENVELOPE', 'RAINBOW', 'CALCULATOR']
      },
      {
        word: 'HARMONY',
        correct: 'PEACE',
        options: ['PEACE', 'TOASTER', 'EARTHQUAKE', 'PENCIL']
      },
      {
        word: 'FREEDOM',
        correct: 'LIBERTY',
        options: ['LIBERTY', 'SPAGHETTI', 'MICROSCOPE', 'DOORKNOB']
      },
      {
        word: 'PROGRESS',
        correct: 'ADVANCEMENT',
        options: ['ADVANCEMENT', 'SHOELACE', 'DINOSAUR', 'REFRIGERATOR']
      }
    ]
  };

  const generateQuestion = useCallback(() => {
    const levelQuestions = wordAssociations[level];
    const questionData = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
    
    setCurrentWord(questionData.word);
    
    // Shuffle options
    const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  }, [level, wordAssociations]);

  const handleAnswer = useCallback((selectedOption) => {
    const levelQuestions = wordAssociations[level];
    const currentQuestionData = levelQuestions.find(q => q.word === currentWord);
    
    if (selectedOption === currentQuestionData.correct) {
      const points = level * 10;
      setScore(prevScore => {
        const newScore = prevScore + points;
        
        // Level up every 5 correct answers
        if (newScore > 0 && newScore % 50 === 0 && level < 3) {
          setLevel(prevLevel => prevLevel + 1);
          setFeedback(`Correct! Level Up! +${points} points`);
        } else {
          setFeedback(`Correct! +${points} points`);
        }
        
        return newScore;
      });
    } else {
      setFeedback(`Wrong! Correct answer: ${currentQuestionData.correct}`);
    }

    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    
    setTimeout(() => {
      setFeedback('');
      generateQuestion();
    }, 2000);
  }, [currentWord, level, wordAssociations, generateQuestion]);

  useEffect(() => {
    generateQuestion();
  }, [level, generateQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const getLevelDescription = () => {
    switch(level) {
      case 1: return 'Basic Opposites & Simple Associations';
      case 2: return 'Category Associations';
      case 3: return 'Abstract Concepts';
      default: return 'Word Association';
    }
  };

  if (!gameActive) {
    return (
      <GameContainer>
        <Title>Word Association Complete!</Title>
        <GameArea>
          <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <div>Final Score: {score}</div>
            <div>Questions Answered: {currentQuestion}</div>
            <div>Highest Level: {level}</div>
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
      <Title>Word Association</Title>
      <ScoreDisplay>
        <div>Score: {score}</div>
        <Timer timeLeft={timeLeft}>Time: {timeLeft}s</Timer>
        <div>Level: {level}</div>
      </ScoreDisplay>
      <ProgressBar progress={score} total={150} />
      
      <Instruction>
        {getLevelDescription()}<br/>
        Choose the word most closely related to the given word.
      </Instruction>
      
      <GameArea>
        {feedback && (
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: feedback.includes('Correct') ? '#4caf50' : '#ff4444',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {feedback}
          </div>
        )}
        
        <WordDisplay>
          {currentWord}
        </WordDisplay>
        
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
        
        <div style={{ fontSize: '1rem', opacity: 0.8, textAlign: 'center' }}>
          Question {currentQuestion + 1} • Level {level}: {getLevelDescription()}
        </div>
      </GameArea>
    </GameContainer>
  );
};

export default WordAssociationGame;
