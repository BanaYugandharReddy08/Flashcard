export const generateFlashCards = async (topic, count) => {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      id: `card-${i + 1}`,
      question: `What is an important concept related to ${topic}? (Question ${i + 1})`,
      answer:
        `This is a comprehensive answer about ${topic}. It covers key aspects and provides valuable insights for understanding this topic better.`,
      explanation: `This explanation provides additional context about why this answer is correct and how it relates to the broader understanding of ${topic}.`,
    });
  }

  return cards;
};
