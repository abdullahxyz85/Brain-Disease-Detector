import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
    {
      id: 'reaction',
      title: 'Reaction Time',
      description: 'Measure how quickly you can respond to visual stimuli.',
      difficulty: 'Easy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
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
      )
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
      )
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
              <GameLink to={`/games/${game.id}`}>Play Now</GameLink>
            </GameContent>
          </GameCard>
        ))}
      </GamesGrid>
      
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
