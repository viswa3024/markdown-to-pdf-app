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
    return md.render(markdownText);
  };

  const htmlContent = highlightCodeBlocks(markdownToHtml(markdownText));

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
