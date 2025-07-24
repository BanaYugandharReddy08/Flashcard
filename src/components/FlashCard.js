import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FlashCard = ({ data, mode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flash-card">
      <div className="flash-card-body">
        <div className="flash-card-header">
          {/* <div className="flash-card-info">
            <div className="indicator" />
            <span>Flash Card</span>
          </div> */}
          {/* <button onClick={handleFlip} className="flash-card-toggle">
            {isFlipped ? <EyeOff className="icon" /> : <Eye className="icon" />}
            <span>{isFlipped ? 'Hide Answer' : 'Show Answer'}</span>
          </button> */}
        </div>

        <div className="flash-card-content">
          <div style={{textAlign: 'center'}}>
            <h3 className="question-label">QUESTION</h3>
            <p className="question-text">{data.question}</p>
          </div>

          <div className="answer-section">
            <h3 className="answer-label">ANSWER</h3>
            <div className={`answer-text visible`}>
              <p>{data.answer}</p>
              {data.explanation && (
                <div className="explanation">
                  <p>
                    <strong>Explanation:</strong> {data.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* {!isFlipped && (
          <div className="reveal-tip">
            <p>Click "Show Answer" to reveal the answer</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FlashCard;
