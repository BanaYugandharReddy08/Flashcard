import React from 'react';
import { BookOpen, Brain, ArrowRight } from 'lucide-react';

const ModeSelection = ({ onModeSelect }) => {
  return (
    <div className="mode-selection">
      <div className="hero">
        <h2>Welcome to your interactive Flash Card experience!</h2>
        <p>
          Our app is designed to make learning and quizzing fun, flexible,
          and user-focused. Whether you want to master a topic or test your
          knowledge, we've got the right tools for you.
        </p>
      </div>

      <div className="mode-cards">
        <div className="mode-card learn">
          <div className="card-top learn">
            <div className="card-header">
              <BookOpen className="icon" />
              <h3>Learn Mode</h3>
            </div>
            <p className="card-subtitle">Dive deep into any subject at your own pace</p>
          </div>
          <div className="card-body">
            <div className="bullet">Enter the topic you want to study and choose up to 30 flash cards</div>
            <div className="bullet">Navigate effortlessly with Previous and Next buttons</div>
            <div className="bullet">Review, repeat, and reinforce your knowledge as much as you need</div>
          </div>
          <button onClick={() => onModeSelect('learn')} className="btn-primary">
            <span>Start Learning</span>
            <ArrowRight className="icon" />
          </button>
        </div>

        <div className="mode-card quiz">
          <div className="card-top quiz">
            <div className="card-header">
              <Brain className="icon" />
              <h3>Quiz Mode</h3>
            </div>
            <p className="card-subtitle">Ready to challenge yourself? Test your knowledge!</p>
          </div>
          <div className="card-body">
            <div className="bullet">Multiple question types: True/False, Single/Multi-Select, Yes/No</div>
            <div className="bullet">Choose difficulty level: Simple, Medium, or Hard</div>
            <div className="bullet">Instant scoring with detailed review and explanations</div>
          </div>
          <button onClick={() => onModeSelect('quiz')} className="btn-purple">
            <span>Start Quiz</span>
            <ArrowRight className="icon" />
          </button>
        </div>
      </div>

      <div className="features">
        <h3>Key Features</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon blue">
              <BookOpen className="icon" />
            </div>
            <h4>Personalized Learning</h4>
            <p>Focus on topics that matter to you</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon green">
              <ArrowRight className="icon" />
            </div>
            <h4>Effortless Navigation</h4>
            <p>Move smoothly between flash cards</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon purple">
              <Brain className="icon" />
            </div>
            <h4>Customizable Quizzes</h4>
            <p>Choose question types and difficulty</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon orange">
              <ArrowRight className="icon" />
            </div>
            <h4>Comprehensive Feedback</h4>
            <p>Color-coded results with explanations</p>
          </div>
        </div>
      </div>

      <div className="cta">
        <p>
          Start your journey today and make every flash card count towards
          smarter learning and better results!
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;
