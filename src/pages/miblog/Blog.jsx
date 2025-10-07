// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 💠 Componente Tarjeta de Categoría
const CategoryCard = ({ title, description, image, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden shadow-md group bg-white"
    >
      {/* Imagen de fondo */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/50" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-2xl font-semibold mb-3 text-white drop-shadow-md">
          {title}
        </h2>
        <p className="text-sm mb-5 text-white/90 max-w-sm">
          {description}
        </p>
        <Link
          to={link}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 transition no-underline hover:no-underline focus:no-underline active:no-underline"
        >
          Ver {title}
        </Link>
      </div>
    </motion.div>
  );
};

// 💥 Página principal del blog
const Blog = () => {
  return (
 <section className="relative w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6 pt-8 pb-44 min-h-[calc(100vh-4rem)]">

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Blog Inmobiliario
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora las últimas <strong>Noticias</strong> y{" "}
          <strong>Artículos</strong> del mercado inmobiliario.
        </p>
      </motion.div>

      {/* Contenedor de categorías */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg w-full max-w-6xl p-8 sm:p-12"
      >
        <div className="grid sm:grid-cols-2 gap-8">
          <CategoryCard
            title="Noticias"
            description="Mantente al día con las novedades del sector y de nuestra empresa."
            image="/miblog/blog_noticias.png"
            link="/blog/noticias"
          />
          <CategoryCard
            title="Artículos"
            description="Aprende más sobre el mercado inmobiliario, consejos y análisis de expertos."
            image="/miblog/blog_articulos.png"
            link="/blog/articulos"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Blog;

