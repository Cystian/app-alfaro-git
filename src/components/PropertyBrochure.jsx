import React, { useEffect, useState } from "react";

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

  const safeFileName = (text) =>
    (text || "propiedad")
      .toString()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();

  // Convierte una URL en Base64 para jsPDF
  const toBase64 = (url) =>
    fetch(url, { mode: "cors" }) // importante si está en otro dominio
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  const generatePDF = async () => {
    setGenerating(true);
    setError(null);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF("p", "mm", "a4");
      let yPos = 20;

      // ===== Portada =====
      doc.setFontSize(26);
      doc.setTextColor(40, 40, 120);
      doc.text("Brochure Inmobiliario", 105, yPos, { align: "center" });
      yPos += 20;

      if (property.image) {
        try {
          const imgData = await toBase64(property.image); // convierte URL
          doc.addImage(imgData, "JPEG", 20, yPos, 170, 90);
          yPos += 100;
        } catch (err) {
          console.error("Error agregando imagen de portada:", err);
        }
      }

      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.text(property.title || "Propiedad", 20, yPos);
      yPos += 10;

      doc.setFontSize(14);
      doc.setTextColor(80, 80, 80);
      doc.text(`📍 Ubicación: ${property.location || "N/D"}`, 20, yPos);
      yPos += 8;
      doc.text(`💰 Precio: ${property.price || "Consultar"}`, 20, yPos);
      yPos += 15;

      // ===== Características =====
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 120);
      doc.text("Características", 20, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const features = [
        ["Área total", property.area ? `${property.area} m²` : "N/D"],
        ["Dormitorios", property.rooms ?? property.bedrooms ?? "N/D"],
        ["Baños", property.bathrooms ?? "N/D"],
        ["Estado", property.status || "Disponible"],
      ];

      features.forEach(([label, value]) => {
        doc.text(`✔ ${label}: ${value}`, 25, yPos);
        yPos += 7;
      });

      yPos += 10;

      // ===== Descripción / flyerData =====
      if (flyerData?.texto_flyer) {
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 120);
        doc.text("Descripción", 20, yPos);
        yPos += 8;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const splitText = doc.splitTextToSize(flyerData.texto_flyer, 170);
        doc.text(splitText, 20, yPos);
        yPos += splitText.length * 6 + 10;
      }

      // ===== Galería =====
      if (subProperties?.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 120);
        doc.text("Galería", 20, yPos);
        yPos += 10;

        for (const sp of subProperties) {
          if (yPos > 230) {
            doc.addPage();
            yPos = 20;
          }
          if (sp.image) {
            try {
              const imgData = await toBase64(sp.image); // convierte URL
              doc.addImage(imgData, "JPEG", 20, yPos, 160, 80);
              yPos += 85;
            } catch (err) {
              console.error("Error cargando imagen:", err);
            }
          }
          if (sp.content) {
            const contentSplit = doc.splitTextToSize(sp.content, 170);
            doc.text(contentSplit, 20, yPos);
            yPos += contentSplit.length * 6 + 10;
          }
        }
      }

      // ===== Footer / contacto =====
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }
      doc.setDrawColor(40, 40, 120);
      doc.line(20, yPos, 190, yPos);
      yPos += 10;

      doc.setFontSize(14);
      doc.setTextColor(40, 40, 120);
      doc.text("Contáctanos:", 20, yPos);
      yPos += 8;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("📱 WhatsApp: +51 999 999 999", 20, yPos);
      yPos += 6;
      doc.text("✉ Email: contacto@inmobiliaria.com", 20, yPos);
      yPos += 6;
      doc.text("🌐 www.inmobiliaria.com", 20, yPos);

      // ===== Generar bloburl + descarga automática =====
      const fileName = `${safeFileName(property.title)}_brochure.pdf`;
      const url = doc.output("bloburl");
      setPdfUrl(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      setError("No se pudo generar el PDF.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={generatePDF}
        disabled={generating}
        className={`flex-1 py-2 px-4 rounded-lg text-center text-white transition ${
          generating ? "bg-blue-300 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {generating ? "Generando..." : "📄 Descargar Brochure"}
      </button>

      {/* Enlace visible de respaldo */}
      {pdfUrl && (
        <div className="text-sm text-gray-600">
          <a
            href={pdfUrl}
            download={`${safeFileName(property.title)}_brochure.pdf`}
            className="text-blue-600 underline mr-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Si no se descargó, haz clic aquí
          </a>
          <span className="text-gray-400">|</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-3"
          >
            Ver en otra pestaña
          </a>
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default PropertyBrochure;


