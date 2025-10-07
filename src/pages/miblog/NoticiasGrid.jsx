import React from "react";
import { motion } from "framer-motion";

// Tarjeta individual de noticia
const NewsCard = ({ title, description, image, date, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="rounded-xl overflow-hidden shadow-md bg-white"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a
          href={link}
          className="text-red-600 hover:text-red-700 font-medium transition"
        >
          Leer más
        </a>
      </div>
    </motion.div>
  );
};

// Grid de noticias
const NoticiasGrid = ({ newsList }) => {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Noticias
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </div>
    </section>
  );
};

export default NoticiasGrid;
