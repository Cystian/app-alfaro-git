import React, { useState } from "react";
import { jsPDF } from "jspdf";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 Convierte URL a Base64 usando un <img>
  const toDataUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // clave para evitar CORS
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };

      img.onerror = () => {
        console.error("❌ Error cargando imagen:", url);
        resolve(null); // No rompe el PDF, solo omite la imagen
      };
    });
  };

  const generatePDF = async () => {
    try {
      setGenerating(true);
      setError(null);
      setPdfUrl(null);

      const doc = new jsPDF();
      let y = 20;

      doc.setFontSize(18);
      doc.text(property.title || "Brochure de Propiedad", 20, y);
      y += 10;

      doc.setFontSize(12);
      doc.text(property.description || "Sin descripción disponible.", 20, y);
      y += 20;

      // 🔹 Imagen principal
      if (property.image) {
        const base64Img = await toDataUrl(property.image);
        if (base64Img) {
          doc.addImage(base64Img, "JPEG", 20, y, 160, 90);
          y += 100;
        }
      }

      // 🔹 Subpropiedades
      for (const sp of subProperties) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text(sp.name || "SubPropiedad", 20, 20);

        if (sp.image) {
          const base64Img = await toDataUrl(sp.image);
          if (base64Img) {
            doc.addImage(base64Img, "JPEG", 20, 30, 160, 90);
          }
        }
      }

      // 🔹 Generar blob y URL
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } catch (err) {
      console.error("Error generando PDF:", err);
      setError("No se pudo generar el PDF.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={generating}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {generating ? "Generando..." : "📄 Descargar Brochure"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {pdfUrl && (
        <a
          href={pdfUrl}
          download="brochure.pdf"
          className="block mt-4 text-blue-600 underline"
        >
          📥 Descargar PDF
        </a>
      )}
    </div>
  );
};

export default PropertyBrochure;

