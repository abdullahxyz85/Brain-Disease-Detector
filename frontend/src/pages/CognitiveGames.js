import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import MentalCalculationGame from '../components/games/MentalCalculationGame';
import MemoryGame from '../components/games/MemoryGame';
import ReactionGame from '../components/games/ReactionGame';
import ProblemSolvingGame from '../components/games/ProblemSolvingGame';
import SpatialSkillsGame from '../components/games/SpatialSkillsGame';
import PatternRecognitionGame from '../components/games/PatternRecognitionGame';
import WordAssociationGame from '../components/games/WordAssociationGame';
import AttentionTrainingGame from '../components/games/AttentionTrainingGame';
import DualNBackGame from '../components/games/DualNBackGame';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.1rem;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const GameCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  }
`;

const GameImageContainer = styled.div`
  height: 180px;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  svg {
    width: 60px;
    height: 60px;
    color: var(--primary-color);
  }
`;

const GameContent = styled.div`
  padding: 20px;
`;

const GameTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 10px;
`;

const GameDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
`;

const GameLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
`;

const GameDifficulty = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ level }) => 
    level === 'Easy' ? '#4CAF50' : 
    level === 'Medium' ? '#FF9800' : '#F44336'
  };
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const InfoSection = styled.div`
  margin-top: 80px;
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 15px;
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
    font-size: 1.8rem;
  }
  
  p {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.6;
  }
`;


const CognitiveGames = () => {
  const [showCalcGame, setShowCalcGame] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showReactionGame, setShowReactionGame] = useState(false);
  const [showProblemSolvingGame, setShowProblemSolvingGame] = useState(false);
  const [showSpatialGame, setShowSpatialGame] = useState(false);
  const [showPatternGame, setShowPatternGame] = useState(false);
  const [showWordAssociationGame, setShowWordAssociationGame] = useState(false);
  const [showAttentionGame, setShowAttentionGame] = useState(false);
  const [showDualNBackGame, setShowDualNBackGame] = useState(false);
  const games = [
    {
      id: 'memory',
      title: 'Memory Sequence',
      description: 'Test your short-term memory by remembering and repeating sequences of numbers.',
      difficulty: 'Medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      )
    },{
    id: 'mental-math',
    title: 'Mental Math',
    description: 'Test your mental arithmetic skills with quick math challenges.',
    difficulty: 'Easy',
    icon: (
      // Icon calculator
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth={2} fill="#f0f2f5"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    )
  },
      ),
      onClick: () => setShowMemoryGame(true)
    },
    {
      id: 'reaction',
      title: 'Reaction Time',
      description: 'Measure how quickly you can respond to visual stimuli.',
      difficulty: 'Easy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: () => setShowReactionGame(true)
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Challenge your logical thinking with puzzles and pattern recognition.',
      difficulty: 'Hard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      onClick: () => setShowProblemSolvingGame(true)
    },
    {
      id: 'spatial',
      title: 'Spatial Skills',
      description: 'Test your ability to visualize and manipulate objects in space.',
      difficulty: 'Medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      onClick: () => setShowSpatialGame(true)
    },
    {
      id: 'mental-calc',
      title: 'Mental Calculation',
      description: 'Sharpen your arithmetic skills with fast-paced mental math challenges!',
      difficulty: 'All',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6M9 12h6M9 17h6M5 7h.01M5 12h.01M5 17h.01" />
        </svg>
      ),
      onClick: () => setShowCalcGame(true)
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition',
      description: 'Identify patterns and sequences in visual and numerical data.',
      difficulty: 'Medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      onClick: () => setShowPatternGame(true)
    },
    {
      id: 'word-association',
      title: 'Word Association',
      description: 'Test language processing and semantic memory through word connections.',
      difficulty: 'Easy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      onClick: () => setShowWordAssociationGame(true)
    },
    {
      id: 'attention-training',
      title: 'Attention Training',
      description: 'Improve focus and sustained attention through targeted exercises.',
      difficulty: 'Medium',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      onClick: () => setShowAttentionGame(true)
    },
    {
      id: 'dual-n-back',
      title: 'Dual N-Back',
      description: 'Advanced working memory training with visual and auditory components.',
      difficulty: 'Hard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      onClick: () => setShowDualNBackGame(true)
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <h1>Cognitive Games</h1>
        <p>
          Challenge your brain with these scientifically designed games that evaluate
          different cognitive abilities. Each game tests a specific aspect of brain function.
        </p>
      </PageHeader>
      
      <GamesGrid>
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={game.id === 'mental-calc' ? { cursor: 'pointer' } : {}}
            onClick={game.onClick}
          >
            <GameImageContainer>
              {game.icon}
              <GameDifficulty level={game.difficulty}>
                {game.difficulty}
              </GameDifficulty>
            </GameImageContainer>
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              {game.onClick ? (
                <GameLink
                  as="button"
                  type="button"
                  onClick={e => { e.stopPropagation(); game.onClick(); }}
                  style={{ width: 'auto' }}
                >
                  Play Now
                </GameLink>
              ) : (
                <GameLink to={`/games/${game.id}`}>Play Now</GameLink>
              )}
            </GameContent>
          </GameCard>
        ))}
      </GamesGrid>
      
      {showCalcGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowCalcGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCalcGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888' }}>&times;</button>
            <MentalCalculationGame />
          </div>
        </div>
      )}

      {showMemoryGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowMemoryGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowMemoryGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <MemoryGame onClose={() => setShowMemoryGame(false)} />
          </div>
        </div>
      )}

      {showReactionGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowReactionGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowReactionGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <ReactionGame onClose={() => setShowReactionGame(false)} />
          </div>
        </div>
      )}

      {showProblemSolvingGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowProblemSolvingGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowProblemSolvingGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <ProblemSolvingGame onClose={() => setShowProblemSolvingGame(false)} />
          </div>
        </div>
      )}

      {showSpatialGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowSpatialGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSpatialGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <SpatialSkillsGame onClose={() => setShowSpatialGame(false)} />
          </div>
        </div>
      )}

      {showPatternGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowPatternGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPatternGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <PatternRecognitionGame onClose={() => setShowPatternGame(false)} />
          </div>
        </div>
      )}

      {showWordAssociationGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowWordAssociationGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowWordAssociationGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <WordAssociationGame onClose={() => setShowWordAssociationGame(false)} />
          </div>
        </div>
      )}

      {showAttentionGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowAttentionGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAttentionGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <AttentionTrainingGame onClose={() => setShowAttentionGame(false)} />
          </div>
        </div>
      )}

      {showDualNBackGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowDualNBackGame(false)}>
          <div style={{ position: 'relative', zIndex: 1001 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDualNBackGame(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888', zIndex: 1002 }}>&times;</button>
            <DualNBackGame onClose={() => setShowDualNBackGame(false)} />
          </div>
        </div>
      )}

      <InfoSection>
        <h2>Why Cognitive Games Matter</h2>
        <p>
          Cognitive games are not just fun activities—they're valuable tools for assessing brain function and potentially identifying 
          early signs of cognitive decline. Regular practice can also help maintain and improve cognitive abilities.
        </p>
        <p>
          Each game in our collection targets specific cognitive domains:
        </p>
        <ul>
          <li><strong>Memory Games:</strong> Test short-term memory and recall abilities.</li>
          <li><strong>Reaction Games:</strong> Measure processing speed and attention.</li>
          <li><strong>Problem-Solving Games:</strong> Assess logical thinking and executive function.</li>
          <li><strong>Spatial Games:</strong> Evaluate visual-spatial abilities and perception.</li>
        </ul>
        <p>
          While these games can provide insights into cognitive health, they should not replace professional 
          medical advice. If you have concerns about cognitive decline, please consult a healthcare professional.
        </p>
      </InfoSection>
    </PageContainer>
  );
};

export default CognitiveGames;
