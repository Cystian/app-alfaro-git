import React, { useState } from "react";
import { FaShareAlt, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { SiX, SiTiktok } from "react-icons/si";
import "../styles/FloatingShare.css";

const FloatingShare = () => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);

    // Activar mini-toast elegante
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      {/* 🔔 Mini-toast premium */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-lg text-sm animate-fade-in-out z-[9999]">
          Enlace copiado al portapapeles
        </div>
      )}

      <div className="floating-share">
        {/* Botón principal */}
        <div className="share-bubble">
          <FaShareAlt className="share-icon" />
        </div>

        {/* Opciones que se despliegan al hover */}
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

          {/* X (antes Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#000000" }}
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


