// src/utils/pdfGenerator.js
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

export const generatePropertyPdf = async (property, subProperties = []) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const getPublicUrl = (fileName) => `${window.location.origin}/${fileName}`;
  let y = margin;

  // 🔹 Encabezado
  try {
    const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
    doc.addImage(logoBase64, "PNG", margin, y, 60, 30);
  } catch {
    console.warn("No se pudo cargar el logo.");
  }

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(property.title || "Propiedad", 200, y + 20, { align: "center" });
  y += 50;

  // 🔹 Imagen principal con borde
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.setDrawColor(200);
      doc.setLineWidth(1);
      doc.rect(margin, y - 5, 500, 250, "S"); // borde
      doc.addImage(base64Main, "JPEG", margin, y, 500, 250);
    } catch {
      console.warn("No se pudo cargar la imagen principal.");
    }
  }
  y += 270;

  // 🔹 Descripción
  if (property.description) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(property.description, 500);
    doc.text(descLines, margin, y);
    y += descLines.length * 14 + 10;
  }

  // 🔹 Función para íconos + texto
  const addIconText = async (iconFile, label, value, x = margin, yPos = y) => {
    try {
      const iconBase64 = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.addImage(iconBase64, "PNG", x, yPos - 5, 12, 12);
    } catch {}
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label + ":", x + 18, yPos + 3);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 60, 120);
    doc.text(String(value), x + 80, yPos + 3);
    doc.setTextColor(0, 0, 0);
    return yPos + 20;
  };

  // 🔹 Ficha técnica en tarjeta premium
  const fichaData = [
    { icon: "precio.png", label: "Precio", value: property.price ? `S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}` : "-" },
    { icon: "area.png", label: "Área", value: property.area ? `${property.area} m²` : "-" },
    { icon: "dormi.png", label: "Dormitorios", value: property.bedrooms ?? "-" },
    { icon: "bano.png", label: "Baños", value: property.bathrooms ?? "-" },
    { icon: "maps.png", label: "Ubicación", value: property.location ?? "-" },
  ];

  // Fondo de tarjeta
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin - 5, y - 5, 510, fichaData.length * 22 + 10, 5, 5, "F");

  for (const item of fichaData) {
    y = await addIconText(item.icon, item.label, item.value, margin, y);
  }

  y += 20;

  // 🔹 Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    y = margin;

    // Imagen con borde
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.setDrawColor(200);
        doc.setLineWidth(1);
        doc.rect(margin, y - 5, 500, 200, "S");
        doc.addImage(base64Sub, "JPEG", margin, y, 500, 200);
      } catch {}
    }
    y += 210;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, margin, y);
    y += 15;

    if (sub.text_content) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(sub.text_content, 500);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 5;
    }

    if (sub.content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      const lines = doc.splitTextToSize(sub.content, 500);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 5;
    }
  }

  doc.save(`${property.title || "propiedad"}.pdf`);
};
