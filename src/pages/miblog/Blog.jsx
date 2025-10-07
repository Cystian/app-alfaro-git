import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ title, description, image, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative rounded-2xl overflow-hidden shadow-md group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">{title}</h2>
        <p className="text-sm mb-5 text-white/90">{description}</p>
        <Link
          to={link}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
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
   
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-6xl p-8 sm:p-12">
        <div className="text-center mb-10 mt-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Blog Inmobiliario
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora las últimas <strong>Noticias</strong> y <strong>Artículos</strong> del mercado inmobiliario.
          </p>
        </div>

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
      </div>
 
  );
};

export default Blog;
