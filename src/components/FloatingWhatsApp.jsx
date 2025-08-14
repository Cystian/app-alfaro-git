// src/components/FloatingWhatsApp.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <div className="floating-whatsapp">
      <div className="whatsapp-bubble">
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-label">ESCRÍBENOS</span>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
