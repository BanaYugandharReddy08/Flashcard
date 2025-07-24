export const generateQuizQuestions = async (config) => {
  const response = await fetch('/api/generate-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quiz questions');
  }

  const questions = await response.json();

  return questions.map((q, index) => ({ ...q, id: `q-${index + 1}` })).slice(
    0,
    config.cardCount
  );
};
