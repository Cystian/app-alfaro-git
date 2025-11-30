import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================
// Tarjeta individual
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
        alt={title || "Artículo sin título"}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-[#DF011A] text-white text-xs px-3 py-1 rounded-full font-medium">
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
        className="text-[#DF011A] hover:text-red-700 font-semibold transition-colors duration-200"
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
      transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
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
          transition={{ delay: i * 0.2 }}
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
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const cardsPerPage = 9;

  useEffect(() => {
    fetch("/api/getArticulos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .filter((a) => a.fecha) // validamos que tenga fecha
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setArticulosList(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar artículos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoaderArticulos />;

  // --- Filtrado por rango de fechas ---
  const filteredList = articulosList.filter((art) => {
    const artDate = new Date(art.fecha);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;

    if (from && artDate < from) return false;
    if (to && artDate > to) return false;
    return true;
  });

  // --- Paginación ---
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredList.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredList.length / cardsPerPage);

  return (
    <section className="w-full max-w-7xl mx-auto py-4 px-6">
  {/* Encabezado con filtros totalmente responsivo */}
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-100">
  {/* Título */}
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center md:text-left">
    Artículos Destacados
  </h2>

  {/* Panel de filtros */}
  <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner w-full md:w-auto">
    <div className="flex items-center gap-2">
      <label className="text-gray-700 font-medium text-sm sm:text-base">Desde:</label>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => {
          setDateFrom(e.target.value);
          setCurrentPage(1);
        }}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm sm:text-base"
      />
    </div>

    <div className="flex items-center gap-2">
      <label className="text-gray-700 font-medium text-sm sm:text-base">Hasta:</label>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => {
          setDateTo(e.target.value);
          setCurrentPage(1);
        }}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm sm:text-base"
      />
    </div>

    <button
      onClick={() => {
        setDateFrom("");
        setDateTo("");
        setCurrentPage(1);
      }}
      className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-red-700 transition-all text-sm sm:text-base"
    >
      Limpiar
    </button>
  </div>
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
            date={
              art.fecha
                ? new Date(art.fecha).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Sin fecha"
            }
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
              className={`px-4 py-2 rounded transition-all ${
                currentPage === i + 1
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
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
