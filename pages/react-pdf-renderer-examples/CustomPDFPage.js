"use client";

import dynamic from "next/dynamic";

const CustomPDFPage = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.Page),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default CustomPDFPage;