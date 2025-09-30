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
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/.netlify/functions/getPropertyDetails?id=${id}`
      );
      const result = await res.json();
      console.log("Datos obtenidos de la BD:", result);

      // Limpiar URLs de subpropiedades por si tienen saltos de línea
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
    return `S/ ${Number(price).toLocaleString("es-PE")}`;
  };

  if (!data) return <p className="text-gray-600">Cargando Datos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative">

        {/* Miniaturas tipo Swiper antes del título */}
        {data.subProperties && data.subProperties.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={Math.min(data.subProperties.length, 5)}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mb-6"
          >
            {data.subProperties.map((sub, i) => (
              <SwiperSlide key={i}>
                <img
                  src={sub.image}
                  alt={sub.content}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer transition-transform duration-200 hover:scale-110"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
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
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
            <FaBed className="text-red-600 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Dormitorios</p>
              <p className="font-semibold text-lg">{data.property.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
            <FaBath className="text-red-600 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Baños</p>
              <p className="font-semibold text-lg">{data.property.bathrooms}</p>
            </div>
          </div>
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subpropiedades</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.subProperties.map((sub) => (
                <li
                  key={sub.id}
                  className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
                >
                  <img
                    src={sub.image}
                    alt={sub.content}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm font-medium">
                    {sub.content}
                  </div>
                </li>
              ))}
            </ul>

            {/* Botones */}
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

      </div>
    </div>
  );
}
