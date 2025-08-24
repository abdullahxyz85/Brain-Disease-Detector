import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const GameContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
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
    font-size: 2.2rem;
    color: var(--primary-color);
    margin-bottom: 15px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  p {
    color: #e0e0e0;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.05rem;
    line-height: 1.6;
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 30px 0;
  
  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GameCard = styled.div`
  background-color: ${({ active }) => (active ? 'var(--primary-color)' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'var(--text-color)')};
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-5px)')};
    box-shadow: ${({ disabled }) => (disabled ? '0 4px 10px rgba(0, 0, 0, 0.1)' : '0 10px 20px rgba(0, 0, 0, 0.15)')};
  }
  
  @media (max-width: 500px) {
    height: 70px;
    font-size: 1.2rem;
  }
`;

const GameControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const InfoPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 15px;
    color: #e0e0e0;
    font-size: 1.05rem;
    line-height: 1.5;
  }
  
  .highlight {
    color: var(--accent-color);
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  color: white;
  padding: ${({ large }) => (large ? '15px 35px' : '12px 25px')};
  border-radius: 50px;
  font-size: ${({ large }) => (large ? '1.1rem' : '1rem')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 10px 5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LevelSelector = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const LevelButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? 'var(--primary-color)' : '#e9ecef')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? 'var(--primary-color)' : '#dee2e6')};
  }
`;

const ResultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 20px;
    color: #666;
  }
  
  .score {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-color);
    margin: 20px 0;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    
    @media (max-width: 500px) {
      flex-direction: column;
    }
  }
`;

const MemoryGame = () => {
  // Game configuration
  const [level, setLevel] = useState('easy'); // easy, medium, hard
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameStats, setGameStats] = useState({
    accuracy: 0,
    maxSequenceLength: 0,
    reactionTime: 0,
  });
  
  // Level settings
  const levels = {
    easy: { initialLength: 3, increment: 1, displayTime: 1000 },
    medium: { initialLength: 4, increment: 1, displayTime: 800 },
    hard: { initialLength: 5, increment: 2, displayTime: 600 },
  };
  
  // Set number of cards based on level
  const numCards = level === 'easy' ? 9 : level === 'medium' ? 12 : 16;
  
  // Generate game cards
  const generateCards = () => {
    return Array.from({ length: numCards }, (_, index) => index + 1);
  };
  
  const cards = generateCards();
  
  // Start a new game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setRound(1);
    setGameOver(false);
    setUserSequence([]);
    generateSequence();
  };
  
  // Generate a new sequence for the round
  const generateSequence = () => {
    const { initialLength, increment } = levels[level];
    const length = initialLength + (round - 1) * increment;
    const newSequence = [];
    
    for (let i = 0; i < length; i++) {
      const randomCard = Math.floor(Math.random() * numCards) + 1;
      newSequence.push(randomCard);
    }
    
    setSequence(newSequence);
    setCurrentIndex(0);
    setShowingSequence(true);
    showSequence(newSequence);
  };
  
  // Display the sequence to the player
  const showSequence = (seq) => {
    let index = 0;
    const { displayTime } = levels[level];
    
    const intervalId = setInterval(() => {
      if (index < seq.length) {
        setCurrentIndex(seq[index]);
        setTimeout(() => {
          setCurrentIndex(0);
        }, displayTime / 2);
        index++;
      } else {
        clearInterval(intervalId);
        setShowingSequence(false);
        setUserSequence([]);
      }
    }, displayTime);
  };
  
  // Handle card click during player's turn
  const handleCardClick = (cardNumber) => {
    if (showingSequence || gameOver) return;
    
    const newUserSequence = [...userSequence, cardNumber];
    setUserSequence(newUserSequence);
    
    const currentRoundIndex = newUserSequence.length - 1;
    
    // Check if the selected card is correct
    if (newUserSequence[currentRoundIndex] !== sequence[currentRoundIndex]) {
      // Incorrect selection
      endGame();
      return;
    }
    
    // Check if the player has completed the sequence
    if (newUserSequence.length === sequence.length) {
      // Completed correctly
      const newScore = score + (sequence.length * 10 * (level === 'easy' ? 1 : level === 'medium' ? 2 : 3));
      setScore(newScore);
      setRound(round + 1);
      
      // Give player a moment before next sequence
      setTimeout(() => {
        generateSequence();
      }, 1500);
    }
  };
  
  // End the game and show results
  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    
    // Calculate game statistics
    const stats = {
      accuracy: Math.round((userSequence.length / sequence.length) * 100),
      maxSequenceLength: sequence.length,
      reactionTime: levels[level].displayTime,
    };
    
    setGameStats(stats);
    
    // Send results to backend
    sendResults(stats);
  };
  
  // Send results to backend for processing
  const sendResults = async (stats) => {
    try {
      await axios.post('http://localhost:8000/api/game/memory', {
        score,
        level,
        rounds: round,
        maxSequenceLength: stats.maxSequenceLength,
        accuracy: stats.accuracy,
      });
      
      // Show results modal after server response
      setShowResult(true);
    } catch (error) {
      console.error('Error sending results:', error);
      // Show results anyway, even if backend request failed
      setShowResult(true);
    }
  };
  
  return (
    <GameContainer>
      <GameHeader>
        <h1>Memory Game</h1>
        <p>
          Test and improve your short-term memory by remembering sequences of numbers.
          Watch carefully and repeat the sequence in the correct order!
        </p>
      </GameHeader>
      
      {!isPlaying ? (
        <>
          <InfoPanel>
            <h2>How to Play</h2>
            <p>1. Watch as the cards light up in a specific sequence.</p>
            <p>2. After the sequence finishes, click the cards in the same order.</p>
            <p>3. Each round adds more steps to the sequence.</p>
            <p>4. Make a mistake and the game ends!</p>
            
            <h2 className="mt-20">Select Difficulty</h2>
            <LevelSelector>
              <LevelButton 
                active={level === 'easy'} 
                onClick={() => setLevel('easy')}
              >
                Easy
              </LevelButton>
              <LevelButton 
                active={level === 'medium'} 
                onClick={() => setLevel('medium')}
              >
                Medium
              </LevelButton>
              <LevelButton 
                active={level === 'hard'} 
                onClick={() => setLevel('hard')}
              >
                Hard
              </LevelButton>
            </LevelSelector>
          </InfoPanel>
          
          <div className="text-center mt-20">
            <Button large onClick={startGame}>
              Start Game
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h2>
              {showingSequence 
                ? 'Watch the sequence...' 
                : 'Your turn! Repeat the sequence.'}
            </h2>
            <p>
              Round: <span className="highlight">{round}</span> | 
              Score: <span className="highlight">{score}</span> |
              Sequence Length: <span className="highlight">{sequence.length}</span>
            </p>
          </div>
          
          <GameBoard>
            {cards.map((card) => (
              <GameCard
                key={card}
                active={currentIndex === card}
                disabled={showingSequence}
                onClick={() => !showingSequence && handleCardClick(card)}
              >
                {card}
              </GameCard>
            ))}
          </GameBoard>
          
          <GameControls>
            <Button onClick={() => setIsPlaying(false)}>
              Quit Game
            </Button>
          </GameControls>
        </>
      )}
      
      {showResult && (
        <ResultModal>
          <ModalContent>
            <h2>Game Over!</h2>
            <p>You've reached Round {round} with a memory sequence of {gameStats.maxSequenceLength} items.</p>
            
            <div className="score">
              {score} pts
            </div>
            
            <p>Accuracy: {gameStats.accuracy}%</p>
            
            <div className="buttons">
              <Button onClick={() => {
                setShowResult(false);
                startGame();
              }}>
                Play Again
              </Button>
              <Button secondary as={Link} to="/games">
                Other Games
              </Button>
            </div>
          </ModalContent>
        </ResultModal>
      )}
    </GameContainer>
  );
};

export default MemoryGame;
