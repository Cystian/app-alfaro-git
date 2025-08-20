// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

const PropertyModal = ({ property, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/getPropertyDetails?id=${property.id}`
        );
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

  if (loading)
    return <p className="text-center py-8">Cargando detalles de la propiedad...</p>;

  if (!propertyDetails)
    return <p className="text-center py-8">No se encontraron detalles.</p>;

  const { property: mainProperty, subProperties, flyerData } = propertyDetails;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      <button
        onClick={onClose}
        className="mb-4 text-red-500 font-bold hover:underline"
      >
        ✖ Cerrar
      </button>

      <PropertyBrochure
        property={mainProperty}
        subProperties={subProperties}
        flyerData={flyerData}
      />
    </div>
  );
};

export default PropertyModal;
