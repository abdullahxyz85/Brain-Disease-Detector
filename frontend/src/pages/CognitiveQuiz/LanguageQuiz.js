import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.2rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.05rem;
  }
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

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f1f3f5;
  border-radius: 5px;
  margin-bottom: 40px;
  overflow: hidden;
  
  .fill {
    height: 100%;
    background: linear-gradient(90deg, #3F51B5, #5C6BC0);
    width: ${({ progress }) => `${progress}%`};
    transition: width 0.5s ease;
  }
`;

const QuestionCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 25px;
`;

const LanguageQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Choose the word that best completes the sentence:",
      sentence: "The scientist's hypothesis was _____ by the experimental results.",
      options: [
        "supported",
        "complained", 
        "attacked",
        "ignored"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "What does the word 'ubiquitous' mean?",
      options: [
        "Very rare or unusual",
        "Present everywhere at once",
        "Extremely dangerous",
        "Difficult to understand"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Choose the word that is most similar in meaning to 'meticulous':",
      options: [
        "Careless",
        "Hurried",
        "Careful",
        "Expensive"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "Complete the analogy: Book is to Library as Painting is to ___",
      options: [
        "Frame",
        "Museum",
        "Artist",
        "Canvas"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "What does the phrase 'break the ice' mean?",
      options: [
        "To damage something frozen",
        "To start a conversation in a friendly way",
        "To work very hard",
        "To make someone angry"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      text: "Choose the word that is opposite in meaning to 'abundant':",
      options: [
        "Plentiful",
        "Scarce",
        "Multiple",
        "Generous"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "Which word best fits the context: 'The _____ student always submitted assignments on time.'",
      options: [
        "negligent",
        "diligent",
        "absent",
        "confused"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "What is the correct definition of 'eloquent'?",
      options: [
        "Unable to speak clearly",
        "Speaking fluently and persuasively",
        "Very quiet and shy",
        "Angry and hostile"
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
  const [assessment, setAssessment] = useState(null);
  
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
  
  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    setTimeSpent(timeElapsed);
    sendResults(timeElapsed);
    setQuizCompleted(true);
  };
  
  const sendResults = async (timeElapsed) => {
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/submit', {
        score: Math.round((score / questions.length) * 100),
        category: 'language',
        answeredQuestions: questions.length,
        correctAnswers: score,
        timeSpent: timeElapsed
      });
      setAssessment(response.data);
    } catch (error) {
      console.error('Error sending quiz results:', error);
      
      const simulatedAssessment = {
        cognitive_score: Math.round((score / questions.length) * 85),
        accuracy: Math.round((score / questions.length) * 100),
        assessment: "Your language and vocabulary skills are functioning well.",
        recommendations: [
          "Read diverse materials to expand vocabulary",
          "Practice using new words in conversation",
          "Try crossword puzzles and word games"
        ]
      };
      setAssessment(simulatedAssessment);
    }
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
            <h1>Language & Vocabulary Quiz</h1>
            <p>
              This quiz evaluates your language comprehension and vocabulary skills.
              Choose the best answer for each question.
            </p>
          </QuizHeader>
          
          <ProgressBar progress={progress}>
            <div className="fill"></div>
          </ProgressBar>
          
          <QuestionCard
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Question>{currentQuestion.text}</Question>
            
            {currentQuestion.sentence && (
              <div style={{
                background: '#f8f9fa',
                borderLeft: '4px solid #3F51B5',
                padding: '20px',
                margin: '20px 0',
                borderRadius: '8px',
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}>
                "{currentQuestion.sentence}"
              </div>
            )}
            
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
                                       selectedOption === index ? 'var(--primary-color)' : 'transparent'}`,
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
                  {answered && index !== currentQuestion.correctAnswer && selectedOption === index && (
                    <span style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#ff4d4f',
                      fontWeight: 'bold'
                    }}>✗</span>
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
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleSkipQuestion}
                disabled={answered && currentQuestionIndex === questions.length - 1}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Skip & Finish' : 'Skip Question'}
              </button>
              
              <button
                style={{
                  padding: '12px 25px',
                  backgroundColor: selectedOption === null && !answered ? '#ccc' : '#3F51B5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: selectedOption === null && !answered ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleNextQuestion}
                disabled={selectedOption === null && !answered}
              >
                {answered ? 
                  (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 
                  'Check Answer'}
              </button>
            </div>
          </QuestionCard>
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
          <h2 style={{ color: '#3F51B5', marginBottom: '20px' }}>Quiz Completed!</h2>
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
          
          {assessment && (
            <div style={{
              background: '#f8f9fa',
              borderRadius: '10px',
              padding: '20px',
              margin: '30px 0',
              textAlign: 'left'
            }}>
              <h3>Language Assessment</h3>
              <p>{assessment.assessment}</p>
              
              <h3>Recommendations</h3>
              {assessment.recommendations.map((recommendation, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <svg style={{ color: '#3F51B5', minWidth: '24px', marginRight: '10px', marginTop: '2px' }} 
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>
          )}
          
          <button
            style={{
              padding: '12px 25px',
              backgroundColor: '#3F51B5',
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

export default LanguageQuiz;
