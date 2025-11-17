import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ResultsGrid({ properties }) {
  // normalizar entrada: si vienen null/undefined/no-array => usar []
  const safeProperties = Array.isArray(properties) ? properties : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState(false);
  const itemsPerPage = 9;

  // Si cambia el conjunto de propiedades, reiniciamos página y disparamos popup si está vacío
  useEffect(() => {
    setCurrentPage(1); // evita páginas fuera de rango cuando cambia el dataset

    if (safeProperties.length === 0) {
      setShowNoResultsPopup(true);
      const t = setTimeout(() => setShowNoResultsPopup(false), 2500);
      return () => clearTimeout(t);
    } else {
      // opcional: si quieres también notificar cuando hay resultados, lo puedes activar aquí
      setShowNoResultsPopup(false);
    }
  }, [properties]); // observamos la prop original por si reference cambia

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProperties = safeProperties.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(safeProperties.length / itemsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPaginationRange = () => {
    const totalNumbers = 10;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      let pages = [];

      if (startPage > 2) pages.push("left-ellipsis");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("right-ellipsis");

      return [1, ...pages, totalPages];
    }
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const paginationRange = getPaginationRange();

  return (
    <div>
      <section id="redes" className="bg-gray-50 p-6 rounded-2xl shadow bg-white">

        {/* 🔔 POPUP: No hay resultados (solo cuando el array está vacío) */}
        {showNoResultsPopup && safeProperties.length === 0 && (
          <div
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-white text-red-600 
                       px-6 py-3 rounded-xl shadow-lg border border-red-500
                       z-[9999] font-semibold tracking-wide animate-fadeInOut">
            ⚠️ No se encontraron propiedades
          </div>
        )}

        {/* Si no hay resultados, no renderizamos banner ni grid (ya mostramos el popup) */}
        {safeProperties.length === 0 ? null : (
          <>
            {/* 🖼️ Banner superior */}
            <div className="mb-4 text-center">
              <img
                src="/subtitulos/resultados_busqueda.png"
                alt="Resultados de Busqueda"
                className="w-[30rem] mx-auto"
              />
              <p className="text-gray-800 text-base font-medium mt-3 text-center tracking-wide">
                🔍{" "}
                <span className="font-semibold text-blue-600">
                  {safeProperties.length}
                </span>{" "}
                propiedades encontradas
              </p>
            </div>

            {/* 🏠 Cuadrícula de propiedades */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {visibleProperties.map((property, index) => (
                <motion.div
                  key={property.id ?? index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-[#F9F9F9] p-5 rounded-2xl shadow-md hover:shadow-xl 
                             border border-gray-200 hover:border-[#C80000] 
                             transition-all duration-500 text-center flex flex-col"
                >
                  {/* Imagen */}
                  <a
                    href={`/propiedades/resumen/${property.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer 
                                 hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </a>

                  {/* Contenido */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-[#C80000] truncate">
                      {property.title}
                    </h3>
                    <p className="text-sm text-blue-600 mt-1 truncate">
                      {property.address}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {property.location}
                    </p>
                    <p className="text-blue-600 font-bold mt-2">
                      {property.moneda}
                      {Number(property.price || 0).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </p>

                    {property.status && (
                      <p className="text-xs text-gray-500 mb-4">{property.status}</p>
                    )}

                    {/* Botones */}
                    <div className="mt-auto flex gap-2">
                      <a
                        href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${encodeURIComponent(property.title || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 transition"
                      >
                        Contactar
                      </a>

                      <a
                        href={`/propiedades/resumen/${property.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600 transition"
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* 📄 Paginación */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center mt-6 gap-4">
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span className="text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>

                {/* 🔘 Números de página */}
                <div className="flex flex-wrap justify-center gap-2">
                  {paginationRange.map((page, index) => {
                    if (page === "left-ellipsis" || page === "right-ellipsis") {
                      return (
                        <span key={index} className="px-2 text-gray-500 select-none">
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg border transition-all duration-200 ${
                          page === currentPage
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
