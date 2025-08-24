import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Timer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFC107;
  margin: 20px 0;
`;

const ProcessingSpeedQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Count how many times the letter 'A' appears: A B C A D E A F G A H I A",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      timeLimit: 10
    },
    {
      id: 2,
      text: "Add these numbers quickly: 7 + 9 + 12 + 6",
      options: ["32", "34", "36", "38"],
      correctAnswer: 1,
      timeLimit: 8
    },
    {
      id: 3,
      text: "Which word is spelled incorrectly: HOUSE, CAAR, TREE, BOOK",
      options: ["HOUSE", "CAAR", "TREE", "BOOK"],
      correctAnswer: 1,
      timeLimit: 6
    },
    {
      id: 4,
      text: "Count backwards from 20 to 15. How many numbers is that?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      timeLimit: 8
    },
    {
      id: 5,
      text: "What's the next letter in the alphabet after 'M'?",
      options: ["L", "N", "O", "P"],
      correctAnswer: 1,
      timeLimit: 5
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalTime, setTotalTime] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  // Timer effect
  useEffect(() => {
    if (!answered && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
        setTotalTime(prevTotal => prevTotal + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      // Time's up, move to next question
      handleNextQuestion();
    }
  }, [timeLeft, answered, quizCompleted, handleNextQuestion]);
  
  // Reset timer for new questions
  useEffect(() => {
    setTimeLeft(currentQuestion.timeLimit);
  }, [currentQuestionIndex, currentQuestion.timeLimit]);
  
  const handleSelectOption = (index) => {
    if (answered) return;
    setSelectedOption(index);
  };
  
  const handleNextQuestion = useCallback(() => {
    if (!answered) {
      // Check answer or mark as incorrect if time ran out
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      setAnswered(true);
      return;
    }
    
    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  }, [answered, selectedOption, currentQuestion, currentQuestionIndex, questions.length]);
  
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
            <h1 style={{ fontSize: '2.2rem', color: '#FFC107', marginBottom: '15px' }}>Processing Speed Quiz</h1>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Answer quickly! Each question has a time limit.
            </p>
          </div>
          
          <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f3f5', borderRadius: '5px', marginBottom: '40px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFC107, #FFD54F)', width: `${progress}%`, transition: 'width 0.5s ease' }}></div>
          </div>
          
          <Timer>⏰ Time left: {timeLeft} seconds</Timer>
          
          <motion.div
            style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)', marginBottom: '30px' }}
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', marginBottom: '25px' }}>{currentQuestion.text}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} style={{
                  backgroundColor: answered && index === currentQuestion.correctAnswer ? '#e6f7e6' :
                                 answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#fdeded' : 
                                 selectedOption === index ? '#fff3e0' : '#f8f9fa',
                  border: `2px solid ${answered && index === currentQuestion.correctAnswer ? '#52c41a' :
                                     answered && index !== currentQuestion.correctAnswer && selectedOption === index ? '#ff4d4f' :
                                     selectedOption === index ? '#FFC107' : 'transparent'}`,
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
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button style={{ 
                padding: '12px 25px', 
                backgroundColor: selectedOption === null && !answered ? '#ccc' : '#FFC107', 
                color: selectedOption === null && !answered ? '#666' : 'white', 
                border: 'none', borderRadius: '50px', fontWeight: '600', 
                cursor: selectedOption === null && !answered ? 'not-allowed' : 'pointer',
                fontSize: '1rem'
              }}
                onClick={handleNextQuestion} disabled={selectedOption === null && !answered}>
                {answered ? (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 'Submit Answer'}
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 style={{ color: '#FFC107', marginBottom: '20px' }}>Quiz Completed!</h2>
          <div style={{ color: '#666', marginBottom: '20px' }}>
            You answered {score} out of {questions.length} questions correctly.<br/>
            Total time: {Math.floor(totalTime / 60)}m {totalTime % 60}s
          </div>
          <div style={{ fontSize: '4rem', fontWeight: '700', color: score >= 4 ? '#52c41a' : score >= 3 ? '#faad14' : '#ff4d4f', margin: '30px 0' }}>
            {Math.round((score / questions.length) * 100)}%
          </div>
          <button style={{ padding: '12px 25px', backgroundColor: '#FFC107', color: 'white', border: 'none', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }} onClick={onBack}>
            Back to Quizzes
          </button>
        </motion.div>
      )}
    </QuizContainer>
  );
};

export default ProcessingSpeedQuiz;
