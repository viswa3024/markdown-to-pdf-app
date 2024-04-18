const axios = require('axios');



export default async function handler(req, res) {
  try {
    
    const { imageUrl } = req.body;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
