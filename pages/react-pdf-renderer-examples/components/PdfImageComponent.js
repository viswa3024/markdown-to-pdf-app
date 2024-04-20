import React, {useEffect} from 'react';
import { Image as PdfImage } from '@react-pdf/renderer';
import axios from 'axios';

const PdfImageComponent = ({ src }) => {
  const [base64String, setBase64String] = React.useState('');

  const fetchImageOne = async () => {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = btoa(new Uint8Array(arrayBuffer));
    debugger
    setBase64String(base64String);
  };

  const fetchImage = async () => {
    axios.post('/api/proxy-image', { imageUrl: src })
    .then((response) => {
      debugger
      const imageData= response.data.base64Image;
      setBase64String(imageData);
    })
    .catch((error) => {
        setBase64String('');
      console.error('Error fetching base64 image:', error);
    });
    
  };


  useEffect(() => {
    fetchImage();
  }, [src]);

  return (
    <PdfImage
      src={`data:image/png;base64,${base64String}`}
      style={{ width: 200, height: 300 }}
    />
  );
};

export default PdfImageComponent;