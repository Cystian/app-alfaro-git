import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  // Limpia el blob URL cuando cambie o al desmontar
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // Convierte imágenes externas en Base64 (asegurando CORS)
  const toBase64 = async (url) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Error cargando imagen:", err);
      return null;
    }
  };

  // Sanitiza el nombre del archivo PDF
  const safeFileName = (name) =>
    name ? name.replace(/[<>:"/\\|?*]+/g, "").trim() : "brochure";

  const generatePDF = async () => {
    setGenerating(true);
    setError(null);

    try {
      const doc = new jsPDF();
      let y = 20;

      // Título
      doc.setFontSize(18);
      doc.text(property.title || "Brochure de Propiedad", 20, y);
      y += 15;

      // Descripción
      if (property.description) {
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(property.description, 170);
        doc.text(splitText, 20, y);
        y += splitText.length * 7 + 10;
      }

      // Imagen principal
      if (property.image) {
        const base64Img = await toBase64(property.image);
        if (base64Img) {
          doc.addImage(base64Img, "JPEG", 20, y, 160, 90);
          y += 100;
        }
      }

      // Sub-propiedades
      if (subProperties.length > 0) {
        doc.setFontSize(14);
        doc.text("Sub-Propiedades", 20, y);
        y += 10;

        subProperties.forEach((sp, index) => {
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${sp.title}`, 25, y);
          y += 7;

          if (sp.description) {
            const splitText = doc.splitTextToSize(sp.description, 150);
            doc.text(splitText, 30, y);
            y += splitText.length * 7 + 5;
          }

          if (sp.image) {
            y += 5;
            doc.addPage();
            const base64Img = await toBase64(sp.image);
            if (base64Img) {
              doc.addImage(base64Img, "JPEG", 20, 20, 160, 90);
              y = 120;
            }
          }
        });
      }

      // Datos del flyer
      if (flyerData) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text("Información del Flyer", 20, 20);
        y = 35;

        Object.entries(flyerData).forEach(([key, value]) => {
          doc.setFontSize(12);
          doc.text(`${key}: ${value}`, 20, y);
          y += 7;
        });
      }

      // Generar el PDF (fix seguro con blob + ObjectURL)
      const fileName = `${safeFileName(property.title)}_brochure.pdf`;
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // Descargar automáticamente
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
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
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {generating ? "Generando..." : "📄 Descargar Brochure"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {pdfUrl && (
        <p className="mt-2">
          ✅ Brochure generado:{" "}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Ver PDF
          </a>
        </p>
      )}
    </div>
  );
};

export default PropertyBrochure;


