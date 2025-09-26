export const addDescriptionPage = async (doc, description) => {
  return new Promise((resolve) => {
    doc.addPage(); // Crea nueva página automáticamente
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Fondo
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Título
    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text("Descripción General", 40, 60);

    doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(40, 85, pageWidth - 40, 85);

    // Bloque de texto
    const boxX = 40;
    const boxY = 100;
    const boxWidth = pageWidth - 80;
    const boxHeight = pageHeight - boxY - 60;

    doc.setFillColor(250, 250, 250);
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 8, 8, "F");

    // Renderizado HTML
    doc.html(description, {
      x: boxX + 10,
      y: boxY + 10,
      width: boxWidth - 20,
      windowWidth: boxWidth,
      callback: () => resolve(),
    });
  });
};
