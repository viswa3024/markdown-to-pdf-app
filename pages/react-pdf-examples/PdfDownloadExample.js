import React from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

// Create PDF component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Hello, PDF!</Text>
      <Text style={styles.content}>
        This is a sample PDF generated with react-pdf. You can customize this content as needed.
      </Text>
    </Page>
  </Document>
);

// Create React component
const PdfDownloadExample = () => (
  <div>
    <h1>PDF Download Example</h1>
    <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default PdfDownloadExample;
