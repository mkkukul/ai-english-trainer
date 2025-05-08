import { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Flashcard from './Flashcard';
import WritingTask from './WritingTask';
import SpeakingTask from './SpeakingTask';

function DailyView() {
  const [dailyData, setDailyData] = useState(null);
  const [currentSection, setCurrentSection] = useState('summary');
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // İlk günün verisini yükle
    fetch('/src/data/day01.json')
      .then(response => response.json())
      .then(data => setDailyData(data))
      .catch(error => console.error('Error loading daily data:', error));
  }, []);

  if (!dailyData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'summary':
        return (
          <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">📘 {dailyData.topic}</h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center">{dailyData.summary}</p>
          </div>
        );
      case 'quiz':
        return <Quiz questions={dailyData.quiz} onComplete={() => setXp(prev => prev + 10)} />;
      case 'flashcards':
        return <Flashcard cards={dailyData.flashcards} />;
      case 'writing':
        return <WritingTask task={dailyData.writing} />;
      case 'speaking':
        return <SpeakingTask task={dailyData.speaking} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-blue-600">Day {dailyData.day}</h1>
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            <button
              onClick={() => setCurrentSection('summary')}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentSection === 'summary' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              📘 Summary
            </button>
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentSection === 'quiz' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              🧠 Quiz
            </button>
            <button
              onClick={() => setCurrentSection('flashcards')}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentSection === 'flashcards' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              🧾 Flashcards
            </button>
            <button
              onClick={() => setCurrentSection('writing')}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentSection === 'writing' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              ✍️ Writing
            </button>
            <button
              onClick={() => setCurrentSection('speaking')}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentSection === 'speaking' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-blue-500 hover:bg-blue-50'
              }`}
            >
              🗣️ Speaking
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          {renderSection()}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-xl font-bold text-blue-600">XP: {xp}</span>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-lg">{dailyData.motivation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyView; 