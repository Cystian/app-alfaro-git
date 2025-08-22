// src/components/PropertyBrochure.jsx
import React, { useState } from "react";
import { generatePropertyPdf } from "../utils/pdfGenerator";

const PropertyBrochure = ({ property = {}, subProperties = [] }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setGenerating(true);
      await generatePropertyPdf(property, subProperties);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el flyer. Inténtalo nuevamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className={`px-5 py-2.5 rounded-lg shadow-md font-medium transition 
        ${generating 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-blue-600 hover:bg-blue-700 text-white"}`}
    >
      {generating ? "Generando flyer..." : "📄 Descargar Flyer"}
    </button>
  );
};

export default PropertyBrochure;


