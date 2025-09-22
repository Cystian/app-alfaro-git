// src/utils/pdfGenerator.js
import jsPDF from "jspdf";

// Convierte URL a base64
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
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const getPublicUrl = (fileName) => `${window.location.origin}/${fileName}`;

  let y = 40; // margen superior

  // 🔹 Logo superior izquierdo
  try {
    const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
    doc.addImage(logoBase64, "PNG", 40, y, 60, 30);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  y += 50;

  // 🔹 Imagen principal con sombra simulada
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.setFillColor(245, 245, 245); // sombra gris
      doc.rect(38, y + 2, pageWidth - 80, 260, "F");
      doc.addImage(base64Main, "JPEG", 40, y, pageWidth - 80, 260);
    } catch (e) {
      console.warn("No se pudo cargar la imagen principal.");
    }
  }

  y += 280;

  // 🔹 Título principal
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  doc.text(property.title || "Propiedad", 40, y);
  y += 10;
  // Línea separadora dorada
  doc.setDrawColor(200, 180, 100);
  doc.setLineWidth(1.5);
  doc.line(40, y, pageWidth - 40, y);
  y += 20;

  // 🔹 Función auxiliar para ícono + texto
  const addIconText = async (iconFile, text, x = 40, yPos = y) => {
    try {
      const base64Icon = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.addImage(base64Icon, "PNG", x, yPos - 4, 18, 18);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text(text, x + 25, yPos + 12);
      return yPos + 30;
    } catch (e) {
      doc.text(text, x, yPos);
      return yPos + 30;
    }
  };

  // 🔹 Datos clave
  if (property.price)
    y = await addIconText(
      "precio.png",
      `Precio: S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
      40,
      y
    );
  if (property.area)
    y = await addIconText("area.png", `Área: ${property.area} m²`, 40, y);
  if (property.bedrooms)
    y = await addIconText("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y);
  if (property.bathrooms)
    y = await addIconText("bano.png", `Baños: ${property.bathrooms}`, 40, y);
  if (property.location)
    y = await addIconText("maps.png", `Ubicación: ${property.location}`, 40, y);

  y += 10;

  // 🔹 Descripción general
  if (property.description) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(property.description, pageWidth - 80);
    doc.text(descLines, 40, y);
    y += descLines.length * 16;
  }

  // 🔹 Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    y = 40;

    // Imagen subpropiedad con sombra
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.setFillColor(245, 245, 245);
        doc.rect(38, y + 2, pageWidth - 80, 180, "F");
        doc.addImage(base64Sub, "JPEG", 40, y, pageWidth - 80, 180);
      } catch (e) {
        console.warn("No se pudo cargar la imagen de subpropiedad.");
      }
    }
    y += 200;

    // Título subpropiedad
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, 40, y);
    y += 10;
    doc.setDrawColor(200, 180, 100);
    doc.setLineWidth(1);
    doc.line(40, y, pageWidth - 40, y);
    y += 15;

    // Descripción y contenido adicional
    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14;
    }
    if (sub.content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      const lines = doc.splitTextToSize(sub.content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14;
    }
  }

  // 🔹 Pie de página con contacto y numeración
  const addFooter = (pageNum) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("www.tuempresa.com - contacto@tuempresa.com - +51 999 999 999", 40, pageHeight - 30);
    doc.text(`Página ${pageNum}`, pageWidth - 60, pageHeight - 30);
  };

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  // 🔹 Guardar PDF final
  doc.save(`${property.title || "propiedad"}.pdf`);
};
