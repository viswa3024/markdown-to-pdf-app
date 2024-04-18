// components/MarkdownToPDF.js
import React, { useState } from 'react';
import axios from 'axios';

const MarkdownToPDF = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  const convertToPDF = async () => {
    try {
      const response = await axios.post('/api/convert', { markdown: markdownContent }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error converting Markdown to PDF:', error);
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
