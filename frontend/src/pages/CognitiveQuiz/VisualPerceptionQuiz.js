import React, { useState } from 'react';
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
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.2rem;
    color: #00BCD4;
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.05rem;
  }
`;

const VisualGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const VisualItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background: ${props => props.bg};
`;

const VisualPerceptionQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "How many red squares are in this grid?",
      visual: [
        {color: 'red', shape: 'square'}, {color: 'blue', shape: 'circle'}, 
        {color: 'red', shape: 'square'}, {color: 'green', shape: 'triangle'},
        {color: 'blue', shape: 'square'}, {color: 'red', shape: 'circle'}, 
        {color: 'red', shape: 'square'}, {color: 'green', shape: 'square'}
      ],
      options: ["2", "3", "4", "5"],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which shape appears most frequently?",
      visual: [
        {color: 'blue', shape: 'circle'}, {color: 'red', shape: 'circle'}, 
        {color: 'green', shape: 'square'}, {color: 'blue', shape: 'circle'},
        {color: 'red', shape: 'triangle'}, {color: 'green', shape: 'circle'}, 
        {color: 'blue', shape: 'square'}, {color: 'red', shape: 'circle'}
      ],
      options: ["Circle", "Square", "Triangle", "They're equal"],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "Count the items in the top row:",
      visual: [
        {color: 'red', shape: 'square'}, {color: 'blue', shape: 'circle'}, 
        {color: 'green', shape: 'triangle'}, {color: 'yellow', shape: 'square'},
        {color: 'purple', shape: 'circle'}, {color: 'orange', shape: 'triangle'}, 
        {color: 'pink', shape: 'square'}, {color: 'cyan', shape: 'circle'}
      ],
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      id: 4,
      text: "How many different colors are shown?",
      visual: [
        {color: 'red', shape: 'square'}, {color: 'blue', shape: 'circle'}, 
        {color: 'red', shape: 'triangle'}, {color: 'blue', shape: 'square'},
        {color: 'green', shape: 'circle'}, {color: 'red', shape: 'triangle'}, 
        {color: 'blue', shape: 'square'}, {color: 'green', shape: 'circle'}
      ],
      options: ["2", "3", "4", "5"],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "Which color appears in the diagonal from top-left to bottom-right?",
      visual: [
        {color: 'red', shape: 'square'}, {color: 'blue', shape: 'circle'}, 
        {color: 'green', shape: 'triangle'}, {color: 'yellow', shape: 'square'},
        {color: 'purple', shape: 'circle'}, {color: 'blue', shape: 'triangle'}, 
        {color: 'pink', shape: 'square'}, {color: 'cyan', shape: 'circle'},
        {color: 'orange', shape: 'triangle'}, {color: 'lime', shape: 'square'}, 
        {color: 'blue', shape: 'circle'}, {color: 'red', shape: 'triangle'},
        {color: 'gray', shape: 'square'}, {color: 'navy', shape: 'circle'}, 
        {color: 'gold', shape: 'triangle'}, {color: 'blue', shape: 'square'}
      ],
      options: ["Red and Blue", "Blue only", "Red, Blue, Blue, Blue", "All different"],
      correctAnswer: 2
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  const getShapeSymbol = (shape) => {
    switch(shape) {
      case 'circle': return '●';
      case 'square': return '■';
      case 'triangle': return '▲';
      default: return '●';
    }
  };
  
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
      <BackButton onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </BackButton>
      
      {!quizCompleted ? (
        <>
          <QuizHeader>
            <h1>Visual Perception Quiz</h1>
            <p>
              This quiz assesses your visual processing and pattern recognition skills.
              Study each visual pattern carefully.
            </p>
          </QuizHeader>
          
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
              background: 'linear-gradient(90deg, #00BCD4, #26C6DA)',
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
            
            <VisualGrid>
              {currentQuestion.visual.map((item, index) => (
                <VisualItem key={index} bg={item.color}>
                  {getShapeSymbol(item.shape)}
                </VisualItem>
              ))}
            </VisualGrid>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: answered && index === currentQuestion.correctAnswer ? '#e6f7e6' :
                                   answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#fdeded' : 
                                   selectedOption === index ? '#f0f7ff' : '#f8f9fa',
                    border: `2px solid ${answered && index === currentQuestion.correctAnswer ? '#52c41a' :
                                       answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#ff4d4f' :
                                       selectedOption === index ? '#00BCD4' : 'transparent'}`,
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
                  backgroundColor: selectedOption === null && !answered ? '#ccc' : '#00BCD4',
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
          <h2 style={{ color: '#00BCD4', marginBottom: '20px' }}>Quiz Completed!</h2>
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
              backgroundColor: '#00BCD4',
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

export default VisualPerceptionQuiz;
