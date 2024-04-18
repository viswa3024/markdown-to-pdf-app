"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Note,
  Canvas,
  Line,
  Svg,
  Polygon,
  Circle,
  Image,
} from "@react-pdf/renderer";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classes from './markdown-styles.module.css';


import CustomPDFViewer from "./CustomPDFViewer";
import { useEffect, useState } from "react";
import axios from "axios";
//import imageProxy from 'image-proxy';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={15} height={15} stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>
);

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: "20px",
    paddingBottom: "20px",
    backgroundColor: "#d11fb6",
    color: "white",
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  // viewer: {
  //   width: window.innerWidth, //the pdf viewer will take up all of the width and height
  //   height: window.innerHeight,
  // },
  // viewer: {
  //   width: window.innerWidth / 2,
  //   height: window.innerHeight / 2,
  // },
  viewer: {
    width: 800,
    height: 600,
  },
  canvas: {
    backgroundColor: "black",
    height: 500,
    width: 500,
  },
  line: {
    x1: "0", //starting coords are x1 and y1
    y1: "0",
    x2: "200", //ending coords:
    y2: "200",
    strokeWidth: 2,
    stroke: "rgb(255,255,255)", //stroke color
  },
  image: {
    width: 500,
    height: 500,
  },
  text: {
    fontSize: 40,
  }
});

const ReactPdfRendererReactMarkdown = () => {

  const markdownContent = `
# Markdown to PDF Example 1
## Markdown to PDF Example 2 
### Markdown to PDF Example 3 
#### Markdown to PDF Example 4 
##### Markdown to PDF Example 5 
###### Markdown to PDF Example 6

This is an example of how to generate a PDF from Markdown content using React and @react-pdf/renderer.

## Markdown Content

You can write your Markdown content here and it will be rendered into a PDF.

- Lists
- Tables
- Code blocks
- and more...

Enjoy!

![React Logo](https://reactjs.org/logo-og.png)

![test Logo](https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

`;

  const [copyMessages, setCopyMessages] = useState({});

  function renderListOne(list, listType) {
    let result = [];
    let itemCounter = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].props?.node?.tagName === 'li') {
        list[i].props.node.children.map((child) => {
          if (child.type === 'text' && child.value != '\n') {
            if (listType === 'ol') {
              result.push(
                <Text style={styles.listItem}>{`${++itemCounter}. ${child.value}`}</Text>
              );
            }
            if (listType === 'ul') {
              result.push(<Text style={styles.listItem}>{`• ${child.value}`}</Text>);
            }
          } else if (child.type === 'element') {
            result.push(renderList(child.children, child.tagName));
          }
        });
      }
    }
    return result;
  }

  function renderList(list, listType) {
    console.log('renderList', list, 'listType', listType);
    let result = [];
    let itemCounter = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].props?.node?.tagName === 'li') {
        list[i].props.node.children.map((child) => {
          if (child.type === 'text' && child.value != '\n') {
            if (listType === 'ol') {
              result.push(
                <Text style={styles.listItem}>{`${++itemCounter}. ${child.value}`}</Text>
              );
            }
            if (listType === 'ul') {
              result.push(<Text style={styles.listItem}>{`• ${child.value}`}</Text>);
            }
          } else if (child.type === 'element') {
            result.push(renderList(child.children, child.tagName));
          }
        });
      } else {
        if (list[i].type === 'element') {
          list[i].children?.map((child) => {
            if (child.tagName === 'p') {
              if (listType === 'ol') {
                result.push(
                  <Text style={styles.listItem}>{`${++itemCounter}. ${
                    child.children[0].value
                  }`}</Text>
                );
              }
              if (listType === 'ul') {
                result.push(<Text style={styles.listItem}>{`• ${child.children[0].value}`}</Text>);
              }
            }
          });
        }
      }
    }
    return result;
  }

  const TableComponent = ({ children }) => {
    return <table className={classes.customTable}>{children}</table>;
  };

  const h1Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 24,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };
  const h2Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 19.2,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };
  const h3Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 17.6,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };
  const h4Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };
  const h5Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 13.28,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };
  const h6Component = ({ children }) => {
    return <Text style={{
      color: '#000000',
      fontSize: 10.72,
      fontWeight: 'bold',
      padding: '5',
    }}>{children}</Text>;
  };

  const defaultComponent = ({ children }) => {
    return <Text>{children}</Text>;
  };

  const customRenderers = {
    h1: h1Component,
    h2: h2Component,
    h3: h3Component,
    h4: h4Component,
    h5: h5Component,
    h6: h6Component,
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        //const proxyUrl = imageProxy(image.properties.src);
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + image.properties.src;
        return (
          <View className={classes.image}>
            <Image src={image.properties.src} alt={image.alt} width={800} height={400} />
          </View>
        );
      }

      return <Text>{paragraph.children}</Text>;
    },
    i: defaultComponent,
    b: ({ children }) => (
      <Text style={[styles.b, extraStyle]}>{children}</Text>
    ),
    strong: ({ children }) => (
      <Text style={[styles.strong, extraStyle]}>{children}</Text>
    ),
    a: defaultComponent,
    ol: ({ children }) => {
      return renderList(children, 'ol');
    },
    ul: ({ children }) => {
      return renderList(children, 'ul');
    },
    li: ({ children }) => <Text>{'wont get rendered'}</Text>,
    text: ({ value }) => <Text>{value}</Text>,
    listItem: ({ children }) => <Text style={styles.listItem}>{children}</Text>
  };

  const customRenderersReactMarkdown = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <img src={image.properties.src} alt={image.alt} width={800} height={400} />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    table: TableComponent,
  };

  // const base64ToBlob = (base64String) => {
  //   const byteCharacters = atob(base64String);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   return new Blob([byteArray], { type: 'image/jpeg' }); // Change the MIME type accordingly
  // };

  // useEffect(() => {
  //   axios.post('/api/proxy-image', { imageUrl: "https://reactjs.org/logo-og.png" })
  //   .then((response) => {
  //     debugger
  //     const imageData= response.data.base64Image;

  //     const blob = base64ToBlob(imageData);
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'image.jpg'; // Set the file name here
  //   document.body.appendChild(a);
  //   a.click();

  //   })
  //   .catch((error) => {
  //     console.error('Error fetching base64 image:', error);
  //   });
  // }, []);

  return (<>
   <ReactMarkdown components={customRenderersReactMarkdown} remarkPlugins={[remarkGfm]}>
      {markdownContent}
    </ReactMarkdown>

    <br /> <br />

    <CustomPDFViewer id="viewer">
      <Document>
        <Page size="A4">
          <View style={styles.section}>
          <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </ReactMarkdown>
          </View>
        </Page>
      </Document>
    </CustomPDFViewer>
    </>);
}
export default ReactPdfRendererReactMarkdown;
