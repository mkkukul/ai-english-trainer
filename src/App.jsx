import { useState, useEffect } from 'react';
import DailyView from './components/DailyView';
import { Loader2 } from 'lucide-react';

function App() {
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    // İlk günün verisini yükle
    fetch(`/src/data/day${String(currentDay).padStart(2, '0')}.json`)
      .then(response => response.json())
      .then(data => {
        setDailyData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading daily data:', error);
        setLoading(false);
      });
  }, [currentDay]);

  const handleDayComplete = () => {
    setCurrentDay(prev => prev + 1);
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your daily lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <DailyView
        day={currentDay}
        content={dailyData}
        onComplete={handleDayComplete}
      />
    </div>
  );
}

export default App;
