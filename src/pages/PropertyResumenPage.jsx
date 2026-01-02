import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  FaBed,
  FaCar,
  FaBath,
  FaMapMarkerAlt,
  FaDrawPolygon,
  FaStar,
  FaTools,
  FaRegBuilding,
  FaRulerCombined,
  FaRulerVertical,
  FaClipboardList,
  FaHourglass,
  FaRuler,
  FaChevronDown,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { generatePropertyPdf } from "../utils/pdfGenerator";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyResumePageGallery from "../components/PropertyResumenPageGallery";
import "../styles/PropertyResumenPageGallery.css";
import PropertyGallery from "../components/PropertyGallery";

// ✅ Variantes para animación tipo Servicios
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ✅ Card reutilizable (reduce duplicación sin cambiar el estilo)
function InfoCard({ Icon, label, value, children }) {
  return (
    <motion.div
      variants={item}
      className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <Icon className="text-rojo-inmobiliario mr-3 text-2xl" />
      <div className="min-w-0">
        <p className="text-gray-500 text-sm">{label}</p>
        {children ? (
          children
        ) : (
          <p className="font-semibold text-lg text-gray-800 truncate">
            {value}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function getAntiguedadIcon(antiguedadRaw) {
  const antig = (antiguedadRaw || "").toLowerCase();
  if (antig.includes("nuevo")) return FaStar;
  if (antig.includes("remodel")) return FaTools;
  if (antig.includes("año")) return FaHourglass;
  return FaRegBuilding;
}

export default function PropertyResumenPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [masInfo, setMasInfo] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Un solo fetch (menos roundtrips, menos estados intermedios)
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const [detailsRes, infoRes] = await Promise.all([
          fetch(`/api/getPropertyDetails?id=${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
          fetch(`/api/getPropertyDetailInfo?id=${encodeURIComponent(id)}`, {
            signal: controller.signal,
          }),
        ]);

        if (!detailsRes.ok) {
          throw new Error(`Error en detalles (${detailsRes.status})`);
        }
        if (!infoRes.ok) {
          throw new Error(`Error en info adicional (${infoRes.status})`);
        }

        const detailsJson = await detailsRes.json();
        const infoJson = await infoRes.json();

        const property = detailsJson?.property ?? {};
        const subPropertiesRaw = Array.isArray(detailsJson?.subProperties)
          ? detailsJson.subProperties
          : [];

        const subProperties = subPropertiesRaw.map((sub) => ({
          ...sub,
          image: sub?.image?.trim?.() || "",
        }));

        setData({ ...detailsJson, property, subProperties });
        setMasInfo(Array.isArray(infoJson) ? infoJson : []);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Ocurrió un error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [id]);

  const property = data?.property ?? {};
  const subProperties = data?.subProperties ?? [];

  const titleLower = useMemo(
    () => (property?.title || "").toLowerCase(),
    [property?.title]
  );

  const isTerreno = useMemo(() => titleLower.includes("terreno"), [titleLower]);
  const isHotel = useMemo(() => titleLower.includes("hotel"), [titleLower]);
  const isLocal = useMemo(() => titleLower.includes("local"), [titleLower]);
  const isCasa = useMemo(() => titleLower.includes("casa"), [titleLower]);

  const isAlquiler = useMemo(
    () => (property?.status || "").toLowerCase() === "alquiler",
    [property?.status]
  );

  const formattedPrice = useMemo(() => {
    const amount = Number(property?.price);
    if (!Number.isFinite(amount)) return "";
    const moneda = (property?.moneda || "").trim() || "US$";
    const fmt = new Intl.NumberFormat("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${moneda} ${fmt.format(amount)}`;
  }, [property?.price, property?.moneda]);

  const galleryImages = useMemo(() => {
    const main = property?.image ? [property.image.trim()] : [];
    const subs = subProperties.map((sp) => sp.image).filter(Boolean);
    return [...main, ...subs];
  }, [property?.image, subProperties]);

  const toggleMoreInfo = useCallback(
    () => setShowMoreInfo((prev) => !prev),
    []
  );

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-negro-profundo mb-2">
            No pudimos cargar la propiedad
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#DF011A] hover:bg-[#BB0017] text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const showUbicacion = (isTerreno || isHotel || isLocal || isCasa) && true;
  const showDimensiones = (isTerreno || isHotel || isLocal || isCasa) && true;

  const frente = property?.frontera ?? property?.frente;
  const largo = property?.largo ?? property?.Largo; // tolerancia por inconsistencia
  const antiguedad = property?.antiguedad;

  const AntigIcon = getAntiguedadIcon(antiguedad);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="max-w-9xl mx-auto bg-white shadow-xl rounded-2xl px-2 relative"
        style={{ marginTop: "3rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}
      >
        {/* 🔹 Galería principal */}
        <div className="relative">
          <PropertyGallery
            data={data}
            onOpenLightbox={() => setLightboxOpen(true)}
          />
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <PropertyResumePageGallery
            images={galleryImages}
            title={property?.title || "Resumen de Propiedad"}
            description={property?.description || ""}
            onClose={() => setLightboxOpen(false)}
          />
        )}

        <hr className="border-gray-200 mb-6" />

        {/* 🔹 Título */}
        <h1 className="text-4xl md:text-5xl font-inter font-extrabold text-negro-profundo text-center tracking-wide mb-2">
          {property?.title || "Resumen de Propiedad"}
        </h1>

        {/* Dirección */}
        {property?.address && (
          <p className="text-lg text-gray-500 italic text-center font-geistmono tracking-tight">
            Dirección: {property.address}
          </p>
        )}

        {/* Precio */}
        {formattedPrice && (
          <p className="text-3xl font-semibold text-center text-[#DF011A] mt-4 mb-4 tracking-wide font-inter">
            Precio {property?.status ? `de ${property.status}` : ""}:{" "}
            <span className="font-bold text-negro-profundo">{formattedPrice}</span>
          </p>
        )}

        <hr className="border-gray-300 mb-6" />

        {/* 🔸 Datos principales con animación */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 font-geistmono"
        >
          {/* UBICACIÓN */}
          {showUbicacion && (
            <InfoCard
              Icon={FaMapMarkerAlt}
              label="Ubicación"
              value={property?.location || "No especificada"}
            />
          )}

          {/* ÁREA DE TERRENO */}
          <InfoCard
            Icon={FaRulerVertical}
            label="Área de Terreno"
            value={property?.area ? `${property.area} m²` : "No especificada"}
          />

          {/* 🧱 Dimensiones */}
          {showDimensiones && (
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
                  {frente ? `${frente} m` : "No especificado"}
                </p>
                <p className="text-gray-600 text-base">
                  <span className="font-medium text-negro-profundo">Largo:</span>{" "}
                  {largo ? `${largo} m` : "No especificado"}
                </p>
              </div>
            </motion.div>
          )}

          {/* ÁREA CONSTRUIDA */}
          {Number(property?.area_c) > 0 && (
            <InfoCard
              Icon={FaRuler}
              label="Área Construida"
              value={`${Number(property.area_c)} m²`}
            />
          )}

          {/* CERCO PERIMÉTRICO */}
          {Number(property?.cerco_perimetrico) > 0 && (
            <InfoCard
              Icon={FaDrawPolygon}
              label="Cerco Perimétrico"
              value={`${Number(property.cerco_perimetrico)} ml`}
            />
          )}

          {/* DORMITORIOS / HABITACIONES */}
          {!isTerreno && Number(property?.bedrooms) > 0 && (
            <InfoCard
              Icon={FaBed}
              label={isHotel || isLocal ? "Habitaciones" : "Dormitorios"}
              value={property?.bedrooms || "No especificado"}
            />
          )}

          {/* BAÑOS */}
          {!isTerreno && Number(property?.bathrooms) > 0 && (
            <InfoCard
              Icon={FaBath}
              label="Baños"
              value={property?.bathrooms || "No especificado"}
            />
          )}

          {/* COCHERAS */}
          {!isTerreno && Number(property?.cocheras) > 0 && (
            <InfoCard
              Icon={FaCar}
              label="Cocheras"
              value={property?.cocheras || "No especificado"}
            />
          )}

          {/* ANTIGÜEDAD */}
          {!isTerreno &&
            antiguedad &&
            String(antiguedad).toLowerCase() !== "cero" && (
              <InfoCard
                Icon={AntigIcon}
                label="Antigüedad"
                value={antiguedad}
              />
            )}

          {/* CONDICIONES ECONÓMICAS (solo alquiler con adelanto o garantía) */}
          {isAlquiler && (Number(property?.adelanto) > 0 || Number(property?.garantia) > 0) && (
            <motion.div
              variants={item}
              className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-2">
                <FaClipboardList className="text-rojo-inmobiliario mr-3 text-2xl" />
                <p className="text-gray-500 text-sm">Condiciones de alquiler</p>
              </div>

              <div className="space-y-1 ml-9">
                {Number(property?.adelanto) > 0 && (
                  <p className="text-gray-600 text-base">
                    <span className="font-medium text-negro-profundo">Adelanto:</span>{" "}
                    {Number(property.adelanto) === 1
                      ? "1 mes"
                      : `${property.adelanto} meses`}
                  </p>
                )}
                {Number(property?.garantia) > 0 && (
                  <p className="text-gray-600 text-base">
                    <span className="font-medium text-negro-profundo">Garantía:</span>{" "}
                    {Number(property.garantia) === 1
                      ? "1 mes"
                      : `${property.garantia} meses`}
                  </p>
                )}
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
            className="text-gray-700 font-sans-serif"
            dangerouslySetInnerHTML={{ __html: property?.description || "" }}
          />
        </div>

        {/* Distribución */}
        {!isTerreno && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-sans-serif">
              Distribución:
            </h2>
            <div
              className="text-gray-700 font-geistmono"
              dangerouslySetInnerHTML={{ __html: property?.distribution || "" }}
            />
          </div>
        )}

        {/* ✅ Opción A: si no hay data, no se muestra el acordeón y listo */}
        {masInfo.length > 0 && (
          <div className="mb-8 font-inter">
            <button
              type="button"
              onClick={toggleMoreInfo}
              aria-expanded={showMoreInfo}
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
              {masInfo.map((it) => (
                <div
                  key={it.id}
                  className="bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 font-inter"
                >
                  <h3 className="text-lg font-semibold text-negro-profundo mb-2">
                    {it.titulo_info}
                  </h3>
                  <p
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{ __html: it.descripcion_info || "" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mapa */}
        {property?.latitude && property?.longitude && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 mt-4 mb-8 rounded-xl overflow-hidden">
            <iframe
              title="Mapa de la propiedad"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=16&output=embed`}
            />
          </div>
        )}

        {/* Subpropiedades y botones */}
        {subProperties.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => generatePropertyPdf(property, subProperties)}
                className="flex items-center justify-center gap-2 bg-[#DF011A] hover:bg-[#BB0017] active:bg-[#980013] text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                📄 Descargar Flyer
              </button>

              <button
                type="button"
                onClick={() => window.open("/", "_blank")}
                className="flex items-center justify-center gap-2 bg-[#353535] hover:bg-[#1A1A1A] active:bg-[#0F0F0F] text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                🔍 Buscar más propiedades
              </button>
            </div>
          </div>
        )}

        <FeaturedProperties />
      </div>
    </div>
  );
}
