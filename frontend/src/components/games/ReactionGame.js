import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const GameHeader = styled.div`
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
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Target = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF5722, #FF9800);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const StartButton = styled.button`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin: 20px 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 30px;
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
  }
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: var(--primary-color);
  }
`;

const BackButton = styled.button`
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const ReactionGame = () => {
  const [gameState, setGameState] = useState('waiting'); // waiting, ready, active, finished
  const [startTime, setStartTime] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(3);
  
  // Function to generate random position for the target
  const getRandomPosition = () => {
    // Limit the area to keep the target fully visible
    return {
      x: Math.floor(Math.random() * 600) - 300, // Assuming game area is 800px wide
      y: Math.floor(Math.random() * 200) - 100, // Assuming game area is 400px tall
    };
  };
  
  // Start the game
  const handleGameStart = () => {
    setGameState('ready');
    setReactions([]);
    setCountdown(3);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setGameState('active');
          showTarget();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Show target at random intervals
  const showTarget = () => {
    // Set random position for the target
    setTargetPosition(getRandomPosition());
    
    // Record the time when target appears
    setStartTime(Date.now());
  };
  
  // Handle target click
  const handleTargetClick = () => {
    if (gameState !== 'active') return;
    
    // Calculate reaction time
    const reactionTime = Date.now() - startTime;
    setReactions(prev => [...prev, reactionTime]);
    
    // Check if we've completed 5 rounds
    if (reactions.length >= 4) {
      // Game over
      setGameState('finished');
      // Send results to backend (in a real app)
      sendResultsToBackend([...reactions, reactionTime]);
    } else {
      // Wait a random time before showing the next target
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds
      setTimeout(showTarget, delay);
    }
  };
  
  // Send results to backend
  const sendResultsToBackend = async (reactionResults) => {
    try {
      const response = await axios.post('http://localhost:8000/api/game/reaction', {
        reactions: reactionResults
      });
      
      // Handle response as needed
      console.log('Results submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };
  
  // Calculate average reaction time
  const getAverageReactionTime = () => {
    if (reactions.length === 0) return 0;
    const sum = reactions.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / reactions.length);
  };
  
  // Return to start
  const handleBackToStart = () => {
    setGameState('waiting');
  };
  
  return (
    <GameContainer>
      <GameHeader>
        <h1>Reaction Time Test</h1>
        <p>
          Click on the target as quickly as you can when it appears.
          This game measures your visual reaction time.
        </p>
      </GameHeader>
      
      <GameArea>
        {gameState === 'waiting' && (
          <StartButton onClick={handleGameStart}>Start Game</StartButton>
        )}
        
        {gameState === 'ready' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Get Ready!</h2>
            <div style={{ fontSize: '3rem', margin: '20px 0' }}>{countdown}</div>
          </motion.div>
        )}
        
        {gameState === 'active' && (
          <Target
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              x: targetPosition.x,
              y: targetPosition.y
            }}
            transition={{ duration: 0.2 }}
            onClick={handleTargetClick}
          >
            Click!
          </Target>
        )}
        
        {gameState === 'finished' && (
          <ResultsContainer>
            <h2>Your Results</h2>
            {reactions.map((time, index) => (
              <ResultItem key={index}>
                <div>Target {index + 1}</div>
                <div><strong>{time} ms</strong></div>
              </ResultItem>
            ))}
            <ResultItem>
              <div>Average Reaction Time</div>
              <div><strong>{getAverageReactionTime()} ms</strong></div>
            </ResultItem>
            
            <BackButton onClick={handleBackToStart}>Play Again</BackButton>
          </ResultsContainer>
        )}
      </GameArea>
      
      <div>
        <p>
          <strong>How it works:</strong> This test measures your visual reaction time. 
          The average human reaction time is about 250ms (milliseconds). 
          Professional athletes often have reaction times around 150-200ms.
        </p>
        <p>
          <strong>Why it matters:</strong> Reaction time can be an indicator of cognitive processing speed, 
          which is important for quick decision-making and response to environmental changes.
        </p>
      </div>
    </GameContainer>
  );
};

export default ReactionGame;
