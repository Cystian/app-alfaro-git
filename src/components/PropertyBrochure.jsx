// src/components/PropertyBrochure.jsx
import React from "react";

const PropertyBrochure = ({ property, subProperties, flyerData }) => {
  const generatePDF = async () => {
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
        doc.addImage(property.image, "JPEG", 20, yPos, 170, 90);
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

    // ===== Tabla de características =====
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 120);
    doc.text("Características", 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const features = [
      ["Área total", `${property.area || "N/D"} m²`],
      ["Dormitorios", property.rooms || "N/D"],
      ["Baños", property.bathrooms || "N/D"],
      ["Estado", property.status || "Disponible"],
    ];

    features.forEach(([label, value]) => {
      doc.text(`✔ ${label}: ${value}`, 25, yPos);
      yPos += 7;
    });

    yPos += 10;

    // ===== Texto promocional =====
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

    // ===== Subpropiedades (galería de fotos) =====
    if (subProperties?.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 120);
      doc.text("Galería", 20, yPos);
      yPos += 10;

      subProperties.forEach((sp) => {
        if (yPos > 230) {
          doc.addPage();
          yPos = 20;
        }

        if (sp.image) {
          try {
            doc.addImage(sp.image, "JPEG", 20, yPos, 160, 80);
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
      });
    }

    // ===== Footer con branding =====
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

    // Marca corporativa
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Inmobiliaria Alfaro © 2025 - Todos los derechos reservados", 20, yPos);

    doc.save(`${property.title || "propiedad"}_brochure.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex-1 py-2 px-4 rounded-lg text-center text-white bg-blue-600 hover:bg-blue-700 transition"
    >
      📄 Descargar Brochure
    </button>
  );
};

export default PropertyBrochure;

