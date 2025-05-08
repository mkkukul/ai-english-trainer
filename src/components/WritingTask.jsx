import { useState } from 'react';

function WritingTask({ task }) {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">✍️ Writing Task</h2>
      <p className="text-xl mb-8 text-center">{task}</p>
      
      <div className="max-w-2xl mx-auto">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your answer here..."
        />

        {!isSubmitted ? (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2 text-center">Feedback:</h3>
            <p className="text-gray-700 text-center">
              Great effort! Remember to:
              <ul className="list-disc list-inside mt-2">
                <li>Use proper punctuation</li>
                <li>Check your grammar</li>
                <li>Make sure your sentences are complete</li>
              </ul>
            </p>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setAnswer('');
                  setIsSubmitted(false);
                }}
                className="bg-gray-500 text-white px-8 py-3 rounded-full hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WritingTask; 