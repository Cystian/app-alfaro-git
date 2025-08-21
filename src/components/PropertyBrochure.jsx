// src/components/PropertyBrochure.jsx
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const PropertyBrochure = ({ property = {}, subProperties = [], flyerData = null }) => {
  const flyerRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  // Combinar imagen principal + subpropiedades
  const allImages = [
    { src: property.image, caption: property.title },
    ...subProperties.map((sub) => ({ src: sub.image, caption: sub.content })),
  ];

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const element = flyerRef.current;
      if (!element) throw new Error("No se encontró el contenido del flyer");

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

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={generating}
        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center mb-4"
      >
        {generating ? "Generando..." : "📄 Descargar Flyer"}
      </button>

      <div
        ref={flyerRef}
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>{property.title}</h1>
        <p>{property.description}</p>
        {flyerData?.texto_flyer && <p style={{ marginTop: "10px" }}>{flyerData.texto_flyer}</p>}

        {/* Carrusel interno */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          className="mt-4"
        >
          {allImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img.src || "https://via.placeholder.com/400x300.png?text=Imagen"}
                alt={img.caption}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p className="mt-2 text-sm text-gray-700">{img.caption}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertyBrochure;


