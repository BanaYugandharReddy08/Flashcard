export const generateQuizQuestions = async (config) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OpenAI API key');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that generates quiz questions in JSON format.'
        },
        {
          role: 'user',
          content: `Create ${config.cardCount} quiz questions about "${config.topic}" with difficulty ${config.difficulty}. Question types: ${config.questionTypes.join(', ')}. Respond with an array of objects containing type, question, correctAnswer, options (if any) and explanation.`
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quiz questions');
  }

  const data = await response.json();

  let questions = [];
  try {
    questions = JSON.parse(data.choices[0].message.content.trim());
  } catch (err) {
    console.error('Error parsing quiz JSON:', err);
  }

  return questions.map((q, index) => ({ ...q, id: `q-${index + 1}` })).slice(0, config.cardCount);
};
