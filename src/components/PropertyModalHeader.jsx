// src/components/PropertyModalHeader.jsx
import React from "react";

const PropertyModalHeader = ({ onClose, activeIndex, total }) => {
  return (
    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 px-2">
      <button
        onClick={onClose}
        className="text-gray-700 text-2xl font-bold hover:text-gray-900"
        aria-label="Cerrar modal"
      >
        &times;
      </button>
      <div className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
        {activeIndex + 1} / {total}
      </div>
    </div>
  );
};

export default PropertyModalHeader;
