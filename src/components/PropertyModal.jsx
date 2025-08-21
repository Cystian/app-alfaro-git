// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

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

  const { property: mainProperty, subProperties, flyerData } = propertyDetails;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Popup centrado */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   z-50 w-11/12 md:w-[800px] lg:w-[1000px] 
                   max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-2xl p-6 animate-slideFadeIn"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-red-500 font-bold hover:underline"
          >
            ✖ Cerrar
          </button>
        </div>

        <PropertyBrochure
          property={mainProperty}
          subProperties={subProperties}
          flyerData={flyerData}
        />
      </div>

      <style jsx>{`
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slideFadeIn {
          animation: slideFadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PropertyModal;
