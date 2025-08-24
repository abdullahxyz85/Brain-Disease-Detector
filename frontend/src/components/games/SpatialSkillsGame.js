import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const GameContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 30px;
  background-color: #1e1e2f;
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90vh;
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  p {
    color: #e0e0e0;
    font-size: 1.1rem;
    max-width: 650px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const GameArea = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PuzzleContainer = styled.div`
  margin: 20px 0;
`;

const PuzzleInstruction = styled.div`
  margin-bottom: 25px;
  
  h3 {
    font-size: 1.3rem;
    color: var(--primary-color);
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  p {
    color: #e0e0e0;
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

const ShapesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const Shape = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: ${props => props.selected ? 'var(--primary-color)' : props.color || '#ddd'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : props.shape === 'triangle' ? '0' : '10px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: ${props => props.selected ? '3px solid #333' : 'none'};
  transform: ${props => {
    if (props.shape === 'triangle') {
      return 'rotate(45deg)';
    }
    return 'none';
  }};
  
  &:hover {
    transform: ${props => {
      if (props.shape === 'triangle') {
        return 'rotate(45deg) scale(1.05)';
      }
      return 'scale(1.05)';
    }};
  }
`;

const PatternContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const PatternShape = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${props => props.color || '#ddd'};
  border-radius: ${props => props.shape === 'circle' ? '50%' : props.shape === 'triangle' ? '0' : '5px'};
  transform: ${props => {
    if (props.shape === 'triangle') {
      return 'rotate(45deg)';
    }
    return 'none';
  }};
`;

const QuestionMark = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #e0e0e0;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 30px 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 5px;
    transition: width 0.4s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(90deg, var(--primary-color), var(--secondary-color))' : 
    'none'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  border: ${props => props.primary ? 'none' : '2px solid var(--primary-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.primary ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none'};
    background: ${props => !props.primary ? 'var(--primary-color)' : ''};
    color: ${props => !props.primary ? 'white' : ''};
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    border: none;
  }
`;

const FeedbackContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${props => props.isCorrect ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.isCorrect ? '#2e7d32' : '#c62828'};
  font-weight: 600;
`;

const ResultsContainer = styled.div`
  text-align: center;
  
  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .score {
    font-size: 3.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 30px 0;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

// Sample patterns for the game
const patterns = [
  {
    id: 1,
    question: "Which shape comes next in the pattern?",
    pattern: [
      { shape: 'square', color: '#4CAF50' },
      { shape: 'circle', color: '#2196F3' },
      { shape: 'triangle', color: '#FF5722' },
      { shape: 'square', color: '#4CAF50' },
      { shape: 'circle', color: '#2196F3' },
      { shape: '?' }
    ],
    options: [
      { shape: 'square', color: '#4CAF50' },
      { shape: 'triangle', color: '#FF5722' },
      { shape: 'circle', color: '#2196F3' },
      { shape: 'square', color: '#FF5722' }
    ],
    correctAnswer: 2 // triangle with color #FF5722
  },
  {
    id: 2,
    question: "Which shape completes the pattern?",
    pattern: [
      { shape: 'circle', color: '#9C27B0' },
      { shape: 'circle', color: '#E91E63' },
      { shape: 'square', color: '#9C27B0' },
      { shape: 'square', color: '#E91E63' },
      { shape: 'triangle', color: '#9C27B0' },
      { shape: '?' }
    ],
    options: [
      { shape: 'circle', color: '#9C27B0' },
      { shape: 'triangle', color: '#E91E63' },
      { shape: 'square', color: '#9C27B0' },
      { shape: 'circle', color: '#E91E63' }
    ],
    correctAnswer: 1 // triangle with color #E91E63
  },
  {
    id: 3,
    question: "Find the next shape in the sequence:",
    pattern: [
      { shape: 'square', color: '#FF9800' },
      { shape: 'triangle', color: '#FF9800' },
      { shape: 'triangle', color: '#3F51B5' },
      { shape: 'circle', color: '#3F51B5' },
      { shape: 'circle', color: '#FF9800' },
      { shape: '?' }
    ],
    options: [
      { shape: 'circle', color: '#3F51B5' },
      { shape: 'square', color: '#3F51B5' },
      { shape: 'triangle', color: '#FF9800' },
      { shape: 'square', color: '#FF9800' }
    ],
    correctAnswer: 1 // square with color #3F51B5
  },
  {
    id: 4,
    question: "Which shape should replace the question mark?",
    pattern: [
      { shape: 'circle', color: '#4CAF50' },
      { shape: 'square', color: '#4CAF50' },
      { shape: 'square', color: '#FF5722' },
      { shape: 'triangle', color: '#FF5722' },
      { shape: 'triangle', color: '#4CAF50' },
      { shape: '?' }
    ],
    options: [
      { shape: 'triangle', color: '#FF5722' },
      { shape: 'circle', color: '#4CAF50' },
      { shape: 'square', color: '#FF5722' },
      { shape: 'circle', color: '#FF5722' }
    ],
    correctAnswer: 3 // circle with color #FF5722
  }
];

const SpatialSkillsGame = () => {
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState([]);
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    // Record start time when a new pattern is shown
    setStartTime(Date.now());
  }, [currentPatternIndex]);
  
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };
  
  const handleNextPattern = () => {
    // Record time spent on the current pattern
    const endTime = Date.now();
    const patternTime = Math.floor((endTime - startTime) / 1000); // Time in seconds
    setTimeSpent(prev => [...prev, patternTime]);
    
    // Check if answer is correct
    const currentPattern = patterns[currentPatternIndex];
    if (selectedOption === currentPattern.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next pattern or finish the game
    if (currentPatternIndex < patterns.length - 1) {
      setCurrentPatternIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };
  
  const handleCheckAnswer = () => {
    setShowFeedback(true);
  };
  
  const finishGame = () => {
    setGameState('finished');
    
    // Send results to backend
    sendResultsToBackend();
  };
  
  const sendResultsToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/game/spatial', {
        score,
        totalPatterns: patterns.length,
        timeSpent
      });
      
      console.log('Results submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };
  
  const handleRestartGame = () => {
    setCurrentPatternIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setTimeSpent([]);
    setGameState('playing');
  };
  
  // Get the current pattern
  const currentPattern = patterns[currentPatternIndex];
  
  // Calculate progress percentage
  const progress = ((currentPatternIndex + 1) / patterns.length) * 100;
  
  return (
    <GameContainer>
      <GameHeader>
        <h1>Spatial Skills Challenge</h1>
        <p>
          Test your spatial reasoning by identifying patterns and relationships between shapes.
          These exercises assess your ability to visualize and manipulate objects mentally.
        </p>
      </GameHeader>
      
      {gameState === 'playing' && (
        <GameArea>
          <ProgressBar>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </ProgressBar>
          
          <div>
            <span>Pattern {currentPatternIndex + 1} of {patterns.length}</span>
          </div>
          
          <PuzzleContainer>
            <PuzzleInstruction>
              <h3>{currentPattern.question}</h3>
            </PuzzleInstruction>
            
            <PatternContainer>
              {currentPattern.pattern.map((item, index) => (
                item.shape === '?' ? (
                  <QuestionMark key={index}>?</QuestionMark>
                ) : (
                  <PatternShape 
                    key={index} 
                    shape={item.shape} 
                    color={item.color}
                  />
                )
              ))}
            </PatternContainer>
            
            <ShapesContainer>
              {currentPattern.options.map((option, index) => (
                <Shape 
                  key={index}
                  shape={option.shape}
                  color={option.color}
                  selected={selectedOption === index}
                  onClick={() => handleOptionSelect(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showFeedback}
                />
              ))}
            </ShapesContainer>
            
            {showFeedback && (
              <FeedbackContainer isCorrect={selectedOption === currentPattern.correctAnswer}>
                {selectedOption === currentPattern.correctAnswer ? 
                  "✓ Correct! You've identified the pattern correctly." : 
                  "✗ Incorrect. The pattern follows a specific sequence of shapes and colors."}
              </FeedbackContainer>
            )}
          </PuzzleContainer>
          
          <ActionButtons>
            {!showFeedback ? (
              <Button 
                primary 
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
              >
                Check Answer
              </Button>
            ) : (
              <Button primary onClick={handleNextPattern}>
                {currentPatternIndex < patterns.length - 1 ? "Next Pattern" : "See Results"}
              </Button>
            )}
          </ActionButtons>
        </GameArea>
      )}
      
      {gameState === 'finished' && (
        <GameArea>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsContainer>
              <h2>Your Results</h2>
              <div className="score">{score} / {patterns.length}</div>
              <p>
                {score === patterns.length ? 
                  "Excellent! You have exceptional spatial reasoning skills." :
                  score >= Math.floor(patterns.length * 0.75) ?
                  "Good job! You have strong spatial abilities." :
                  score >= Math.floor(patterns.length * 0.5) ?
                  "Not bad. With a bit more practice, your spatial reasoning skills will improve." :
                  "Your spatial skills need some work. Regular practice can help improve them."}
              </p>
              
              <Button primary onClick={handleRestartGame}>Try Again</Button>
            </ResultsContainer>
          </motion.div>
        </GameArea>
      )}
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p>
          <strong>Why Spatial Skills Matter:</strong> Spatial reasoning is essential for everyday tasks
          such as navigation, recognizing objects, and mental rotation. It's also an important cognitive
          domain that can be affected by certain neurological conditions.
        </p>
      </div>
    </GameContainer>
  );
};

export default SpatialSkillsGame;
