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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🗣️ Speaking Task</h2>
      <p className="text-xl mb-6">{task}</p>

      <div className="space-y-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`w-full py-3 rounded-lg ${
            isRecording
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>

        {transcript && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Your speech:</h3>
            <p className="text-gray-700">{transcript}</p>
          </div>
        )}

        {feedback && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
            <p className="text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeakingTask; 