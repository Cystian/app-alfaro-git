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
  const doc = new jsPDF();

  // Logo (si lo tienes en /public/logo.png)
  try {
    const logoBase64 = await getBase64FromUrl("/logo.png");
    doc.addImage(logoBase64, "PNG", 15, 10, 40, 20);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  // Imagen principal
  if (property.image) {
    const base64Main = await getBase64FromUrl(property.image);
    doc.addImage(base64Main, "JPEG", 15, 40, 180, 100);
  }

  // Info principal
  doc.setFontSize(16);
  doc.text(property.title || "Propiedad", 15, 150);
  doc.setFontSize(12);
  doc.text(property.description || "", 15, 160);

  // Datos clave (precio, área, etc.)
  let y = 175;
  if (property.price) {
    doc.text(`Precio: ${property.price}`, 15, y);
    y += 10;
  }
  if (property.area) {
    doc.text(`Área: ${property.area} m²`, 15, y);
    y += 10;
  }
  if (property.bedrooms) {
    doc.text(`Dormitorios: ${property.bedrooms}`, 15, y);
    y += 10;
  }
  if (property.bathrooms) {
    doc.text(`Baños: ${property.bathrooms}`, 15, y);
    y += 10;
  }
  if (property.location) {
    doc.text(`Ubicación: ${property.location}`, 15, y);
  }

  // Sub propiedades
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
};
