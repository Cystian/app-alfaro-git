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

  // 🔹 Fondo elegante
  doc.setFillColor(248, 248, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // 🔹 Logo + QR dinámico
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

  // 🔹 Descripción general en primera página
  if (property.description) {
    await addDescriptionPage(doc, property.description, { fontSize: 10 });
  }

  // 🔹 Segunda página
  doc.addPage();
  doc.setFillColor(248, 248, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  y = 40;

  // 🔹 Función tarjetas premium con gradiente y sombra
  const addCardLuxury = async (iconFile, text, x = 40, yPos = y) => {
    const cardWidth = pageWidth - 80;
    const cardHeight = 36;
    try {
      const iconBase64 = await getBase64FromUrl(getPublicUrl(iconFile));
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(x, yPos, cardWidth, cardHeight, 8, 8, "FD");
      doc.addImage(iconBase64, "PNG", x + 10, yPos + 10, 18, 18);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(45, 45, 60);
      doc.text(text, x + 40, yPos + 23);
      return yPos + cardHeight + 14;
    } catch (e) {
      doc.text(text, x, yPos + 20);
      return yPos + cardHeight + 14;
    }
  };

  // 🔹 Datos clave (segunda página)
  if (property.price) y = await addCardLuxury("precio.png", `Precio: S/ ${Number(property.price).toLocaleString("es-PE",{ minimumFractionDigits:2 })}`, 40, y);
  if (property.area) y = await addCardLuxury("area.png", `Área: ${property.area} m²`, 40, y);
  if (property.bedrooms) y = await addCardLuxury("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y);
  if (property.bathrooms) y = await addCardLuxury("bano.png", `Baños: ${property.bathrooms}`, 40, y);
  if (property.location) y = await addCardLuxury("maps.png", `Ubicación: ${property.location}`, 40, y);
  y += 15;

  // 🔹 Título secciones secundarias
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 70);
  doc.text("Descripciones Específicas", 40, y);
  y += 25;

  // 🔹 Descripciones específicas
  for (const sub of subProperties) {
    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("times", "normal");
      doc.setTextColor(70, 70, 80);
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, y);
      y += lines.length * 14 + 12;
    }
  }

  // 🔹 Título para miniaturas
  y += 10;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 70);
  doc.text("Fotos Detalladas del Inmueble", 40, y);
  y += 20;

  // 🔹 Miniaturas con borde degradado y sombra
  const thumbWidth = 90;
  const thumbHeight = 70;
  let xThumb = 40;
  for (let i = 0; i < subProperties.length && i < 4; i++) {
    const sub = subProperties[i];
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.roundedRect(xThumb - 3, y - 3, thumbWidth + 6, thumbHeight + 6, 6, 6, "D");
        doc.addImage(base64Sub, "JPEG", xThumb, y, thumbWidth, thumbHeight);
        xThumb += thumbWidth + 15;
      } catch (e) {}
    }
  }
  y += thumbHeight + 25;

  // 🔹 Tarjeta redes sociales y WhatsApp
  y = await addCardLuxury("whatsapp.png", "WhatsApp: +51 940 221 494", 40, y);
y = await addCardLuxury("facebook.png", "Facebook: Inmobiliaria Alberto Alfaro", 40, y);
y = await addCardLuxury("tiktok.png", "TikTok: @inmobiliariaalfaro", 40, y);

  // 🔹 Subpropiedades detalladas 2 por página
  const renderSub = async (sub, yStart) => {
    if (!sub) return yStart;
    if (sub.image) {
      try {
        const base64Sub = await getBase64FromUrl(sub.image);
        doc.setFillColor(240, 240, 245);
        doc.roundedRect(38, yStart + 2, pageWidth - 76, 160, 8, 8, "F");
        doc.addImage(base64Sub, "JPEG", 40, yStart, pageWidth - 76, 160);
      } catch (e) {}
    }
    yStart += 180;
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text(sub.content || "Sub Propiedad", 40, yStart);
    yStart += 12;
    doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1);
    doc.line(40, yStart, pageWidth - 40, yStart);
    yStart += 18;
    if (sub.text_content) {
      doc.setFontSize(11);
      doc.setFont("times", "normal");
      doc.setTextColor(70, 70, 80);
      const lines = doc.splitTextToSize(sub.text_content, pageWidth - 80);
      doc.text(lines, 40, yStart);
      yStart += lines.length * 14;
    }
    return yStart;
  };

  for (let i = 0; i < subProperties.length; i += 2) {
    doc.addPage();
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    let yTop = 40;
    yTop = await renderSub(subProperties[i], yTop);

    if (subProperties[i + 1]) {
      let yBottom = pageHeight / 2 + 20;
      yBottom = await renderSub(subProperties[i + 1], yBottom);
    }
  }

  // 🔹 Marca de agua elegante
  const addWatermark = () => {
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(64);
      doc.setFont("times", "italic");
      doc.setTextColor(180, 180, 180);
      doc.setGState(new doc.GState({ opacity: 0.05 }));
      doc.text("EXCLUSIVO", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
  };
  addWatermark();

  // 🔹 Pie de página
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
