import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%);
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin: 30px 0;
`;

const GridSquare = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${props => props.active && `
    background: #e74c3c;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(231, 76, 60, 0.7);
  `}
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.secondary ? 'transparent' : 'linear-gradient(45deg, #e74c3c, #c0392b)'};
  color: white;
  border: ${props => props.secondary ? '2px solid #e74c3c' : 'none'};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const ScoreItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;

  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 5px;
  }

  .value {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsLabel = styled.label`
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const InfoText = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 20px;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.3s ease;
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const KeyboardHint = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const DualNBackGame = ({ onClose }) => {
  const [gameState, setGameState] = useState('intro'); // intro, playing, results
  const [nLevel, setNLevel] = useState(2);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(20);
  const [activeSquare, setActiveSquare] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [positionMatches, setPositionMatches] = useState(0);
  const [soundMatches, setSoundMatches] = useState(0);
  const [positionCorrect, setPositionCorrect] = useState(0);
  const [soundCorrect, setSoundCorrect] = useState(0);
  const [speed, setSpeed] = useState(3000);
  const [gameMode, setGameMode] = useState('dual'); // 'position', 'sound', 'dual'
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // Generate the entire sequence at the start
  const generateSequence = useCallback(() => {
    const newSequence = [];
    const positions = 9; // 3x3 grid
    
    for (let i = 0; i < totalRounds; i++) {
      const position = Math.floor(Math.random() * positions);
      const sound = Math.floor(Math.random() * letters.length);
      
      // Determine if this should be a position match
      let isPositionMatch = false;
      if (i >= nLevel && Math.random() < 0.3) { // 30% chance for match
        isPositionMatch = true;
      }
      
      // Determine if this should be a sound match
      let isSoundMatch = false;
      if (i >= nLevel && Math.random() < 0.3) { // 30% chance for match
        isSoundMatch = true;
      }
      
      newSequence.push({
        position: isPositionMatch && i >= nLevel ? newSequence[i - nLevel].position : position,
        sound: isSoundMatch && i >= nLevel ? newSequence[i - nLevel].sound : sound,
        isPositionMatch: isPositionMatch,
        isSoundMatch: isSoundMatch
      });
    }
    
    setSequence(newSequence);
    setPositionMatches(newSequence.filter(item => item.isPositionMatch).length);
    setSoundMatches(newSequence.filter(item => item.isSoundMatch).length);
    
    return newSequence;
  }, [nLevel, totalRounds, letters]);

  // Start the game
  const startGame = useCallback(() => {
    const newSequence = generateSequence();
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setPositionCorrect(0);
    setSoundCorrect(0);
    
    // Start the first round
    playRound(0, newSequence);
  }, [generateSequence]);

  // Play a single round
  const playRound = useCallback((round, gameSequence) => {
    if (round >= totalRounds) {
      setGameState('results');
      return;
    }
    
    const currentItem = gameSequence[round];
    
    // Show the position
    setActiveSquare(currentItem.position);
    
    // Play the sound
    setCurrentSound(letters[currentItem.sound]);
    
    // Set a timer to clear the current stimulus
    setTimeout(() => {
      setActiveSquare(null);
      setCurrentSound(null);
    }, speed * 0.5);
    
    // Set a timer for the next round
    timerRef.current = setTimeout(() => {
      setCurrentRound(round + 1);
      playRound(round + 1, gameSequence);
    }, speed);
  }, [speed, totalRounds, letters]);

  // Handle user position match response
  const handlePositionResponse = useCallback(() => {
    if (currentRound < nLevel || gameState !== 'playing') return;
    
    const isMatch = sequence[currentRound].isPositionMatch;
    if (isMatch) {
      setScore(prev => prev + 1);
      setPositionCorrect(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
  }, [currentRound, nLevel, sequence, gameState]);

  // Handle user sound match response
  const handleSoundResponse = useCallback(() => {
    if (currentRound < nLevel || gameState !== 'playing') return;
    
    const isMatch = sequence[currentRound].isSoundMatch;
    if (isMatch) {
      setScore(prev => prev + 1);
      setSoundCorrect(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
  }, [currentRound, nLevel, sequence, gameState]);

  // Reset the game
  const resetGame = () => {
    clearTimeout(timerRef.current);
    setGameState('intro');
    setActiveSquare(null);
    setCurrentSound(null);
    setCurrentRound(0);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.key === 'a' || e.key === 'A') {
        handlePositionResponse();
      } else if (e.key === 'l' || e.key === 'L') {
        handleSoundResponse();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handlePositionResponse, handleSoundResponse]);

  // Clean up on unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Play sound effect when currentSound changes
  useEffect(() => {
    if (currentSound && gameState === 'playing') {
      // In a real implementation, you'd play the actual sound here
      // For now, we're just displaying the letter
      console.log(`Playing sound: ${currentSound}`);
    }
  }, [currentSound, gameState]);

  // Render the appropriate screen based on game state
  const renderGameContent = () => {
    switch (gameState) {
      case 'intro':
        return (
          <>
            <InfoText>
              Dual N-Back is an advanced cognitive training exercise that targets working memory. You'll be presented with a sequence of visual and auditory stimuli. Your task is to identify when the current stimulus matches the one presented N steps back.
            </InfoText>
            
            <SettingsContainer>
              <SettingsRow>
                <SettingsLabel>N-Back Level:</SettingsLabel>
                <Select value={nLevel} onChange={(e) => setNLevel(parseInt(e.target.value))}>
                  <option value="1">1-Back (Easy)</option>
                  <option value="2">2-Back (Medium)</option>
                  <option value="3">3-Back (Hard)</option>
                </Select>
              </SettingsRow>
              
              <SettingsRow>
                <SettingsLabel>Speed:</SettingsLabel>
                <Select value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))}>
                  <option value="4000">Slow</option>
                  <option value="3000">Medium</option>
                  <option value="2000">Fast</option>
                </Select>
              </SettingsRow>
              
              <SettingsRow>
                <SettingsLabel>Game Mode:</SettingsLabel>
                <Select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
                  <option value="dual">Dual (Position + Sound)</option>
                  <option value="position">Position Only</option>
                  <option value="sound">Sound Only</option>
                </Select>
              </SettingsRow>
            </SettingsContainer>
            
            <Controls>
              <Button onClick={startGame}>Start Game</Button>
              <Button secondary onClick={onClose}>Return to Games</Button>
            </Controls>
          </>
        );
        
      case 'playing':
        return (
          <>
            <ScoreDisplay>
              <ScoreItem>
                <div className="label">Score</div>
                <div className="value">{score}</div>
              </ScoreItem>
              <ScoreItem>
                <div className="label">Round</div>
                <div className="value">{currentRound + 1}/{totalRounds}</div>
              </ScoreItem>
              <ScoreItem>
                <div className="label">N-Back Level</div>
                <div className="value">{nLevel}</div>
              </ScoreItem>
            </ScoreDisplay>
            
            {/* Current letter display */}
            {currentSound && (
              <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
                Letter: {currentSound}
              </div>
            )}
            
            <GridContainer>
              {Array(9).fill(null).map((_, index) => (
                <GridSquare 
                  key={index} 
                  active={activeSquare === index}
                />
              ))}
            </GridContainer>
            
            <Controls>
              <Button onClick={handlePositionResponse}>Position Match (A)</Button>
              <Button onClick={handleSoundResponse}>Sound Match (L)</Button>
            </Controls>
            
            <KeyboardHint>
              Keyboard shortcuts: Press 'A' for Position Match, 'L' for Sound Match
            </KeyboardHint>
            
            <ProgressBar progress={(currentRound / totalRounds) * 100} />
          </>
        );
        
      case 'results':
        const positionAccuracy = Math.round((positionCorrect / positionMatches) * 100) || 0;
        const soundAccuracy = Math.round((soundCorrect / soundMatches) * 100) || 0;
        const totalAccuracy = Math.round(((positionCorrect + soundCorrect) / (positionMatches + soundMatches)) * 100) || 0;
        
        return (
          <ResultsContainer>
            <h3>Game Complete!</h3>
            
            <ScoreDisplay style={{ flexDirection: 'column', gap: '15px' }}>
              <ScoreItem style={{ width: '100%' }}>
                <div className="label">Final Score</div>
                <div className="value">{score}</div>
              </ScoreItem>
              
              <ScoreItem style={{ width: '100%' }}>
                <div className="label">Position Accuracy</div>
                <div className="value">{positionAccuracy}%</div>
                <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                  ({positionCorrect}/{positionMatches} correct)
                </div>
              </ScoreItem>
              
              <ScoreItem style={{ width: '100%' }}>
                <div className="label">Sound Accuracy</div>
                <div className="value">{soundAccuracy}%</div>
                <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                  ({soundCorrect}/{soundMatches} correct)
                </div>
              </ScoreItem>
              
              <ScoreItem style={{ width: '100%' }}>
                <div className="label">Overall Accuracy</div>
                <div className="value">{totalAccuracy}%</div>
              </ScoreItem>
            </ScoreDisplay>
            
            <Controls>
              <Button onClick={() => {
                setNLevel(prev => Math.min(prev + 1, 3));
                startGame();
              }}>Next Level</Button>
              <Button onClick={resetGame}>Try Again</Button>
              <Button secondary onClick={onClose}>Return to Games</Button>
            </Controls>
          </ResultsContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <GameContainer>
      <Title>Dual N-Back Training</Title>
      <GameArea>
        {renderGameContent()}
      </GameArea>
      
      {/* Hidden audio element for sounds */}
      <audio ref={audioRef} />
    </GameContainer>
  );
};

export default DualNBackGame;
