// src/utils/pdfGenerator.js
import jsPDF from "jspdf";
import { addDescriptionPage } from "./addDescriptionPage";

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

  // 🔹 Fondo degradado luxury (sutil)
  doc.setFillColor(245, 245, 250);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // 🔹 Logo + QR
  try {
    const logoBase64 = await getBase64FromUrl(getPublicUrl("logo.png"));
    doc.addImage(logoBase64, "PNG", 40, 20, 160, 60);

    const qrUrl = `https://inmobiliariaalfaro.netlify.app/propiedades/resumen/${property.id}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`;
    const qrBase64 = await getBase64FromUrl(qrApiUrl);
    doc.addImage(qrBase64, "PNG", pageWidth - 100, 20, 60, 60);
  } catch (e) {
    console.error("Error al cargar logo o QR:", e);
  }

  y = 100;

  // 🔹 Imagen principal con sombra y bordes redondeados
  if (property.image) {
    try {
      const base64Main = await getBase64FromUrl(property.image);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(38, y + 2, pageWidth - 76, 260, 12, 12, "F");
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1.5);
      doc.roundedRect(38, y + 2, pageWidth - 76, 260, 12, 12, "D");
      doc.addImage(base64Main, "JPEG", 40, y, pageWidth - 76, 260);
    } catch (e) {}
  }
  y += 280;

  // 🔹 Título elegante
  doc.setFontSize(32);
  doc.setFont("times", "bold");
  doc.setTextColor(35, 35, 50);
  doc.text(property.title || "Propiedad Exclusiva", 40, y);
  y += 12;

  // 🔹 Separador luxury
  doc.setDrawColor(153, 0, 0);
  doc.setLineWidth(2);
  doc.line(40, y, pageWidth - 40, y);
  y += 20;

  // 🔹 Descripción general (fuente pequeña luxury)
  if (property.description) {
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.setTextColor(60, 60, 70);

    const lines = doc.splitTextToSize(property.description, pageWidth - 80);
    doc.text(lines, 40, y);
  }

  // 🔹 Segunda página: datos clave + miniaturas
  doc.addPage();
  y = 50;

  // 🔹 Datos clave luxury cards
  const addCardLuxury = async (iconFile, text, x = 40, yPos = y) => {
    const cardWidth = pageWidth - 80;
    const cardHeight = 36;
    try {
      const iconBase64 = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.setFillColor(250, 250, 255);
      doc.setDrawColor(220, 220, 230);
      doc.setLineWidth(0.8);
      doc.roundedRect(x, yPos, cardWidth, cardHeight, 8, 8, "FD");
      doc.addImage(iconBase64, "PNG", x + 10, yPos + 10, 16, 16);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 50);
      doc.text(text, x + 36, yPos + 24);
      return yPos + cardHeight + 12;
    } catch (e) {
      doc.text(text, x, yPos + 20);
      return yPos + cardHeight + 12;
    }
  };

  y = property.price ? await addCardLuxury("precio.png", `Precio: S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, 40, y) : y;
  y = property.area ? await addCardLuxury("area.png", `Área: ${property.area} m²`, 40, y) : y;
  y = property.bedrooms ? await addCardLuxury("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y) : y;
  y = property.bathrooms ? await addCardLuxury("bano.png", `Baños: ${property.bathrooms}`, 40, y) : y;
  y = property.location ? await addCardLuxury("maps.png", `Ubicación: ${property.location}`, 40, y) : y;

  y += 10;

  // 🔹 Miniaturas subpropiedades luxury
  if (subProperties.length) {
    const thumbWidth = 90;
    const thumbHeight = 65;
    let xThumb = 40;
    let yThumb = y;
    for (let i = 0; i < subProperties.length && i < 4; i++) {
      const sub = subProperties[i];
      if (sub.image) {
        try {
          const base64Sub = await getBase64FromUrl(sub.image);
          doc.setDrawColor(180, 180, 190);
          doc.roundedRect(xThumb - 2, yThumb - 2, thumbWidth + 4, thumbHeight + 4, 6, 6, "D");
          doc.addImage(base64Sub, "JPEG", xThumb, yThumb, thumbWidth, thumbHeight);
          xThumb += thumbWidth + 20;
        } catch (e) {}
      }
    }
  }

  // 🔹 Página 3+: Subpropiedades detalladas luxury
  const renderSub = async (sub, yStart) => {
    if (!sub) return yStart;
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.setFillColor(250, 250, 255);
        doc.roundedRect(38, yStart, pageWidth - 76, 170, 10, 10, "F");
        doc.setDrawColor(210, 210, 220);
        doc.setLineWidth(1);
        doc.roundedRect(38, yStart, pageWidth - 76, 170, 10, 10, "D");
        doc.addImage(base64Sub, "JPEG", 40, yStart + 5, pageWidth - 76, 160);
      } catch (e) {}
    }
    yStart += 180;
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text(sub.content || "Sub Propiedad", 40, yStart);
    yStart += 14;
    if (sub.text_content) {
      doc.setFontSize(10);
      doc.setFont("times", "normal");
      doc.setTextColor(70, 70, 80);
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, yStart);
      yStart += lines.length * 12;
    }
    return yStart;
  };

  for (let i = 0; i < subProperties.length; i += 2) {
    doc.addPage();
    doc.setFillColor(245, 245, 250);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    let yTop = 40;
    yTop = await renderSub(subProperties[i], yTop);

    if (subProperties[i + 1]) {
      let yBottom = pageHeight / 2 + 20;
      yBottom = await renderSub(subProperties[i + 1], yBottom);
    }
  }

  // 🔹 Marca de agua diagonal luxury
  const addWatermark = () => {
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(60);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(200, 200, 200);
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      doc.text("EXCLUSIVO", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
  };
  addWatermark();

  // 🔹 Pie de página luxury
  const addFooter = (pageNum) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(
      "www.inmobiliariaalbertoalfaro.com.pe - albertoalfaro@inmobiliariaalbertoalfaro.com - +51 940 221 494",
      40,
      pageHeight - 30
    );
    doc.text(`Página ${pageNum}`, pageWidth - 60, pageHeight - 30);
  };
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  doc.save(`${property.title || "propiedad"}.pdf`);
};

