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
    background: linear-gradient(90deg, #FF9800, #FFB74D);
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

const AttentionTask = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  max-width: 400px;
  margin: 30px auto;
`;

const AttentionItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.color || '#333'};
  background: white;
  border-radius: 8px;
  border: 2px solid ${props => props.highlight ? '#FF9800' : '#ddd'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Timer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #FF9800;
  margin: 20px 0;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionItem = styled.div`
  background-color: ${({ selected, isCorrect, isWrong, answered }) => 
    answered && isCorrect ? '#e6f7e6' :
    answered && isWrong && selected ? '#fdeded' : 
    selected ? '#f0f7ff' : '#f8f9fa'
  };
  border: 2px solid ${({ selected, isCorrect, isWrong, answered }) => 
    answered && isCorrect ? '#52c41a' :
    answered && isWrong && selected ? '#ff4d4f' :
    selected ? 'var(--primary-color)' : 'transparent'
  };
  border-radius: 10px;
  padding: 15px 20px;
  cursor: ${({ answered }) => answered ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: ${({ answered }) => answered ? null : '#f1f3f5'};
  }
  
  ${({ answered, isCorrect }) => answered && isCorrect ? `
    &::after {
      content: '✓';
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #52c41a;
      font-weight: bold;
    }
  ` : ''}
  
  ${({ answered, isWrong, selected }) => answered && isWrong && selected ? `
    &::after {
      content: '✗';
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #ff4d4f;
      font-weight: bold;
    }
  ` : ''}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: ${({ secondary }) => (secondary ? '#f1f3f5' : '#FF9800')};
  color: ${({ secondary }) => (secondary ? 'var(--text-color)' : 'white')};
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  
  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-3px)')};
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.1)')};
    background-color: ${({ secondary, disabled }) => 
      disabled ? (secondary ? '#f1f3f5' : '#FF9800') :
      secondary ? '#e9ecef' : '#F57C00'
    };
  }
`;

const ResultCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const AttentionQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Count how many times the letter 'A' appears in this grid:",
      type: "attention",
      grid: ['A', 'B', 'A', 'C', 'D', 'A', 'E', 'F', 'G', 'A', 'H', 'I', 'J', 'A', 'K', 'L'],
      question: "How many A's did you count?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2
    },
    {
      id: 2,
      text: "Find all the red letters in this sequence:",
      type: "color-attention",
      colorItems: [
        {letter: 'X', color: 'blue'},
        {letter: 'Y', color: 'red'},
        {letter: 'Z', color: 'green'},
        {letter: 'A', color: 'red'},
        {letter: 'B', color: 'blue'},
        {letter: 'C', color: 'red'},
        {letter: 'D', color: 'green'},
        {letter: 'E', color: 'red'}
      ],
      question: "How many red letters are there?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Pay attention to the numbers. Count how many odd numbers appear:",
      type: "number-attention",
      numbers: [2, 7, 4, 9, 6, 3, 8, 1, 5, 10, 11, 12, 13, 14, 15, 16],
      question: "How many odd numbers did you count?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "Focus on the symbols. Count the triangles (△):",
      type: "symbol-attention",
      symbols: ['○', '△', '□', '△', '○', '△', '□', '△', '○', '△', '□', '○', '△', '□', '○', '△'],
      question: "How many triangles (△) are there?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "Look for the pattern. Count items that appear exactly 3 times:",
      type: "pattern-attention",
      pattern: ['A', 'B', 'C', 'A', 'D', 'B', 'C', 'A', 'E', 'D', 'B', 'F', 'E', 'D', 'F', 'E'],
      question: "How many different letters appear exactly 3 times?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1
    },
    {
      id: 6,
      text: "Selective attention: Count only the uppercase letters:",
      type: "case-attention",
      mixedCase: ['a', 'B', 'c', 'D', 'e', 'F', 'g', 'H', 'i', 'J', 'k', 'L', 'm', 'N', 'o', 'P'],
      question: "How many uppercase letters are there?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2
    },
    {
      id: 7,
      text: "Visual attention: Count the items that are both letters AND vowels:",
      type: "vowel-attention",
      letters: ['B', 'A', 'C', 'E', 'F', 'I', 'G', 'O', 'H', 'U', 'J', 'K', 'A', 'L', 'E', 'M'],
      question: "How many vowels (A, E, I, O, U) are in the sequence?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2
    },
    {
      id: 8,
      text: "Sustained attention: Count the consecutive pairs of identical items:",
      type: "consecutive-attention",
      sequence: ['X', 'X', 'Y', 'Z', 'Z', 'A', 'B', 'B', 'C', 'C', 'D', 'E', 'F', 'F', 'G', 'H'],
      question: "How many consecutive identical pairs are there?",
      options: ["3", "4", "5", "6"],
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
  const [taskTime, setTaskTime] = useState(30);
  const [showTask, setShowTask] = useState(true);
  
  // Start timer when quiz begins
  useEffect(() => {
    setStartTime(Date.now());
  }, []);
  
  // Task display timer
  useEffect(() => {
    if (showTask && taskTime > 0) {
      const timer = setTimeout(() => {
        setTaskTime(taskTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (taskTime === 0) {
      setShowTask(false);
    }
  }, [showTask, taskTime]);
  
  // Reset task display for new questions
  useEffect(() => {
    setShowTask(true);
    setTaskTime(30);
  }, [currentQuestionIndex]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  const handleSelectOption = (index) => {
    if (answered || showTask) return;
    setSelectedOption(index);
  };
  
  const handleNextQuestion = () => {
    if (showTask) return;
    
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
    if (showTask) {
      setShowTask(false);
      setTaskTime(0);
      return;
    }
    
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
        category: 'attention',
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
        assessment: "Your attention and focus abilities are functioning well.",
        recommendations: [
          "Practice mindfulness meditation to improve sustained attention",
          "Try attention training exercises daily",
          "Minimize distractions during focused work"
        ]
      };
      setAssessment(simulatedAssessment);
    }
  };
  
  const renderTaskContent = () => {
    switch (currentQuestion.type) {
      case 'attention':
        return (
          <AttentionTask>
            {currentQuestion.grid.map((item, index) => (
              <AttentionItem key={index} highlight={item === 'A'}>
                {item}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'color-attention':
        return (
          <AttentionTask>
            {currentQuestion.colorItems.map((item, index) => (
              <AttentionItem key={index} color={item.color}>
                {item.letter}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'number-attention':
        return (
          <AttentionTask>
            {currentQuestion.numbers.map((number, index) => (
              <AttentionItem key={index} highlight={number % 2 === 1}>
                {number}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'symbol-attention':
        return (
          <AttentionTask>
            {currentQuestion.symbols.map((symbol, index) => (
              <AttentionItem key={index} highlight={symbol === '△'}>
                {symbol}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'pattern-attention':
        return (
          <AttentionTask>
            {currentQuestion.pattern.map((item, index) => (
              <AttentionItem key={index}>
                {item}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'case-attention':
        return (
          <AttentionTask>
            {currentQuestion.mixedCase.map((letter, index) => (
              <AttentionItem key={index} highlight={letter === letter.toUpperCase()}>
                {letter}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'vowel-attention':
        return (
          <AttentionTask>
            {currentQuestion.letters.map((letter, index) => (
              <AttentionItem key={index} highlight={['A', 'E', 'I', 'O', 'U'].includes(letter)}>
                {letter}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      case 'consecutive-attention':
        return (
          <AttentionTask>
            {currentQuestion.sequence.map((item, index) => (
              <AttentionItem 
                key={index} 
                highlight={index > 0 && currentQuestion.sequence[index] === currentQuestion.sequence[index - 1]}
              >
                {item}
              </AttentionItem>
            ))}
          </AttentionTask>
        );
      
      default:
        return null;
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
            <h1>Attention & Focus Quiz</h1>
            <p>
              This quiz measures your sustained attention and concentration abilities.
              Study each task carefully and answer the questions that follow.
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
            
            {showTask ? (
              <div>
                {renderTaskContent()}
                <Timer>Time remaining: {taskTime} seconds</Timer>
                <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                  Study the items carefully. You'll need to answer a question about them.
                </div>
              </div>
            ) : (
              <>
                <Question style={{ fontSize: '1.2rem', marginTop: '20px' }}>
                  {currentQuestion.question}
                </Question>
                
                <OptionsList>
                  {currentQuestion.options.map((option, index) => (
                    <OptionItem 
                      key={index}
                      selected={selectedOption === index}
                      answered={answered}
                      isCorrect={answered && index === currentQuestion.correctAnswer}
                      isWrong={answered && index !== currentQuestion.correctAnswer}
                      onClick={() => handleSelectOption(index)}
                    >
                      {option}
                    </OptionItem>
                  ))}
                </OptionsList>
              </>
            )}
            
            <ButtonContainer>
              <Button 
                secondary 
                onClick={handleSkipQuestion}
                disabled={answered && currentQuestionIndex === questions.length - 1}
              >
                {showTask ? 'Skip Task' : 
                 (currentQuestionIndex === questions.length - 1 ? 'Skip & Finish' : 'Skip Question')}
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={showTask || (selectedOption === null && !answered)}
              >
                {answered ? 
                  (currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 
                  'Check Answer'}
              </Button>
            </ButtonContainer>
          </QuestionCard>
        </>
      ) : (
        <ResultCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ color: '#FF9800', marginBottom: '20px' }}>Quiz Completed!</h2>
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
              <h3>Attention Assessment</h3>
              <p>{assessment.assessment}</p>
              
              <h3>Recommendations</h3>
              {assessment.recommendations.map((recommendation, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <svg style={{ color: '#FF9800', minWidth: '24px', marginRight: '10px', marginTop: '2px' }} 
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>
          )}
          
          <Button onClick={onBack}>Back to Quizzes</Button>
        </ResultCard>
      )}
    </QuizContainer>
  );
};

export default AttentionQuiz;
