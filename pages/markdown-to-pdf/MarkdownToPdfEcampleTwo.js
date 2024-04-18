import React, { useState } from 'react';
import axios from 'axios';

export default function MarkdownToPdfEcampleTwo() {
  const [markdownText, setMarkdownText] = useState(`
  ## Code Examples

![React Logo](https://reactjs.org/logo-og.png)

![test Logo](https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

  `);

  const generatePDF = async () => {
    try {
      const response = await axios.post('/api/generate-pdf', { markdownText }, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'markdown_document.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>Download as html to pdf</button>
    </div>
  );
}
