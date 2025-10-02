// src/components/GuiaButton.jsx
import React from "react";
import { FaArrowUp } from "react-icons/fa";

export default function GuiaButton() {
  return (
    <a
      href="https://www.youtube.com/watch?v=TU_VIDEO_ID" // reemplaza con tu enlace
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 left-4 z-50 flex items-center space-x-2 bg-red-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-110"
    >
      {/* Icono con pulso */}
      <FaArrowUp className="animate-pulse" />

      {/* Texto */}
      <span className="font-semibold">GUIA</span>

      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Ver guía rápida
      </span>

      {/* Animación de rebote tipo “hacia el logo” */}
      <style jsx>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-logo {
          animation: bounce-arrow 1s infinite;
        }
      `}</style>
    </a>
  );
}
