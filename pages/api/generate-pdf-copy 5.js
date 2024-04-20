import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { URL } from 'url';

export default async function handler(req, res) {
  const { markdownText } = req.body;

  const highlightCodeBlocks = (markdownText) => {
    return markdownText.replace(/```(\w+)\n([\s\S]+?)\n```/g, (match, lang, code) => {
      const highlightedCode = hljs.highlight(code, { language: lang }).value;
      return `<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`;
    });
  };

  // Function to convert local image files to Base64
  const convertLocalImagesToBase64 = async (htmlContent) => {
    return htmlContent.replace(/<img src="(.*?)">/g, async (match, src) => {
      const imagePath = path.join(process.cwd(), src);
      const image = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(image).toString('base64');
      return `<img src="data:image/png;base64,${base64Image}" />`;
    });
  };

  const proxy = (imageUrl) => createProxyMiddleware({
    target: imageUrl,
    changeOrigin: true,
    pathRewrite: { [`^/api/image-proxy`]: imageUrl.pathname },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('x-image-proxy', 'Next.js proxy');
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Proxied response from ${req.url} to ${proxyRes.headers['location'] || imageUrl.href}`);
      // You can modify the response or add custom headers here if needed
      console.log("res", res)
    },
    onError: (err, req, res) => {
      console.error(err);
    },
  });

  // Function to fetch online images and include them in HTML
  const fetchOnlineImages = async (htmlContent) => {  
    const regex = /<img src="(.*?)">/g;
    const matches = htmlContent.match(regex) || [];
    for (const match of matches) {
      console.log("match: ", match)
      //const srcMatch = match.match(/<img src="(.*?)">/);
      const srcMatchUrl = match.match(/<img src="(.*?)">/);
      const srcMatch = match.match(/<img[^>]*src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {

        console.log("srcMatch=====: ", srcMatch)
        const src = srcMatch[1];
        const srcUrl = srcMatchUrl[1];
        console.log("==============src============: ", src)
        // let imageUrl;
        // try {
        //   //console.log("==============imageUrl22============: ", src)
        //   imageUrl = new URL(decodeURIComponent("https://reactjs.org/logo-og.png"));
        //   //console.log("==============imageUrl11============: ", imageUrl)
        // } catch (e) {
        //   return res.status(400).json({ error: 'Invalid image URL' });
        // }

        // try {
        //   //console.log("==============imageUrl============: ", imageUrl)

        //   // Fetch the image from the external source
        //   const response = await fetch(imageUrl.href);

        //   //console.log("==============response============: ", imageUrl)
      
        //   if (!response.ok) {
        //     return res.status(500).json({ error: 'Failed to fetch image' });
        //   }
      
        //   // Read the image data as a buffer
        //   const imageBuffer = await response.arrayBuffer();
        //   //console.log("=========================================:", imageBuffer)
        // } catch (error) {
        //   console.error('Error proxying image:', error);
        // }

        try {
          const response = await axios.get(src, { responseType: 'arraybuffer',  crossorigin: false });
          const base64Image = Buffer.from(response.data, 'binary').toString('base64');
          htmlContent = htmlContent.replace(`<img src="${srcUrl}">`, `<img src="data:image/png;base64,${base64Image}" width="400" height="400" />`);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    }
    return htmlContent;
  };

  // export default async function handler(req, res) {
  //   try {
      
  //     const { imageUrl } = req.body;
  //     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  //     const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  //     res.status(200).json({ base64Image });
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
  

  const markdownToHtml = async (markdownText) => {
    const md = new MarkdownIt();
    let htmlContent = md.render(markdownText);
    htmlContent = await fetchOnlineImages(htmlContent);
    //htmlContent = await convertLocalImagesToBase64(htmlContent);
    htmlContent = await highlightCodeBlocks(htmlContent); // Apply highlighting

    const styledHtmlContent = `
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px; /* Set margin for table */
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
      th {
        background-color: #f2f2f2;
      }

      @page {
        padding-top: 20px; 
        margin: 20px; /* Set margins for top, right, bottom, and left for all pages */
      }

      body {
        margin: 20px;
        padding-top: 20px; /* Set padding-top for body */
        padding-bottom: 20px;
      }
      pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}
.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}
    </style>
    ${htmlContent}
  `;

    return styledHtmlContent;
  };

  let htmlContent = await markdownToHtml(markdownText);

  pdf.create(htmlContent).toFile('markdown_document.pdf', (err, _) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate PDF' });
    } else {
      const filePath = path.join(process.cwd(), 'markdown_document.pdf');
      const fileContents = fs.readFileSync(filePath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', fileContents.length);
      res.setHeader('Content-Disposition', 'attachment; filename=markdown_document.pdf');

      res.status(200).send(fileContents);
    }
  });
}
