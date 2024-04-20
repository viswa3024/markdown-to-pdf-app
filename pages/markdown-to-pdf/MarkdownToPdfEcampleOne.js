import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export default function MarkdownToPdfEcampleOne() {
  const [markdownText, setMarkdownText] = useState(`
  ## Code Examples

  Inline code: \`const example = 'Hello World!';\`

  \`\`\`javascript
  // Block code
  function greet(name) {
    return 'Hello, ' + name + '!';
  }
  greet('John');
  \`\`\`

  ## Example Markdown

This is a simple example of using \`react-markdown\` with \`remark-gfm\`.

- List item 1
- List item 2

| Name  | Age |
|-------|-----|
| John  | 25  |
| Alice | 30  |


## Data Representation

| Name   | Age | Status |
|--------|-----|--------|
| John   | 25  | Active |
| Alice  | 30  | Inactive |

- [x] Learn React
- [ ] Build a project
- [ ] Deploy to production


## Java Code Example

  \`\`\`java
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
  \`\`\`

  This is a *simple* example of using \`react-markdown\` with \`remark-gfm\`.

  - List item 1
  - List item 2

  \`\`\`javascript
  console.log('Hello, React!');
  \`\`\`


  ## Features

  | Feature        | Status |
  | -------------- | ------ |
  | Tables         | ✔️     |
  | Task Lists     | ✔️     |
  | Strikethrough  | ✔️     |


  


  ## Styling Text

  ~~Strikethrough~~ and **bold text** and *italic text*.

  Combination of **bold and _italic_** text.


  ### Ordered List

1. Item 1
2. Item 2
3. Item 3

### Unordered List

- Bullet 1
- Bullet 2
- Bullet 3




## HTML Content Example

    This is some HTML content:

    <div style="color: red;">
      <p>This is a paragraph with <strong>strong</strong> and <em>emphasized</em> text.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>



    ## Bash Syntax Highlighting Example

    This is some Bash code:

    \`\`\`bash
    #!/bin/bash

    echo "Hello, World!"

    for i in {1..5}
    do
      echo "Count: \$i"
    done
    \`\`\`


## Links and Images

[Visit OpenAI](https://www.openai.com/)

![React Logo](https://reactjs.org/logo-og.png)

  `);

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

  const generatePDF = async () => {
    const htmlContent = highlightCodeBlocks(markdownToHtml(markdownText));
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Adjust the dimensions as needed
    page.drawText(htmlContent, {
      x: 50,
      y: 750,
      size: 12,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'markdown_document.pdf';
    link.click();
  };

  return (
    <div>
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={generatePDF}>Download as PDF</button>
    </div>
  );
}

