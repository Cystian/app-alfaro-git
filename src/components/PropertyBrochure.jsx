// src/components/PropertyBrochure.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";

const getBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const PropertyBrochure = ({ property = {}, subProperties = [] }) => {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generatePdf = async () => {
    try {
      setGenerating(true);
      const doc = new jsPDF();

      // Imagen principal
      if (property.image) {
        const base64Main = await getBase64FromUrl(property.image);
        doc.addImage(base64Main, "JPEG", 15, 20, 180, 100);
      }

      // Texto principal
      doc.text(property.title || "Propiedad", 15, 140);
      doc.text(property.description || "", 15, 150);

      // Sub propiedades en nuevas páginas
      for (let i = 0; i < subProperties.length; i++) {
        const sub = subProperties[i];
        if (sub.image) {
          doc.addPage();
          const base64Sub = await getBase64FromUrl(sub.image);
          doc.addImage(base64Sub, "JPEG", 15, 20, 180, 100);
          doc.text(sub.title || `Sub Propiedad ${i + 1}`, 15, 140);
        }
      }

      doc.save(`${property.title || "propiedad"}.pdf`);
    } catch (err) {
      console.error("Error generando PDF", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      {/* Botón para abrir popup */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Ver Detalles
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 relative">
            {/* Cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            {/* Carrusel de imágenes */}
            <div className="relative w-full h-80 overflow-hidden rounded-xl mb-4">
              <div className="flex w-full h-full overflow-x-auto space-x-2 scrollbar-hide">
                <img
                  src={property.image}
                  alt="Principal"
                  className="w-full h-full object-cover flex-shrink-0 rounded-xl"
                />
                {subProperties.map((sub, idx) => (
                  <img
                    key={idx}
                    src={sub.image}
                    alt={`Sub ${idx + 1}`}
                    className="w-full h-full object-cover flex-shrink-0 rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
            <p className="text-gray-600">{property.description}</p>

            {/* Botón PDF */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={generatePdf}
                disabled={generating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              >
                {generating ? "Generando..." : "Descargar PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyBrochure;

