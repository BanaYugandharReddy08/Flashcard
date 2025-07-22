import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import FlashCard from './FlashCard';
import { generateFlashCards, FlashCardData } from '../utils/flashCardGenerator';

const LearnMode: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [cardCount, setCardCount] = useState(10);
  const [flashCards, setFlashCards] = useState<FlashCardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    try {
      const cards = await generateFlashCards(topic, cardCount);
      setFlashCards(cards);
      setCurrentCardIndex(0);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating flash cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentCardIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentCardIndex(prev => Math.min(flashCards.length - 1, prev + 1));
  };

  const handleReset = () => {
    setTopic('');
    setCardCount(10);
    setFlashCards([]);
    setCurrentCardIndex(0);
    setHasGenerated(false);
  };

  if (!hasGenerated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn Mode</h2>
            <p className="text-gray-600">
              Select the topic you want to study and choose the number of flash cards
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
                  placeholder="Enter the topic you want to study..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Flash Cards (1-30)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={cardCount}
                onChange={(e) => setCardCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Generate Flash Cards</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Learn Mode: {topic}</h2>
            <p className="text-gray-600">
              Card {currentCardIndex + 1} of {flashCards.length}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>New Topic</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <FlashCard data={flashCards[currentCardIndex]} mode="learn" />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevious}
          disabled={currentCardIndex === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <div className="flex space-x-2">
            {flashCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCardIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={goToNext}
          disabled={currentCardIndex === flashCards.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default LearnMode;