import { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';

function WritingTask({ task, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = () => {
    // Here you would typically send the answer to an API for feedback
    // For now, we'll just show a simple feedback message
    setFeedback('Great job! Your answer shows good understanding of the topic. Keep practicing!');
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="card">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Writing Task</h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">{task}</p>
      </div>

      <div className="mb-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full h-48 p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
          disabled={isCompleted}
        />
      </div>

      {!isCompleted && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className={`btn-primary ${
              !answer.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Answer
          </button>
        </div>
      )}

      {feedback && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Feedback</h3>
              <p className="text-green-600">{feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WritingTask; 