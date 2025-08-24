import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const MemoryDisplay = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #8BC34A;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

const WorkingMemoryQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Remember this sequence and then answer: What was the 3rd number?",
      sequence: [7, 3, 9, 2, 5],
      question: "What was the 3rd number in the sequence?",
      options: ["7", "3", "9", "2"],
      correctAnswer: 2
    },
    {
      id: 2,
      text: "Remember these letters and tell us: Which letter came after 'M'?",
      sequence: ['K', 'M', 'R', 'T', 'B'],
      question: "Which letter came immediately after 'M'?",
      options: ["K", "R", "T", "B"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Remember this sequence backwards: What's the last number when reversed?",
      sequence: [4, 8, 1, 6],
      question: "If you reverse the sequence, what's the last number?",
      options: ["4", "8", "1", "6"],
      correctAnswer: 0
    },
    {
      id: 4,
      text: "Add 2 to each number you see, then tell us the sum of all results",
      sequence: [3, 7, 5],
      question: "After adding 2 to each number (3,7,5), what's the sum of all results?",
      options: ["21", "24", "27", "30"],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "Remember these words and count how many start with 'C'",
      sequence: ['CAR', 'DOG', 'CAT', 'BIRD', 'CHAIR'],
      question: "How many words started with the letter 'C'?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showMemory, setShowMemory] = useState(true);
  const [memoryTime, setMemoryTime] = useState(10);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  // Memory display timer
  useEffect(() => {
    if (showMemory && memoryTime > 0) {
      const timer = setTimeout(() => {
        setMemoryTime(memoryTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (memoryTime === 0) {
      setShowMemory(false);
    }
  }, [showMemory, memoryTime]);
  
  // Reset memory display for new questions
  useEffect(() => {
    setShowMemory(true);
    setMemoryTime(10);
  }, [currentQuestionIndex]);
  
  const handleSelectOption = (index) => {
    if (answered || showMemory) return;
    setSelectedOption(index);
  };
  
  const handleNextQuestion = () => {
    if (showMemory) {
      setShowMemory(false);
      setMemoryTime(0);
      return;
    }
    
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
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center',
        color: 'var(--primary-color)', fontWeight: '500', cursor: 'pointer', marginBottom: '20px', padding: '8px 0'
      }}>
        <svg style={{ marginRight: '8px', width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Quizzes
      </button>
      
      {!quizCompleted ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.2rem', color: '#8BC34A', marginBottom: '15px' }}>Working Memory Quiz</h1>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Test your ability to hold and manipulate information mentally. Study each sequence carefully.
            </p>
          </div>
          
          <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f3f5', borderRadius: '5px', marginBottom: '40px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #8BC34A, #9CCC65)', width: `${progress}%`, transition: 'width 0.5s ease' }}></div>
          </div>
          
          <motion.div
            style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)', marginBottom: '30px' }}
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', marginBottom: '25px' }}>{currentQuestion.text}</h2>
            
            {showMemory ? (
              <div>
                <MemoryDisplay>
                  {currentQuestion.sequence.join('  ')}
                </MemoryDisplay>
                <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.2rem', color: '#8BC34A', fontWeight: 'bold' }}>
                  Study time remaining: {memoryTime} seconds
                </div>
                <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                  Memorize this sequence. You'll need to answer a question about it.
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>
                  {currentQuestion.question}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} style={{
                      backgroundColor: answered && index === currentQuestion.correctAnswer ? '#e6f7e6' :
                                     answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#fdeded' : 
                                     selectedOption === index ? '#f1f8e9' : '#f8f9fa',
                      border: `2px solid ${answered && index === currentQuestion.correctAnswer ? '#52c41a' :
                                         answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#ff4d4f' :
                                         selectedOption === index ? '#8BC34A' : 'transparent'}`,
                      borderRadius: '10px', padding: '15px 20px', cursor: answered ? 'default' : 'pointer',
                      transition: 'all 0.2s ease', position: 'relative'
                    }} onClick={() => handleSelectOption(index)}>
                      {option}
                      {answered && index === currentQuestion.correctAnswer && (
                        <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#52c41a', fontWeight: 'bold' }}>✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <button style={{ padding: '12px 25px', backgroundColor: '#f1f3f5', color: 'var(--text-color)', border: 'none', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }}
                onClick={() => {
                  if (showMemory) {
                    setShowMemory(false);
                    setMemoryTime(0);
                  } else if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                    setAnswered(false);
                  } else {
                    setQuizCompleted(true);
                  }
                }}>
                {showMemory ? 'Skip Memory Phase' : 'Skip Question'}
              </button>
              
              <button style={{ 
                padding: '12px 25px', 
                backgroundColor: showMemory || (selectedOption === null && !answered) ? '#ccc' : '#8BC34A', 
                color: 'white', border: 'none', borderRadius: '50px', fontWeight: '600', 
                cursor: showMemory || (selectedOption === null && !answered) ? 'not-allowed' : 'pointer'
              }}
                onClick={handleNextQuestion} disabled={showMemory || (selectedOption === null && !answered)}>
                {showMemory ? 'Continue' : answered ? (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 'Check Answer'}
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 style={{ color: '#8BC34A', marginBottom: '20px' }}>Quiz Completed!</h2>
          <div style={{ color: '#666', marginBottom: '20px' }}>You answered {score} out of {questions.length} questions correctly.</div>
          <div style={{ fontSize: '4rem', fontWeight: '700', color: score >= 4 ? '#52c41a' : score >= 3 ? '#faad14' : '#ff4d4f', margin: '30px 0' }}>
            {Math.round((score / questions.length) * 100)}%
          </div>
          <button style={{ padding: '12px 25px', backgroundColor: '#8BC34A', color: 'white', border: 'none', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }} onClick={onBack}>
            Back to Quizzes
          </button>
        </motion.div>
      )}
    </QuizContainer>
  );
};

export default WorkingMemoryQuiz;
