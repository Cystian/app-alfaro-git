import jsPDF from "jspdf";

export const addDescriptionPage = async (doc, property) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  return new Promise((resolve) => {
    doc.addPage();

    // Fondo
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Título sección
    let yDesc = 60;
    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.setTextColor(45, 45, 60);
    doc.text("Descripción General", 40, yDesc);

    yDesc += 20;
    doc.setDrawColor(153, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(40, yDesc, pageWidth - 40, yDesc);

    // Bloque de texto (fondo)
    yDesc += 30;
    const boxX = 40;
    const boxWidth = pageWidth - 80;
    const boxHeight = pageHeight - yDesc - 60;

    doc.setFillColor(250, 250, 250);
    doc.roundedRect(boxX, yDesc, boxWidth, boxHeight, 8, 8, "F");

    // Render HTML dentro del bloque
    doc.html(property.description, {
      x: boxX + 10,
      y: yDesc + 10,
      width: boxWidth - 20,
      windowWidth: boxWidth,
      autoPaging: "text",
      callback: function () {
        resolve(); // desbloquea la ejecución de lo siguiente
      },
    });
  });
};
