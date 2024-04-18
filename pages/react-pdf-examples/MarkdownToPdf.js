import React, { useState } from 'react';
import { Page, Text, View, Document } from 'react-pdf';
import ReactMarkdown from 'react-markdown';

const MarkdownToPdf = () => {
  const [markdownText, setMarkdownText] = useState('# Hello World!');
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleGeneratePdf = async () => {
    const pdfDoc = new Document();
    const page = pdfDoc.addPage();

    const markdownHtml = <ReactMarkdown source={markdownText} />;
    page.addSubview(
      <View>
        <Text>{markdownHtml}</Text>
      </View>
    );

    const pdfBytes = pdfDoc.getBytes();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'example.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    setPdfGenerated(true);
  };

  return (
    <div>
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
      />
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      {pdfGenerated && <p>Pdf generated successfully!</p>}
    </div>
  );
};

export default MarkdownToPdf;