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

  // 🔹 Miniaturas subpropiedades (galería portada)
  if (subProperties.length) {
    const thumbWidth = 80;
    const thumbHeight = 60;
    let xThumb = 40;
    let yThumb = y;
    doc.setDrawColor(153, 0, 0);
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
  if (property.price) y = await addCardLuxury("precio.png", `Precio: S/ ${Number(property.price).toLocaleString("es-PE",{ minimumFractionDigits: 2 })}`, 40, y);
  if (property.area) y = await addCardLuxury("area.png", `Área: ${property.area} m²`, 40, y);
  if (property.bedrooms) y = await addCardLuxury("dormi.png", `Dormitorios: ${property.bedrooms}`, 40, y);
  if (property.bathrooms) y = await addCardLuxury("bano.png", `Baños: ${property.bathrooms}`, 40, y);
  if (property.location) y = await addCardLuxury("maps.png", `Ubicación: ${property.location}`, 40, y);

  y += 15;

  // 🔹 Segunda página: Descripción HTML
  if (property.description) {
    doc.addPage();
    doc.setPage(doc.getNumberOfPages()); // 🔹 Aseguramos foco
    const yDesc = 60;
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Título sección
    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text("Descripción General", 40, yDesc);

    doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(40, yDesc + 20, pageWidth - 40, yDesc + 20);

    // Bloque de fondo
    const boxX = 40;
    const boxY = yDesc + 40;
    const boxWidth = pageWidth - 80;
    const boxHeight = pageHeight - boxY - 60;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 8, 8, "F");

    // Render HTML
    const container = document.createElement("div");
    container.style.width = `${boxWidth - 20}px`;
    container.innerHTML = property.description;

    await new Promise((resolve) => {
      doc.html(container, {
        x: boxX + 10,
        y: boxY + 10,
        width: boxWidth - 20,
        windowWidth: boxWidth,
        autoPaging: true,
        callback: () => resolve(),
      });
    });
  }

  // 🔹 Subpropiedades detalladas (2 por página)
  for (let i = 0; i < subProperties.length; i += 2) {
    doc.addPage();
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Primera subpropiedad
    let yTop = 40;
    const sub1 = subProperties[i];
    if (sub1.image) {
      try {
        const base64Sub1 = await getBase64FromUrl(sub1.image);
        doc.setFillColor(240, 240, 245);
        doc.roundedRect(38, yTop + 2, pageWidth - 76, 160, 8, 8, "F");
        doc.addImage(base64Sub1, "JPEG", 40, yTop, pageWidth - 76, 160);
      } catch (e) {}
    }
    yTop += 180;
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text(sub1.content || `Sub Propiedad ${i + 1}`, 40, yTop);
    yTop += 12;
    doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1);
    doc.line(40, yTop, pageWidth - 40, yTop);
    yTop += 18;
    if (sub1.text_content) {
      doc.setFontSize(11);
      doc.setFont("times", "normal");
      doc.setTextColor(70, 70, 80);
      const lines = doc.splitTextToSize(sub1.text_content, pageWidth - 80);
      doc.text(lines, 40, yTop);
    }

    // Segunda subpropiedad
    if (subProperties[i + 1]) {
      let yBottom = pageHeight / 2 + 20;
      const sub2 = subProperties[i + 1];
      if (sub2.image) {
        try {
          const base64Sub2 = await getBase64FromUrl(sub2.image);
          doc.setFillColor(240, 240, 245);
          doc.roundedRect(38, yBottom + 2, pageWidth - 76, 160, 8, 8, "F");
          doc.addImage(base64Sub2, "JPEG", 40, yBottom, pageWidth - 76, 160);
        } catch (e) {}
      }
      yBottom += 180;
      doc.setFontSize(20);
      doc.setFont("times", "bold");
      doc.setTextColor(45, 45, 60);
      doc.text(sub2.content || `Sub Propiedad ${i + 2}`, 40, yBottom);
      yBottom += 12;
      doc.setDrawColor(153, 0, 0);
      doc.setLineWidth(1);
      doc.line(40, yBottom, pageWidth - 40, yBottom);
      yBottom += 18;
      if (sub2.text_content) {
        doc.setFontSize(11);
        doc.setFont("times", "normal");
        doc.setTextColor(70, 70, 80);
        const lines = doc.splitTextToSize(sub2.text_content, pageWidth - 80);
        doc.text(lines, 40, yBottom);
      }
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
    doc.text("www.inmobiliariaalbertoalfaro.com.pe - albertoalfaro@inmobiliariaalbertoalfaro.com - +51 940 221 494", 40, pageHeight - 30);
    doc.text(`Página ${pageNum}`, pageWidth - 60, pageHeight - 30);
  };
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  doc.save(`${property.title || "propiedad"}.pdf`);
};
