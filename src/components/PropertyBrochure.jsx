// src/components/PropertyBrochure.jsx
// src/components/PropertyBrochure.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);

    try {
      const element = document.getElementById("flyer-content");

      if (!element) {
        alert("⚠️ No se encontró el contenido del flyer.");
        setGenerating(false);
        return;
      }

      // Convierte el HTML en canvas
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Crea el PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${property.title || "flyer"}.pdf`);
    } catch (error) {
      console.error("❌ Error generando PDF:", error);
      alert("Error al generar el PDF. Revisa la consola.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      {/* Botón */}
      <button
        onClick={generatePDF}
        disabled={generating}
        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center transition"
      >
        {generating ? "Generando..." : "📄 Descargar Flyer"}
      </button>

      {/* Contenido oculto del flyer */}
      <div
        id="flyer-content"
        style={{ display: "none" }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          {property.title || "Propiedad"}
        </h1>
        <p>{property.description || "Sin descripción"}</p>
        {flyerData?.texto_flyer && (
          <p style={{ marginTop: "10px" }}>{flyerData.texto_flyer}</p>
        )}

        <img
          src={property.image || "https://via.placeholder.com/400x300.png?text=Propiedad"}
          alt={property.title}
          style={{ width: "100%", marginTop: "10px" }}
        />

        {subProperties.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
              Subpropiedades:
            </h2>
            {subProperties.map((sub, index) => (
              <div key={index} style={{ marginTop: "5px" }}>
                <p>{sub.name}</p>
                <img
                  src={sub.image || "https://via.placeholder.com/300x200.png?text=Sub"}
                  alt={sub.name}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyBrochure;

