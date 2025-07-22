import React from 'react';
import { BookOpen, Brain, ArrowRight } from 'lucide-react';
import { AppMode } from '../App';

interface ModeSelectionProps {
  onModeSelect: (mode: AppMode) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to your interactive Flash Card experience!
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our app is designed to make learning and quizzing fun, flexible, and user-focused. 
          Whether you want to master a topic or test your knowledge, we've got the right tools for you.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Learn Mode Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="h-8 w-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Learn Mode</h3>
            </div>
            <p className="text-blue-100">Dive deep into any subject at your own pace</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Enter the topic you want to study and choose up to 30 flash cards</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Navigate effortlessly with Previous and Next buttons</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Review, repeat, and reinforce your knowledge as much as you need</p>
              </div>
            </div>
            
            <button
              onClick={() => onModeSelect('learn')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quiz Mode Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="h-8 w-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Quiz Mode</h3>
            </div>
            <p className="text-purple-100">Ready to challenge yourself? Test your knowledge!</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Multiple question types: True/False, Single/Multi-Select, Yes/No</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Choose difficulty level: Simple, Medium, or Hard</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Instant scoring with detailed review and explanations</p>
              </div>
            </div>
            
            <button
              onClick={() => onModeSelect('quiz')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Quiz</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personalized Learning</h4>
            <p className="text-sm text-gray-600">Focus on topics that matter to you</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
              <ArrowRight className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Effortless Navigation</h4>
            <p className="text-sm text-gray-600">Move smoothly between flash cards</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Customizable Quizzes</h4>
            <p className="text-sm text-gray-600">Choose question types and difficulty</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-3">
              <ArrowRight className="h-6 w-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Feedback</h4>
            <p className="text-sm text-gray-600">Color-coded results with explanations</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600">
          Start your journey today and make every flash card count towards smarter learning and better results!
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;