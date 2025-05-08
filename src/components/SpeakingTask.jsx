import { useState } from 'react';

function SpeakingTask({ task, onComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    // Burada gerçek ses kaydı ve konuşma tanıma API'si entegrasyonu yapılacak
    // Şimdilik simüle ediyoruz
    setTimeout(() => {
      setTranscript("I am a software developer. I love coding and learning new technologies.");
      setFeedback("Great pronunciation! Try to speak a bit slower next time.");
      setIsRecording(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Speaking Task</h2>
      <p className="text-xl mb-8">{task}</p>

      <div className="mb-8">
        <button
          onClick={handleStartRecording}
          disabled={isRecording}
          className={`px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 ${
            isRecording
              ? 'bg-red-500 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRecording ? 'Recording... 🎤' : 'Start Recording 🎤'}
        </button>
      </div>

      {transcript && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Your Speech:</h3>
          <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg">{transcript}</p>
        </div>
      )}

      {feedback && (
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-lg text-green-700">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default SpeakingTask; 