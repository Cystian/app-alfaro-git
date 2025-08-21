// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  if (loading) return <p className="text-center py-8">Cargando detalles...</p>;
  if (!propertyDetails)
    return <p className="text-center py-8">No se encontraron detalles.</p>;

  const { property: mainProperty, subProperties = [], flyerData } = propertyDetails;

  // Fotos = principal + subfotos
  const images = [
    mainProperty?.image,
    ...(subProperties.map((sp) => sp.image) || []),
  ].filter(Boolean);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        z-50 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] bg-white shadow-2xl rounded-2xl overflow-y-auto">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-200 z-50"
        >
          ✖
        </button>

        {/* Carrusel de imágenes */}
        <div className="w-full h-72 md:h-[400px] lg:h-[500px]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Datos extra de la propiedad */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{mainProperty?.title}</h2>
          <p className="text-lg text-gray-700 font-semibold mb-2">
            Precio: ${mainProperty?.price}
          </p>
          <p className="text-gray-600 mb-4">
            Ubicación: {mainProperty?.location}
          </p>
          <p className="text-gray-500">
            {mainProperty?.description || "Sin descripción disponible"}
          </p>
        </div>
      </div>
    </>
  );
};

export default PropertyModal;

