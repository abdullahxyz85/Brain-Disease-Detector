import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
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

const AttentionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 60px);
  gap: 10px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const GridItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${props => {
    if (props.isTarget) return '#e74c3c';
    if (props.isDistractor) return '#95a5a6';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: #3498db;
    transform: scale(1.1);
  }

  ${props => props.isTarget && `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `}
`;

const TaskDisplay = styled.div`
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
`;

const FocusPoint = styled.div`
  width: 20px;
  height: 20px;
  background: #e74c3c;
  border-radius: 50%;
  margin: 20px auto;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const ControlButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

const AttentionTrainingGame = ({ onClose }) => {
  const [currentTask, setCurrentTask] = useState('visual-search');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameActive, setGameActive] = useState(true);
  const [taskPhase, setTaskPhase] = useState('ready');
  const [gridItems, setGridItems] = useState([]);
  const [targetCount, setTargetCount] = useState(0);
  const [userCount, setUserCount] = useState('');
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [sustainedAttentionTime, setSustainedAttentionTime] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);

  const tasks = {
    'visual-search': {
      name: 'Visual Search',
      description: 'Find and count the red circles',
      duration: 15
    },
    'sustained-attention': {
      name: 'Sustained Attention',
      description: 'Click when you see the target (red circle)',
      duration: 30
    },
    'divided-attention': {
      name: 'Divided Attention',
      description: 'Count red circles AND blue squares',
      duration: 20
    }
  };

  const generateVisualSearchTask = () => {
    const items = [];
    const totalItems = 24 + (level * 6); // Increase difficulty
    let targets = 3 + Math.floor(Math.random() * 3); // 3-5 targets
    
    setTargetCount(targets);
    
    for (let i = 0; i < totalItems; i++) {
      if (targets > 0 && Math.random() < 0.3) {
        items.push({ type: 'target', isTarget: true, symbol: '●' });
        targets--;
      } else {
        const distractors = ['■', '▲', '♦', '◆'];
        items.push({ 
          type: 'distractor', 
          isDistractor: true, 
          symbol: distractors[Math.floor(Math.random() * distractors.length)]
        });
      }
    }
    
    // Add remaining targets if any
    while (targets > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      if (!items[randomIndex].isTarget) {
        items[randomIndex] = { type: 'target', isTarget: true, symbol: '●' };
        targets--;
      }
    }
    
    setGridItems(items.sort(() => Math.random() - 0.5));
  };

  const generateSustainedAttentionTask = () => {
    const items = [];
    const totalItems = 36;
    const hasTarget = Math.random() < 0.3; // 30% chance of target
    
    for (let i = 0; i < totalItems; i++) {
      if (i === Math.floor(totalItems / 2) && hasTarget) {
        items.push({ type: 'target', isTarget: true, symbol: '●' });
      } else {
        const distractors = ['■', '▲', '♦', '◆', '○'];
        items.push({ 
          type: 'distractor', 
          isDistractor: true, 
          symbol: distractors[Math.floor(Math.random() * distractors.length)]
        });
      }
    }
    
    setGridItems(items);
    setTargetCount(hasTarget ? 1 : 0);
  };

  const generateDividedAttentionTask = () => {
    const items = [];
    const totalItems = 30;
    let redCircles = 2 + Math.floor(Math.random() * 3);
    let blueSquares = 2 + Math.floor(Math.random() * 3);
    
    setTargetCount(redCircles + blueSquares);
    
    for (let i = 0; i < totalItems; i++) {
      if (redCircles > 0 && Math.random() < 0.3) {
        items.push({ type: 'red-circle', isTarget: true, symbol: '●' });
        redCircles--;
      } else if (blueSquares > 0 && Math.random() < 0.3) {
        items.push({ type: 'blue-square', isTarget: true, symbol: '■' });
        blueSquares--;
      } else {
        const distractors = ['▲', '♦', '◆', '○'];
        items.push({ 
          type: 'distractor', 
          isDistractor: true, 
          symbol: distractors[Math.floor(Math.random() * distractors.length)]
        });
      }
    }
    
    setGridItems(items.sort(() => Math.random() - 0.5));
  };

  const startTask = () => {
    setTaskPhase('active');
    setUserCount('');
    setFeedback('');
    
    switch(currentTask) {
      case 'visual-search':
        generateVisualSearchTask();
        break;
      case 'sustained-attention':
        generateSustainedAttentionTask();
        setSustainedAttentionTime(0);
        break;
      case 'divided-attention':
        generateDividedAttentionTask();
        break;
      default:
        // Default case for other task types
        break;
    }
    
    // Auto-end task after duration
    setTimeout(() => {
      if (currentTask === 'sustained-attention') {
        endSustainedAttentionTask();
      } else {
        setTaskPhase('input');
      }
    }, tasks[currentTask].duration * 1000);
  };

  const endSustainedAttentionTask = () => {
    const hasTarget = gridItems.some(item => item.isTarget);
    if (hasTarget && sustainedAttentionTime === 0) {
      setMissedTargets(missedTargets + 1);
      setFeedback('Missed target! -5 points');
      setScore(Math.max(0, score - 5));
    } else if (!hasTarget) {
      setFeedback('Correct! No target present. +10 points');
      setScore(score + 10);
    }
    
    setTimeout(() => {
      nextTask();
    }, 2000);
  };

  const handleTargetClick = () => {
    if (currentTask === 'sustained-attention') {
      const hasTarget = gridItems.some(item => item.isTarget);
      if (hasTarget) {
        setSustainedAttentionTime(Date.now());
        setFeedback('Target found! +15 points');
        setScore(score + 15);
      } else {
        setFeedback('False alarm! -3 points');
        setScore(Math.max(0, score - 3));
      }
    }
  };

  const submitCount = () => {
    const count = parseInt(userCount);
    if (count === targetCount) {
      const points = 10 + (level * 5);
      setScore(score + points);
      setFeedback(`Correct! +${points} points`);
    } else {
      setFeedback(`Wrong! Correct count: ${targetCount}`);
    }
    
    setTimeout(() => {
      nextTask();
    }, 2000);
  };

  const nextTask = () => {
    const taskKeys = Object.keys(tasks);
    const currentIndex = taskKeys.indexOf(currentTask);
    const nextIndex = (currentIndex + 1) % taskKeys.length;
    
    if (nextIndex === 0) {
      setLevel(level + 1);
    }
    
    setCurrentTask(taskKeys[nextIndex]);
    setTaskPhase('ready');
    setFeedback('');
  };

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  if (!gameActive) {
    return (
      <GameContainer>
        <Title>Attention Training Complete!</Title>
        <GameArea>
          <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <div>Final Score: {score}</div>
            <div>Level Reached: {level}</div>
            <div>Missed Targets: {missedTargets}</div>
            <div style={{ marginTop: '20px' }}>
              <ControlButton onClick={onClose}>Return to Games</ControlButton>
            </div>
          </div>
        </GameArea>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Title>Attention Training</Title>
      <ScoreDisplay>
        <div>Score: {score}</div>
        <Timer timeLeft={timeLeft}>Time: {timeLeft}s</Timer>
        <div>Level: {level}</div>
      </ScoreDisplay>
      <ProgressBar progress={score} total={200} />
      
      <TaskDisplay>
        <h3>{tasks[currentTask].name}</h3>
        <p>{tasks[currentTask].description}</p>
      </TaskDisplay>
      
      <GameArea>
        {feedback && (
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: feedback.includes('Correct') || feedback.includes('found') ? '#4caf50' : '#ff4444',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {feedback}
          </div>
        )}
        
        {taskPhase === 'ready' && (
          <>
            <FocusPoint />
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              Focus on the red dot, then click Start when ready
            </div>
            <ControlButton onClick={startTask}>Start Task</ControlButton>
          </>
        )}
        
        {taskPhase === 'active' && (
          <>
            <AttentionGrid>
              {gridItems.map((item, index) => (
                <GridItem 
                  key={index} 
                  isTarget={item.isTarget && currentTask !== 'sustained-attention'}
                  isDistractor={item.isDistractor}
                  onClick={currentTask === 'sustained-attention' ? handleTargetClick : undefined}
                >
                  {item.symbol}
                </GridItem>
              ))}
            </AttentionGrid>
            
            {currentTask === 'sustained-attention' && (
              <div style={{ textAlign: 'center' }}>
                Click anywhere when you see a red circle (●)
              </div>
            )}
          </>
        )}
        
        {taskPhase === 'input' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
              How many {currentTask === 'divided-attention' ? 'red circles (●) and blue squares (■)' : 'red circles (●)'} did you see?
            </div>
            <input 
              type="number" 
              value={userCount}
              onChange={(e) => setUserCount(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '1.2rem',
                borderRadius: '5px',
                border: 'none',
                marginRight: '10px',
                width: '80px'
              }}
            />
            <ControlButton onClick={submitCount} disabled={!userCount}>
              Submit
            </ControlButton>
          </div>
        )}
      </GameArea>
    </GameContainer>
  );
};

export default AttentionTrainingGame;
