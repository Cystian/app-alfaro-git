// src/components/PropertyModal.jsx
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, Thumbs, EffectFade } from "swiper/modules";
import { generatePropertyPdf } from "../utils/pdfGenerator";

const PropertyModal = ({ property, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef(null);

  const preloadImages = (urls) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

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

  const propData = details?.property || {};
  const lat = propData.latitude;
  const lng = propData.longitude;

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

            {/* Miniaturas */}
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

            {/* Detalles */}
            <div className="mt-4 p-4 text-center text-gray-700">
              {propData.description && (
                <p className="mb-3">
                  <strong>Descripción:</strong> {propData.description}
                </p>
              )}
              {propData.status && (
                <p className="mb-1">
                  <strong>Estado:</strong> {propData.status}
                </p>
              )}

              {/* Precio */}
              {propData.price && (
                <div className="flex justify-center items-center gap-2 mb-2">
                  <img src="/precio.png" alt="Precio" className="w-5 h-5" />
                  <p className="font-semibold text-blue-600"> S/ {Number(propData.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}</p>
                </div>
              )}

              {/* Área – Dormitorios – Baños */}
              <div className="flex justify-center items-center gap-6 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <img src="/area.png" alt="Área" className="w-5 h-5" />
                  <span>{propData.area} m²</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/dormi.png" alt="Dormitorios" className="w-5 h-5" />
                  <span>{propData.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/bano.png" alt="Baños" className="w-5 h-5" />
                  <span>{propData.bathrooms}</span>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex justify-center items-center gap-2 mt-2">
                <p className="text-sm">{propData.location}</p>
                {lat && lng && (
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver en Google Maps"
                  >
                    <img src="/maps.png" alt="Ver en Google Maps" className="w-5 h-5" />
                  </a>
                )}
              </div>

  

              <div className="relative w-full h-64 rounded-xl overflow-hidden">
  {/* Mapa embebido */}
  <iframe
    title="Mapa de la propiedad"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
    src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
  />


</div>
              

              {/* 🔹 Subpropiedades con text_content */}
              {details?.subProperties?.length > 0 && (
                <div className="mt-6 text-left">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Subpropiedades</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {details.subProperties.map((sp) => (
                      <div key={sp.id} className="border rounded-lg p-3 shadow-sm">
                        <img
                          src={sp.image}
                          alt={sp.content}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <p className="font-semibold">{sp.content}</p>
                        {sp.text_content && (
                          <p className="text-sm text-gray-600 mt-1">{sp.text_content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-center gap-3 mt-6">
                <a
                  href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                  Contactar
                </a>
                <button
                  onClick={() => generatePropertyPdf(propData, details?.subProperties || [])}
                  className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  <img src="/flyer.png" alt="Flyer" className="w-5 h-5 mr-2" />
                  Descargar Flyer
                </button>

                {/* Botón Resumen Completo */}
<a
  href={`/propiedades/resumen/${propData.id}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="inline-flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition">
    <img src="/documento.png" alt="Resumen" className="w-5 h-5 mr-2" />
    Ver Resumen
  </button>
</a>

                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;


