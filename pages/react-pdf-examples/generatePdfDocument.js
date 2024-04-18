import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import ExampleDocumentOne from './examples/Example1';

const generatePdfDocument = async (fileName) => {
        const blob = await pdf((
            <ExampleDocumentOne />
        )).toBlob();
        saveAs(blob, fileName);
};

export default generatePdfDocument;