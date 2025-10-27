import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { FiCamera } from "react-icons/fi";
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

    setImages(cleanImages.map((img) => img.src)); // Para Swiper
    setGalleryImages(cleanImages); // Para Lightbox
  }, [data]);

  if (!images.length) {
    return (
      <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50 font-sans">
        No hay imágenes disponibles para esta propiedad.
      </div>
    );
  }

  return (
<div
  className="
    flex flex-col bg-gray-50 p-4 md:p-2
    rounded-2xl shadow-md border border-gray-200
    hover:shadow-lg transition-all duration-300
    w-[120%] md:w-[120%] lg:w-[140%]  /* ancho responsive */
    font-sans relative
    mt-[-2rem]
    left-1/2 -translate-x-1/2
  h-[300px] md:h-[350px] lg:h-[400px]
      overflow-hidden
  "
>





      {/* Carrusel principal */}
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
                className="relative w-full h-full overflow-hidden rounded-2xl bg-white flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="object-cover object-center w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botón "Ver fotos" */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/95 text-gray-800 font-medium py-2 px-5 rounded-full shadow-lg hover:shadow-xl hover:bg-white z-20 transition-all duration-300 text-sm tracking-wide"
        >
          <FiCamera className="text-rojo-inmobiliario" />
          Ver fotos
        </button>
      </div>

      {/* Lightbox unificado */}
      {lightboxOpen && (
        <PropertyResumePageGallery
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
