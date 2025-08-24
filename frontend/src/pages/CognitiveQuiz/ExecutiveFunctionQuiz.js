import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;
  
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.2rem;
    color: #E91E63;
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.05rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f1f3f5;
  border-radius: 5px;
  margin-bottom: 40px;
  overflow: hidden;
  
  .fill {
    height: 100%;
    background: linear-gradient(90deg, #E91E63, #F06292);
    width: ${({ progress }) => `${progress}%`};
    transition: width 0.5s ease;
  }
`;

const ExecutiveFunctionQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "You're planning a dinner party for 8 people. What's the most logical first step?",
      options: [
        "Start cooking immediately",
        "Make a guest list and plan the menu",
        "Buy all ingredients at once",
        "Set the table"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "If Plan A fails, what should you do next?",
      options: [
        "Give up completely",
        "Try Plan A again",
        "Implement Plan B",
        "Ask someone else to do it"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "You have 3 urgent tasks and 2 hours. How do you prioritize?",
      options: [
        "Do them in random order",
        "Start with the easiest one",
        "Rank by importance and deadlines",
        "Do all three simultaneously"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "You realize you made an error in your work. What's the best approach?",
      options: [
        "Hide the mistake",
        "Fix it immediately and learn from it",
        "Blame external factors",
        "Wait for someone else to notice"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "When learning a new skill, what's the most effective strategy?",
      options: [
        "Practice randomly",
        "Break it down into smaller steps",
        "Try to master everything at once",
        "Only practice when you feel like it"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      text: "You're interrupted while working on an important task. What do you do?",
      options: [
        "Completely switch to the interruption",
        "Ignore the interruption entirely",
        "Note where you stopped and address the interruption briefly",
        "Get frustrated and stop working"
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      text: "You need to make a complex decision. What's your best approach?",
      options: [
        "Go with your first instinct",
        "List pros and cons, consider outcomes",
        "Ask others to decide for you",
        "Postpone the decision indefinitely"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "You receive feedback that contradicts your opinion. How do you respond?",
      options: [
        "Dismiss it immediately",
        "Consider it objectively and adjust if valid",
        "Argue against it",
        "Ignore it completely"
      ],
      correctAnswer: 1
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  
  useEffect(() => {
    setStartTime(Date.now());
  }, []);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  const handleSelectOption = (index) => {
    if (answered) return;
    setSelectedOption(index);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    if (answered) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setAnswered(false);
      } else {
        finishQuiz();
      }
      return;
    }
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswered(true);
  };
  
  const finishQuiz = () => {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    setTimeSpent(timeElapsed);
    setQuizCompleted(true);
  };
  
  return (
    <QuizContainer>
      <BackButton onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </BackButton>
      
      {!quizCompleted ? (
        <>
          <QuizHeader>
            <h1>Executive Function Quiz</h1>
            <p>
              This quiz tests planning, decision-making, and cognitive flexibility.
              Choose the best approach for each scenario.
            </p>
          </QuizHeader>
          
          <ProgressBar progress={progress}>
            <div className="fill"></div>
          </ProgressBar>
          
          <motion.div
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '30px'
            }}
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', marginBottom: '25px' }}>
              {currentQuestion.text}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: answered && index === currentQuestion.correctAnswer ? '#e6f7e6' :
                                   answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#fdeded' : 
                                   selectedOption === index ? '#f0f7ff' : '#f8f9fa',
                    border: `2px solid ${answered && index === currentQuestion.correctAnswer ? '#52c41a' :
                                       answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#ff4d4f' :
                                       selectedOption === index ? '#E91E63' : 'transparent'}`,
                    borderRadius: '10px',
                    padding: '15px 20px',
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onClick={() => handleSelectOption(index)}
                >
                  {option}
                  {answered && index === currentQuestion.correctAnswer && (
                    <span style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#52c41a',
                      fontWeight: 'bold'
                    }}>✓</span>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px'
            }}>
              <button
                style={{
                  padding: '12px 25px',
                  backgroundColor: '#f1f3f5',
                  color: 'var(--text-color)',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                    setAnswered(false);
                  } else {
                    finishQuiz();
                  }
                }}
              >
                Skip Question
              </button>
              
              <button
                style={{
                  padding: '12px 25px',
                  backgroundColor: selectedOption === null && !answered ? '#ccc' : '#E91E63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: selectedOption === null && !answered ? 'not-allowed' : 'pointer'
                }}
                onClick={handleNextQuestion}
                disabled={selectedOption === null && !answered}
              >
                {answered ? 
                  (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 
                  'Check Answer'}
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ color: '#E91E63', marginBottom: '20px' }}>Quiz Completed!</h2>
          <div style={{ color: '#666', marginBottom: '20px' }}>
            You answered {score} out of {questions.length} questions correctly.
            Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
          </div>
          
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: '700',
            color: score >= 6 ? '#52c41a' : score >= 4 ? '#faad14' : '#ff4d4f',
            margin: '30px 0'
          }}>
            {Math.round((score / questions.length) * 100)}%
          </div>
          
          <button
            style={{
              padding: '12px 25px',
              backgroundColor: '#E91E63',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={onBack}
          >
            Back to Quizzes
          </button>
        </motion.div>
      )}
    </QuizContainer>
  );
};

export default ExecutiveFunctionQuiz;
