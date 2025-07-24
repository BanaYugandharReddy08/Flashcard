import React, { useState } from 'react';
import ModeSelection from './components/ModeSelection';
import LearnMode from './components/LearnMode';
import QuizMode from './components/QuizMode';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify';

function App() {
  const [currentMode, setCurrentMode] = useState('selection');

  const handleBackToHome = () => {
    setCurrentMode('selection');
  };

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
      <Header currentMode={currentMode} handleBackToHome={handleBackToHome} />
      <main className="main-content">{renderContent()}</main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
