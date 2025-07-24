export const generateFlashCards = async (topic, count) => {
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
            'You are a helpful assistant that generates flash cards in JSON format.'
        },
        {
          role: 'user',
          content: `Create ${count} flash cards about "${topic}". Respond with an array of objects containing question, answer and explanation fields.`
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flash cards');
  }

  const data = await response.json();

  let cards = [];
  try {
    cards = JSON.parse(data.choices[0].message.content.trim());
  } catch (err) {
    console.error('Error parsing flash card JSON:', err);
  }

  return cards.map((card, index) => ({ ...card, id: `card-${index + 1}` })).slice(0, count);
};
