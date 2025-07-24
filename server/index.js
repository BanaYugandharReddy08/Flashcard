import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_API_KEY = process.env.GOOGLE_AI_API_KEY;

if (!GOOGLE_API_KEY) {
  console.warn('GOOGLE_AI_API_KEY not set');
}

app.use(cors());
app.use(express.json());

const GOOGLE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function callGoogle(messages) {
  const res = await fetch(`${GOOGLE_URL}?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: messages }),
  });

  if (!res.ok) {
    throw new Error('Failed to reach Google Generative AI');
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

app.post('/api/generate-flashcards', async (req, res) => {
  const { topic, count } = req.body;
  try {
    const prompt =
      `You are a helpful assistant that generates flash cards in JSON format. ` +
      `Create ${count} flash cards about "${topic}". ` +
      `Respond with an array of objects containing question, answer and explanation fields.`;

    const text = await callGoogle([{ role: 'user', parts: [{ text: prompt }] }]);
    const cards = JSON.parse(text.trim());
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate flash cards' });
  }
});

app.post('/api/generate-quiz', async (req, res) => {
  const { topic, cardCount, difficulty, questionTypes } = req.body;
  try {
    const prompt =
      `You are a helpful assistant that generates quiz questions in JSON format. ` +
      `Create ${cardCount} quiz questions about "${topic}" with difficulty ${difficulty}. ` +
      `Question types: ${questionTypes.join(', ')}. ` +
      `Respond with an array of objects containing type, question, correctAnswer, options (if any) and explanation.`;

    const text = await callGoogle([{ role: 'user', parts: [{ text: prompt }] }]);
    const questions = JSON.parse(text.trim());
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate quiz questions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
