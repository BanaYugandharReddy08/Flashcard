import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://flashcard-eq1e.onrender.com/api';

export const generateFlashCards = async (topic, count) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, count }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.error || 'Failed to fetch flash cards');
      throw new Error(errorData.error || 'Failed to fetch flash cards');
    }

    const cards = await response.json();

    return cards.map((card, index) => ({
      ...card,
      id: `card-${index + 1}`,
    }));
  } catch (err) {
     console.error('Flashcard generation failed:', err);
    throw err;
  }
};
