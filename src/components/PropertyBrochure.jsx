// src/components/PropertyBrochure.jsx
import React, { useState } from "react";
import { generatePropertyPdf } from "../utils/pdfGenerator";

const PropertyBrochure = ({ property = {}, subProperties = [] }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    await generatePropertyPdf(property, subProperties);
    setGenerating(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
    >
      {generating ? "Generando..." : "Descargar Flyer"}
    </button>
  );
};

export default PropertyBrochure;


