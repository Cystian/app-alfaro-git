// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";

const PropertyModal = ({ property, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${property.id}`);
        const data = await res.json();
        if (res.ok) {
          setPropertyDetails(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error al traer detalles de la propiedad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [property.id]);

  if (loading) return <p className="text-center py-8">Cargando detalles...</p>;
  if (!propertyDetails) return <p className="text-center py-8">No se encontraron detalles.</p>;

  const { property: mainProperty, subProperties = [] } = propertyDetails;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        z-50 w-[95%] md:w-[90%] h-[80vh] md:h-[90vh] bg-white shadow-2xl rounded-2xl 
        overflow-hidden animate-slideFadeIn flex flex-col">

        {/* Botón cerrar flotante */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
        >
          ✖
        </button>

        {/* Galería de imágenes */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap">
          <div className="flex h-full">
            {/* Foto principal */}
            {mainProperty?.image && (
              <img
                src={mainProperty.image}
                alt={mainProperty.title || "Propiedad"}
                className="h-full w-auto object-cover flex-shrink-0"
              />
            )}

            {/* Sub fotos */}
            {subProperties.map((sub, idx) => (
              <img
                key={idx}
                src={sub.image}
                alt={`Sub foto ${idx + 1}`}
                className="h-full w-auto object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animación */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%);
          }
        }
        .animate-slideFadeIn {
          animation: slideFadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PropertyModal;

