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

  // 🔹 Precarga íconos + logo + QR en paralelo
  const iconFiles = ["logo.jpeg","precio.png","area.png","dormi.png","bano.png","maps.png","facebook.png","instagram.png","tiktok.png","whatsapp.png"];
  const iconsBase64 = {};
  await Promise.all(iconFiles.map(async file => {
    iconsBase64[file] = await getBase64FromUrl(getPublicUrl(file));
  }));

  // 🔹 Logo + QR
  try {
    doc.addImage(iconsBase64["logo.jpeg"], "PNG", 40, 20, 80, 60);
    const qrUrl = `https://inmobiliariaalfaro.netlify.app/propiedades/resumen/${property.id}`;
    const qrBase64 = await getBase64FromUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`);
    doc.addImage(qrBase64, "PNG", pageWidth - 100, 20, 60, 60);
  } catch (e) {
    console.error("Error al cargar logo o QR:", e);
  }

  y = 100;

  // 🔹 Imagen principal
  let mainImageBase64 = null;
  if (property.image) {
    try {
      mainImageBase64 = await getBase64FromUrl(property.image);
      doc.setFillColor(240, 240, 245);
      doc.roundedRect(38, y + 2, pageWidth - 76, 260, 8, 8, "F");
      doc.addImage(mainImageBase64, "JPEG", 40, y, pageWidth - 76, 260);
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
  y += 15;

  // 🔹 Descripción general (HTML)
  if (property.description) {
    await doc.html(property.description, {
      x: 40,
      y: y,
      width: pageWidth - 80,
      windowWidth: 800,
    });
  }

  // 🔹 Segunda página
  doc.addPage();
  doc.setFillColor(248, 248, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  y = 50;

  // 🔹 Función tarjetas premium
  const addCardLuxury = async (iconFile, text, x = 40, yPos = y) => {
    const cardWidth = pageWidth - 80;
    const cardHeight = 32;
    try {
      const iconBase64 = iconsBase64[iconFile];
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
  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.setTextColor(45, 45, 60);
  doc.text("Descripciones Específicas", 40, y);
  y += 20;

  const dataCards = [];
  if (property.price) dataCards.push(addCardLuxury("precio.png", `Precio: S/ ${Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, 40, y));
  if (property.area) dataCards.push(addCardLuxury("area.png", `Área: ${property.area} m²`, 40, y));
  if (property.bedrooms) dataCards.push(addCardLuxury("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y));
  if (property.bathrooms) dataCards.push(addCardLuxury("bano.png", `Baños: ${property.bathrooms}`, 40, y));
  if (property.location) dataCards.push(addCardLuxury("maps.png", `Ubicación: ${property.location}`, 40, y));

  const dataYs = await Promise.all(dataCards);
  y = Math.max(...dataYs);

  y += 20;
  doc.setDrawColor(153, 0, 0);
  doc.setLineWidth(2);
  doc.line(40, y, pageWidth - 40, y);
  y += 20;

  // 🔹 Miniaturas subpropiedades (precargar en paralelo)
  let subImagesBase64 = await Promise.all(subProperties.map(sub => sub.image ? getBase64FromUrl(sub.image) : null));

  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.setTextColor(45, 45, 60);
  doc.text("Fotos detalladas del inmueble", 40, y);
  y += 20;

  if (subProperties.length) {
    const maxPerRow = 6;
    const spacingX = 18;
    const spacingY = 28;
    const thumbWidth = 70;
    const thumbHeight = 55;
    let xThumb = 40;
    let yThumb = y;

    for (let i = 0; i < subProperties.length; i++) {
      const sub = subProperties[i];
      const base64Sub = subImagesBase64[i];
      if (!base64Sub) continue;

      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(xThumb - 2, yThumb - 2, thumbWidth + 4, thumbHeight + 4, 4, 4, "D");
      doc.addImage(base64Sub, "JPEG", xThumb, yThumb, thumbWidth, thumbHeight);

      const textY = yThumb + thumbHeight + 16;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.text(sub.content || "", xThumb + thumbWidth / 2, textY, { align: "center" });

      xThumb += thumbWidth + spacingX;
      if ((i + 1) % maxPerRow === 0) {
        xThumb = 40;
        yThumb += thumbHeight + spacingY;
      }
    }

    y = yThumb + thumbHeight + 25;
  }

  // 🔹 Tarjetas redes sociales
  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.setTextColor(45, 45, 60);
  doc.text("Conéctate con nosotros", 40, y);
  y += 20;

  const socialCards = [
    { icon: "facebook.png", text: "Facebook: /InmobiliariaAlbertoAlfaro" },
    { icon: "instagram.png", text: "Instagram: @InmobiliariaAlbertoAlfaro" },
    { icon: "tiktok.png", text: "Tiktok: @InmobiliariaAlbertoAlfaro" },
    { icon: "whatsapp.png", text: "WhatsApp: +51 940 221 494" },
  ];

  const socialYs = await Promise.all(socialCards.map(social => addCardLuxury(social.icon, social.text, 40, y)));
  y = Math.max(...socialYs);

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
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    let yTop = 40;
    yTop = await renderSub(subProperties[i], yTop);

    if (subProperties[i + 1]) {
      let yBottom = pageHeight / 2 + 20;
      yBottom = await renderSub(subProperties[i + 1], yBottom);
    }
  }

  // 🔹 Marca de agua
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
