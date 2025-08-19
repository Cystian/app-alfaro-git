// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

const PropertyModal = ({ property, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [subProperties, setSubProperties] = useState([]);
  const [flyerData, setFlyerData] = useState(null);
  const [supabaseClient, setSupabaseClient] = useState(null);

  if (!property) return null;

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);

    // Import dinámico de Supabase para evitar problemas de Vite
    import("@supabase/supabase-js").then(({ createClient }) => {
      const supabase = createClient("TU_NEON_URL", "TU_NEON_KEY");
      setSupabaseClient(supabase);
    });
  }, []);

  useEffect(() => {
    if (!supabaseClient) return;

    const fetchData = async () => {
      const { data: subData } = await supabaseClient
        .from("sub_properties")
        .select("*, flyer:texto_flyer")
        .eq("property_id", property.id)
        .order("order", { ascending: true });

      setSubProperties(subData || []);

      if (subData?.length > 0 && subData[0].flyer) {
        setFlyerData({ texto_flyer: subData[0].flyer });
      }
    };

    fetchData();
  }, [supabaseClient, property]);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let yPos = 20;

    // Título de la propiedad
    doc.setFontSize(22);
    doc.text(property.title, 20, yPos);
    yPos += 10;

    // Ubicación y precio
    doc.setFontSize(14);
    doc.text(`Ubicación: ${property.location}`, 20, yPos);
    yPos += 8;
    doc.text(`Precio: ${property.price}`, 20, yPos);
    yPos += 10;

    // Texto del flyer
    if (flyerData?.texto_flyer) {
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(flyerData.texto_flyer, 170);
      doc.text(splitText, 20, yPos);
      yPos += splitText.length * 6 + 5;
    }

    // Sub-properties: imágenes + contenido
    subProperties.forEach((sp) => {
      if (sp.image) {
        try {
          doc.addImage(sp.image, "JPEG", 20, yPos, 160, 80);
          yPos += 85;
        } catch (err) {
          console.error("Error cargando imagen:", err);
        }
      }

      if (sp.content) {
        const contentSplit = doc.splitTextToSize(sp.content, 170);
        doc.text(contentSplit, 20, yPos);
        yPos += contentSplit.length * 6 + 5;
      }

      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save(`${property.title}_flyer.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo negro */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ease-out ${
          visible && !closing ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 transform transition-all duration-300 ease-out ${
          visible && !closing
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Cerrar modal */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Imagen principal */}
        <div className="mb-4">
          <img
            src={property.flyer || property.image}
            alt={property.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-gray-600 text-lg">{property.location}</p>
          <p className="text-blue-600 text-xl font-semibold">{property.price}</p>
          <p className="text-sm text-gray-500">Estado: {property.status}</p>
        </div>

        {/* Botones */}
//<div className="mt-6 flex gap-3 flex-col sm:flex-row">
//  <a
//    href={`https://wa.me/51999999999?text=Hola, me interesa la propiedad: ${property.title}`}
//    target="_blank"
//    rel="noopener noreferrer"
//    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-center transition"
//  >
 //   Contactar
 // </a>

//  <PropertyBrochure
  //  property={property}
  //  subProperties={subProperties /* tu array */}
  //  flyerData={flyerData /* { texto_flyer: "..."} o null */}
  />
//</div>


        <div className="mt-6 flex gap-3 flex-col sm:flex-row">
  <a
    href={`https://wa.me/51999999999?text=Hola, me interesa la propiedad: ${property?.title || ""}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-center transition"
  >
    Contactar
  </a>

  {property && property.title && (
    <PropertyBrochure 
      property={property} 
      subProperties={subProperties} 
      flyerData={flyerData} 
    />
  )}
</div>
        
      </div>
    </div>
  );
};

export default PropertyModal;
