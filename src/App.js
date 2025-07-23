import React, { useState } from 'react';
import ModeSelection from './components/ModeSelection';
import LearnMode from './components/LearnMode';
import QuizMode from './components/QuizMode';

function App() {
  const [currentMode, setCurrentMode] = useState('selection');

  const handleModeSelect = (mode) => {
    setCurrentMode(mode);
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'learn':
        return <LearnMode />;
      case 'quiz':
        return <QuizMode />;
      default:
        return <ModeSelection onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
