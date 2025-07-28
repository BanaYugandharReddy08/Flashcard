# Exam PDF Signer

This folder contains an independent web application for uploading and signing PDF files.

## Structure
- `server/` – Node.js mock signing server.
- `client/` – React application.

Both parts have their own `package.json` files and can be installed independently.

## Usage
1. Install server dependencies and start the mock server:
   ```bash
   cd server
   npm install
   node index.js
   ```
   The server listens on port `4000` by default.

2. In another terminal, install and start the React app:
   ```bash
   cd ../client
   npm install
   npm start
   ```

3. Open `http://localhost:3000` in your browser.

Upload a PDF via drag-and-drop or file picker. The server will return a "signed" PDF with a text overlay. The signed document is displayed in-app with options to download or upload a new file.
