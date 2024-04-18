// components/MarkdownToPDF.js
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import MarkdownToJsx from 'markdown-to-jsx';

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    marginBottom: 10
  }
});

const MarkdownToPDF = ({ markdownContent }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>
          <MarkdownToJsx>{markdownContent}</MarkdownToJsx>
        </Text>
      </Page>
    </Document>
  );
};

export default MarkdownToPDF;
