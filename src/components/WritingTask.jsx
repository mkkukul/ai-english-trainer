import { useState } from 'react';

function WritingTask({ task }) {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">✍️ Writing Task</h2>
      <p className="text-xl mb-6">{task}</p>
      
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full h-48 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your answer here..."
      />

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      ) : (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Feedback:</h3>
          <p className="text-gray-700">
            Great effort! Remember to:
            <ul className="list-disc list-inside mt-2">
              <li>Use proper punctuation</li>
              <li>Check your grammar</li>
              <li>Make sure your sentences are complete</li>
            </ul>
          </p>
          <button
            onClick={() => {
              setAnswer('');
              setIsSubmitted(false);
            }}
            className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default WritingTask; 