import { useState } from 'react';

function WritingTask({ task, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Basit bir geri bildirim sistemi
    const wordCount = answer.trim().split(/\s+/).length;
    if (wordCount < 50) {
      setFeedback('Try to write more! Aim for at least 50 words.');
    } else if (wordCount < 100) {
      setFeedback('Good effort! Try to add more details to your story.');
    } else {
      setFeedback('Excellent! You\'ve written a detailed response.');
      onComplete();
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Writing Task</h2>
      <p className="text-xl mb-8">{task}</p>

      <div className="mb-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
          placeholder="Start writing your story here..."
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          Submit Story
        </button>
        <button
          onClick={() => {
            setAnswer('');
            setFeedback('');
          }}
          className="bg-gray-500 text-white px-8 py-3 rounded-full hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
        >
          Clear
        </button>
      </div>

      {feedback && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg text-blue-700">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default WritingTask; 