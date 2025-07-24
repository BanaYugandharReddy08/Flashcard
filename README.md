# Flashcard App

This project contains a React frontend and an Express backend used for generating flashcards and quiz questions with Google Generative AI.

## Server Setup

The server resides in the `server/` folder. It exposes two endpoints:

- `POST /api/generate-flashcards`
- `POST /api/generate-quiz`

Before starting the server, create a `.env` file inside `server/` with the following variables:

```
GOOGLE_AI_API_KEY=your_api_key_here
PORT=3001 # optional
```

Install dependencies and start the server:

```bash
cd server
npm install
npm start
```

The React app expects the server to run locally on the port defined above.
