import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';
import { QuizConfig } from '../utils/quizGenerator';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState('');
  const [cardCount, setCardCount] = useState(10);
  const [difficulty, setDifficulty] = useState<'Simple' | 'Medium' | 'Hard'>('Medium');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['True/False']);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableQuestionTypes = ['True/False', 'Single Select', 'Yes/No'];

  const handleQuestionTypeToggle = (type: string) => {
    setQuestionTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!topic.trim() || questionTypes.length === 0) return;

    setIsLoading(true);
    
    const config: QuizConfig = {
      topic,
      cardCount,
      difficulty,
      questionTypes: allowMultipleAnswers ? [...questionTypes, 'Multi-Select'] : questionTypes,
      allowMultipleAnswers
    };

    try {
      await onStartQuiz(config);
    } catch (error) {
      console.error('Error starting quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Settings className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Quiz Mode Setup</h2>
          </div>
          <p className="text-gray-600">
            Ready to challenge yourself? Configure your quiz settings below
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the topic for your quiz..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions (1-30)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={cardCount}
              onChange={(e) => setCardCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Simple', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    difficulty === level
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Question Types
            </label>
            <div className="space-y-3">
              {availableQuestionTypes.map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={questionTypes.includes(type)}
                    onChange={() => handleQuestionTypeToggle(type)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
              
              <div className="border-t pt-3 mt-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowMultipleAnswers}
                    onChange={(e) => setAllowMultipleAnswers(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700 font-medium">Allow Multiple Answers (adds Multi-Select questions)</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!topic.trim() || questionTypes.length === 0 || isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                <span>Start Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;