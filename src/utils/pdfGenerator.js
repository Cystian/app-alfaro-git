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
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 40;

  // Encabezado con logo
  try {
    const logoBase64 = await getBase64FromUrl("/logo.png");
    doc.addImage(logoBase64, "PNG", margin, 10, 35, 20);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  // Encabezado de empresa
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Inmobiliaria Alfaro", pageWidth - margin - 70, 20);

  // Línea separadora
  doc.setDrawColor(100);
  doc.setLineWidth(0.5);
  doc.line(margin, 32, pageWidth - margin, 32);

  // Imagen principal
  if (property.image) {
    const base64Main = await getBase64FromUrl(property.image);
    doc.addImage(base64Main, "JPEG", margin, y, pageWidth - margin * 2, 90);
    y += 100;
  }

  // Título de la propiedad
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(property.title || "Propiedad", margin, y);
  y += 10;

  // Descripción principal
  if (property.description) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const desc = doc.splitTextToSize(property.description, pageWidth - margin * 2);
    doc.text(desc, margin, y);
    y += desc.length * 6 + 5;
  }

  // Datos clave con estilo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Características:", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  if (property.price) {
    doc.text(`💲 Precio: ${property.price}`, margin, y);
    y += 7;
  }
  if (property.area) {
    doc.text(`📐 Área: ${property.area} m²`, margin, y);
    y += 7;
  }
  if (property.bedrooms) {
    doc.text(`🛏 Dormitorios: ${property.bedrooms}`, margin, y);
    y += 7;
  }
  if (property.bathrooms) {
    doc.text(`🚿 Baños: ${property.bathrooms}`, margin, y);
    y += 7;
  }
  if (property.location) {
    doc.text(`📍 Ubicación: ${property.location}`, margin, y);
    y += 7;
  }

  // Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    y = 30;

    // Imagen de subpropiedad
    if (sub.image) {
      const base64Sub = await getBase64FromUrl(sub.image);
      doc.addImage(base64Sub, "JPEG", margin, y, pageWidth - margin * 2, 90);
      y += 100;
    }

    // Título de la subpropiedad
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, margin, y);
    y += 10;

    // Descripción extra
    if (sub.text_content) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const textLines = doc.splitTextToSize(sub.text_content, pageWidth - margin * 2);
      doc.text(textLines, margin, y);
      y += textLines.length * 6;
    }
  }

  // Pie de página en todas las páginas
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Página ${i} de ${pageCount} | Inmobiliaria Alfaro`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Guardar
  doc.save(`${property.title || "propiedad"}.pdf`);
};
