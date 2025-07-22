import React, { useState } from 'react';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { FlashCardData } from '../utils/flashCardGenerator';

interface FlashCardProps {
  data: FlashCardData;
  mode: 'learn' | 'quiz';
}

const FlashCard: React.FC<FlashCardProps> = ({ data, mode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px]">
      <div className="p-8 h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Flash Card</span>
          </div>
          <button
            onClick={handleFlip}
            className="flex items-center space-x-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isFlipped ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="text-sm">{isFlipped ? 'Hide Answer' : 'Show Answer'}</span>
          </button>
        </div>

        <div className="text-center space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">QUESTION</h3>
            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              {data.question}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">ANSWER</h3>
            <div className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-30'}`}>
              <p className="text-lg text-gray-800 leading-relaxed">
                {data.answer}
              </p>
              {data.explanation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {data.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isFlipped && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Click "Show Answer" to reveal the answer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;