import jsPDF from "jspdf";

export const addDescriptionPage = async (doc, property) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  return new Promise((resolve) => {
    // 🔹 Crear un documento temporal
    const tempDoc = new jsPDF("p", "pt", "a4");

    // Renderizar la descripción en el doc temporal
    tempDoc.html(property.description, {
      x: 20,
      y: 20,
      width: pageWidth - 40,
      windowWidth: pageWidth - 40,
      autoPaging: "text",
      callback: function (tempDoc) {
        // 🔹 Exportar doc temporal como imagen base64
        const imgData = tempDoc.output("datauristring");

        // 🔹 Crear nueva página en el doc real
        doc.addPage();
        doc.setPage(doc.getNumberOfPages());

        // Fondo elegante
        doc.setFillColor(248, 248, 252);
        doc.rect(0, 0, pageWidth, pageHeight, "F");

        // Título
        let yDesc = 60;
        doc.setFontSize(22);
        doc.setFont("times", "bold");
        doc.setTextColor(45, 45, 60);
        doc.text("Descripción General", 40, yDesc);

        yDesc += 20;
        doc.setDrawColor(153, 0, 0);
        doc.setLineWidth(1.5);
        doc.line(40, yDesc, pageWidth - 40, yDesc);

        // Insertar imagen del render HTML
        yDesc += 30;
        const boxX = 40;
        const boxWidth = pageWidth - 80;
        const boxHeight = pageHeight - yDesc - 60;

        doc.setFillColor(250, 250, 250);
        doc.roundedRect(boxX, yDesc, boxWidth, boxHeight, 8, 8, "F");

        // Ajustar la imagen dentro del bloque
        doc.addImage(imgData, "JPEG", boxX + 5, yDesc + 5, boxWidth - 10, boxHeight - 10);

        resolve();
      },
    });
  });
};
