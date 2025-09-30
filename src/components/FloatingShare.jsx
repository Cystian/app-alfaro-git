// src/components/FloatingShare.jsx
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
      <div className="share-bubble">
        <FaShareAlt className="share-icon" />
        <span className="share-label">COMPARTE</span>
      </div>
      <div className="share-options">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <button onClick={handleCopyLink}>
          <FaLink />
        </button>
      </div>
    </div>
  );
};

export default FloatingShare;
