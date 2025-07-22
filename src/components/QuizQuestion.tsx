import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../utils/quizGenerator';

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, answer, onAnswerChange }) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'True/False':
        return (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <label key={option} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="trueFalse"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'Yes/No':
        return (
          <div className="space-y-3">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="yesNo"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'Single Select':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="singleSelect"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'Multi-Select':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answer) ? answer : [];
                    if (e.target.checked) {
                      onAnswerChange([...currentAnswers, option]);
                    } else {
                      onAnswerChange(currentAnswers.filter((a: string) => a !== option));
                    }
                  }}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-600 uppercase">{question.type}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h3>
      </div>

      <div className="space-y-4">
        {renderQuestionContent()}
      </div>

      {question.type === 'Multi-Select' && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You can select multiple answers for this question.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;