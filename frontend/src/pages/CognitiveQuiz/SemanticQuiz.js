import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 20px;
    color: var(--primary-color);
  }
  
  h1 {
    font-size: 2.2rem;
    color: var(--primary-color);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 30px;
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const QuestionCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const QuestionText = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 25px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionItem = styled.div`
  background-color: ${props => 
    props.selected && props.showResult ? (props.correct ? '#e8f5e9' : '#ffebee') :
    props.selected ? '#f1f3f9' : 'white'
  };
  border: 2px solid ${props => 
    props.selected && props.showResult ? (props.correct ? '#4caf50' : '#f44336') : 
    props.selected ? 'var(--primary-color)' : '#e0e0e0'
  };
  border-radius: 10px;
  padding: 15px;
  cursor: ${props => props.showResult ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.showResult ? 'inherit' : '#f9f9f9'};
    transform: ${props => props.showResult ? 'none' : 'translateY(-2px)'};
  }
  
  ${props => props.correct && props.showResult && !props.selected && `
    border: 2px solid #4caf50;
    background-color: #e8f5e9;
  `}
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  
  .option-letter {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props => props.selected ? 'var(--primary-color)' : '#e0e0e0'};
    color: ${props => props.selected ? 'white' : '#666'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .option-text {
    font-size: 1rem;
  }
`;

const FeedbackContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${props => props.isCorrect ? '#e8f5e9' : '#ffebee'};
  
  h3 {
    color: ${props => props.isCorrect ? '#2e7d32' : '#c62828'};
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  p {
    color: #333;
    font-size: 0.95rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(90deg, var(--primary-color), var(--secondary-color))' : 
    'none'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  border: ${props => props.primary ? 'none' : '2px solid var(--primary-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.primary ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none'};
    background: ${props => !props.primary ? 'var(--primary-color)' : ''};
    color: ${props => !props.primary ? 'white' : ''};
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    border: none;
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  
  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .score {
    font-size: 3.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 30px 0;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

// Sample questions for the semantic memory quiz
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 2,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "Romeo and Juliet is a tragedy written by William Shakespeare early in his career."
  },
  {
    id: 3,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is often called the 'Red Planet' because of its reddish appearance in the sky due to iron oxide (rust) on its surface."
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gl", "Au", "Ag"],
    correctAnswer: "Au",
    explanation: "The chemical symbol Au comes from the Latin word for gold, 'aurum'."
  },
  {
    id: 5,
    question: "Which of these animals is a mammal?",
    options: ["Crocodile", "Penguin", "Dolphin", "Lizard"],
    correctAnswer: "Dolphin",
    explanation: "Dolphins are marine mammals that are closely related to whales and porpoises."
  }
];

const SemanticQuiz = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };
  
  const handleCheckAnswer = () => {
    setShowResult(true);
    
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz finished
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    setQuizFinished(true);
    
    // Send results to backend
    sendResultsToBackend();
  };
  
  const sendResultsToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/semantic', {
        score,
        totalQuestions: questions.length
      });
      
      console.log('Quiz results submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };
  
  // Calculate progress percentage
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <QuizContainer>
      <QuizHeader>
        <button onClick={onBack}>←</button>
        <h1>Semantic Memory Quiz</h1>
      </QuizHeader>
      
      {!quizFinished ? (
        <>
          <ProgressBar>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </ProgressBar>
          
          <div style={{ marginBottom: '20px' }}>
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          
          <QuestionCard
            key={questions[currentQuestionIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
            
            <OptionsList>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <OptionItem 
                  key={index} 
                  selected={selectedAnswer === option}
                  correct={option === questions[currentQuestionIndex].correctAnswer}
                  showResult={showResult}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <OptionContent selected={selectedAnswer === option}>
                    <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                    <div className="option-text">{option}</div>
                  </OptionContent>
                </OptionItem>
              ))}
            </OptionsList>
            
            {showResult && (
              <FeedbackContainer 
                isCorrect={selectedAnswer === questions[currentQuestionIndex].correctAnswer}
              >
                <h3>
                  {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 
                    "Correct!" : "Incorrect!"}
                </h3>
                <p>{questions[currentQuestionIndex].explanation}</p>
              </FeedbackContainer>
            )}
          </QuestionCard>
          
          <ActionButtons>
            {!showResult ? (
              <Button 
                primary 
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
              >
                Check Answer
              </Button>
            ) : (
              <Button primary onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </ActionButtons>
        </>
      ) : (
        <QuestionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultsContainer>
            <h2>Quiz Results</h2>
            <div className="score">{score} / {questions.length}</div>
            <p>
              {score === questions.length ? 
                "Excellent! You have exceptional semantic memory." :
                score >= Math.floor(questions.length * 0.7) ?
                "Good job! You have a strong semantic memory." :
                score >= Math.floor(questions.length * 0.5) ?
                "Not bad. With a bit more practice, your semantic memory will improve." :
                "Your semantic memory needs some work. Regular practice can help improve it."}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Button onClick={onBack}>Back to Quizzes</Button>
              <Button primary onClick={restartQuiz}>Try Again</Button>
            </div>
          </ResultsContainer>
        </QuestionCard>
      )}
    </QuizContainer>
  );
};

export default SemanticQuiz;
