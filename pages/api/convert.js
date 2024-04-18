// pages/api/convert.js
import markdownpdf from 'markdown-pdf';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { markdown } = req.body;

    // Convert Markdown to PDF
    markdownpdf().from.string(markdown).to((err, buffer) => {
      if (err) {
        console.error('Error converting Markdown to PDF:', err);
        res.status(500).end();
      } else {
        // Send PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
        res.status(200).send(buffer);
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
