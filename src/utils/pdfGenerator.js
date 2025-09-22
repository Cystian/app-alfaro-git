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
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 40;

  // 🔹 Función para obtener URL absoluta de /public
  const getPublicUrl = (fileName) => `${window.location.origin}/${fileName}`;

  // 🔹 Función auxiliar para agregar ícono + texto dentro de tarjeta
  const addIconText = async (iconFile, label, value, x = 40, yPos = y) => {
    const lineHeight = 16;
    try {
      const base64Icon = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.addImage(base64Icon, "PNG", x, yPos - 4, 12, 12);
    } catch (e) {
      console.warn(`No se pudo cargar el icono ${iconFile}`);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${label}:`, x + 18, yPos + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${value}`, x + 60, yPos + 4);
    return yPos + lineHeight;
  };

  // 🔹 Función para agregar separador
  const addSeparator = (yPos) => {
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(40, yPos, pageWidth - 40, yPos);
    return yPos + 10;
  };

  // 🔹 Agregar logo
  try {
    const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
    doc.addImage(logoBase64, "PNG", pageWidth - 100, 20, 60, 30);
  } catch (e) {
    console.warn("No se pudo cargar el logo.");
  }

  // 🔹 Imagen principal
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.addImage(base64Main, "JPEG", 40, y, pageWidth - 80, 200);
    } catch (e) {
      console.warn("No se pudo cargar la imagen principal.");
    }
  }

  y += 210;

  // 🔹 Título de la propiedad
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(50, 50, 50);
  doc.text(property.title || "Propiedad", 40, y);
  y += 25;

  // 🔹 Tarjeta de datos clave (fondo gris)
  doc.setFillColor(245, 245, 245);
  doc.rect(35, y, pageWidth - 70, 100, "F");
  let cardY = y + 15;

  if (property.price) cardY = await addIconText("precio.png", "Precio", `S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, 50, cardY);
  if (property.area) cardY = await addIconText("area.png", "Área", `${property.area} m²`, 50, cardY);
  if (property.bedrooms) cardY = await addIconText("dormi.png", "Dormitorios", `${property.bedrooms}`, 50, cardY);
  if (property.bathrooms) cardY = await addIconText("bano.png", "Baños", `${property.bathrooms}`, 50, cardY);
  if (property.location) cardY = await addIconText("maps.png", "Ubicación", property.location, 50, cardY);

  y = y + 110;

  // 🔹 Separador
  y = addSeparator(y);

  // 🔹 Descripción
  if (property.description) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(property.description, pageWidth - 80);
    doc.text(lines, 40, y);
    y += lines.length * 14 + 10;
  }

  // 🔹 Subpropiedades
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    y = 40;

    // Imagen subpropiedad
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.addImage(base64Sub, "JPEG", 40, y, pageWidth - 80, 180);
      } catch (e) {
        console.warn("No se pudo cargar la imagen de subpropiedad.");
      }
    }
    y += 190;

    // Título subpropiedad
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, 40, y);
    y += 20;

    // Descripción subpropiedad
    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14 + 10;
    }

    // Información adicional (opcional)
    if (sub.content) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      const lines = doc.splitTextToSize(sub.content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14 + 10;
    }

    // Numeración de página
    const pageNumber = i + 2; // primera página = 1
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`Página ${pageNumber}`, pageWidth - 60, pageHeight - 30);
  }

  // 🔹 Pie de página primera página
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text("Inmobiliaria - Contacto: info@inmobiliaria.com", 40, pageHeight - 30);
  doc.text(`Página 1`, pageWidth - 60, pageHeight - 30);

  // 🔹 Guardar PDF
  doc.save(`${property.title || "propiedad"}.pdf`);
};
