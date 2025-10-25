import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { FiCamera } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// Importa el nuevo Lightbox
import PropertyResumePageGallery from "../components/PropertyResumenPageGallery";

export default function PropertyGallery({ data }) {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data?.property) return;

    const cleanImages = [
      data.property.image,
      ...(data.subProperties?.map((sub) => sub.image) || []),
    ].filter((img) => img && img.trim() !== "");

    setImages(cleanImages);
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
    <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 w-[97.5%] mx-auto font-sans relative">
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
                className="relative w-full aspect-[2.1:1] bg-black flex items-center justify-center cursor-pointer"
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
                {/* Degradado inferior */}
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
          currentIndex={currentIndex} // Abre en la imagen seleccionada
          title={data.property.title || "Resumen de Propiedad"}
          description={data.subProperties?.map((sub, i) =>
            i === 0 ? "" : sub.text_content || ""
          )}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}