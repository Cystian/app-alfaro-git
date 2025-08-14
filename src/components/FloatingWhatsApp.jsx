// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <div className="floating-whatsapp">
      <a
        href="https://wa.me/519XXXXXXXX" // reemplaza con tu número
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-bubble"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-label">ESCRÍBENOS</span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
