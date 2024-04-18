// pages/index.js
import React, { useState } from 'react';
import LinkPdfDownload from './react-pdf-examples/examples/LinkPdfDownload';
import generatePdfDocument from './react-pdf-examples/generatePdfDocument';
import ReactToPDFExampleOne from './react-to-pdf-examples/ReactToPDFExampleOne';
import ReactToPDFExampleTwo from './react-to-pdf-examples/ReactToPDFExampleTwo';
import ReactToPDFExampleThree from './react-to-pdf-examples/ReactToPDFExampleThree';
import ReactPdfRendererExampleOne from './react-pdf-renderer-examples/ReactPdfRendererExampleOne';
import ReactPdfRendererExampleTwo from './react-pdf-renderer-examples/ReactPdfRendererExampleTwo';

const Home = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const generatePdfDocumentHandle = (fileName) => {
    generatePdfDocument(fileName)
  }
  return (
    <div className="App">
      <div className="main-container">
        <LinkPdfDownload />
        <div>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>generatePdfDocumentHandle("sample_one_test.pdf")}>
          Download generatePdfDocument
        </div>
        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples One</div>
          <ReactToPDFExampleOne />
        </div>
        <div className="w-[100%] pt-[20px] pb-[20px]">
          <div>react-pdf-renderer-examples</div>
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <ReactPdfRendererExampleTwo />
          </div>
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <ReactPdfRendererExampleOne />
          </div>
        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples Two</div>
          <ReactToPDFExampleTwo />
        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples Three</div>
          <ReactToPDFExampleThree />
        </div>
      </div>
    </div>
  );
};

export default Home;
