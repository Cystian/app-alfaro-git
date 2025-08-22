// src/components/PropertyModal.jsx
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, Thumbs, EffectFade } from "swiper/modules";

const PropertyModal = ({ property, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);

  // Precargar imágenes
  const preloadImages = (urls) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  // Fetch detalles y precarga
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

        const imagesToPreload = [property.image, ...(data?.subProperties?.map(sp => sp.image) || [])];
        preloadImages(imagesToPreload);

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

  // Cierre con Esc y click fuera
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 400);
  };

  if (!property) return null;

  const images = [property.image, ...(details?.subProperties?.map(sp => sp.image) || [])];
  const labels = [property.title, ...(details?.subProperties?.map(sp => sp.content) || [])];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-400 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black/50 backdrop-blur-sm`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl max-w-3xl w-full relative shadow-xl overflow-hidden transform transition-all duration-400 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Barra superior */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 px-2">
          <button
            onClick={handleClose}
            className="text-gray-700 text-2xl font-bold hover:text-gray-900"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
          <div className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {loading ? (
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
            {/* Swiper principal */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              speed={3500}
              effect="fade"
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
                    alt={`${property.title} - ${labels[idx] || "Imagen"} ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-xl"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Miniaturas scrollables */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={Math.min(images.length, 5)}
              watchSlidesProgress
              slideToClickedSlide
              className="mt-4 h-20 overflow-x-auto"
              breakpoints={{
                320: { slidesPerView: Math.min(images.length, 3), spaceBetween: 8 },
                640: { slidesPerView: Math.min(images.length, 4), spaceBetween: 10 },
                1024: { slidesPerView: Math.min(images.length, 5), spaceBetween: 10 },
              }}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer relative">
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className={`w-full h-16 object-cover rounded-lg border-2 ${
                      activeIndex === idx ? "border-blue-500" : "border-gray-300"
                    } hover:border-blue-500 transition`}
                    loading="lazy"
                  />
                  {labels[idx] && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-1 rounded">
                      {labels[idx]}
                    </span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Detalles + Contactar */}
            <div className="mt-4 p-4 text-center">
              {details?.property?.description && (
                <p className="text-gray-700 mb-2">{details.property.description}</p>
              )}
              <p className="font-semibold text-blue-600">{property.price}</p>

              {/* Ubicación con enlace a Google Maps */}
              <div className="flex justify-center items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{property.location}</p>
                {property.latitude && property.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver en Google Maps"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <img
                      src="/maps.png"
                      alt="Ver en Google Maps"
                      className="w-5 h-5"
                    />
                  </a>
                )}
              </div>

              {/* Botón de contacto */}
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


