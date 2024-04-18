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
import CustomPDFViewer from "./CustomPDFViewer";
import PDFTable from "./PDFTable";

const tableData = [
  {
    id: 1,
    name: "Yasmine Kihn",
    gender: "female",
    phone: "8354650298",
  },
  {
    id: 2,
    name: "Moriah Pollich",
    gender: "female",
    phone: "7854389123",
  },
  {
    id: 3,
    name: "Bernie Goodwin",
    gender: "male",
    phone: "9756893422",
  },
];


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
    height:600,
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
  },
});

// Create Document Component
function ReactPdfRendererExampleTwo() {
  return (
    <CustomPDFViewer id="viewer">
      <Document>
      <Page size="A4">
    <Text
      style={styles.text}
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
      fixed
    />
  </Page>
  <Page>
    <Text> Hello, second page!</Text>
  </Page>

        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Hello</Text>
          </View>
          <View style={styles.section}>
            <Text>World</Text>
          </View>
          <View style={styles.section}>
              <Link src="www.facebook.com">Go to Facebook</Link>
              
          </View>
          <Text> <Note>This will take the user to Facebook</Note></Text>
          <Canvas
            style={styles.canvas}
            paint={
              (painterObject) =>
                painterObject
                  .save()
                  .moveTo(100, 100) //move to position 100,100
                  .lineTo(300, 100) //draw a line till 300, 100
                  .lineTo(300, 300) //draw another line till 300,300
                  .fill("red") //when the diagram is drawn, set the background color to pink
            }
          />
          <View>
          <Svg width={"50%"} height={"50%"} style={{ backgroundColor: "blue" }}>
            <Line style={styles.line} />
          </Svg>
          </View>
          <Svg width={"50%"} height={"50%"} style={{ backgroundColor: "blue" }}>
            <Polygon
              points="100,100 200,100 200,250 100,250"
              fill="white" //color of background
              stroke="black" //color of border
              strokeWidth={10} //border thickness
            />
          </Svg>
          <Image
  style={styles.image}
  src="https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
/> 

{/* not showing */}
<Image src={{ uri: "https://reactjs.org/logo-og.png", method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} />
          
<View style={{ backgroundColor: "black", flex: 1 }}></View>
  <View style={(styles.section, { backgroundColor: "pink", flex: 1 })}></View>

  <Text break style={styles.text}>
    First PDF break
  </Text>
  <Text break style={styles.text}>
    Second break
  </Text>
        </Page>

        <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>My Enhanced PDF</Text>
          <PDFTable
            tableHeaders={[
              { title: "Name", value: "name" },
              { title: "Gender", value: "gender" },
              { title: "Phone", value: "phone" },
            ]}
            data={tableData}
            heading="Employee Details"
          />
        </View>
      </Page>
      <Page style={styles.page} size="A4">
      {/* <Svg viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="40"
          fill="tomato"
          stroke="gray"
        />
      </Svg> */}
    </Page>
      </Document>
      </CustomPDFViewer>
    
  );
}
export default ReactPdfRendererExampleTwo;