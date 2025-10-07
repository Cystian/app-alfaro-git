import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ==========================
// Componente individual de noticia
// ==========================
const NewsCard = ({ title, description, image, date, link }) => (
  <motion.div
    // Animación suave al pasar el mouse
    whileHover={{ scale: 1.02, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-gray-100"
  >
    {/* Imagen principal de la noticia */}
    <div className="relative h-64">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {/* Fecha de la noticia */}
      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
        {date}
      </span>
    </div>

    {/* Contenido textual */}
    <div className="p-6 flex flex-col justify-between h-48">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-5 line-clamp-3">{description}</p>
      <a
        href={link}
        className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
      >
        Leer más →
      </a>
    </div>
  </motion.div>
);

// ==========================
// Componente principal que muestra la grilla de noticias
// ==========================
const NoticiasGrid = () => {
  const [newsList, setNewsList] = useState([]); // Guardará la lista de noticias
  const [loading, setLoading] = useState(true); // Estado de carga

  // ==========================
  // useEffect para traer datos desde el endpoint serverless
  // ==========================
  useEffect(() => {
    fetch("/.netlify/functions/getNoticias") // URL del endpoint en Netlify
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data); // Guardamos los datos en el estado
        setLoading(false); // Dejamos de mostrar loader
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setLoading(false);
      });
  }, []);

  // ==========================
  // Loader mientras se cargan las noticias
  // ==========================
  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 font-medium text-lg">
        Cargando noticias ...
      </p>
    );

  // ==========================
  // Render principal
  // ==========================
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-6">
      {/* Título de la sección */}
      <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center tracking-wide">
        Noticias Exclusivas
      </h2>

      {/* Grilla de noticias */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {newsList.map((news) => (
          // ==========================
          // Mapeamos cada noticia y asignamos las props correctamente
          // ==========================
          <NewsCard
            key={news.id} // Key obligatoria para map
            title={news.titulo} // mapear 'titulo' de BD a 'title' de componente
            description={news.descripcion} // mapear 'descripcion'
            image={news.imagen} // mapear 'imagen'
            date={new Date(news.fecha).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })} // Formateo de fecha DD MMM YYYY
            link={news.link} // link de la noticia
          />
        ))}
      </div>
    </section>
  );
};

export default NoticiasGrid;
