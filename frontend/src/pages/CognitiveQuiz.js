import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TemporalQuiz from './CognitiveQuiz/TemporalQuiz';
import SemanticQuiz from './CognitiveQuiz/SemanticQuiz';
import ReasoningQuiz from './CognitiveQuiz/ReasoningQuiz';

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const QuizCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  }
`;

const QuizImageContainer = styled.div`
  height: 180px;
  background-color: ${({ color }) => color || '#f0f2f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 60px;
    height: 60px;
    color: white;
  }
`;

const QuizContent = styled.div`
  padding: 20px;
  
  h3 {
    font-size: 1.4rem;
    color: var(--text-color);
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 20px;
  }
`;

const StartButton = styled.button`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleStartQuiz(quiz.id)}
          >
            <QuizImageContainer color={quiz.color}>
              {quiz.icon}
            </QuizImageContainer>
            <QuizContent>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <StartButton>Start Quiz</StartButton>
            </QuizContent>
          </QuizCard>
        ))}
      </QuizSelector>
      
      <InfoSection>
        <h2>About Cognitive Quizzes</h2>
        <p>
          Cognitive quizzes are designed to evaluate different aspects of your thinking abilities.
          These assessments can help identify strengths and potential areas of cognitive decline.
        </p>
        <p>
          Each quiz focuses on a different cognitive domain:
        </p>
        <ul>
          <li><strong>Temporal Orientation:</strong> Assesses your awareness of time, date, and event sequences.</li>
          <li><strong>Semantic Memory:</strong> Tests your knowledge of facts, meanings, and general information.</li>
          <li><strong>Reasoning & Logic:</strong> Evaluates your critical thinking and problem-solving abilities.</li>
        </ul>
        <p>
          Your performance on these quizzes contributes to your overall cognitive assessment, but results should not
          be used for self-diagnosis. If you have concerns about cognitive health, please consult a healthcare professional.
        </p>
      </InfoSection>
    </PageContainer>
  );
};

export default CognitiveQuiz;
