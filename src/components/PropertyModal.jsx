// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyModal = ({ propertyId, onClose }) => {
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${propertyId}`);
        const data = await res.json();

        if (res.ok && data.property) {
          // Armamos array de imágenes: principal + subpropiedades
          const subImgs = data.subProperties.map(sp => sp.image).filter(Boolean);
          setImages([data.property.image, ...subImgs]);
          setProperty(data.property);
        } else {
          console.error("No se encontró la propiedad:", data.message);
        }
      } catch (err) {
        console.error("Error al traer detalles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchProperty();
  }, [propertyId]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!property) return <div className="text-center py-8">No se encontró la propiedad.</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-4 max-w-4xl w-full relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-600 z-50"
        >
          ✕
        </button>

        {/* Slider de imágenes */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="rounded-xl mb-4"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Datos de la propiedad */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p>{property.description}</p>
          <p className="font-semibold text-blue-600">Precio: {property.price}</p>
          <p>Ubicación: {property.location}</p>
          <p>Área: {property.area} m²</p>
          <p>Habitaciones: {property.bedrooms}</p>
          <p>Baños: {property.bathrooms}</p>
          <p>Estado: {property.status}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
