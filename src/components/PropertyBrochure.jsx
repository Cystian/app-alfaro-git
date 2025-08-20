// src/components/PropertyBrochure.jsx
import React from "react";

const PropertyBrochure = ({ property, subProperties = [], flyerData = null }) => {
  console.log("✅ Test PropertyBrochure props:", { property, subProperties, flyerData });

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">📄 PropertyBrochure Test</h2>
      <p>Propiedad: {property?.title || "Sin título"}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => alert("Descargar flyer (test)")}
      >
        Descargar Flyer
      </button>
    </div>
  );
};

export default PropertyBrochure;

