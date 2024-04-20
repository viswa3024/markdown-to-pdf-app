"use client";

import dynamic from "next/dynamic";

const CustomPDFDocument = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.Document),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default CustomPDFDocument;