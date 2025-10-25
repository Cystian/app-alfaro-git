// src/components/PropertyResumePageGallery.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/PropertyResumenPageGallery.css";

const PropertyResumePageGallery = ({ images, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Scroll automático para miniaturas activas
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.querySelector(".thumbnail-lightbox.active");
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }, [currentIndex]);

  return (
    <div className="gallery-container">
      <div className="thumbnails-container">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Propiedad ${idx + 1}`}
            className="thumbnail"
            onClick={() => openLightbox(idx)}
          />
        ))}
      </div>

      {isOpen && (
        <div className="lightbox-overlay">
          <div className="lightbox-content">
            <button className="close-btn" onClick={closeLightbox}>
              <FaTimes />
            </button>

            <div className="info-badge">
              <h2>{title}</h2>
            </div>

            <img src={images[currentIndex]} alt={`Propiedad ${currentIndex + 1}`} className="main-image" />

            <div className="description-badge">{description}</div>

            <button className="nav-btn left" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn right" onClick={nextImage}>
              <FaChevronRight />
            </button>

            <div className="lightbox-thumbnails" ref={thumbnailsRef}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className={`thumbnail-lightbox ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyResumePageGallery;