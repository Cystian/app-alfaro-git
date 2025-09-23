// src/utils/pdfGenerator.js
import jsPDF from "jspdf";
import QRCode from "qrcode";

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
  let y = 50;

  const getPublicUrl = (fileName) => `${window.location.origin}/${fileName}`;

  // 🔹 Fondo elegante
  doc.setFillColor(248, 248, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

// 🔹 Logo + QR
try {
  const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
  doc.addImage(logoBase64, "PNG", 40, 20, 60, 30);
  
  // Generar QR dinámico
  const qrUrl = `https://inmobiliariaalfaro.netlify.app/propiedades/resumen/${property.id}`;
  const qrBase64 = await QRCode.toDataURL(qrUrl, { width: 60, margin: 1 });
  
  // Agregar QR al lado derecho del logo
  doc.addImage(qrBase64, "PNG", pageWidth - 100, 20, 60, 60);
} catch (e) {
  console.error("Error al cargar logo o QR:", e);
}

  // 🔹 Imagen principal
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.setFillColor(240, 240, 245);
      doc.roundedRect(38, y + 2, pageWidth - 76, 260, 8, 8, "F");
      doc.addImage(base64Main, "JPEG", 40, y, pageWidth - 76, 260);
    } catch (e) {}
  }

  y += 300;

  // 🔹 Título principal
  doc.setFontSize(30);
  doc.setFont("times", "bold");
  doc.setTextColor(45, 45, 60);
  doc.text(property.title || "Propiedad Exclusiva", 40, y);
  y += 15;

  doc.setDrawColor(153, 0, 0);
  doc.setLineWidth(2);
  doc.line(40, y, pageWidth - 40, y);
  y += 25;

  // 🔹 Miniaturas subpropiedades (galería portada)
  if (subProperties.length) {
    const thumbWidth = 80;
    const thumbHeight = 60;
    let xThumb = 40;
    let yThumb = y;
    
      // Elegante rojo para bordes
  doc.setDrawColor(153, 0, 0); // rojo burdeos elegante
    
    for (let i = 0; i < subProperties.length && i < 4; i++) {
      const sub = subProperties[i];
      if (sub.image) {
        try {
          const base64Sub = await getBase64FromUrl(sub.image);
          doc.roundedRect(xThumb - 2, yThumb - 2, thumbWidth + 4, thumbHeight + 4, 4, 4, "D");
          doc.addImage(base64Sub, "JPEG", xThumb, yThumb, thumbWidth, thumbHeight);
          xThumb += thumbWidth + 15;
        } catch (e) {}
      }
    }
    y += thumbHeight + 25;
  }

  // 🔹 Función tarjetas premium con gradiente
  const addCardLuxury = async (iconFile, text, x = 40, yPos = y) => {
    const cardWidth = pageWidth - 80;
    const cardHeight = 32;
    try {
      const iconBase64 = await getBase64FromUrl(getPublicUrl(iconFile));

      // Simular gradiente con sombra suave
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(x, yPos, cardWidth, cardHeight, 6, 6, "FD");

      doc.addImage(iconBase64, "PNG", x + 8, yPos + 8, 16, 16);

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50);
      doc.text(text, x + 34, yPos + 20);
      return yPos + cardHeight + 12;
    } catch (e) {
      doc.text(text, x, yPos + 20);
      return yPos + cardHeight + 12;
    }
  };

  // 🔹 Datos clave
  if (property.price)
    y = await addCardLuxury(
      "precio.png",
      `Precio: S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
      40,
      y
    );
  if (property.area) y = await addCardLuxury("area.png", `Área: ${property.area} m²`, 40, y);
  if (property.bedrooms) y = await addCardLuxury("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y);
  if (property.bathrooms) y = await addCardLuxury("bano.png", `Baños: ${property.bathrooms}`, 40, y);
  if (property.location) y = await addCardLuxury("maps.png", `Ubicación: ${property.location}`, 40, y);

  y += 15;

  // 🔹 Descripción principal
  if (property.description) {
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.setTextColor(70, 70, 80);
    const descLines = doc.splitTextToSize(property.description, pageWidth - 80);
    doc.text(descLines, 40, y);
    y += descLines.length * 16;
  }

  // 🔹 Subpropiedades detalladas
  for (let i = 0; i < subProperties.length; i++) {
    const sub = subProperties[i];
    doc.addPage();
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    y = 40;

    // Imagen principal subpropiedad
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.setFillColor(240, 240, 245);
        doc.roundedRect(38, y + 2, pageWidth - 76, 180, 8, 8, "F");
        doc.addImage(base64Sub, "JPEG", 40, y, pageWidth - 76, 180);
      } catch (e) {}
    }

    y += 200;

    // Título subpropiedad
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text(sub.title || `Sub Propiedad ${i + 1}`, 40, y);
    y += 12;

   doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1);
    doc.line(40, y, pageWidth - 40, y);
    y += 18;

    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("times", "normal");
      doc.setTextColor(70, 70, 80);
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14;
    }

    if (sub.content) {
      doc.setFontSize(11);
      doc.setFont("times", "italic");
      doc.setTextColor(90, 90, 90);
      const lines = doc.splitTextToSize(sub.content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14;
    }
  }

  // 🔹 Marca de agua “Exclusivo”
  const addWatermark = () => {
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(60);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(200, 200, 200);
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.text("EXCLUSIVO", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
  };
  addWatermark();

  // 🔹 Pie de página corporativo
  const addFooter = (pageNum) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("www.inmobiliariaalbertoalfaro.com.pe - albertoalfaro@inmobiliariaalbertoalfaro.com - +51 940 221 494", 40, pageHeight - 30);
    doc.text(`Página ${pageNum}`, pageWidth - 60, pageHeight - 30);
  };

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  doc.save(`${property.title || "propiedad"}_luxury.pdf`);
};
