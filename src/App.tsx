import React, { useState } from 'react';
import { BookOpen, Brain, Home } from 'lucide-react';
import ModeSelection from './components/ModeSelection';
import LearnMode from './components/LearnMode';
import QuizMode from './components/QuizMode';

export type AppMode = 'selection' | 'learn' | 'quiz';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('selection');

  const handleModeSelect = (mode: AppMode) => {
    setCurrentMode(mode);
  };

  const handleBackToHome = () => {
    setCurrentMode('selection');
  };

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FlashCard Pro</h1>
          </div>
          {currentMode !== 'selection' && (
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentMode) {
      case 'selection':
        return <ModeSelection onModeSelect={handleModeSelect} />;
      case 'learn':
        return <LearnMode />;
      case 'quiz':
        return <QuizMode />;
      default:
        return <ModeSelection onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {renderHeader()}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;