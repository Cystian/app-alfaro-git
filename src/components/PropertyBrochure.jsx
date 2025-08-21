// src/components/PropertyBrochure.jsx
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const [generating, setGenerating] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [base64MainImage, setBase64MainImage] = useState(null);
  const [base64SubImages, setBase64SubImages] = useState([]);

  // Convierte imagen remota a base64
  const fetchImageAsBase64 = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo cargar la imagen: " + url);
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error(err);
      return "https://via.placeholder.com/400x300.png?text=Imagen+no+disponible";
    }
  };

  // Convierte todas las imágenes al cargar
  useEffect(() => {
    const convertImages = async () => {
      setLoadingImages(true);
      const mainImg = await fetchImageAsBase64(property.image || "");
      setBase64MainImage(mainImg);

      const subImgs = await Promise.all(
        subProperties.map(async (sub) => await fetchImageAsBase64(sub.image || ""))
      );
      setBase64SubImages(subImgs);
      setLoadingImages(false);
    };
    convertImages();
  }, [property.image, subProperties]);

  const generatePDF = async () => {
    if (loadingImages) {
      alert("⚠️ Las imágenes aún se están cargando. Por favor espera...");
      return;
    }

    setGenerating(true);
    try {
      const element = document.getElementById("flyer-preview");
      if (!element) {
        alert("⚠️ No se encontró el contenido del flyer.");
        setGenerating(false);
        return;
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

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

  if (loadingImages) {
    return <p className="text-center py-8">Cargando imágenes del flyer...</p>;
  }

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={generating || loadingImages}
        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center mb-4"
      >
        {generating ? "Generando PDF..." : "📄 Descargar Flyer"}
      </button>

      {/* Flyer visible en el modal */}
      <div
        id="flyer-preview"
        className="p-4 border rounded-lg bg-gray-50"
      >
        <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px" }}>
          {property.title}
        </h1>
        <p style={{ marginBottom: "8px" }}>{property.description}</p>
        {flyerData?.texto_flyer && (
          <p style={{ marginBottom: "10px" }}>{flyerData.texto_flyer}</p>
        )}

        {base64MainImage && (
          <img
            src={base64MainImage}
            alt={property.title}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        )}

        {subProperties.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
              Subpropiedades:
            </h2>
            {subProperties.map((sub, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <p>{sub.content}</p>
                {base64SubImages[idx] && (
                  <img
                    src={base64SubImages[idx]}
                    alt={sub.content}
                    style={{ width: "100%", marginTop: "5px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyBrochure;

