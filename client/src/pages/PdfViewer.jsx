import React from "react";

import { useSearchParams } from "react-router-dom";

export default function PdfViewer() {
  const [searchParams] = useSearchParams();

  const url = searchParams.get("url");

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#111827",
      }}
    >
      <iframe
        src={url}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{
          border: "none",
        }}
      />
    </div>
  );
}
