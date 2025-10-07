import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================
// Componente individual de noticia
// ==========================
const NewsCard = ({ id, title, description, image, date }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-gray-100"
  >
    <div className="relative h-64">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
        {date}
      </span>
    </div>

    <div className="p-6 flex flex-col justify-between h-48">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-5 line-clamp-3">{description}</p>
      <Link
        to={`/blog/noticias/${id}`}
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
const LoaderNoticias = () => {
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
// Componente principal NoticiasGrid con filtro + paginación
// ==========================
const NoticiasGrid = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const cardsPerPage = 9;

  useEffect(() => {
    fetch("/.netlify/functions/getNoticias")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setNewsList(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoaderNoticias />;

  // Filtrado por fecha
  const filteredList = selectedDate
    ? newsList.filter((news) => new Date(news.fecha) >= new Date(selectedDate))
    : newsList;

  // Paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredList.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredList.length / cardsPerPage);

  return (
    <section className="w-full max-w-7xl mx-auto py-8 px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">Noticias Exclusivas</h2>

        {/* Filtro por fecha */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Filtrar desde:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-1 text-gray-700"
          />
        </div>
      </div>

      {/* Grilla de noticias */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentCards.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.titulo}
            description={news.descripcion}
            image={news.imagen}
            date={new Date(news.fecha).toLocaleDateString("es-PE", {
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
                  : "bg-gray-200 text-gray-800"
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

export default NoticiasGrid;

