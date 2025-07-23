export const generateQuizQuestions = async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000));

  const questions = [];
  const availableTypes = config.questionTypes;

  for (let i = 0; i < config.cardCount; i++) {
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    let question;

    switch (randomType) {
      case 'True/False':
        question = {
          id: `q-${i + 1}`,
          type: 'True/False',
          question: `Statement about ${config.topic}: This is a ${config.difficulty.toLowerCase()} level true/false question. (Question ${i + 1})`,
          correctAnswer: Math.random() > 0.5 ? 'True' : 'False',
          explanation: `This statement is ${Math.random() > 0.5 ? 'true' : 'false'} because of specific reasons related to ${config.topic}. The ${config.difficulty.toLowerCase()} difficulty level means this concept requires ${config.difficulty === 'Hard' ? 'advanced' : config.difficulty === 'Medium' ? 'moderate' : 'basic'} understanding.`,
        };
        break;

      case 'Yes/No':
        question = {
          id: `q-${i + 1}`,
          type: 'Yes/No',
          question: `Question about ${config.topic}: Is this a valid approach or concept? (${config.difficulty} level - Question ${i + 1})`,
          correctAnswer: Math.random() > 0.5 ? 'Yes' : 'No',
          explanation: `The answer is ${Math.random() > 0.5 ? 'Yes' : 'No'} because this approach aligns with the fundamental principles of ${config.topic}.`,
        };
        break;

      case 'Single Select':
        const options = [
          `Option A related to ${config.topic}`,
          `Option B covering ${config.topic} concepts`,
          `Option C explaining ${config.topic} principles`,
          `Option D about ${config.topic} applications`,
        ];
        const correctIndex = Math.floor(Math.random() * options.length);
        question = {
          id: `q-${i + 1}`,
          type: 'Single Select',
          question: `Which of the following best describes ${config.topic}? (${config.difficulty} level - Question ${i + 1})`,
          options: options,
          correctAnswer: options[correctIndex],
          explanation: `${options[correctIndex]} is the correct answer because it accurately represents the core concepts of ${config.topic} at the ${config.difficulty.toLowerCase()} level.`,
        };
        break;

      case 'Multi-Select':
        const multiOptions = [
          `First aspect of ${config.topic}`,
          `Second characteristic of ${config.topic}`,
          `Third principle of ${config.topic}`,
          `Fourth element of ${config.topic}`,
          `Fifth component of ${config.topic}`,
        ];
        const correctCount = Math.floor(Math.random() * 3) + 2;
        const correctAnswers = multiOptions.slice(0, correctCount);
        question = {
          id: `q-${i + 1}`,
          type: 'Multi-Select',
          question: `Select all that apply to ${config.topic}: (${config.difficulty} level - Question ${i + 1})`,
          options: multiOptions,
          correctAnswer: correctAnswers,
          explanation: `The correct answers are: ${correctAnswers.join(', ')}. These represent the key aspects of ${config.topic} that are essential for ${config.difficulty.toLowerCase()}-level understanding.`,
        };
        break;

      default:
        question = {
          id: `q-${i + 1}`,
          type: 'True/False',
          question: `Default question about ${config.topic} (Question ${i + 1})`,
          correctAnswer: 'True',
          explanation: `This is a default explanation for ${config.topic}.`,
        };
    }

    questions.push(question);
  }

  return questions;
};
