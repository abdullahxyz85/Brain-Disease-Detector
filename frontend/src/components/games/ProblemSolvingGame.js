import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const GameArea = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const PuzzleContainer = styled.div`
  margin-top: 20px;
`;

const Puzzle = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  
  h3 {
    font-size: 1.3rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #333;
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.6;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button`
  background-color: ${props => props.selected ? 'var(--primary-color)' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary-color)' : '#f5f5f5'};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 30px 0;
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 4px;
    transition: width 0.3s ease;
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

// Sample puzzles
const puzzles = [
  {
    id: 1,
    question: "If a train travels at 60 miles per hour, how many miles will it cover in 2.5 hours?",
    options: ["120 miles", "150 miles", "180 miles", "200 miles"],
    correctAnswer: "150 miles",
    explanation: "Multiplying the speed (60 mph) by the time (2.5 hours) gives 150 miles."
  },
  {
    id: 2,
    question: "Which number comes next in this sequence: 2, 4, 8, 16, __",
    options: ["18", "24", "32", "64"],
    correctAnswer: "32",
    explanation: "Each number in the sequence is doubled from the previous number."
  },
  {
    id: 3,
    question: "If today is Tuesday, what day will it be after 100 days?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correctAnswer: "Tuesday",
    explanation: "100 ÷ 7 = 14 remainder 2. So after 100 days, it will be 2 days after Tuesday, which is Tuesday again."
  },
  {
    id: 4,
    question: "A shirt is on sale for $60, which is 25% off the original price. What was the original price?",
    options: ["$75", "$80", "$85", "$90"],
    correctAnswer: "$80",
    explanation: "$60 is 75% of the original price. So original price = $60 ÷ 0.75 = $80."
  },
  {
    id: 5,
    question: "If all roses are flowers and some flowers fade quickly, which of the following statements must be true?",
    options: [
      "All roses fade quickly",
      "Some roses fade quickly",
      "Some roses don't fade quickly",
      "None of the above"
    ],
    correctAnswer: "Some roses fade quickly",
    explanation: "Since all roses are flowers, and some flowers fade quickly, then some roses may fade quickly."
  }
];

const ProblemSolvingGame = () => {
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState([]);
  const [startTime, setStartTime] = useState(null);
  
  useEffect(() => {
    // Record start time when a new puzzle is shown
    setStartTime(Date.now());
  }, [currentPuzzleIndex]);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleNextPuzzle = () => {
    // Record time spent on the current puzzle
    const endTime = Date.now();
    const puzzleTime = Math.floor((endTime - startTime) / 1000); // Time in seconds
    setTimeSpent(prev => [...prev, puzzleTime]);
    
    // Check if answer is correct
    const currentPuzzle = puzzles[currentPuzzleIndex];
    if (selectedOption === currentPuzzle.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next puzzle or finish the game
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
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
      const response = await axios.post('http://localhost:8000/api/game/problem-solving', {
        score,
        totalPuzzles: puzzles.length,
        timeSpent
      });
      
      console.log('Results submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };
  
  const handleRestartGame = () => {
    setCurrentPuzzleIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setTimeSpent([]);
    setGameState('playing');
  };
  
  // Get the current puzzle
  const currentPuzzle = puzzles[currentPuzzleIndex];
  
  // Calculate progress percentage
  const progress = ((currentPuzzleIndex + 1) / puzzles.length) * 100;
  
  return (
    <GameContainer>
      <GameHeader>
        <h1>Problem Solving Challenge</h1>
        <p>
          Test your logical reasoning and problem-solving skills with these puzzles.
          Read each question carefully and select the best answer.
        </p>
      </GameHeader>
      
      {gameState === 'playing' && (
        <GameArea>
          <ProgressBar>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </ProgressBar>
          
          <div>
            <span>Puzzle {currentPuzzleIndex + 1} of {puzzles.length}</span>
          </div>
          
          <PuzzleContainer>
            <Puzzle>
              <h3>Question:</h3>
              <p>{currentPuzzle.question}</p>
              
              <OptionsContainer>
                {currentPuzzle.options.map((option, index) => (
                  <OptionButton
                    key={index}
                    selected={selectedOption === option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={showFeedback}
                  >
                    {option}
                  </OptionButton>
                ))}
              </OptionsContainer>
              
              {showFeedback && (
                <FeedbackContainer isCorrect={selectedOption === currentPuzzle.correctAnswer}>
                  {selectedOption === currentPuzzle.correctAnswer ? 
                    "✓ Correct! " : 
                    "✗ Incorrect! "}
                  {currentPuzzle.explanation}
                </FeedbackContainer>
              )}
            </Puzzle>
          </PuzzleContainer>
          
          <ActionButtons>
            {!showFeedback ? (
              <Button 
                primary 
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
              >
                Check Answer
              </Button>
            ) : (
              <Button primary onClick={handleNextPuzzle}>
                {currentPuzzleIndex < puzzles.length - 1 ? "Next Puzzle" : "See Results"}
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
              <div className="score">{score} / {puzzles.length}</div>
              <p>
                {score === puzzles.length ? 
                  "Excellent! You have exceptional problem-solving skills." :
                  score >= Math.floor(puzzles.length * 0.7) ?
                  "Good job! You have solid problem-solving abilities." :
                  score >= Math.floor(puzzles.length * 0.5) ?
                  "Not bad. With a bit more practice, your problem-solving skills will improve." :
                  "Your problem-solving skills need some work. Regular practice can help improve them."}
              </p>
              
              <Button primary onClick={handleRestartGame}>Try Again</Button>
            </ResultsContainer>
          </motion.div>
        </GameArea>
      )}
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p>
          <strong>Why Problem Solving Matters:</strong> These puzzles assess your logical reasoning
          and critical thinking, which are important indicators of cognitive health.
        </p>
      </div>
    </GameContainer>
  );
};

export default ProblemSolvingGame;
