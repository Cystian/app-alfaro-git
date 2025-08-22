// src/components/PropertyBrochure.jsx
import React, { useState } from "react";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  // Limpieza del URL Blob cuando cambie
  React.useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch(`/.netlify/functions/getPropertyFlyer?id=${property.id}`);
      if (!res.ok) throw new Error("Error al generar flyer");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError("No se pudo generar el flyer.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Brochure de la propiedad</h3>

      {/* Si ya hay flyer precargado */}
      {flyerData ? (
        <a
          href={flyerData}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Descargar Flyer
        </a>
      ) : (
        <>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${
              generating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {generating ? "Generando..." : "Generar Flyer"}
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Descargar Flyer
            </a>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default PropertyBrochure;


