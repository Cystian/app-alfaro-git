// src/pages/PropertyResumenPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";
import { generatePropertyPdf } from "../utils/pdfGenerator";
import FloatingShare from "../components/FloatingShare";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyGallery from "../components/PropertyGallery";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${id}`);
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
        <div className="flex space-x-4 text-5xl">
          <span className="animate-bounce">🏠</span>
          <span className="animate-bounce delay-150">🏡</span>
          <span className="animate-bounce delay-300">🏘️</span>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-700">
          Cargando propiedades...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Botón flotante de compartir */}
      <FloatingShare />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative">
          {/* ✅ Carrusel + Lightbox */}
          <PropertyGallery data={data} />

          <hr className="border-gray-200 mb-6" />

          {/* 🔹 Título principal actualizado (más grueso) */}
          <h1 className="text-4xl md:text-5xl font-geist font-bold text-negro-profundo text-center tracking-wide mb-2">
            {data.property.title || "Resumen de Propiedad"}
          </h1>

          {/* Dirección */}
          {data.property.address && (
            <p className="text-lg text-gray-500 italic text-center font-geistmono tracking-tight">
              {data.property.address}
            </p>
          )}

          {/* Precio */}
          <p className="text-3xl font-semibold text-center text-rojo-inmobiliario mt-4 mb-4 tracking-wide font-geistmono">
            Precio {data.property.status ? `de ${data.property.status}` : ""}:{" "}
            <span className="font-bold text-negro-profundo">
              {formatPrice(data.property.price)}
            </span>
          </p>

          <hr className="border-gray-300 mb-6" />

          {/* 🔸 Datos principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 font-geistmono">
            {/* UBICACIÓN */}
            <div className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <FaMapMarkerAlt className="text-rojo-inmobiliario mr-3 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Ubicación</p>
                <p className="font-semibold text-lg text-gray-800">
                  {data.property.location || "No especificada"}
                </p>
              </div>
            </div>

            {/* ÁREA DE TERRENO */}
            <div className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <FaRulerCombined className="text-rojo-inmobiliario mr-3 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Área de Terreno</p>
                <p className="font-semibold text-lg text-gray-800">
                  {data.property.area
                    ? `${data.property.area} m²`
                    : "No especificada"}
                </p>
              </div>
            </div>

            {/* Lógica condicional */}
            {data.property.title.toLowerCase().includes("terreno") ? (
              <div className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-2">
                  <FaRulerCombined className="text-rojo-inmobiliario mr-3 text-2xl" />
                  <p className="text-gray-500 text-sm">Dimensiones</p>
                </div>
                <div className="space-y-1 ml-9">
                  <p className="text-gray-600 text-base">
                    <span className="font-medium text-negro-profundo">
                      Frente:
                    </span>{" "}
                    {data.property.frontera
                      ? `${data.property.frontera} m`
                      : "No especificado"}
                  </p>
                  <p className="text-gray-600 text-base">
                    <span className="font-medium text-negro-profundo">
                      Largo:
                    </span>{" "}
                    {data.property.largo
                      ? `${data.property.largo} m`
                      : "No especificado"}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* DORMITORIOS */}
                <div className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <FaBed className="text-rojo-inmobiliario mr-3 text-2xl" />
                  <div>
                    <p className="text-gray-500 text-sm">Dormitorios</p>
                    <p className="font-semibold text-lg text-gray-800">
                      {data.property.bedrooms || "No especificado"}
                    </p>
                  </div>
                </div>

                {/* BAÑOS */}
                <div className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <FaBath className="text-rojo-inmobiliario mr-3 text-2xl" />
                  <div>
                    <p className="text-gray-500 text-sm">Baños</p>
                    <p className="font-semibold text-lg text-gray-800">
                      {data.property.bathrooms || "No especificado"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Descripción
            </h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: data.property.description,
              }}
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

          {/* ✅ Combo box “Más información” actualizado */}
          <div className="mb-8">
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="flex items-center justify-between w-full bg-gray-100 px-5 py-3 rounded-xl shadow-sm border border-gray-300 hover:bg-gray-200 transition-all duration-300 font-geist font-semibold text-lg text-negro-profundo"
            >
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-rojo-inmobiliario text-xl" />
                <span>Más información</span>
              </div>
              {showMoreInfo ? (
                <FaChevronUp className="text-rojo-inmobiliario" />
              ) : (
                <FaChevronDown className="text-rojo-inmobiliario" />
              )}
            </button>

            {showMoreInfo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {[
                  {
                    title: "Planos y distribución",
                    content:
                      "Explora la organización interna de la propiedad, niveles y áreas funcionales.",
                  },
                  {
                    title: "Servicios disponibles",
                    content:
                      "Incluye detalles sobre agua, luz, desagüe y otros servicios públicos.",
                  },
                  {
                    title: "Documentación legal",
                    content:
                      "Verifica títulos, registros y compatibilidad con la normativa local.",
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-negro-profundo mb-2 font-geistmono">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-geistmono">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subpropiedades */}
          {data.subProperties && data.subProperties.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  onClick={() =>
                    generatePropertyPdf(data.property, data.subProperties)
                  }
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M5 20h14v-2H5v2zM12 2l-6 6h4v6h4V8h4l-6-6z" />
                  </svg>
                  Descargar Flyer
                </button>

                <button
                  onClick={() => window.open("/", "_blank")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Buscar más propiedades
                </button>
              </div>
            </div>
          )}

          {/* 🔹 Propiedades destacadas */}
          <FeaturedProperties />
        </div>
      </div>
    </>
  );
}