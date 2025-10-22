// src/pages/PropertyResumenPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaTag,
} from "react-icons/fa";
import { generatePropertyPdf } from "../utils/pdfGenerator";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Navigation, Autoplay, Thumbs, EffectFade } from "swiper/modules";
import FloatingShare from "../components/FloatingShare";
import FeaturedProperties from "../components/FeaturedProperties";

export default function PropertyResumenPage() {

  
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({
    img: "",
    title: "",
    description: "",
  });

  const openLightbox = (img, title, description = "") => {
    setLightboxContent({ img, title, description });
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/.netlify/functions/getPropertyDetails?id=${id}`
      );
      const result = await res.json();
      console.log("Datos obtenidos de la BD:", result);

      if (result.subProperties) {
        result.subProperties = result.subProperties.map((sub) => ({
          ...sub,
          image: sub.image.trim(),
        }));
      }

      setData(result);
    };
    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return "";
    return `US$ ${Number(price).toLocaleString("es-PE")}`;
  };


if (!data) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Casitas animadas */}
      <div className="flex space-x-4 text-5xl">
        <span className="animate-bounce">🏠</span>
        <span className="animate-bounce delay-150">🏡</span>
        <span className="animate-bounce delay-300">🏘️</span>
      </div>
      
      {/* Texto */}
      <p className="mt-6 text-lg font-semibold text-gray-700">
        Cargando propiedades...
      </p>
    </div>
  );
}




  const images = [data.property.image, ...(data.subProperties?.map((sub) => sub.image) || [])];
  const labels = ["Principal", ...(data.subProperties?.map((sub) => sub.content) || [])];

  return (
    <>
      {/* Botón flotante de compartir */}
      <FloatingShare />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative">
          {/* Swiper principal */}
          <Swiper
            modules={[Navigation, Thumbs, EffectFade, Autoplay]}
            navigation
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={1000}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-xl relative mb-10 shadow-lg"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${data.property.title} - ${labels[idx]}`}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl transition-transform duration-700 ease-in-out hover:scale-105 cursor-pointer"
                  loading="lazy"
           onClick={() => {
  const isMain = idx === 0;
  if (isMain) {
    openLightbox(img, data.property.title, "");
  } else {
    const sub = data.subProperties[idx - 1];
    openLightbox(
      img,
      sub?.content || "Subpropiedad",
      sub?.text_content || ""
    );
  }
}}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Miniaturas sincronizadas */}
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
                  className={`w-full h-16 sm:h-20 object-cover rounded-lg border-2 transition-all duration-500 ${
                    activeIndex === idx ? "border-red-600 ring-2 ring-red-600" : "border-gray-300"
                  }`}
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

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity"
              onClick={closeLightbox}
            >
              <div
                className="relative w-full max-w-3xl max-h-[90vh] overflow-auto p-4 bg-white rounded-xl shadow-lg scale-95 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxContent.img}
                  alt={lightboxContent.title}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{lightboxContent.title}</h2>
                {lightboxContent.description && (
                  <p className="text-gray-700">{lightboxContent.description}</p>
                )}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-gray-800 hover:text-red-600 font-bold text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
            {data.property.title || "Resumen de Propiedad"}
          </h1>
          <hr className="border-gray-300 mb-6" />

          {/* Datos principales */}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
  <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
    <FaMapMarkerAlt className="text-red-600 mr-3" />
    <div>
      <p className="text-gray-500 text-sm">Ubicación</p>
      <p className="font-semibold text-lg">{data.property.location}</p>
    </div>
  </div>

  <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
    <FaRulerCombined className="text-red-600 mr-3" />
    <div>
      <p className="text-gray-500 text-sm">Área</p>
      <p className="font-semibold text-lg">{data.property.area} m²</p>
    </div>
  </div>

  {/* Lógica condicional: Terreno vs Propiedad con habitaciones */}
  {data.property.title.toLowerCase().includes("terreno") ? (
    <>
      {/* Frontera */}
      <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
        <FaRulerCombined className="text-red-600 mr-3" />
        <div>
          <p className="text-gray-500 text-sm">Frontera</p>
          <p className="font-semibold text-lg">
            {data.property.frontera
              ? `${data.property.frontera} m`
              : "No especificado"}
          </p>
        </div>
      </div>

      {/* Largo */}
      <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
        <FaRulerCombined className="text-red-600 mr-3" />
        <div>
          <p className="text-gray-500 text-sm">Largo</p>
          <p className="font-semibold text-lg">
            {data.property.largo
              ? `${data.property.largo} m`
              : "No especificado"}
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Dormitorios */}
      <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
        <FaBed className="text-red-600 mr-3" />
        <div>
          <p className="text-gray-500 text-sm">Dormitorios</p>
          <p className="font-semibold text-lg">{data.property.bedrooms}</p>
        </div>
      </div>

      {/* Baños */}
      <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
        <FaBath className="text-red-600 mr-3" />
        <div>
          <p className="text-gray-500 text-sm">Baños</p>
          <p className="font-semibold text-lg">{data.property.bathrooms}</p>
        </div>
      </div>
    </>
  )}

  {/* Precio (común a todos) */}
  <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
    <FaTag className="text-red-600 mr-3" />
    <div>
      <p className="text-gray-500 text-sm">Precio</p>
      <p className="font-semibold text-lg text-red-600">
        {formatPrice(data.property.price)}
      </p>
    </div>
  </div>
</div>

          
   <hr className="border-gray-300 mb-6" />
          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Descripción</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.property.description }}
            />
          </div>

          {/* Mapa */}
          {data.property.latitude && data.property.longitude && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 mt-4 mb-8 rounded-xl overflow-hidden">
              <iframe
                title="Mapa de la propiedad"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${data.property.latitude},${data.property.longitude}&z=16&output=embed`}
              />
            </div>
          )}

          {/* Subpropiedades */}
          {data.subProperties && data.subProperties.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  onClick={() => generatePropertyPdf(data.property, data.subProperties)}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M5 20h14v-2H5v2zM12 2l-6 6h4v6h4V8h4l-6-6z" />
                  </svg>
                  Descargar Flyer
                </button>

                <button
                  onClick={() => window.open("/", "_blank")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Buscar más propiedades
                </button>
              </div>
            </div>
          )}

            <FeaturedProperties />
        </div>
      </div>
    </>
  );
}
