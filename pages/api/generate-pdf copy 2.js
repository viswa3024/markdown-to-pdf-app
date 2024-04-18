import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { markdownText } = req.body;

  const highlightCodeBlocks = (markdownText) => {
    return markdownText.replace(/```(\w+)\n([\s\S]+?)\n```/g, (match, lang, code) => {
      const highlightedCode = hljs.highlight(code, { language: lang }).value;
      return `<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`;
    });
  };


  const markdownToHtml = (markdownText) => {
    const md = new MarkdownIt();

    const markdownIt = new MarkdownIt({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (__) {}
          }
    
          return ''; // use external default escaping
        },
      });

    return markdownIt.render(markdownText);
  };

  //const htmlContent = highlightCodeBlocks(markdownToHtml(markdownText));

  const htmlContent = `
    <style>
    table {
        width: 100%;
        border-collapse: collapse;
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
      th {
        background-color: #f2f2f2;
      }
      pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}
.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}
    </style>
    ${highlightCodeBlocks(markdownToHtml(markdownText))}
  `;


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
