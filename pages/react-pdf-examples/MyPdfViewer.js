import React from 'react';
import { Document, Page } from 'react-pdf';

class MyPdfViewer extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    this.setState((prevState) => ({
      pageNumber: Math.max(prevState.pageNumber - 1, 1),
    }));
  };

  goToNextPage = () => {
    this.setState((prevState) => ({
      pageNumber: Math.min(prevState.pageNumber + 1, this.state.numPages),
    }));
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="article.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </div>
      </div>
    );
  }
}

export default MyPdfViewer;
