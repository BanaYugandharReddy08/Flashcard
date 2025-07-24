import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_API_KEY = process.env.GOOGLE_AI_API_KEY || 'AIzaSyDvpK_7jXGJY6oWfCfWRHhS99qun-JK7C8';

if (!GOOGLE_API_KEY) {
  console.warn('GOOGLE_AI_API_KEY not set');
}

app.use(cors());
app.use(express.json());

const GOOGLE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const ai = new GoogleGenAI({apiKey: GOOGLE_API_KEY});

async function callGoogle(messages) {

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });

  if (!response.ok) {
    throw new Error('Failed to reach Google Generative AI');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

app.post('/api/generate-flashcards', async (req, res) => {
  const { topic, count } = req.body;

  // Validate user input early
  if (!topic || topic.trim().length < 3) {
    return res.status(400).json({
      error: 'Please enter a valid topic with at least 3 characters.',
    });
  }

  try {
    const prompt =
      `You are a helpful assistant that generates flash cards in JSON format. ` +
      `Create ${count} flash cards about "${topic}". ` +
      `Respond with an array of objects containing question, answer and explanation fields.`;

    const result = await ai.models.generateContent({
      model: "models/gemini-2.5-flash", // Use correct model name
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean the response if it starts with markdown code block
    const cleaned = rawText
      .replace(/^```(?:json)?\n/, '')
      .replace(/\n```$/, '')
      .trim();

    // If response doesn't look like an array, reject it
    if (!cleaned.startsWith("[")) {
      return res.status(400).json({
        error: "Invalid or unknown topic. Please enter a valid subject.",
        message: rawText, // optional: Gemini’s message
      });
    }

    const flashcards = JSON.parse(cleaned);

    res.json(
      flashcards.map((card, index) => ({
        ...card,
        id: `card-${index + 1}`,
      }))
    );
  } catch (err) {
    console.error("Failed to generate flashcards:", err.message || err);
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
