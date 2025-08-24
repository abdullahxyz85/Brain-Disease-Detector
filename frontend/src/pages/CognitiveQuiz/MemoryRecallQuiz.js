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
    background: linear-gradient(90deg, #FF5722, #FF7043);
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

const MemoryText = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #FF5722;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  font-size: 1.1rem;
  line-height: 1.6;
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
  background-color: ${({ secondary }) => (secondary ? '#f1f3f5' : '#FF5722')};
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
      disabled ? (secondary ? '#f1f3f5' : '#FF5722') :
      secondary ? '#e9ecef' : '#E64A19'
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
  color: #FF5722;
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
      color: #FF5722;
      min-width: 24px;
      margin-right: 10px;
      margin-top: 2px;
    }
  }
`;

const MemoryRecallQuiz = ({ onBack }) => {
  const [questions] = useState([
    {
      id: 1,
      text: "Study this shopping list carefully for 30 seconds, then answer the question that follows:",
      memoryText: "Shopping List:\n• Bananas\n• Whole wheat bread\n• Greek yogurt\n• Chicken breast\n• Spinach\n• Olive oil\n• Red bell peppers\n• Almonds",
      question: "Which of these items was NOT on the shopping list?",
      options: [
        "Greek yogurt",
        "Carrots",
        "Spinach",
        "Almonds"
      ],
      correctAnswer: 1,
      type: "memory"
    },
    {
      id: 2,
      text: "Remember this sequence of events for the next question:",
      memoryText: "Timeline:\n1. John woke up at 7:00 AM\n2. He had coffee and toast for breakfast\n3. He walked his dog in the park\n4. He drove to work at 8:30 AM\n5. He attended a meeting at 10:00 AM\n6. He had lunch with Sarah at 12:30 PM",
      question: "What time did John drive to work?",
      options: [
        "7:30 AM",
        "8:00 AM",
        "8:30 AM",
        "9:00 AM"
      ],
      correctAnswer: 2,
      type: "memory"
    },
    {
      id: 3,
      text: "Study these details about a person:",
      memoryText: "Person Profile:\n• Name: Maria Rodriguez\n• Age: 34 years old\n• Occupation: Software Engineer\n• City: Portland, Oregon\n• Hobby: Rock climbing\n• Pet: Golden Retriever named Max\n• Favorite color: Turquoise",
      question: "What is Maria's pet's name?",
      options: [
        "Buddy",
        "Max",
        "Charlie",
        "Rocky"
      ],
      correctAnswer: 1,
      type: "memory"
    },
    {
      id: 4,
      text: "Memorize this phone conversation:",
      memoryText: "Phone Call Summary:\nCaller: Dr. Smith's office\nPurpose: Appointment reminder\nDate: Thursday, March 15th\nTime: 2:30 PM\nLocation: Medical Center, Room 205\nNote: Please bring insurance card and ID",
      question: "What room number is the appointment in?",
      options: [
        "203",
        "204",
        "205",
        "206"
      ],
      correctAnswer: 2,
      type: "memory"
    },
    {
      id: 5,
      text: "Study this recipe's ingredients:",
      memoryText: "Chocolate Chip Cookies:\n• 2 cups all-purpose flour\n• 1 cup butter\n• 3/4 cup brown sugar\n• 1/2 cup white sugar\n• 2 eggs\n• 1 tsp vanilla extract\n• 1 tsp baking soda\n• 1 cup chocolate chips",
      question: "How much brown sugar is needed?",
      options: [
        "1/2 cup",
        "2/3 cup",
        "3/4 cup",
        "1 cup"
      ],
      correctAnswer: 2,
      type: "memory"
    },
    {
      id: 6,
      text: "Remember these travel details:",
      memoryText: "Flight Information:\n• Flight Number: AA 1247\n• Departure: New York (JFK)\n• Arrival: Los Angeles (LAX)\n• Departure Time: 6:45 AM\n• Arrival Time: 10:15 AM (local time)\n• Gate: B23\n• Seat: 14A",
      question: "What is the departure gate?",
      options: [
        "B21",
        "B22",
        "B23",
        "B24"
      ],
      correctAnswer: 2,
      type: "memory"
    },
    {
      id: 7,
      text: "Study this family tree information:",
      memoryText: "Family Tree:\n• Robert (grandfather) married to Helen\n• Their children: Michael, Susan, and David\n• Michael married to Jennifer, has son Tom\n• Susan married to Paul, has daughters Lisa and Emma\n• David is unmarried",
      question: "Who are Susan's daughters?",
      options: [
        "Lisa and Jennifer",
        "Emma and Jennifer",
        "Lisa and Emma", 
        "Tom and Lisa"
      ],
      correctAnswer: 2,
      type: "memory"
    },
    {
      id: 8,
      text: "Memorize this daily schedule:",
      memoryText: "Daily Schedule:\n• 6:00 AM - Wake up and exercise\n• 7:30 AM - Shower and breakfast\n• 9:00 AM - Team meeting\n• 11:00 AM - Project work\n• 1:00 PM - Lunch break\n• 2:30 PM - Client call\n• 4:00 PM - Email and admin tasks\n• 6:00 PM - Finish work",
      question: "What time is the client call scheduled?",
      options: [
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM"
      ],
      correctAnswer: 1,
      type: "memory"
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
  const [showMemory, setShowMemory] = useState(true);
  const [memoryTime, setMemoryTime] = useState(30);
  
  // Start timer when quiz begins
  useEffect(() => {
    setStartTime(Date.now());
  }, []);
  
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
    setMemoryTime(30);
  }, [currentQuestionIndex]);
  
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress percentage
  const progress = ((currentQuestionIndex + (answered ? 1 : 0)) / questions.length) * 100;
  
  // Handle option selection
  const handleSelectOption = (index) => {
    if (answered || showMemory) return;
    setSelectedOption(index);
  };
  
  // Check answer and move to next question
  const handleNextQuestion = () => {
    if (showMemory) return;
    
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
    if (showMemory) {
      setShowMemory(false);
      setMemoryTime(0);
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
        category: 'memory-recall',
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
        assessment: "Your memory recall abilities appear to be functioning well.",
        recommendations: [
          "Practice memory exercises regularly",
          "Try reading and summarizing articles",
          "Use memory palace techniques for better retention"
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
            <h1>Memory Recall Quiz</h1>
            <p>
              This quiz evaluates your ability to remember and recall detailed information.
              Study each passage carefully and answer the questions that follow.
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
            
            {showMemory ? (
              <div>
                <MemoryText>
                  {currentQuestion.memoryText.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </MemoryText>
                <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.2rem', color: '#FF5722', fontWeight: 'bold' }}>
                  Time remaining: {memoryTime} seconds
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
                {showMemory ? 'Skip Memory Phase' : 
                 (currentQuestionIndex === questions.length - 1 ? 'Skip & Finish' : 'Skip Question')}
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={showMemory || (selectedOption === null && !answered)}
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
          <div style={{ color: '#666', marginBottom: '20px' }}>
            You answered {score} out of {questions.length} questions correctly.
            Time spent: {formatTime(timeSpent)}
          </div>
          
          <ScoreDisplay score={Math.round((score / questions.length) * 100)}>
            {Math.round((score / questions.length) * 100)}%
          </ScoreDisplay>
          
          {assessment && (
            <AssessmentCard>
              <h3>Memory Assessment</h3>
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

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export default MemoryRecallQuiz;
