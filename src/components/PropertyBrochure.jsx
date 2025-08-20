// src/components/PropertyBrochure.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const generatePDF = async () => {
    try {
      setGenerating(true);
      setError(null);

      // Captura el contenido del div
      const input = document.getElementById("brochure-content");
      if (!input) {
        throw new Error("No se encontró el contenido del folleto.");
      }

      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Ajuste de la imagen al tamaño de la página
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      if (imgHeight > pageHeight) {
        // Si es más grande, agregar varias páginas
        let heightLeft = imgHeight;
        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            position = -pageHeight;
          }
        }
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      const blobUrl = URL.createObjectURL(pdf.output("blob"));
      setPdfUrl(blobUrl);
    } catch (err) {
      console.error("Error generando PDF:", err);
      setError("Ocurrió un error al generar el PDF.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4">
      <div
        id="brochure-content"
        className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-4">{property?.title || "Propiedad"}</h2>
        <p className="mb-2">{property?.description || "Sin descripción."}</p>

        {subProperties?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Subpropiedades:</h3>
            <ul className="list-disc pl-6">
              {subProperties.map((sub, index) => (
                <li key={index}>{sub?.title || "Subpropiedad"}</li>
              ))}
            </ul>
          </div>
        )}

        {flyerData && (
          <div className="mt-4">
            <h3 className="font-semibold">Flyer:</h3>
            <img src={flyerData} alt="Flyer" className="w-full rounded-lg border" />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={generatePDF}
          disabled={generating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {generating ? "Generando..." : "Generar PDF"}
        </button>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download="brochure.pdf"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Descargar PDF
          </a>
        )}
      </div>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default PropertyBrochure;

