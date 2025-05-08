import { useState } from 'react';

function Quiz({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
      onComplete();
    }
  };

  const getEmoji = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🎉';
    if (percentage >= 70) return '😊';
    if (percentage >= 50) return '👍';
    return '💪';
  };

  if (showResult) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Quiz Complete! {getEmoji(score)}</h2>
        <div className="mb-8">
          <p className="text-2xl mb-4">Your score: {score}/{questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setSelectedAnswer('');
          }}
          className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto text-center">
      <div className="mb-6">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}/{questions.length}</h2>
          <span className="text-blue-500 font-semibold">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="text-xl mb-8">{questions[currentQuestion].question}</p>
      
      <div className="space-y-4 max-w-2xl mx-auto">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`w-full p-4 text-center rounded-lg transition-all duration-300 transform hover:scale-102 ${
              selectedAnswer === option
                ? option === questions[currentQuestion].answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-8">
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎯'}
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