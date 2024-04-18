import { usePDF } from 'react-to-pdf';

const ReactToPDFExampleOne = () => {
   const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
   return (
      <div>
         <div className='cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => toPDF()}>Download PDF</div>
         <div ref={targetRef}>
            Content to be generated to PDF
         </div>
      </div>
   )
}

export default ReactToPDFExampleOne;