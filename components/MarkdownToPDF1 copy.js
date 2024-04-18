import React, { useState } from 'react';
import markdownToHtml from 'markdown-it';
import htmlToPdf from 'html-pdf';

const MarkdownToPDF = () => {
  const [markdownContent, setMarkdownContent] = useState(`
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

  const convertToPDF = () => {
    // Convert Markdown to HTML
    const md = markdownToHtml();
    const htmlContent = md.render(markdownContent);

    // Convert HTML to PDF
    htmlToPdf.create(htmlContent).toFile('converted.pdf', (err, res) => {
      if (err) {
        console.error('Error converting HTML to PDF:', err);
      } else {
        console.log('PDF saved:', res.filename);
      }
    });
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
      <button onClick={convertToPDF}>Convert to PDF</button>
    </div>
  );
};

export default MarkdownToPDF;