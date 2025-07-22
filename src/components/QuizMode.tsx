import React, { useState } from 'react';
import { Search, Settings, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import QuizSetup from './QuizSetup';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { generateQuizQuestions, QuizQuestion as QuizQuestionType, QuizConfig } from '../utils/quizGenerator';

type QuizState = 'setup' | 'taking' | 'results';

const QuizMode: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);

  const handleStartQuiz = async (config: QuizConfig) => {
    setQuizConfig(config);
    const generatedQuestions = await generateQuizQuestions(config);
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizState('taking');
  };

  const handleAnswerChange = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const goToPrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1));
  };

  const handleSubmitQuiz = () => {
    setQuizState('results');
  };

  const handleRetakeQuiz = () => {
    setQuizState('setup');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizConfig(null);
  };

  const renderQuizState = () => {
    switch (quizState) {
      case 'setup':
        return <QuizSetup onStartQuiz={handleStartQuiz} />;
      
      case 'taking':
        const allAnswered = questions.every((_, index) => answers[index] !== undefined);
        
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Quiz: {quizConfig?.topic}</h2>
                  <p className="text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Difficulty: {quizConfig?.difficulty}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                answer={answers[currentQuestionIndex]}
                onAnswerChange={handleAnswerChange}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={goToPrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        answers[index] !== undefined
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : index === currentQuestionIndex
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {answers[index] !== undefined ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </button>
                  ))}
                </div>

                {allAnswered && (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>

              <button
                onClick={goToNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      case 'results':
        return (
          <QuizResults
            questions={questions}
            answers={answers}
            config={quizConfig!}
            onRetakeQuiz={handleRetakeQuiz}
          />
        );
      
      default:
        return null;
    }
  };

  return renderQuizState();
};

export default QuizMode;