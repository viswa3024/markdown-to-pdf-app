// pages/index.js
import React, { useState } from 'react';
import LinkPdfDownload from './react-pdf-examples/examples/LinkPdfDownload';
import generatePdfDocument from './react-pdf-examples/generatePdfDocument';
import ReactToPDFExampleOne from './react-to-pdf-examples/ReactToPDFExampleOne';
import ReactToPDFExampleTwo from './react-to-pdf-examples/ReactToPDFExampleTwo';
import ReactToPDFExampleThree from './react-to-pdf-examples/ReactToPDFExampleThree';
import ReactPdfRendererExampleOne from './react-pdf-renderer-examples/ReactPdfRendererExampleOne';
import ReactPdfRendererExampleTwo from './react-pdf-renderer-examples/ReactPdfRendererExampleTwo';
import { degrees, PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import MarkdownToPdfEcampleOne from './markdown-to-pdf/MarkdownToPdfEcampleOne';
import MarkdownToPdfEcampleTwo from './markdown-to-pdf/MarkdownToPdfEcampleTwo';
import axios from 'axios';


const Home = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const generatePdfDocumentHandle = (fileName) => {
    generatePdfDocument(fileName)
  }

  const markdownTextData = `
# Example Markdown Text

This is an example Markdown text. You can include various elements such as:

- Headings
- Paragraphs
- Lists
- Images
`;

async function markdownPdfDownload(markdownText) {
  try {
    const response = await axios.post('/api/markdown-pdf', { markdownText }, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

//   async function markdownPdfDownload(markdownText) {
//     // Convert Markdown to HTML
//     const htmlContent = MarkdownIt.render(markdownText);

//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();

//     // Add a new page to the PDF document
//     const page = pdfDoc.addPage([600, 800]); // Set custom page size (width, height)

//     // Embed the HTML content into the PDF
//     const { width, height } = page.getSize();
//     const pdfHtml = await pdfDoc.embedHtml(htmlContent, { width, height });

//     // Draw the HTML content onto the PDF page
//     page.drawImage(pdfHtml, {
//         x: 50, // Set x-coordinate
//         y: height - pdfHtml.height - 50, // Set y-coordinate (position from bottom)
//         width: pdfHtml.width,
//         height: pdfHtml.height,
//     });

//     // Save the PDF document as a Blob
//     const pdfBytes = await pdfDoc.save();

//     // Allow the user to download the PDF document
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = 'markdown_document.pdf'; // Set the file name
//     link.click();
// }


  async function createPdf1() {
    debugger
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
  
    const pdfBytes = await pdfDoc.save()
  }

  async function createPdf() {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");

    // Convert PDF bytes to Blob
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Create download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.download = 'example.pdf';

  // Trigger download
  downloadLink.click();

  }

  async function modifyPdf() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function createForm() {
    const pdfDoc = await PDFDocument.create()
  
    const page = pdfDoc.addPage([550, 750])
  
    const form = pdfDoc.getForm()
  
    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })
  
    const superheroField = form.createTextField('favorite.superhero')
    superheroField.setText('One Punch Man')
    superheroField.addToPage(page, { x: 55, y: 640 })
  
    page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })
  
    page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
    page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
    page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
    page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })
  
    const rocketField = form.createRadioGroup('favorite.rocket')
    rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
    rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
    rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
    rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
    rocketField.select('Saturn IV')
  
    page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })
  
    page.drawText('Exia', { x: 120, y: 400, size: 18 })
    page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
    page.drawText('Virtue', { x: 340, y: 400, size: 18 })
    page.drawText('Dynames', { x: 340, y: 340, size: 18 })
  
    const exiaField = form.createCheckBox('gundam.exia')
    const kyriosField = form.createCheckBox('gundam.kyrios')
    const virtueField = form.createCheckBox('gundam.virtue')
    const dynamesField = form.createCheckBox('gundam.dynames')
  
    exiaField.addToPage(page, { x: 55, y: 380 })
    kyriosField.addToPage(page, { x: 55, y: 320 })
    virtueField.addToPage(page, { x: 275, y: 380 })
    dynamesField.addToPage(page, { x: 275, y: 320 })
  
    exiaField.check()
    dynamesField.check()
  
    page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })
  
    const planetsField = form.createDropdown('favorite.planet')
    planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
    planetsField.select('Pluto')
    planetsField.addToPage(page, { x: 55, y: 220 })
  
    page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })
  
    const personField = form.createOptionList('favorite.person')
    personField.addOptions([
      'Julius Caesar',
      'Ada Lovelace',
      'Cleopatra',
      'Aaron Burr',
      'Mark Antony',
    ])
    personField.select('Ada Lovelace')
    personField.addToPage(page, { x: 55, y: 70 })
  
    page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function fillForm() {
    const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  
    const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
    const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())
  
    const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
    const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(formPdfBytes)
  
    const marioImage = await pdfDoc.embedPng(marioImageBytes)
    const emblemImage = await pdfDoc.embedPng(emblemImageBytes)
  
    const form = pdfDoc.getForm()
  
    const nameField = form.getTextField('CharacterName 2')
    const ageField = form.getTextField('Age')
    const heightField = form.getTextField('Height')
    const weightField = form.getTextField('Weight')
    const eyesField = form.getTextField('Eyes')
    const skinField = form.getTextField('Skin')
    const hairField = form.getTextField('Hair')
  
    const alliesField = form.getTextField('Allies')
    const factionField = form.getTextField('FactionName')
    const backstoryField = form.getTextField('Backstory')
    const traitsField = form.getTextField('Feat+Traits')
    const treasureField = form.getTextField('Treasure')
  
    const characterImageField = form.getButton('CHARACTER IMAGE')
    const factionImageField = form.getButton('Faction Symbol Image')
  
    nameField.setText('Mario')
    ageField.setText('24 years')
    heightField.setText(`5' 1"`)
    weightField.setText('196 lbs')
    eyesField.setText('blue')
    skinField.setText('white')
    hairField.setText('brown')
  
    characterImageField.setImage(marioImage)
  
    alliesField.setText(
      [
        `Allies:`,
        `  • Princess Daisy`,
        `  • Princess Peach`,
        `  • Rosalina`,
        `  • Geno`,
        `  • Luigi`,
        `  • Donkey Kong`,
        `  • Yoshi`,
        `  • Diddy Kong`,
        ``,
        `Organizations:`,
        `  • Italian Plumbers Association`,
      ].join('\n'),
    )
  
    factionField.setText(`Mario's Emblem`)
  
    factionImageField.setImage(emblemImage)
  
    backstoryField.setText(
      [
        `Mario is a fictional character in the Mario video game franchise, `,
        `owned by Nintendo and created by Japanese video game designer Shigeru `,
        `Miyamoto. Serving as the company's mascot and the eponymous `,
        `protagonist of the series, Mario has appeared in over 200 video games `,
        `since his creation. Depicted as a short, pudgy, Italian plumber who `,
        `resides in the Mushroom Kingdom, his adventures generally center `,
        `upon rescuing Princess Peach from the Koopa villain Bowser. His `,
        `younger brother and sidekick is Luigi.`,
      ].join('\n'),
    )
  
    traitsField.setText(
      [
        `Mario can use three basic three power-ups:`,
        `  • the Super Mushroom, which causes Mario to grow larger`,
        `  • the Fire Flower, which allows Mario to throw fireballs`,
        `  • the Starman, which gives Mario temporary invincibility`,
      ].join('\n'),
    )
  
    treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function flattenForm() {
    const formUrl = 'https://pdf-lib.js.org/assets/form_to_flatten.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(formPdfBytes)
  
    const form = pdfDoc.getForm()
  
    form.getTextField('Text1').setText('Some Text');
    form.getRadioGroup('Group2').select('Choice1');
    form.getRadioGroup('Group3').select('Choice3');
    form.getRadioGroup('Group4').select('Choice1');
    form.getCheckBox('Check Box3').check();
    form.getCheckBox('Check Box4').uncheck();
    form.getDropdown('Dropdown7').select('Infinity');
    form.getOptionList('List Box6').select('Honda');
  
    form.flatten();
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }


  async function copyPages() {
    const url1 = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const url2 = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf'
  
    const firstDonorPdfBytes = await fetch(url1).then(res => res.arrayBuffer())
    const secondDonorPdfBytes = await fetch(url2).then(res => res.arrayBuffer())
  
    const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes)
    const secondDonorPdfDoc = await PDFDocument.load(secondDonorPdfBytes)
  
    const pdfDoc = await PDFDocument.create();
  
    const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0])
    const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [742])
  
    pdfDoc.addPage(firstDonorPage)
    pdfDoc.insertPage(0, secondDonorPage)
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function embedImages() {
    const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
    const pngUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png'
  
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.create()
  
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const pngImage = await pdfDoc.embedPng(pngImageBytes)
  
    const jpgDims = jpgImage.scale(0.5)
    const pngDims = pngImage.scale(0.5)
  
    const page = pdfDoc.addPage()
  
    page.drawImage(jpgImage, {
      x: page.getWidth() / 2 - jpgDims.width / 2,
      y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
      width: jpgDims.width,
      height: jpgDims.height,
    })
    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - pngDims.width / 2 + 75,
      y: page.getHeight() / 2 - pngDims.height + 250,
      width: pngDims.width,
      height: pngDims.height,
    })
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function embedPdfPages() {
    const flagUrl = 'https://pdf-lib.js.org/assets/american_flag.pdf';
    const constitutionUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';
  
    const flagPdfBytes = await fetch(flagUrl).then((res) => res.arrayBuffer());
    const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
      res.arrayBuffer(),
    );
  
    const pdfDoc = await PDFDocument.create();
  
    const [americanFlag] = await pdfDoc.embedPdf(flagPdfBytes);
  
    const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);
    const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
      left: 55,
      bottom: 485,
      right: 300,
      top: 575,
    });
  
    const americanFlagDims = americanFlag.scale(0.3);
    const preambleDims = preamble.scale(2.25);
  
    const page = pdfDoc.addPage();
  
    page.drawPage(americanFlag, {
      ...americanFlagDims,
      x: page.getWidth() / 2 - americanFlagDims.width / 2,
      y: page.getHeight() - americanFlagDims.height - 150,
    });
    page.drawPage(preamble, {
      ...preambleDims,
      x: page.getWidth() / 2 - preambleDims.width / 2,
      y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
    });
  
    const pdfBytes = await pdfDoc.save();

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function embedFontAndMeasureText() {
    const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
    const fontBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.create()
  
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)
  
    const page = pdfDoc.addPage()
  
    const text = 'This is text in an embedded font!'
    const textSize = 35
    const textWidth = customFont.widthOfTextAtSize(text, textSize)
    const textHeight = customFont.heightAtSize(textSize)
  
    page.drawText(text, {
      x: 40,
      y: 450,
      size: textSize,
      font: customFont,
      color: rgb(0, 0.53, 0.71),
    })
    page.drawRectangle({
      x: 40,
      y: 450,
      width: textWidth,
      height: textHeight,
      borderColor: rgb(1, 0, 0),
      borderWidth: 1.5,
    })
  
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function addAttachments() {
    const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
    const pdfUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';
  
    const jpgAttachmentBytes = await fetch(jpgUrl).then(res => res.arrayBuffer())
    const pdfAttachmentBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())
    
    const pdfDoc = await PDFDocument.create()
    
    await pdfDoc.attach(jpgAttachmentBytes, 'cat_riding_unicorn.jpg', {
      mimeType: 'image/jpeg',
      description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
      creationDate: new Date('2019/12/01'),
      modificationDate: new Date('2020/04/19'),
    })
    
    await pdfDoc.attach(pdfAttachmentBytes, 'us_constitution.pdf', {
      mimeType: 'application/pdf',
      description: 'Constitution of the United States 🇺🇸🦅',
      creationDate: new Date('1787/09/17'),
      modificationDate: new Date('1992/05/07'),
    })
    
    const page = pdfDoc.addPage();
    page.drawText('This PDF has two attachments', { x: 135, y: 415 })
    
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function setDocumentMetadata() {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
    const page = pdfDoc.addPage([500, 600])
    page.setFont(timesRomanFont)
    page.drawText('The Life of an Egg', { x: 60, y: 500, size: 50 })
    page.drawText('An Epic Tale of Woe', { x: 125, y: 460, size: 25 })
    
    // Note that these fields are visible in the "Document Properties" section of 
    // most PDF readers.
    pdfDoc.setTitle('🥚 The Life of an Egg 🍳')
    pdfDoc.setAuthor('Humpty Dumpty')
    pdfDoc.setSubject('📘 An Epic Tale of Woe 📖')
    pdfDoc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men'])
    pdfDoc.setProducer('PDF App 9000 🤖')
    pdfDoc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)')
    pdfDoc.setCreationDate(new Date('2018-06-24T01:58:37.228Z'))
    pdfDoc.setModificationDate(new Date('2019-12-21T07:00:11.000Z'))
    
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }

  async function readDocumentMetadata() {
    const url = 'https://pdf-lib.js.org/assets/with_cropbox.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
      updateMetadata: false 
    })
    
    console.log('Title:', pdfDoc.getTitle())
    console.log('Author:', pdfDoc.getAuthor())
    console.log('Subject:', pdfDoc.getSubject())
    console.log('Creator:', pdfDoc.getCreator())
    console.log('Keywords:', pdfDoc.getKeywords())
    console.log('Producer:', pdfDoc.getProducer())
    console.log('Creation Date:', pdfDoc.getCreationDate())
    console.log('Modification Date:', pdfDoc.getModificationDate())
  }


  async function drawSvgPaths() {
    const svgPath =
      'M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90'
    
    const pdfDoc = await PDFDocument.create()
    
    const page = pdfDoc.addPage()
    page.moveTo(100, page.getHeight() - 5)
    
    page.moveDown(25)
    page.drawSvgPath(svgPath)
    
    page.moveDown(200)
    page.drawSvgPath(svgPath, { borderColor: rgb(0, 1, 0), borderWidth: 5 })
    
    page.moveDown(200)
    page.drawSvgPath(svgPath, { color: rgb(1, 0, 0) })
    
    page.moveDown(200)
    page.drawSvgPath(svgPath, { scale: 0.5 })
    
    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'example.pdf';
  
    // Trigger download
    downloadLink.click();
  }


  return (
    <div className="App">
      <div className="main-container">
        <LinkPdfDownload />
        <div>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>generatePdfDocumentHandle("sample_one_test.pdf")}>
          Download generatePdfDocument
        </div>
        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples One</div>
          <ReactToPDFExampleOne />
        </div>
        {/* <div className="w-[100%] pt-[20px] pb-[20px]">
          <div>react-pdf-renderer-examples</div>
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <ReactPdfRendererExampleTwo />
          </div>
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <ReactPdfRendererExampleOne />
          </div>
        </div> */}

          <div className="w-[100%] pt-[20px] pb-[20px]">
          <div>markdown-to-pdf-examples</div>
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <MarkdownToPdfEcampleOne />
          </div>
          <br />
          <div className="w-[100%] pt-[20px] pb-[20px]">
            <MarkdownToPdfEcampleTwo />
          </div>
        </div>



        <div className="w-[100%] pt-[20px] pb-[20px]">
          <div> pdf-lib Examples</div>
          <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>markdownPdfDownload(markdownTextData)}>
          Download markdownPdfDownload
        </div>
        <br/>

        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>createPdf()}>
          Download createPdf
        </div>
        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>modifyPdf()}>
          Download modifyPdf
        </div>

          <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>createForm()}>
          Download createForm
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>fillForm()}>
          Download fillForm
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>flattenForm()}>
          Download flattenForm
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>copyPages()}>
          Download copyPages
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>embedImages()}>
          Download embedImages
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>embedPdfPages()}>
          Download embedPdfPages
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>embedFontAndMeasureText()}>
          Download embedFontAndMeasureText
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>addAttachments()}>
          Download addAttachments
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>setDocumentMetadata()}>
          Download setDocumentMetadata
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>readDocumentMetadata()}>
          Download readDocumentMetadata
        </div>

        <br/>
        <div className="mt-[50px] cursor-pointer p-[20px] inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>drawSvgPaths()}>
          Download drawSvgPaths
        </div>



        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples Two</div>
          <ReactToPDFExampleTwo />
        </div>

        <div className="mt-[20px]">
          <div className="pt-[10] pb-[10px] text-[16px] font-bold">react-to-pdf-examples Three</div>
          <ReactToPDFExampleThree />
        </div>
      </div>
    </div>
  );
};

export default Home;
