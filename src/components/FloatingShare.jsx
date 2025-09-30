import React from "react";
import { FaShareAlt, FaWhatsapp, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import '../styles/FloatingShare.css';

const FloatingShare = () => {
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("¡Enlace copiado!");
  };

  return (
    <div className="floating-share">
      {/* Botón principal */}
      <div className="share-bubble">
        <FaShareAlt className="share-icon" />
      </div>

      {/* Opciones que se despliegan al hover */}
      <div className="share-options">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#25d366" }}
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#1877f2" }}
        >
          <FaFacebook />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#1da1f2" }}
        >
          <FaTwitter />
        </a>
        <button onClick={handleCopyLink} style={{ backgroundColor: "#555" }}>
          <FaLink />
        </button>
      </div>
    </div>
  );
};

export default FloatingShare;

