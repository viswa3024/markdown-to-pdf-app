// src/components/MarkdownToPDF.js
import React, { useState } from 'react';
import markdownToHtml from 'markdown-it';

const MarkdownToPDF = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  
  const convertToPDF = async () => {
    const md = markdownToHtml();
    const htmlContent = md.render(markdownContent);

    // Dynamically import html2pdf.js to avoid server-side rendering issues
    const html2pdf = (await import('html2pdf.js')).default;

    // Generate PDF from HTML using html2pdf
    html2pdf().from(htmlContent).save('converted.pdf');
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
      <button onClick={convertToPDF}>Convert to PDF</button>
    </div>
  );
};

export default MarkdownToPDF;
