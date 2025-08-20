// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

const PropertyModal = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState(null);
  const [subProperties, setSubProperties] = useState([]);
  const [flyerData, setFlyerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${propertyId}`);
        const data = await res.json();

        if (data) {
          setProperty({
            id: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
            location: data.location,
            status: data.status,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            area: data.area,
            description: data.description,
          });

          setSubProperties(data.sub_properties || []);
          setFlyerData(data.flyer || null);
        }
      } catch (err) {
        console.error("Error cargando detalles de propiedad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) return <p className="text-center py-8">Cargando detalles...</p>;
  if (!property) return <p className="text-center py-8">Propiedad no encontrada.</p>;

  return (
    <div className="p-10 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <button
        onClick={onClose}
        className="mb-4 text-red-500 font-bold hover:text-red-700"
      >
        Cerrar ✖
      </button>

      <PropertyBrochure
        property={property}
        subProperties={subProperties}
        flyerData={flyerData}
      />
    </div>
  );
};

export default PropertyModal;
