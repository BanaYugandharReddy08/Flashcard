export const generateFlashCards = async (topic, count) => {
  const response = await fetch('/api/generate-flashcards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, count }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flash cards');
  }

  const cards = await response.json();

  return cards.map((card, index) => ({ ...card, id: `card-${index + 1}` })).slice(
    0,
    count
  );
};
