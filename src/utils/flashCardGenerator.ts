export interface FlashCardData {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
}

// Simulated flash card generation - in a real app, this would call an AI API
export const generateFlashCards = async (topic: string, count: number): Promise<FlashCardData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const cards: FlashCardData[] = [];
  
  for (let i = 0; i < count; i++) {
    cards.push({
      id: `card-${i + 1}`,
      question: `What is an important concept related to ${topic}? (Question ${i + 1})`,
      answer: `This is a comprehensive answer about ${topic}. It covers key aspects and provides valuable insights for understanding this topic better.`,
      explanation: `This explanation provides additional context about why this answer is correct and how it relates to the broader understanding of ${topic}.`
    });
  }

  return cards;
};