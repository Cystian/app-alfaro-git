// src/components/GuiaButton.jsx

import React from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/GuiaButton.css";

export default function GuiaButton() {
  return (
    <a
      href="https://www.youtube.com/watch?v=TU_VIDEO_ID" // reemplaza con tu enlace
      target="_blank"
      rel="noopener noreferrer"
      className="floating-guia"
    >
      <div className="guia-bubble">
        <FaArrowUp className="guia-icon" />
        <span className="guia-label">GUIA</span>
      </div>
    </a>
  );
}
