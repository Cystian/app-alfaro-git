// src/components/PropertyModal.jsx
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";

const PropertyModal = ({ property, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);

  useEffect(() => {
    if (!property?.id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${property.id}`);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error al cargar detalles de propiedad:", err);
        setError("No se pudieron cargar los detalles de la propiedad.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [property]);

  if (!property) return null;

  // Combina imagen principal + sub-imágenes
  const images = [property.image, ...(details?.subProperties?.map(sp => sp.image) || [])];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full relative shadow-lg overflow-hidden">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 text-2xl font-bold hover:text-gray-900"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p>Cargando...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Título */}
            <h2 className="text-2xl font-bold mb-4 text-center">{property.title}</h2>

            {/* Swiper principal */}
            <Swiper
              ref={mainSwiperRef}
              modules={[Navigation, Pagination, Autoplay, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              className="rounded-xl"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${property.title} - ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-xl"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Miniaturas */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={Math.min(images.length, 5)}
              watchSlidesProgress
              className="mt-4 h-20"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer">
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-16 object-cover rounded-lg border-2 border-gray-300 hover:border-blue-500"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Detalles de la propiedad */}
            <div className="mt-4 p-2 text-center">
              {details?.property?.description && (
                <p className="text-gray-700 mb-2">{details.property.description}</p>
              )}
              <p className="font-semibold text-blue-600">{property.price}</p>
              <p className="text-sm text-gray-500">{property.location}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;

