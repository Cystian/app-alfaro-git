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

  // 🔹 Función para obtener URL absoluta de /public
  const getPublicUrl = (fileName) => `${window.location.origin}/${fileName}`;

  let y = 20;

  // Logo
  try {
    const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
    doc.addImage(logoBase64, "PNG", 15, y, 40, 20);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  y += 30;

  // Imagen principal
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.addImage(base64Main, "JPEG", 15, y, 180, 100);
    } catch (e) {
      console.warn("No se pudo cargar la imagen principal.");
    }
  }

  y += 110;

  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(property.title || "Propiedad", 15, y);
  y += 10;

  // Descripción
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  if (property.description) {
    const descLines = doc.splitTextToSize(property.description, 180);
    doc.text(descLines, 15, y);
    y += descLines.length * 6;
  }

  y += 5;

  // Función auxiliar para agregar ícono + texto
  const addIconText = async (iconFile, text, x = 15, yPos = y) => {
    try {
      const base64Icon = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.addImage(base64Icon, "PNG", x, yPos - 4, 6, 6);
      doc.text(text, x + 10, yPos);
      return yPos + 10;
    } catch (e) {
      doc.text(text, x, yPos);
      return yPos + 10;
    }
  };

  // Datos clave 
  if (property.price) y = await addIconText("precio.png", `Precio: S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, 15, y);
  if (property.area) y = await addIconText("area.png", `Área: ${property.area} m²`, 15, y);
  if (property.bedrooms) y = await addIconText("dormi.png", `Dormitorios: ${property.bedrooms}`, 15, y);
  if (property.bathrooms) y = await addIconText("bano.png", `Baños: ${property.bathrooms}`, 15, y);
  if (property.location) y = await addIconText("maps.png", `Ubicación: ${property.location}`, 15, y);

  // Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    y = 20;

    // Imagen subpropiedad
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.addImage(base64Sub, "JPEG", 15, y, 180, 100);
      } catch (e) {
        console.warn("No se pudo cargar la imagen de subpropiedad.");
      }
    }

    y += 110;

    // Título subpropiedad
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, 15, y);
    y += 8;

    // Descripción extra (text_content)
    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(sub.text_content, 180);
      doc.text(lines, 15, y);
      y += lines.length * 6;
    }

    // Información adicional (opcional, ejemplo: content)
    if (sub.content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      const lines = doc.splitTextToSize(sub.content, 180);
      doc.text(lines, 15, y);
      y += lines.length * 6;
    }
  }

  // Guardar PDF
  doc.save(`${property.title || "propiedad"}.pdf`);
};
