// src/components/MarkdownToPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import markdownToHtml from 'markdown-it';

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
  const md = markdownToHtml();
  const htmlContent = md.render(markdownContent);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>{htmlContent}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MarkdownToPDF;
