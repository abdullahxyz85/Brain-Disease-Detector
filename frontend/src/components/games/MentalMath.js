import { useState } from "react";
import { motion } from "framer-motion";

export default function MentalMathGame() {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);

  function generateQuestion() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  }

  function checkAnswer() {
    if (parseInt(userAnswer) === question.answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! The answer was ${question.answer}`);
    }
    setShowNext(true);
  }

  function nextQuestion() {
    setQuestion(generateQuestion());
    setUserAnswer("");
    setFeedback("");
    setShowNext(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 space-y-6 bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Mental Math Game
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl"
      >
        {question.a} + {question.b} = ?
      </motion.div>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="p-2 border rounded-lg w-32 text-center"
        placeholder="Answer"
      />

      <button
        onClick={checkAnswer}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-2xl shadow-md"
        disabled={showNext}
      >
        Check Answer
      </button>

      {feedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium"
        >
          {feedback}
        </motion.div>
      )}

      {showNext && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={nextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-md"
          >
            Next Question
          </button>
        </motion.div>
      )}
    </div>
  );
}

