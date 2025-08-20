// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

const PropertyModal = ({ propertyId, onClose }) => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(
          `https://inmobiliariaalfaro.netlify.app/.netlify/functions/getPropertyDetails?id=${propertyId}`
        );
        const data = await res.json();
        setPropertyDetails(data);
      } catch (err) {
        console.error("Error al traer detalles de la propiedad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) return <p className="p-10">Cargando detalles...</p>;
  if (!propertyDetails) return <p className="p-10">Propiedad no encontrada.</p>;

  return (
    <div className="p-10">
      <button
        onClick={onClose}
        className="mb-4 text-red-500 font-bold"
      >
        Cerrar ✖
      </button>

      <PropertyBrochure
        property={propertyDetails}
        subProperties={propertyDetails.sub_properties || []}
        flyerData={propertyDetails.flyer || null}
      />
    </div>
  );
};

export default PropertyModal;
