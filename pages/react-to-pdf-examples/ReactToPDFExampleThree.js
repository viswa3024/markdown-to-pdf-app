import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const options = {
   // default is `save`
   method: 'open',
   // default is Resolution.MEDIUM = 3, which should be enough, higher values
   // increases the image quality but also the size of the PDF, so be careful
   // using values higher than 10 when having multiple pages generated, it
   // might cause the page to crash or hang.
   resolution: Resolution.HIGH,
   page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
   },
   canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
   },
   // Customize any value passed to the jsPDF instance and html2canvas
   // function. You probably will not need this and things can break, 
   // so use with caution.
   overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
         compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
         useCORS: true
      }
   }
};

// you can use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById('content-id');

const ReactToPDFExampleThree = () => {
   return (
      <div>
         <div className='cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => generatePDF(getTargetElement, options)}>Download PDF</div>
         <div id="content-id">
            Content to be generated to PDF
            <div className="pt-[20px] pb-[20px] text-[16px]">
               Test Data
            </div>

            
         </div>
      </div>
   )
}

export default ReactToPDFExampleThree;