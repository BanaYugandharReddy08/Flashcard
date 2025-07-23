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
          <div className="card-title">Learn Mode</div>
          <p className="card-subtitle">
            Select the topic you want to study and choose the number of flash cards
          </p>

          <div className="form">
            <div className="form-field">
              <label>Topic</label>
              <div className="input-icon">
                <Search className="icon" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter the topic you want to study..."
                />
              </div>
            </div>

            <div className="form-field">
              <label>Number of Flash Cards (1-30)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={cardCount}
                onChange={(e) =>
                  setCardCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))
                }
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>
                  <Search className="icon" />
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
