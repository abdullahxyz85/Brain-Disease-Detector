import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const NumericQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "What comes next in this sequence: 2, 4, 8, 16, ?",
      options: ["24", "32", "28", "20"],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "If 3x + 7 = 22, what is x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "What's the next number: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "If a rectangle has a length of 12 and width of 8, what's its area?",
      options: ["96", "40", "20", "84"],
      correctAnswer: 0
    },
    {
      id: 5,
      text: "What pattern do you see: 100, 81, 64, 49, ?",
      options: ["25", "36", "32", "40"],
      correctAnswer: 1
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
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
        setQuizCompleted(true);
      }
      return;
    }
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswered(true);
  };
  
  return (
    <QuizContainer>
      <button 
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--primary-color)',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '20px',
          padding: '8px 0'
        }}
      >
        <svg style={{ marginRight: '8px', width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </button>
      
      {!quizCompleted ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.2rem', color: '#795548', marginBottom: '15px' }}>
              Numeric Reasoning Quiz
            </h1>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Test your mathematical thinking and number pattern recognition skills.
            </p>
          </div>
          
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#f1f3f5',
            borderRadius: '5px',
            marginBottom: '40px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #795548, #8D6E63)',
              width: `${progress}%`,
              transition: 'width 0.5s ease'
            }}></div>
          </div>
          
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
                                       selectedOption === index ? '#795548' : 'transparent'}`,
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
                    setQuizCompleted(true);
                  }
                }}
              >
                Skip Question
              </button>
              
              <button
                style={{
                  padding: '12px 25px',
                  backgroundColor: selectedOption === null && !answered ? '#ccc' : '#795548',
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
          <h2 style={{ color: '#795548', marginBottom: '20px' }}>Quiz Completed!</h2>
          <div style={{ color: '#666', marginBottom: '20px' }}>
            You answered {score} out of {questions.length} questions correctly.
          </div>
          
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: '700',
            color: score >= 4 ? '#52c41a' : score >= 3 ? '#faad14' : '#ff4d4f',
            margin: '30px 0'
          }}>
            {Math.round((score / questions.length) * 100)}%
          </div>
          
          <button
            style={{
              padding: '12px 25px',
              backgroundColor: '#795548',
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

export default NumericQuiz;
