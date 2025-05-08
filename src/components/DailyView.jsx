import { useState } from 'react';
import Quiz from './Quiz';
import Flashcard from './Flashcard';
import WritingTask from './WritingTask';
import SpeakingTask from './SpeakingTask';
import { Progress } from '@radix-ui/react-progress';
import { Trophy, BookOpen, PenTool, Mic, Star, Sparkles } from 'lucide-react';

function DailyView({ day, content, onComplete }) {
  const [currentSection, setCurrentSection] = useState('summary');
  const [xp, setXp] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);

  const handleSectionComplete = (section) => {
    setCompletedSections([...completedSections, section]);
    setXp(xp + 100);
    if (completedSections.length === 4) {
      onComplete();
    }
  };

  const sections = [
    { id: 'summary', title: 'Summary', icon: BookOpen, emoji: '📚' },
    { id: 'quiz', title: 'Quiz', icon: Trophy, emoji: '🧠' },
    { id: 'flashcards', title: 'Flashcards', icon: Star, emoji: '⭐' },
    { id: 'writing', title: 'Writing', icon: PenTool, emoji: '✍️' },
    { id: 'speaking', title: 'Speaking', icon: Mic, emoji: '🗣️' },
  ];

  const getGradientClass = (day) => {
    const gradients = [
      'from-blue-50 to-indigo-50',
      'from-purple-50 to-pink-50',
      'from-green-50 to-teal-50',
      'from-yellow-50 to-orange-50',
      'from-red-50 to-pink-50',
    ];
    return gradients[(day - 1) % gradients.length];
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getGradientClass(day)} dark:from-gray-900 dark:to-gray-800`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Day {day} <span className="animate-bounce inline-block">🎯</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let's make today count!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Daily Progress</h2>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{xp} XP</span>
          </div>
          <Progress value={(completedSections.length / 5) * 100} className="h-2" />
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 space-x-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isCompleted = completedSections.includes(section.id);
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : isCompleted
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{section.emoji}</span>
                <span>{section.title}</span>
                {isCompleted && (
                  <span className="ml-1 text-green-500 animate-bounce">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {currentSection === 'summary' && (
            <div className="card">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Day {day}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.summary}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCurrentSection('quiz')}
                  className="btn-primary"
                >
                  Start Learning →
                </button>
              </div>
            </div>
          )}

          {currentSection === 'quiz' && (
            <Quiz
              questions={content.quiz}
              onComplete={() => handleSectionComplete('quiz')}
            />
          )}

          {currentSection === 'flashcards' && (
            <Flashcard
              flashcards={content.flashcards}
              onComplete={() => handleSectionComplete('flashcards')}
            />
          )}

          {currentSection === 'writing' && (
            <WritingTask
              task={content.writing}
              onComplete={() => handleSectionComplete('writing')}
            />
          )}

          {currentSection === 'speaking' && (
            <SpeakingTask
              task={content.speaking}
              onComplete={() => handleSectionComplete('speaking')}
            />
          )}
        </div>

        {/* Motivation Message */}
        {completedSections.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h3 className="text-lg font-semibold">Daily Motivation</h3>
            </div>
            <p className="text-lg font-medium">{content.motivation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyView; 