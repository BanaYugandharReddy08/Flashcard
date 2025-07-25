import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

const QuizSetup = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState('');
  const [cardCount, setCardCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionTypes, setQuestionTypes] = useState(['True/False', 'Single Select', 'Yes/No']);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          <h2 style={{margin:0, fontWeight:700,fontSize:'1.875rem',marginBottom:'16px'}}>Quiz Mode Setup</h2>
          <p style={{margin:0}}>Ready to challenge yourself? Configure your quiz settings below</p>
        </div>

        <div className="form" style={{ display: 'flex', flexDirection: 'column',height: '252px' }}>
          <div className="form-field">
            <div style={{ height:'20px' ,marginBottom:"8px"  }}>
                <label style={{fontWeight:'500', fontSize:'0.875rem'}}>Topic</label>  
            </div>
            <div className="input-icon" style={{height:'50px'}}>
              <Search className="icon" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the topic for your quiz..."
                style={{ width: '550px', height: '24px' }}
              />
              </div>
          </div>

          <div className="form-field" style={{ height:'78px !important', marginTop:'24px' }}>
              <div marginBottom="8px" style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{fontWeight:'500', fontSize:'0.875rem'}}>Number of Flash Cards (1-30)</label>  
              </div>
              <div className="input-icon" style={{ height:'50px' }}>
                <input
                type="number"
                min="1"
                max="30"
                value={cardCount}
                onChange={(e) =>
                  setCardCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))
                }
                style={{ width: '570px', height: '24px', paddingLeft: '1.25rem' }}
              />
              </div>
            </div>

          <div className="form-field" style={{ height:'78px !important', marginTop:'24px' }}>
            <div marginBottom="8px" style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{fontWeight:'500', fontSize:'0.875rem'}}>Difficulty Level</label>  
              </div>
            <div className="difficulty-options">
              {['Simple', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field multiple-checkbox">
            <div className="question-types">
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
            disabled={!topic.trim() || questionTypes.length ===0 || isLoading}
            className="btn-primary"
            style={{marginTop:'24px'}}
          >
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <span>Start Quiz</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;
