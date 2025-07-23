import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

const QuizSetup = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState('');
  const [cardCount, setCardCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionTypes, setQuestionTypes] = useState(['True/False']);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableQuestionTypes = ['True/False', 'Single Select', 'Yes/No'];

  const handleQuestionTypeToggle = (type) => {
    setQuestionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!topic.trim() || questionTypes.length === 0) return;
    setIsLoading(true);

    const config = {
      topic,
      cardCount,
      difficulty,
      questionTypes: allowMultipleAnswers ? [...questionTypes, 'Multi-Select'] : questionTypes,
      allowMultipleAnswers,
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
    <div className="quiz-setup">
      <div className="card">
        <div className="setup-header">
          <Settings className="icon" />
          <h2>Quiz Mode Setup</h2>
          <p>Ready to challenge yourself? Configure your quiz settings below</p>
        </div>

        <div className="form">
          <div className="form-field">
            <label>Topic</label>
            <div className="input-icon">
              <Search className="icon" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the topic for your quiz..."
              />
            </div>
          </div>

          <div className="form-field">
            <label>Number of Questions (1-30)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={cardCount}
              onChange={(e) => setCardCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
            />
          </div>

          <div className="form-field">
            <label>Difficulty Level</label>
            <div className="difficulty-options">
              {['Simple', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={difficulty === level ? 'option active' : 'option'}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label>Question Types</label>
            <div className="question-types">
              {availableQuestionTypes.map((type) => (
                <label key={type} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={questionTypes.includes(type)}
                    onChange={() => handleQuestionTypeToggle(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}

              <div className="checkbox-option multiple">
                <input
                  type="checkbox"
                  checked={allowMultipleAnswers}
                  onChange={(e) => setAllowMultipleAnswers(e.target.checked)}
                />
                <span className="label">Allow Multiple Answers (adds Multi-Select questions)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!topic.trim() || questionTypes.length === 0 || isLoading}
            className="btn-purple"
          >
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <>
                <Settings className="icon" />
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
