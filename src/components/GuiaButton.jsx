//src/components/GuiaButton.jsx

import React from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/GuiaButton.css";

export default function GuiaButton() {
  return (
    <a
      href="https://www.youtube.com/watch?v=TU_VIDEO_ID" // reemplaza con tu enlace
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-3 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 no-underline"
    >
      <div className="guia-bubble">
     
        <span className="guia-label">GUIA</span>
      </div>
    </a>
  );
}
