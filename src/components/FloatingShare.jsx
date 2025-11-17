import React, { useState, useEffect } from "react";
import { FaShareAlt, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { SiX, SiTiktok } from "react-icons/si";
import "../styles/FloatingShare.css";

const FloatingShare = () => {
  const currentUrl = window.location.href;

  // 👉 Estado para mostrar el toast personalizado
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);

    // Mostrar toast premium
    setShowToast(true);

    // Ocultarlo automáticamente después de 2.2s
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  return (
    <>
      {/* 🔥 Toast Premium */}
      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                     bg-white border-2 border-red-600 text-red-600 
                     px-6 py-3 rounded-xl shadow-lg z-[9999] 
                     font-semibold text-sm animate-fadeInOut"
        >
          ✔ Enlace copiado al portapapeles
        </div>
      )}

      <div className="floating-share">
        {/* Botón principal */}
        <div className="share-bubble">
          <FaShareAlt className="share-icon" />
        </div>

        {/* Opciones desplegables */}
        <div className="share-options">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#25d366" }}
            title="Compartir en WhatsApp"
          >
            <FaWhatsapp />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#1877f2" }}
            title="Compartir en Facebook"
          >
            <FaFacebook />
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#000" }}
            title="Compartir en X"
          >
            <SiX />
          </a>

          {/* TikTok */}
          <a
            href={`https://www.tiktok.com/share?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tiktok-btn"
            title="Compartir en TikTok"
          >
            <SiTiktok />
          </a>

          {/* Copiar enlace */}
          <button
            onClick={handleCopyLink}
            style={{ backgroundColor: "#555" }}
            title="Copiar enlace"
          >
            <FaLink />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingShare;
