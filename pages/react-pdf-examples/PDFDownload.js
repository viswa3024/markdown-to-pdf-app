import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Define your document styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Define your PDF component
const MyPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>My PDF Content</Text>
      </View>
    </Page>
  </Document>
);

// Create a component that handles PDF download
const PDFDownload = () => {
  const handleDownloadPDF = () => {
    // Generate PDF Blob
    const blob = new Blob([<MyPDF />], { type: 'application/pdf' });

    // Create URL for the blob
    const url = URL.createObjectURL(blob);

    // Create anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_pdf_document.pdf'; // Specify the filename

    // Append anchor to body and trigger download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
    </div>
  );
};

export default PDFDownload;
