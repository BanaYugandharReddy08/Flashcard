import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, RotateCcw, Trophy, Target } from 'lucide-react';
import { QuizQuestion, QuizConfig } from '../utils/quizGenerator';

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: { [key: number]: any };
  config: QuizConfig;
  onRetakeQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, answers, config, onRetakeQuiz }) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (Array.isArray(question.correctAnswer)) {
        // Multi-select question
        if (Array.isArray(userAnswer) && 
            userAnswer.length === question.correctAnswer.length &&
            userAnswer.every(ans => question.correctAnswer.includes(ans))) {
          correct++;
        }
      } else {
        // Single answer question
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const isCorrect = (question: QuizQuestion, userAnswer: any) => {
    if (Array.isArray(question.correctAnswer)) {
      return Array.isArray(userAnswer) && 
             userAnswer.length === question.correctAnswer.length &&
             userAnswer.every(ans => question.correctAnswer.includes(ans));
    }
    return userAnswer === question.correctAnswer;
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const score = calculateScore();

  const getScoreColor = () => {
    if (score.percentage >= 80) return 'text-green-600';
    if (score.percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (score.percentage >= 80) return 'bg-green-50 border-green-200';
    if (score.percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Summary */}
      <div className={`rounded-2xl shadow-lg p-8 mb-8 border-2 ${getScoreBgColor()}`}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className={`h-12 w-12 ${getScoreColor()}`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <div className={`text-5xl font-bold ${getScoreColor()} mb-4`}>
            {score.percentage}%
          </div>
          <p className="text-xl text-gray-700 mb-6">
            You scored {score.correct} out of {score.total} questions correctly
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Topic: {config.topic}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>•</span>
              <span>Difficulty: {config.difficulty}</span>
            </div>
          </div>
          <button
            onClick={onRetakeQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Take Another Quiz</span>
          </button>
        </div>
      </div>

      {/* Detailed Review */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Review</h3>
        
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const correct = isCorrect(question, userAnswer);
            const isExpanded = expandedQuestions.has(index);

            return (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {correct ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {question.type}
                      </span>
                    </div>
                    
                    <p className="text-lg font-medium text-gray-900 mb-4">
                      {question.question}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                        <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          correct 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer || 'No answer'}
                        </div>
                      </div>

                      {!correct && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</p>
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-lg text-sm font-medium">
                            {Array.isArray(question.correctAnswer) 
                              ? question.correctAnswer.join(', ') 
                              : question.correctAnswer}
                          </div>
                        </div>
                      )}
                    </div>

                    {question.explanation && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleExpanded(index)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {isExpanded ? 'Hide' : 'View More'}
                          </span>
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;