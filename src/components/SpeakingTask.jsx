import { useState, useEffect } from 'react';

function SpeakingTask({ task }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Web Speech API'yi kontrol et
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setFeedback('Speech recognition is not supported in your browser.');
    }
  }, []);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('');
      setFeedback('');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      analyzeSpeech(transcript);
    };

    recognition.onerror = (event) => {
      setFeedback('Error occurred in recognition: ' + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const analyzeSpeech = (text) => {
    // Basit bir analiz yap
    const feedback = [];
    
    if (text.toLowerCase().includes('happy')) {
      feedback.push('Good use of the word "happy"!');
    }
    
    if (text.length < 10) {
      feedback.push('Try to speak a bit longer next time.');
    }

    setFeedback(feedback.join(' '));
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🗣️ Speaking Task</h2>
      <p className="text-xl mb-8 text-center">{task}</p>

      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`w-full py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isRecording
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>

        {transcript && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Your speech:</h3>
            <p className="text-gray-700 text-center">{transcript}</p>
          </div>
        )}

        {feedback && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Feedback:</h3>
            <p className="text-gray-700 text-center">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeakingTask; 