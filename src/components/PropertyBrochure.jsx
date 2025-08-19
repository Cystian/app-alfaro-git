import React, { useEffect, useState } from "react";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  // 🔄 Convertir URL externa a Base64
  const toBase64 = async (url) => {
    try {
      console.log("Descargando imagen:", url);
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("❌ Error cargando imagen:", url, err);
      return null;
    }
  };

  // 📄 Generar PDF
  const generatePdf = async () => {
    try {
      setGenerating(true);
      setError(null);

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      // --- Título principal ---
      doc.setFontSize(20);
      doc.text(property.title || "Propiedad", 20, 20);

      // --- Imagen principal ---
      if (property.image) {
        const base64Img = await toBase64(property.image);
        if (base64Img) {
          doc.addImage(base64Img, "JPEG", 20, 30, 160, 90);
        } else {
          console.warn("⚠️ No se pudo cargar imagen principal:", property.image);
        }
      }

      let y = 130;

      // --- Subpropiedades ---
      for (const sp of subProperties) {
        y += 5;
        doc.addPage();
        const base64Img = await toBase64(sp.image);
        if (base64Img) {
          doc.addImage(base64Img, "JPEG", 20, 20, 160, 90);
          doc.text(sp.name || "SubPropiedad", 20, 115);
        } else {
          console.warn("⚠️ No se pudo cargar subpropiedad:", sp.image);
        }
      }

      // --- Información adicional (flyerData) ---
      if (flyerData) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Información del Flyer:", 20, 20);
        doc.setFontSize(12);
        doc.text(flyerData.description || "", 20, 40);
      }

      // --- Generar y guardar URL del PDF ---
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (err) {
      console.error("❌ Error al generar el PDF:", err);
      setError("No se pudo generar el PDF.");
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <div className="p-4">
      <button
        onClick={generatePdf}
        disabled={generating}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {generating ? "Generando..." : "📄 Descargar Brochure"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {pdfUrl && (
        <a
          href={pdfUrl}
          download="brochure.pdf"
          className="text-blue-600 underline mt-2 block"
        >
          Descargar ahora
        </a>
      )}
    </div>
  );
};

export default PropertyBrochure;

