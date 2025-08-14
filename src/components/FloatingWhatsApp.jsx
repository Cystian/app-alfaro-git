// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/FloatingWhatsApp.css";

const FloatingWhatsApp = () => {
  return (
    <div className="floating-whatsapp">
      <a
        href="https://wa.me/51987654321" // reemplaza con tu número
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
      <span className="whatsapp-label">ESCRÍBENOS</span>
    </div>
  );
};

export default FloatingWhatsApp;
