// src/components/PropertySubProperties.jsx
import React from "react";

const PropertySubProperties = ({ subProperties }) => {
  return (
    <div className="mt-6 text-left px-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Subpropiedades</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {subProperties.map((sp) => (
          <div key={sp.id} className="border rounded-lg p-3 shadow-sm">
            <img
              src={sp.image}
              alt={sp.content}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p className="font-semibold">{sp.content}</p>
            {sp.text_content && (
              <p className="text-sm text-gray-600 mt-1">{sp.text_content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySubProperties;
