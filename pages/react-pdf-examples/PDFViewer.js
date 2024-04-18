import React from 'react';
import { Document, Page } from 'react-pdf';

function PDFViewer({ pdfUrl }) {
  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default PDFViewer;
