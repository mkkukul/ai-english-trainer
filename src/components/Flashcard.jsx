import { useState } from 'react';

function Flashcard({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          ←
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={handleNext}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          →
        </button>
      </div>

      <div
        className="relative h-64 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-blue-500 text-white p-6 rounded-lg h-full flex items-center justify-center">
            <h3 className="text-2xl font-bold">{cards[currentIndex].word}</h3>
          </div>
        </div>
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform ${
            isFlipped ? '' : 'rotate-y-180'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-green-500 text-white p-6 rounded-lg h-full flex items-center justify-center">
            <p className="text-xl">{cards[currentIndex].example}</p>
          </div>
        </div>
      </div>

      <p className="text-center mt-4 text-gray-600">
        Click to flip the card
      </p>
    </div>
  );
}

export default Flashcard; 