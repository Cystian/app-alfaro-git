// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyModal = ({ propertyId, onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${propertyId}`);
        const data = await res.json();
        if (res.ok && data.property) {
          const imgs = [data.property.image, ...data.subProperties.map(sp => sp.image)];
          setImages(imgs.filter(Boolean));
        } else {
          console.error("No se encontraron imágenes o propiedad:", data.message);
        }
      } catch (err) {
        console.error("Error al traer detalles:", err);
      } finally {
        setLoading(false);
      }
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-4 max-w-3xl w-full relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-600 z-50"
        >
          ✕
        </button>

        {/* Contenido */}
        {loading ? (
          <p className="text-center py-20 text-gray-700">Cargando imágenes...</p>
        ) : images.length === 0 ? (
          <p className="text-center py-20 text-gray-700">No hay imágenes disponibles.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-xl"
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
        )}
      </div>
    </div>
  );
};

export default PropertyModal;

