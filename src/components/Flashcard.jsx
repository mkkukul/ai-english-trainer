import { useState } from 'react';
import { RotateCcw, Volume2, CheckCircle } from 'lucide-react';

function Flashcard({ word, example, onComplete }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="card">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Flashcard</h2>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="btn-secondary"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Flip Card
        </button>
      </div>

      <div
        className={`relative w-full max-w-2xl mx-auto aspect-[4/3] transition-transform duration-500 transform perspective-1000 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="card h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <button
              onClick={() => speak(word)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <Volume2 className="w-6 h-6 text-blue-500" />
            </button>
            <h3 className="text-4xl font-bold text-center mb-4">{word}</h3>
            <p className="text-gray-600 text-center">Click the speaker icon to hear pronunciation</p>
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="card h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
            <h3 className="text-2xl font-bold text-center mb-4">Example Usage</h3>
            <p className="text-xl text-center mb-8">{example}</p>
            <button
              onClick={() => speak(example)}
              className="btn-secondary"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Listen to Example
            </button>
          </div>
        </div>
      </div>

      {!isCompleted && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleComplete}
            className="btn-primary"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            I've Learned This Word
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcard; 