import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================
// Componente individual de artículo
// ==========================
const ArticleCard = ({ id, title, description, image, date }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-gray-100"
  >
    <div className="relative h-64">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
        {date}
      </span>
    </div>

    <div className="p-6 flex flex-col justify-between min-h-[200px]">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-5 line-clamp-3">{description}</p>
      <Link
        to={`/blog/articulos/${id}`}
        className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
      >
        Leer más →
      </Link>
    </div>
  </motion.div>
);

// ==========================
// Loader animado tipo dots
// ==========================
const LoaderArticulos = () => {
  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { yoyo: Infinity, duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex justify-center items-center py-20 space-x-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-4 h-4 bg-red-600 rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: i * 0.2, yoyo: Infinity, duration: 0.6 }}
        />
      ))}
    </div>
  );
};

// ==========================
// Componente principal Grid de Artículos con filtro + paginación
// ==========================
const ArticulosGrid = () => {
  const [articulosList, setArticulosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const cardsPerPage = 9;

  useEffect(() => {
    fetch("/.netlify/functions/getArticulos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        setArticulosList(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar artículos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoaderArticulos />;

  // Filtrado por rango de fechas
  const filteredList = useMemo(() => {
    return articulosList.filter((art) => {
      const artDate = new Date(art.fecha);
      const from = selectedStartDate ? new Date(selectedStartDate) : null;
      const to = selectedEndDate ? new Date(selectedEndDate) : null;

      if (from && to) return artDate >= from && artDate <= to;
      if (from) return artDate >= from;
      if (to) return artDate <= to;
      return true;
    });
  }, [articulosList, selectedStartDate, selectedEndDate]);

  // Paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredList.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredList.length / cardsPerPage);

  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4 flex-wrap">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
          Artículos Destacados
        </h2>

        {/* Filtros de fecha (Desde / Hasta) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm flex-wrap justify-center sm:justify-end"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Desde:
            </label>
            <input
              type="date"
              value={selectedStartDate}
              onChange={(e) => {
                setSelectedStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">Hasta:</label>
            <input
              type="date"
              value={selectedEndDate}
              onChange={(e) => {
                setSelectedEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {(selectedStartDate || selectedEndDate) && (
            <button
              onClick={() => {
                setSelectedStartDate("");
                setSelectedEndDate("");
              }}
              className="text-sm text-gray-500 hover:text-red-600 underline font-medium transition-colors duration-150"
            >
              Limpiar filtros
            </button>
          )}
        </motion.div>
      </div>

      {/* Grilla de artículos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentCards.map((art) => (
          <ArticleCard
            key={art.id}
            id={art.id}
            title={art.titulo}
            description={art.descripcion}
            image={art.imagen}
            date={new Date(art.fecha).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition-colors duration-150`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArticulosGrid;

