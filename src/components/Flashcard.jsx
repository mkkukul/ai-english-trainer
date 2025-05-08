import { useState } from 'react';

function Flashcard({ flashcards, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto text-center">
      <div className="mb-6">
        <div className="flex justify-center items-center space-x-4">
          <h2 className="text-2xl font-bold">Flashcard {currentIndex + 1}/{flashcards.length}</h2>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div
        className="relative w-full max-w-2xl mx-auto h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full backface-hidden bg-blue-50 rounded-xl p-8 flex items-center justify-center">
            <p className="text-3xl font-bold text-blue-600">{flashcards[currentIndex].word}</p>
          </div>
          <div className="absolute w-full h-full backface-hidden bg-green-50 rounded-xl p-8 flex items-center justify-center rotate-y-180">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 mb-4">{flashcards[currentIndex].meaning}</p>
              <p className="text-lg text-gray-600 italic">{flashcards[currentIndex].example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          {isFlipped ? 'Show Word' : 'Show Meaning'}
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
        >
          {currentIndex < flashcards.length - 1 ? 'Next Card →' : 'Complete 🎯'}
        </button>
      </div>
    </div>
  );
}

export default Flashcard; 