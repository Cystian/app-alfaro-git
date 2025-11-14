import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { FiCamera, FiMenu } from "react-icons/fi";
import { Home, MapPin, UserRound, Mail, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import PropertyResumePageGallery from "../components/PropertyResumenPageGallery";

export default function PropertyGallery({ data }) {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Nuevo: estado del menú lateral
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    if (!data?.property) return;

    const cleanImages = [
      { src: data.property.image, title: data.property.title, description: "" },
      ...(data.subProperties?.map((sub) => ({
        src: sub.image,
        title: sub.content || "Vista adicional",
        description: sub.text_content || "",
      })) || []),
    ].filter((img) => img.src && img.src.trim() !== "");

    setImages(cleanImages.map((img) => img.src));
    setGalleryImages(cleanImages);
  }, [data]);

  if (!images.length) {
    return (
      <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50 font-sans">
        No hay imágenes disponibles para esta propiedad.
      </div>
    );
  }

  return (
    <>
      {/* ======================= */}
      {/* GALERÍA PRINCIPAL       */}
      {/* ======================= */}
      <div
        className="
          flex flex-col bg-gray-50 p-4 md:p-2
          rounded-2xl shadow-md border border-gray-200
          hover:shadow-lg transition-all duration-300
          w-[98%] md:w-[98%] lg:w-[100%]
          font-sans relative
          mt-[-2rem]
          left-1/2 -translate-x-1/2
          h-[430px] md:h-[480px] lg:h-[530px]
          overflow-hidden
        "
      >
        {/* BOTÓN DEL MENÚ LATERAL */}
        <button
          onClick={() => setSideMenuOpen(true)}
          className="
            absolute top-5 left-5 z-30
            flex items-center gap-2 bg-white/95 text-gray-800
            py-2 px-4 rounded-full shadow-md hover:shadow-lg
            transition-all duration-300 text-sm font-medium tracking-wide
          "
        >
          <FiMenu className="text-rojo-inmobiliario" />
          Más opciones
        </button>

        {/* CARRUSEL PRINCIPAL */}
        <div className="relative rounded-2xl overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Thumbs, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={10}
            className="rounded-2xl overflow-hidden w-full"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-[410px] md:h-[460px] lg:h-[510px]
                             overflow-hidden rounded-2xl bg-white flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* GRADIENTE ELEGANTE */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* BOTÓN VER FOTOS */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="
              absolute bottom-5 right-5 flex items-center gap-2
              bg-white/95 text-gray-800 font-medium py-2 px-5
              rounded-full shadow-lg hover:shadow-xl hover:bg-white
              z-20 transition-all duration-300 text-sm tracking-wide
            "
          >
            <FiCamera className="text-rojo-inmobiliario" />
            Ver fotos
          </button>
        </div>
      </div>

      {/* ==================================== */}
      {/* PANEL LATERAL (OFF-CANVAS)           */}
      {/* ==================================== */}
      {sideMenuOpen && (
        <>
          {/* Fondo oscuro */}
          <div
            onClick={() => setSideMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          ></div>

          {/* Panel deslizante */}
          <div
            className="
              fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50
              p-6 flex flex-col gap-6 animate-slide-left
            "
          >
            {/* Header del panel */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                Más opciones
              </h3>
              <button
                onClick={() => setSideMenuOpen(false)}
                className="text-gray-600 text-xl hover:text-black transition"
              >
                ✕
              </button>
            </div>

            {/* Menú del panel */}
            <div className="flex flex-col gap-3">
              <a href="/propiedades" className="flex items-center gap-3 text-gray-700 hover:text-black">
                <Home className="w-[20px] h-[20px] text-rojo-inmobiliario" />
                Lista de Propiedades
              </a>

              <a href="/ubicaciones" className="flex items-center gap-3 text-gray-700 hover:text-black">
                <MapPin className="w-[20px] h-[20px] text-rojo-inmobiliario" />
                Ubicaciones
              </a>

              <a href="/acerca-de-nosotros" className="flex items-center gap-3 text-gray-700 hover:text-black">
                <UserRound className="w-[20px] h-[20px] text-rojo-inmobiliario" />
                Acerca de nosotros
              </a>

              <a href="/contacto" className="flex items-center gap-3 text-gray-700 hover:text-black">
                <Mail className="w-[20px] h-[20px] text-rojo-inmobiliario" />
                Contacto
              </a>

              <a href="/nuestra-historia" className="flex items-center gap-3 text-gray-700 hover:text-black">
                <BookOpen className="w-[20px] h-[20px] text-rojo-inmobiliario" />
                Nuestra Historia
              </a>
            </div>
          </div>
        </>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <PropertyResumePageGallery
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Animación personalizada */}
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.35s ease-out forwards;
        }
      `}</style>
    </>
  );
}

