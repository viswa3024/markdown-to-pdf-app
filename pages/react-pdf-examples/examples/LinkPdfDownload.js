"use client";

import ExampleDocumentOne from "./Example1";
import PDFDownloadLink from "./PDFDownloadLink";

const LinkPdfDownload = () => (
    <div>
         <PDFDownloadLink document={<ExampleDocumentOne />} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? <button>Loading</button> : 
          
          
          <div className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Download
</div>
)}
        </PDFDownloadLink>
    </div>
)


export default LinkPdfDownload;