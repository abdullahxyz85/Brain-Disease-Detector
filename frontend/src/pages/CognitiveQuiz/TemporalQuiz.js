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
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
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
  background-color: ${({ secondary }) => (secondary ? '#f1f3f5' : 'var(--primary-color)')};
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
      disabled ? (secondary ? '#f1f3f5' : 'var(--primary-color)') :
      secondary ? '#e9ecef' : '#3a5a8c'
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

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const ScoreDisplay = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ score }) => 
    score >= 80 ? '#52c41a' :
    score >= 60 ? '#faad14' :
    '#ff4d4f'
  };
  margin: 30px 0;
`;

const ResultSummary = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const AssessmentCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
  
  h3 {
    color: var(--text-color);
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  p {
    color: #666;
    margin-bottom: 15px;
  }
  
  .recommendation {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    
    svg {
      color: var(--primary-color);
      min-width: 24px;
      margin-right: 10px;
      margin-top: 2px;
    }
  }
`;

// This is a template for any quiz type - we'd create specific ones for each cognitive area
const TemporalQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Which day of the week was yesterday?",
      options: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday", 
        "Sunday"
      ],
      correctAnswer: getCurrentDayIndex() === 0 ? 6 : getCurrentDayIndex() - 1
    },
    {
      id: 2,
      text: "What is today's date?",
      options: [
        `${new Date().getDate() - 2}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        `${new Date().getDate() - 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        `${new Date().getDate() + 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        `${new Date().getDate() + 2}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "Which season are we currently in?",
      options: [
        "Spring",
        "Summer",
        "Fall/Autumn",
        "Winter"
      ],
      correctAnswer: getCurrentSeason()
    },
    {
      id: 4,
      text: "How many months have 31 days?",
      options: [
        "5",
        "6",
        "7",
        "8"
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      text: "If today is Wednesday, what day will it be in 9 days?",
      options: [
        "Thursday",
        "Friday", 
        "Saturday",
        "Sunday",
        "Monday"
      ],
      correctAnswer: 4
    },
    {
      id: 6,
      text: "What comes next in this sequence: January, March, May, July, ...?",
      options: [
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      text: "If it's 3:45 PM now, what time was it 5 hours and 30 minutes ago?",
      options: [
        "9:15 AM",
        "10:15 AM", 
        "8:15 AM",
        "11:15 AM",
        "10:15 PM"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "How many days were in the previous month?",
      options: [
        "28",
        "29", 
        "30",
        "31"
      ],
      correctAnswer: getDaysInPreviousMonth() === 28 ? 0 : getDaysInPreviousMonth() === 29 ? 1 : getDaysInPreviousMonth() === 30 ? 2 : 3
    },
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [assessment, setAssessment] = useState(null);
  
  // Start timer when quiz begins
  useEffect(() => {
    setStartTime(Date.now());
  }, []);
  
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress percentage
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  // Handle option selection
  const handleSelectOption = (index) => {
    if (answered) return;
    setSelectedOption(index);
  };
  
  // Check answer and move to next question
  const handleNextQuestion = () => {
    // Can't proceed without selecting an option
    if (selectedOption === null) return;
    
    // If already answered, move to next question
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
    
    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswered(true);
  };
  
  // Skip current question
  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };
  
  // Finish the quiz and calculate results
  const finishQuiz = () => {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000); // in seconds
    setTimeSpent(timeElapsed);
    
    // Send results to backend
    sendResults(timeElapsed);
    
    setQuizCompleted(true);
  };
  
  // Send results to backend and get assessment
  const sendResults = async (timeElapsed) => {
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/submit', {
        score: Math.round((score / questions.length) * 100),
        category: 'temporal',
        answeredQuestions: questions.length,
        correctAnswers: score,
        timeSpent: timeElapsed
      });
      
      setAssessment(response.data);
    } catch (error) {
      console.error('Error sending quiz results:', error);
      
      // Simulate assessment for demonstration
      const simulatedAssessment = {
        cognitive_score: Math.round((score / questions.length) * 85),
        accuracy: Math.round((score / questions.length) * 100),
        assessment: "Your temporal orientation appears to be functioning normally.",
        recommendations: [
          "Continue practicing temporal orientation quizzes",
          "Try activities that strengthen your awareness of time and sequences"
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
            <h1>Temporal Orientation Quiz</h1>
            <p>
              This quiz evaluates your awareness of time, date, and sequence of events.
              Select the best answer for each question.
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
            
            <ButtonContainer>
              <Button 
                secondary 
                onClick={handleSkipQuestion}
                disabled={answered && currentQuestionIndex === questions.length - 1}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Skip & Finish' : 'Skip Question'}
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedOption === null && !answered}
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
          <ResultTitle>Quiz Completed!</ResultTitle>
          <ResultSummary>
            You answered {score} out of {questions.length} questions correctly.
            Time spent: {formatTime(timeSpent)}
          </ResultSummary>
          
          <ScoreDisplay score={Math.round((score / questions.length) * 100)}>
            {Math.round((score / questions.length) * 100)}%
          </ScoreDisplay>
          
          {assessment && (
            <AssessmentCard>
              <h3>Cognitive Assessment</h3>
              <p>{assessment.assessment}</p>
              
              <h3>Recommendations</h3>
              {assessment.recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{recommendation}</span>
                </div>
              ))}
            </AssessmentCard>
          )}
          
          <Button onClick={onBack}>Back to Quizzes</Button>
        </ResultCard>
      )}
    </QuizContainer>
  );
};

// Helper functions for dynamic date-based questions
function getCurrentDayIndex() {
  return new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
}

function getCurrentSeason() {
  const month = new Date().getMonth();
  // Very simplified version - would need to be more sophisticated for real app
  if (month >= 2 && month <= 4) return 0; // Spring
  if (month >= 5 && month <= 7) return 1; // Summer
  if (month >= 8 && month <= 10) return 2; // Fall
  return 3; // Winter
}

function getDaysInPreviousMonth() {
  const date = new Date();
  // Set to last day of previous month
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export default TemporalQuiz;
