import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBed,
  FaCar,
  FaBath,
  FaMapMarkerAlt,
  FaDrawPolygon,
  FaRulerCombined,
  FaRulerVertical,
  FaClipboardList, 
  FaHourglass,
  FaRuler,
  FaChevronDown,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { generatePropertyPdf } from "../utils/pdfGenerator";
import FloatingShare from "../components/FloatingShare";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyResumePageGallery from "../components/PropertyResumenPageGallery";
import "../styles/PropertyResumenPageGallery.css";
import PropertyGallery from "../components/PropertyGallery";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [masInfo, setMasInfo] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/getPropertyDetails?id=${id}`);
      
      const result = await res.json();

        console.log("🔎 Respuesta cruda del backend de 1do:", result);
      if (result.subProperties) {
        result.subProperties = result.subProperties.map((sub) => ({
          ...sub,
          image: sub.image?.trim(),
        }));
      }
      setData(result);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchMasInfo = async () => {
      const res = await fetch(`/api/getPropertyDetailInfo?id=${id}`);
      

      
      const result = await res.json();

        console.log("🔎 Respuesta cruda del backend de 2do:", result);
      setMasInfo(result);
    };
    fetchMasInfo();
  }, [id]);

  const formatPrice = (price) =>
    price ? `US$ ${Number(price).toLocaleString("es-PE")}` : "";

  // 🔹 Variantes para animación tipo Servicios
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
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

  const galleryImages = [
    ...(data.property.image ? [data.property.image.trim()] : []),
    ...data.subProperties.map((sp) => sp.image),
  ];

  return (
    <>
      <FloatingShare />

      <div className="min-h-screen bg-gray-100">
        <div
          className="max-w-9xl mx-auto bg-white shadow-xl rounded-2xl px-2 relative"
          style={{ marginTop: "3rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}
        >
          {/* 🔹 Galería principal */}
          <div className="relative">
            <PropertyGallery data={data} />
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <PropertyResumePageGallery
              images={galleryImages}
              title={data.property.title || "Resumen de Propiedad"}
              description={data.property.description}
              onClose={() => setLightboxOpen(false)}
            />
          )}

          <hr className="border-gray-200 mb-6" />

          {/* 🔹 Título */}
          <h1 className="text-4xl md:text-5xl font-geist font-extrabold text-negro-profundo text-center tracking-wide mb-2">
            {data.property.title || "Resumen de Propiedad"}
          </h1>

          {/* Dirección */}
          {data.property.address && (
            <p className="text-lg text-gray-500 italic text-center font-geistmono tracking-tight">
              Dirección: {data.property.address}
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

          {/* 🔸 Datos principales con animación */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 font-geistmono"
          >
            {/* UBICACIÓN */}
          
{["terreno", "hotel", "local", "casa"].some((tipo) =>
  data.property.title.toLowerCase().includes(tipo)
) && (
  <motion.div
    variants={item}
    className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <FaMapMarkerAlt className="text-rojo-inmobiliario mr-3 text-2xl" />
    <div>
      <p className="text-gray-500 text-sm">Ubicación</p>
      <p className="font-semibold text-lg text-gray-800">
        {data.property.location || "No especificada"}
      </p>
    </div>
  </motion.div>
)}
        

            {/* ÁREA DE TERRENO */}
            <motion.div
              variants={item}
              className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <FaRulerVertical className="text-rojo-inmobiliario mr-3 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Área de Terreno</p>
                <p className="font-semibold text-lg text-gray-800">
                  {data.property.area ? `${data.property.area} m²` : "No especificada"}
                </p>
              </div>
            </motion.div>


            
{/* 🧱 BLOQUE 1: Dimensiones */}
{["terreno", "hotel", "local", "casa"].some((tipo) =>
  data.property.title.toLowerCase().includes(tipo)
) && (
  <motion.div
    variants={item}
    className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center mb-2">
      <FaRulerCombined className="text-rojo-inmobiliario mr-3 text-2xl" />
      <p className="text-gray-500 text-sm">Dimensiones</p>
    </div>
    <div className="space-y-1 ml-9">
      <p className="text-gray-600 text-base">
        <span className="font-medium text-negro-profundo">Frente:</span>{" "}
        {data.property.frontera
          ? `${data.property.frontera} m`
          : "No especificado"}
      </p>
      <p className="text-gray-600 text-base">
        <span className="font-medium text-negro-profundo">Largo:</span>{" "}
        {data.property.Largo
          ? `${data.property.Largo} m`
          : "No especificado"}
      </p>
    </div>
  </motion.div>
)}


            {/* ÁREA CONSTRUIDA */}
{Number(data.property.area_c) > 0 && (
  <motion.div
    variants={item}
    className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <FaRuler className="text-rojo-inmobiliario mr-3 text-2xl" />
    <div>
      <p className="text-gray-500 text-sm">Área Construida</p>
      <p className="font-semibold text-lg text-gray-800">
        {`${Number(data.property.area_c)} m²`}
      </p>
    </div>
  </motion.div>
)}

            {/* CERCO PERIMÉTRICO */}
{Number(data.property.cerco_perimetrico) > 0 && (
  <motion.div
    variants={item}
    className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <FaDrawPolygon className="text-rojo-inmobiliario mr-3 text-2xl" />
    <div>
      <p className="text-gray-500 text-sm">Cerco Perimétrico</p>
      <p className="font-semibold text-lg text-gray-800">
        {`${Number(data.property.cerco_perimetrico)} ml`}
      </p>
    </div>
  </motion.div>
)}
            
{/* 🏠 BLOQUE 2: DORMITORIOS */}
{!data.property.title.toLowerCase().includes("terreno") &&
 data.property.bedrooms > 0 && (
  <motion.div
    variants={item}
    className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <FaBed className="text-rojo-inmobiliario mr-3 text-2xl" />
    <div>
      <p className="text-gray-500 text-sm">
        {["hotel", "local"].some((tipo) =>
          data.property.title.toLowerCase().includes(tipo)
        )
          ? "Habitaciones"
          : "Dormitorios"}
      </p>
      <p className="font-semibold text-lg text-gray-800">
        {data.property.bedrooms || "No especificado"}
      </p>
    </div>
  </motion.div>
)}


{/* 🚿 BLOQUE 3: BAÑOS */}
{!data.property.title.toLowerCase().includes("terreno") &&
 Number(data.property.bathrooms) > 0 && (
  <motion.div
    variants={item}
    className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <FaBath className="text-rojo-inmobiliario mr-3 text-2xl" />
    <div>
      <p className="text-gray-500 text-sm">Baños</p>
      <p className="font-semibold text-lg text-gray-800">
        {data.property.bathrooms || "No especificado"}
      </p>
    </div>
  </motion.div>
)}

{/* COCHERAS + ANTIGÜEDAD */}
{!data.property.title.toLowerCase().includes("terreno") && (
  <>
    {/* Solo mostrar Cocheras si es mayor a 0 */}
    {data.property.cocheras > 0 && (
      <motion.div
        variants={item}
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaCar className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Cocheras</p>
          <p className="font-semibold text-lg text-gray-800">
            {data.property.cocheras || "No especificado"}
          </p>
        </div>
      </motion.div>
    )}

    {/* Mostrar Antigüedad solo si NO es alquiler */}
    {data.property.status?.toLowerCase() !== "alquiler" && (
      <motion.div
        variants={item}
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaHourglass className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Antigüedad</p>
          <p className="font-semibold text-lg text-gray-800">
            {data.property.antiguedad === 0
              ? "Nueva propiedad"
              : data.property.antiguedad === 1
              ? "1 año"
              : data.property.antiguedad > 1
              ? `${data.property.antiguedad} años`
              : "No especificado"}
          </p>
        </div>
      </motion.div>
    )}
  </>
)}

{/* 📜 CONDICIONES (solo para alquiler) */}
{data.property.status?.toLowerCase() === "alquiler" &&
  data.property.condiciones && (
    <motion.div
      variants={item}
      className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center mb-2">
        <FaClipboardList className="text-rojo-inmobiliario mr-3 text-2xl" />
        <p className="text-gray-500 text-sm">Condiciones de alquiler</p>
      </div>
      <div className="ml-9">
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {data.property.condiciones}
        </p>
      </div>
    </motion.div>
  )}
            
 </motion.div>
         

          <hr className="border-gray-300 mb-6" />

          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-sans-serif">
              Descripción General:
            </h2>
            <div
              className="text-gray-700 font-geistmono"
              dangerouslySetInnerHTML={{
                __html: data.property.description,
              }}
            />
          </div>

          {/* Distribución */}
          {!data.property.title.toLowerCase().includes("terreno") && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-sans-serif">
                Distribución:
              </h2>
              <div
                className="text-gray-700 font-geistmono"
                dangerouslySetInnerHTML={{
                  __html: data.property.distribution,
                }}
              />
            </div>
          )}



     <div className="mb-8 font-inter">
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="flex items-center justify-between w-full bg-gray-100 px-5 py-3 rounded-xl shadow-sm border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-lg font-medium text-negro-profundo"
            >
              <span className="flex items-center gap-2">
                Más información
                <FaChevronDown
                  className={`transition-transform duration-300 text-rojo-inmobiliario ${
                    showMoreInfo ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ${
                showMoreInfo ? "max-h-[1000px] mt-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {masInfo.length > 0 ? (
                masInfo.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 font-inter"
                  >
                    <h3 className="text-lg font-semibold text-negro-profundo mb-2">
                      {item.titulo_info}
                    </h3>
                    <p
                      className="text-gray-600 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: item.descripcion_info,
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic col-span-full text-center mt-4">
                  No hay información adicional registrada.
                </p>
              )}
            </div>
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

          {/* Subpropiedades y botones */}
          {data.subProperties?.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  onClick={() =>
                    generatePropertyPdf(data.property, data.subProperties)
                  }
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  📄 Descargar Flyer
                </button>

                <button
                  onClick={() => window.open("/", "_blank")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  🔍 Buscar más propiedades
                </button>
              </div>
            </div>
          )}


          {/* Más información */}
          {/* ... resto del código igual */}
          <FeaturedProperties />
        </div>
      </div>
    </>
  );
}
