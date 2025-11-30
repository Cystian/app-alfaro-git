// src/components/PropertyModal.jsx
// src/components/PropertyModal.jsx
import React, { useEffect, useState, useRef } from "react";
import { generatePropertyPdf } from "../utils/pdfGenerator";
import PropertyModalHeader from "./PropertyModalHeader";
import PropertyImageSwiper from "./PropertyImageSwiper";
import PropertyDetails from "./PropertyDetails";
import PropertySubProperties from "./PropertySubProperties";
import PropertyActions from "./PropertyActions";

const PropertyModal = ({ property, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const preloadImages = async (urls) => {
    await Promise.all(urls.map(url =>
      new Promise((res) => {
        const img = new Image();
        img.src = url;
        img.onload = res;
        img.onerror = res;
      })
    ));
  };

  useEffect(() => {
    if (!property?.id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/getPropertyDetails?id=${property.id}`);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        setDetails(data);

        const imagesToPreload = [property.image, ...(data?.subProperties?.map(sp => sp.image) || [])];
        await preloadImages(imagesToPreload);

        setIsOpen(true);
      } catch (err) {
        console.error("Error al cargar detalles de propiedad:", err);
        setError("No se pudieron cargar los detalles de la propiedad.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [property]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") handleClose(); };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 400);
  };

  if (!property) return null;

  const images = [property.image, ...(details?.subProperties?.map(sp => sp.image) || [])];
  const labels = [property.title, ...(details?.subProperties?.map(sp => sp.content) || [])];
  const propData = details?.property || {};

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-400 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black/50 backdrop-blur-sm`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl max-w-full sm:max-w-3xl w-full relative shadow-xl overflow-hidden transform transition-all duration-400 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 animate-pulse p-4">
            <div className="w-full h-64 bg-gray-300 rounded-xl mb-4"></div>
            <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-[#DF011A]">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <PropertyModalHeader onClose={handleClose} activeIndex={0} total={images.length} />

            <PropertyImageSwiper
              images={images}
              labels={labels}
              propTitle={property.title}
            />

            <PropertyDetails propData={propData} />

            {details?.subProperties?.length > 0 && (
              <PropertySubProperties subProperties={details.subProperties} />
            )}

            <PropertyActions
              propData={propData}
              subProperties={details?.subProperties || []}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyModal;

