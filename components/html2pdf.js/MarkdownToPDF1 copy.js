// src/components/MarkdownToPDF.js
import React, { useState } from 'react';
import markdownToHtml from 'markdown-it';
import markdownAttrs from 'markdown-it-attrs';

const MarkdownToPDF = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  const convertToPDF = async () => {
    const md = markdownToHtml().use(markdownAttrs);
    const htmlContent = md.render(markdownContent);

    const style = `
      <style>
        body { font-family: Arial, sans-serif; }
        img { max-width: 100%; height: auto; }
      </style>
    `;

    const finalHtmlContent = `
      <html>
        <head>
          <title>Markdown to PDF</title>
          ${style}
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    

    try {
        // Dynamically import html2pdf.js to avoid server-side rendering issues
        const { default: html2pdf } = await import('html2pdf.js');
        
        // Generate PDF from HTML using html2pdf
        //html2pdf().from(htmlContent).save();
        await html2pdf().from(finalHtmlContent).save();
      } catch (error) {
        console.error('Error converting HTML to PDF:', error);
      }
  
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
      <button onClick={convertToPDF}>Convert to PDF</button>
    </div>
  );
};

export default MarkdownToPDF;
