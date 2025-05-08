import { useState } from 'react';
import Quiz from './Quiz';
import Flashcard from './Flashcard';
import WritingTask from './WritingTask';
import SpeakingTask from './SpeakingTask';
import { Progress } from '@radix-ui/react-progress';
import { Trophy, BookOpen, PenTool, Mic, Star } from 'lucide-react';

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
    { id: 'summary', title: 'Summary', icon: BookOpen },
    { id: 'quiz', title: 'Quiz', icon: Trophy },
    { id: 'flashcards', title: 'Flashcards', icon: Star },
    { id: 'writing', title: 'Writing', icon: PenTool },
    { id: 'speaking', title: 'Speaking', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Daily Progress</h2>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{xp} XP</span>
          </div>
          <Progress value={(completedSections.length / 5) * 100} className="h-2" />
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 space-x-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.title}</span>
                {completedSections.includes(section.id) && (
                  <span className="ml-1 text-green-500">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {currentSection === 'summary' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Day {day}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.summary}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCurrentSection('quiz')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
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
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
            <p className="text-lg font-medium">{content.motivation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyView; 