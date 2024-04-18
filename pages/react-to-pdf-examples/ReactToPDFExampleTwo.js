import { useRef } from 'react';
import generatePDF from 'react-to-pdf';


const ReactToPDFExampleTwo = () => {
   const targetRef = useRef();
   return (
      <div>
         <div className='cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>Download PDF</div>
         <div ref={targetRef}>
            Content to be generated to PDF
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div><div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>
         </div>
      </div>
   )
}

export default ReactToPDFExampleTwo;