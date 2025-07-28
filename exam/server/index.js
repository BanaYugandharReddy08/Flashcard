import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PDFDocument, rgb } from 'pdf-lib';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

// POST /sign - accept PDF and return signed version
app.post('/sign', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Load PDF and add a mock signature text on every page
    const pdfDoc = await PDFDocument.load(req.file.buffer);

    for (const page of pdfDoc.getPages()) {
      const { width, height } = page.getSize();
      page.drawText('Signed by Mock Server', {
        x: 50,
        y: height - 50,
        size: 18,
        color: rgb(1, 0, 0),
      });
    }

    const signedPdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(signedPdfBytes));
  } catch (err) {
    console.error('Sign error', err);
    res.status(500).json({ error: 'Failed to sign PDF' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock signing server running on port ${PORT}`);
});
