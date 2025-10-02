// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <div className="floating-whatsapp">
      <a
        href="https://wa.me/51940221494" // mi nro
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-bubble transition no-underline hover:no-underline focus:no-underline active:no-underline"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-label">ESCRÍBENOS</span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
