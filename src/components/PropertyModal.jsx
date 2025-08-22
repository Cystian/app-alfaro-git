// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch de detalles
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
        setIsOpen(true);
      } catch (err) {
        console.error("Error al cargar detalles de propiedad:", err);
        setError("No se pudieron cargar los detalles de la propiedad.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [property]);

  // Cierre con Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300); // espera animación
  };

  if (!property) return null;

  const images = [property.image, ...(details?.subProperties?.map(sp => sp.image) || [])];

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className={`bg-white rounded-2xl max-w-3xl w-full relative shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-700 text-2xl font-bold hover:text-gray-900 z-20"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {loading ? (
          // Skeleton loader
          <div className="flex flex-col items-center justify-center h-64 animate-pulse">
            <div className="w-full h-64 bg-gray-300 rounded-xl mb-4"></div>
            <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Título */}
            <h2 className="text-2xl font-bold mb-4 text-center">{property.title}</h2>

            {/* Contador de slide */}
            <div className="absolute top-3 right-3 z-10 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Swiper principal */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={3000}
              loop
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="rounded-xl relative"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${property.title} - Imagen ${idx + 1}`}
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
                    className={`w-full h-16 object-cover rounded-lg border-2 ${
                      activeIndex === idx ? "border-blue-500" : "border-gray-300"
                    } hover:border-blue-500 transition`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Detalles + Contactar */}
            <div className="mt-4 p-2 text-center">
              {details?.property?.description && (
                <p className="text-gray-700 mb-2">{details.property.description}</p>
              )}
              <p className="font-semibold text-blue-600">{property.price}</p>
              <p className="text-sm text-gray-500">{property.location}</p>

              <a
                href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Contactar
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;

