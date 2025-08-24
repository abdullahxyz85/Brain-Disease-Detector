import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TemporalQuiz from './CognitiveQuiz/TemporalQuiz';
import SemanticQuiz from './CognitiveQuiz/SemanticQuiz';
import ReasoningQuiz from './CognitiveQuiz/ReasoningQuiz';
import MemoryRecallQuiz from './CognitiveQuiz/MemoryRecallQuiz';
import AttentionQuiz from './CognitiveQuiz/AttentionQuiz';
import LanguageQuiz from './CognitiveQuiz/LanguageQuiz';
import ExecutiveFunctionQuiz from './CognitiveQuiz/ExecutiveFunctionQuiz';
import VisualPerceptionQuiz from './CognitiveQuiz/VisualPerceptionQuiz';
import NumericQuiz from './CognitiveQuiz/NumericQuiz';
import SpatialAwarenessQuiz from './CognitiveQuiz/SpatialAwarenessQuiz';
import ProcessingSpeedQuiz from './CognitiveQuiz/ProcessingSpeedQuiz';
import WorkingMemoryQuiz from './CognitiveQuiz/WorkingMemoryQuiz';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
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

const QuizSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 40px;
`;

const QuizCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(5px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.color}20, ${props => props.color}10);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .quiz-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const QuizImageContainer = styled.div`
  height: 120px;
  background: linear-gradient(135deg, ${({ color }) => color || '#f0f2f5'}, ${({ color }) => color ? color + '80' : '#e0e2e5'});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  svg {
    width: 50px;
    height: 50px;
    color: white;
    transition: all 0.3s ease;
  }
`;

const QuizBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: ${props => props.color};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const QuizContent = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
  
  h3 {
    font-size: 1.3rem;
    color: var(--text-color);
    margin-bottom: 8px;
    font-weight: 700;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 16px;
    line-height: 1.5;
  }
`;

const QuizMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.8rem;
  
  .difficulty {
    display: flex;
    align-items: center;
    color: ${props => 
      props.difficulty === 'Easy' ? '#4CAF50' : 
      props.difficulty === 'Medium' ? '#FF9800' : 
      '#F44336'
    };
    font-weight: 600;
    
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 6px;
    }
  }
  
  .duration {
    color: #666;
    font-weight: 500;
  }
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}CC);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }
`;

const InfoSection = styled.div`
  margin-top: 60px;
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

const CognitiveQuiz = () => {
  const [activeQuizType, setActiveQuizType] = useState(null);
  
  const quizTypes = [
    {
      id: 'temporal',
      title: 'Temporal Orientation',
      description: 'Test your awareness of time, date, and sequence of events.',
      color: '#4CAF50',
      component: TemporalQuiz,
      difficulty: 'Easy',
      duration: '5-8 min',
      category: 'Orientation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'semantic',
      title: 'Semantic Memory',
      description: 'Challenge your knowledge of facts, meanings, and general information.',
      color: '#2196F3',
      component: SemanticQuiz,
      difficulty: 'Medium',
      duration: '8-12 min',
      category: 'Memory',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'reasoning',
      title: 'Reasoning & Logic',
      description: 'Test your critical thinking and problem-solving abilities.',
      color: '#9C27B0',
      component: ReasoningQuiz,
      difficulty: 'Hard',
      duration: '10-15 min',
      category: 'Logic',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 'memory-recall',
      title: 'Memory Recall',
      description: 'Test your ability to remember and recall detailed information.',
      color: '#FF5722',
      component: MemoryRecallQuiz,
      difficulty: 'Medium',
      duration: '6-10 min',
      category: 'Memory',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'attention',
      title: 'Attention & Focus',
      description: 'Measure your sustained attention and concentration abilities.',
      color: '#FF9800',
      component: AttentionQuiz,
      difficulty: 'Medium',
      duration: '8-12 min',
      category: 'Attention',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 'language',
      title: 'Language & Vocabulary',
      description: 'Evaluate your language comprehension and vocabulary skills.',
      color: '#3F51B5',
      component: LanguageQuiz,
      difficulty: 'Medium',
      duration: '7-10 min',
      category: 'Language',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      id: 'executive-function',
      title: 'Executive Function',
      description: 'Test planning, decision-making, and cognitive flexibility.',
      color: '#E91E63',
      component: ExecutiveFunctionQuiz,
      difficulty: 'Hard',
      duration: '12-18 min',
      category: 'Executive',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'visual-perception',
      title: 'Visual Perception',
      description: 'Assess your visual processing and pattern recognition skills.',
      color: '#00BCD4',
      component: VisualPerceptionQuiz,
      difficulty: 'Medium',
      duration: '8-12 min',
      category: 'Visual',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'numeric',
      title: 'Numeric Reasoning',
      description: 'Test mathematical thinking and number pattern recognition.',
      color: '#795548',
      component: NumericQuiz,
      difficulty: 'Medium',
      duration: '10-15 min',
      category: 'Logic',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'spatial-awareness',
      title: 'Spatial Awareness',
      description: 'Evaluate spatial reasoning and 3D visualization abilities.',
      color: '#607D8B',
      component: SpatialAwarenessQuiz,
      difficulty: 'Hard',
      duration: '10-15 min',
      category: 'Spatial',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'processing-speed',
      title: 'Processing Speed',
      description: 'Measure how quickly you can process and respond to information.',
      color: '#FFC107',
      component: ProcessingSpeedQuiz,
      difficulty: 'Easy',
      duration: '5-8 min',
      category: 'Speed',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'working-memory',
      title: 'Working Memory',
      description: 'Test your ability to hold and manipulate information mentally.',
      color: '#8BC34A',
      component: WorkingMemoryQuiz,
      difficulty: 'Hard',
      duration: '8-12 min',
      category: 'Memory',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    }
  ];
  
  const handleStartQuiz = (quizType) => {
    setActiveQuizType(quizType);
    window.scrollTo(0, 0);
  };
  
  const handleBackToQuizzes = () => {
    setActiveQuizType(null);
  };
  
  // Render the selected quiz component if one is active
  if (activeQuizType) {
    const QuizComponent = quizTypes.find(quiz => quiz.id === activeQuizType).component;
    return <QuizComponent onBack={handleBackToQuizzes} />;
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Cognitive Quizzes</h1>
        <p>
          Test different aspects of your cognitive abilities through these interactive quizzes.
          Each quiz evaluates a specific area of brain function.
        </p>
      </PageHeader>
      
      <QuizSelector>
        {quizTypes.map((quiz, index) => (
          <QuizCard 
            key={quiz.id}
            color={quiz.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleStartQuiz(quiz.id)}
          >
            <QuizImageContainer color={quiz.color}>
              <div className="quiz-icon">{quiz.icon}</div>
              <QuizBadge color={quiz.color}>{quiz.category}</QuizBadge>
            </QuizImageContainer>
            <QuizContent>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <QuizMeta difficulty={quiz.difficulty}>
                <span className="difficulty">{quiz.difficulty}</span>
                <span className="duration">⏱️ {quiz.duration}</span>
              </QuizMeta>
              <StartButton color={quiz.color}>Start Quiz</StartButton>
            </QuizContent>
          </QuizCard>
        ))}
      </QuizSelector>
      
      <InfoSection>
        <h2>Comprehensive Cognitive Assessment</h2>
        <p>
          Our extensive collection of 12 cognitive quizzes provides a thorough evaluation of different aspects of brain function.
          Each quiz is scientifically designed to assess specific cognitive domains and can help identify potential areas of strength or concern.
        </p>
        <p>
          <strong>Quiz Categories:</strong>
        </p>
        <ul>
          <li><strong>Memory Assessments:</strong> Semantic Memory, Memory Recall, Working Memory - Test different types of memory function</li>
          <li><strong>Orientation & Time:</strong> Temporal Orientation - Evaluate awareness of time and date</li>
          <li><strong>Cognitive Processing:</strong> Processing Speed, Attention & Focus - Measure mental agility and concentration</li>
          <li><strong>Language & Communication:</strong> Language & Vocabulary - Assess verbal comprehension and expression</li>
          <li><strong>Logical Thinking:</strong> Reasoning & Logic, Numeric Reasoning - Test problem-solving and mathematical thinking</li>
          <li><strong>Spatial & Visual:</strong> Visual Perception, Spatial Awareness - Evaluate visual processing and spatial skills</li>
          <li><strong>Executive Function:</strong> Executive Function - Test planning, decision-making, and cognitive flexibility</li>
        </ul>
        <p>
          Each quiz provides immediate feedback and contributes to your overall cognitive profile. The difficulty levels range from Easy to Hard, 
          and completion times vary from 5-18 minutes depending on the assessment complexity.
        </p>
        <p>
          <strong>Important Note:</strong> These assessments are screening tools and should not be used for self-diagnosis. 
          If you have concerns about cognitive health, please consult with a qualified healthcare professional.
        </p>
      </InfoSection>
    </PageContainer>
  );
};

export default CognitiveQuiz;
