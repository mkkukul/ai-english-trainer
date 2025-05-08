import { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { shuffle } from 'lodash';

function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffle([...questions]));
  }, [questions]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
      onComplete();
    }
  };

  const getEmoji = (score) => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return '🎉';
    if (percentage >= 70) return '😊';
    if (percentage >= 50) return '👍';
    return '💪';
  };

  const getMessage = (score) => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return 'Outstanding! You\'re a star!';
    if (percentage >= 70) return 'Great job! Keep up the good work!';
    if (percentage >= 50) return 'Good effort! You\'re getting there!';
    return 'Keep practicing! You\'ll get better!';
  };

  if (showResult) {
    return (
      <div className="card text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete! {getEmoji(score)}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{getMessage(score)}</p>
        </div>

        <div className="mb-8">
          <p className="text-2xl mb-4">Your score: {score}/{shuffledQuestions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(score / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setSelectedAnswer('');
            setShuffledQuestions(shuffle([...questions]));
          }}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold">Question {currentQuestion + 1}/{shuffledQuestions.length}</h2>
          </div>
          <span className="text-blue-500 font-semibold">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="text-xl mb-8">{shuffledQuestions[currentQuestion].question}</p>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        {shuffledQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer}
            className={`w-full p-4 text-center rounded-lg transition-all duration-300 transform hover:scale-102 ${
              selectedAnswer
                ? option === shuffledQuestions[currentQuestion].answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : option === selectedAnswer
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {selectedAnswer && option === shuffledQuestions[currentQuestion].answer && (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
              {selectedAnswer && option === selectedAnswer && option !== shuffledQuestions[currentQuestion].answer && (
                <XCircle className="w-5 h-5 text-white" />
              )}
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentQuestion < shuffledQuestions.length - 1 ? (
              <>
                Next Question <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'Finish Quiz 🎯'
            )}
          </button>
        </div>
      )}

      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz; 