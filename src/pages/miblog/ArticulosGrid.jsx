import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ==========================
// Componente individual de artículo
// ==========================
const ArticleCard = ({ title, description, image, date, link }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-gray-100"
  >
    {/* Imagen principal */}
    <div className="relative h-64">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {/* Fecha */}
      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
        {date}
      </span>
    </div>

    {/* Contenido textual: altura adaptable */}
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
// Loader animado tipo dots (igual que noticias)
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
// Componente principal Grid de Artículos
// ==========================
const ArticulosGrid = () => {
  const [articulosList, setArticulosList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traemos los artículos desde el endpoint serverless
  useEffect(() => {
    fetch("/.netlify/functions/getArticulos")
      .then((res) => res.json())
      .then((data) => {
        setArticulosList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar artículos:", err);
        setLoading(false);
      });
  }, []);

  // Loader mientras carga
  if (loading) return <LoaderArticulos />;

  // Render principal
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center tracking-wide">
        Artículos Destacados
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articulosList.map((art) => (
          <ArticleCard
            key={art.id}
            title={art.titulo}
            description={art.descripcion}
            image={art.imagen}
            date={new Date(art.fecha).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            link={art.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticulosGrid;

