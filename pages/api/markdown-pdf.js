// /pages/api/generate-pdf.js

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import MarkdownIt from 'markdown-it';

export default async function handler(req, res) {
  try {
    
    // const { markdownText } = req.body;

    // const md = new MarkdownIt();

    const { htmlContent } = req.body;

    //const htmlContent = md.render(markdownText);


    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const { width, height } = page.getSize();

    const fontSize = 12;

    let yOffset = height - 50;

    const lines = htmlContent.split('\n');

    console.log("lines: ", lines)

    // page.drawText('Creating PDFs in JavaScript is awesome!', {
    //   x: 50,
    //   y: yOffset,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0.53, 0.71),
    // });

    for (const line of lines) {
      if (yOffset - fontSize < 50) {
        page.addNewPage();
        yOffset = height - 50;
      }

      page.drawText(line, {
        x: 50,
        y: yOffset,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      yOffset -= fontSize;
    }



    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).end(pdfBytes);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
