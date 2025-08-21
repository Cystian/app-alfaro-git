// src/components/PropertyModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyModal = ({ property, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${property.id}`);
        const data = await res.json();
        if (!ignore && res.ok) setDetails(data);
        if (!ignore && !res.ok) console.error("getPropertyDetails:", data?.message || "Error");
      } catch (err) {
        console.error("Error al traer detalles de la propiedad:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchDetails();
    return () => { ignore = true; };
  }, [property.id]);

  // Overlay de carga
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl px-6 py-4 shadow">Cargando detalles…</div>
      </div>
    );
  }

  // Si falló la data
  if (!details) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-2xl w-[90%] max-w-4xl p-6 relative shadow-xl" onClick={(e)=>e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl z-50"
          >
            ✕
          </button>
          <p className="text-gray-700">No se pudieron cargar los detalles.</p>
        </div>
      </div>
    );
  }

  const { property: mainProperty, subProperties = [] } = details;

  // Foto principal + subfotos desde el endpoint
  const images = useMemo(
    () => [mainProperty?.image, ...subProperties.map(sp => sp.image)].filter(Boolean),
    [mainProperty, subProperties]
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose} // cerrar al hacer click fuera
    >
      <div
        className="bg-white rounded-2xl w-[92%] max-w-5xl p-6 relative shadow-xl"
        onClick={(e) => e.stopPropagation()} // evitar que el click cierre si es dentro
      >
        {/* Botón cerrar (SVG, sin dependencias) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 z-50"
          aria-label="Cerrar"
          title="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Carrusel: flechas + bullets */}
        <div className="mb-6">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-xl"
            style={{ paddingBottom: "36px" }} // espacio para bullets
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-[400px] md:h-[480px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Ficha técnica (datos principales) */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{mainProperty?.title}</h2>
          {mainProperty?.description && <p className="text-gray-700">{mainProperty.description}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-semibold">Precio:</span> {mainProperty?.price}</p>
            <p><span className="font-semibold">Ubicación:</span> {mainProperty?.location}</p>
            {mainProperty?.area != null && <p><span className="font-semibold">Área:</span> {mainProperty.area} m²</p>}
            {mainProperty?.bedrooms != null && <p><span className="font-semibold">Habitaciones:</span> {mainProperty.bedrooms}</p>}
            {mainProperty?.bathrooms != null && <p><span className="font-semibold">Baños:</span> {mainProperty.bathrooms}</p>}
            {mainProperty?.status && <p><span className="font-semibold">Estado:</span> {mainProperty.status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;


