// /pages/api/generate-pdf.js

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import MarkdownIt from 'markdown-it';

export default async function handler(req, res) {
  try {
    
    const { markdownText } = req.body;

    const md = new MarkdownIt();

    const htmlContent = md.render(markdownText);


    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const { width, height } = page.getSize();

    const fontSize = 30;

    // Set initial y position for text rendering
    const yOffset = height - 4 * fontSize;

    // Render the text onto the page
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: yOffset,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Send the PDF bytes as the API response with the correct content type
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).end(pdfBytes);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
