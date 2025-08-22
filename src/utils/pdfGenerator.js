// src/utils/pdfGenerator.js
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

// Íconos en /public/icons
const ICONS = {
  price: "/icons/price.png",
  area: "/icons/area.png",
  bedrooms: "/icons/bedroom.png",
  bathrooms: "/icons/bathroom.png",
  location: "/icons/location.png",
};

export const generatePropertyPdf = async (property, subProperties = []) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  let y = 60;

  // Logo
  try {
    const logoBase64 = await getBase64FromUrl("/logo.png");
    doc.addImage(logoBase64, "PNG", margin, 20, 60, 30);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  // Imagen principal
  if (property.image) {
    const base64Main = await getBase64FromUrl(property.image);
    doc.addImage(base64Main, "JPEG", margin, y, 515, 250);
    y += 260;
  }

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 60, 150);
  doc.text(property.title || "Propiedad", margin, y);
  y += 25;

  // Descripción
  if (property.description) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const descLines = doc.splitTextToSize(property.description, 515);
    doc.text(descLines, margin, y);
    y += descLines.length * 14 + 10;
  }

  // Datos clave con íconos
  const addDataLine = async (label, value, icon) => {
    if (!value) return;
    if (icon) {
      const iconBase64 = await getBase64FromUrl(icon);
      doc.addImage(iconBase64, "PNG", margin, y - 10, 12, 12);
      doc.text(`${label}: ${value}`, margin + 18, y);
    } else {
      doc.text(`${label}: ${value}`, margin, y);
    }
    y += 18;
  };

  await addDataLine("Precio", property.price, ICONS.price);
  await addDataLine("Área", property.area ? `${property.area} m²` : null, ICONS.area);
  await addDataLine("Dormitorios", property.bedrooms, ICONS.bedrooms);
  await addDataLine("Baños", property.bathrooms, ICONS.bathrooms);
  await addDataLine("Ubicación", property.location, ICONS.location);

  // Línea separadora
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, 555, y);
  y += 20;

  // Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];

    doc.addPage();
    y = 60;

    // Imagen subpropiedad
    if (sub.image) {
      const base64Sub = await getBase64FromUrl(sub.image);
      doc.addImage(base64Sub, "JPEG", margin, y, 515, 250);
      y += 260;
    }

    // Título subpropiedad
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 60, 150);
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, margin, y);
    y += 22;

    // Descripción extra
    if (sub.text_content) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const textLines = doc.splitTextToSize(sub.text_content, 515);
      doc.text(textLines, margin, y);
      y += textLines.length * 14;
    }
  }

  // Pie de página con branding
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Página ${p} de ${pageCount}`, margin, 820);
  }

  doc.save(`${property.title || "propiedad"}.pdf`);
};
