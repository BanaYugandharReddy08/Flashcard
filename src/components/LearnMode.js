import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import FlashCard from './FlashCard';
import { generateFlashCards } from '../utils/flashCardGenerator.js';

const LearnMode = () => {
  const [topic, setTopic] = useState('');
  const [cardCount, setCardCount] = useState(10);
  const [flashCards, setFlashCards] = useState([]);
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
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentCardIndex((prev) => Math.min(flashCards.length - 1, prev + 1));
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
      <div className="learn-setup">
        <div className="card">
          <div style={{ marginBottom: '32px' }}>
            <div className="card-title">Learn Mode</div>
            <p className="card-subtitle">
              Select the topic you want to study and choose the number of flash cards
            </p>
          </div>

          <div className="form" style={{ display: 'flex', flexDirection: 'column',height: '252px' }}>
            <div className="form-field" style={{ height:'78px !important', marginBottom:'0px' }}>
              <div style={{ height:'20px' ,marginBottom:"8px"  }}>
                <label style={{fontWeight:'500', fontSize:'0.875rem'}}>Topic</label>  
              </div>
              <div className="input-icon" style={{height:'50px'}}>
                <Search className="icon" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter the topic you want to study..."
                  style={{ width: '550px', height: '24px' }}
                />
              </div>
            </div>

            <div className="form-field" style={{ height:'78px !important', marginTop:'24px', marginBottom:'0px' }}>
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

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
              className="btn-primary"
              style={{marginTop:'24px'}}
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Search className="icon" />
                  <span>Generate Flash Cards</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-mode">
      <div className="card header">
        <div className="header-info">
          <h2>Learn Mode: {topic}</h2>
          <p>Card {currentCardIndex + 1} of {flashCards.length}</p>
        </div>
        <button onClick={handleReset} className="btn-text">
          <RotateCcw className="icon" />
          <span>New Topic</span>
        </button>
      </div>

      <div className="flashcard-wrapper">
        <FlashCard data={flashCards[currentCardIndex]} mode="learn" />
      </div>

      <div className="pager">
        <button onClick={goToPrevious} disabled={currentCardIndex === 0} className="btn-nav">
          <ChevronLeft className="icon" />
          <span>Previous</span>
        </button>

        <div className="pager-dots">
          {flashCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={index === currentCardIndex ? 'dot active' : 'dot'}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentCardIndex === flashCards.length - 1}
          className="btn-nav"
        >
          <span>Next</span>
          <ChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default LearnMode;
