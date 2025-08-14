// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <div className="floating-whatsapp">
      <span className="whatsapp-label">ESCRÍBENOS</span>
      <FaWhatsapp className="whatsapp-icon" />
    </div>
  );
};

export default FloatingWhatsApp;
