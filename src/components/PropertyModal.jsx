// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";
import PropertyBrochure from "./PropertyBrochure";

const PropertyModal = ({ property, onClose }) => {
  const testProperty = {
    title: "Casa de prueba",
    description: "Esta es una propiedad de ejemplo solo para test.",
    image: "https://via.placeholder.com/400x300.png?text=Propiedad",
  };

  const testSubProperties = [
    {
      name: "Mini depa 1",
      image: "https://via.placeholder.com/300x200.png?text=Sub1",
    },
    {
      name: "Mini depa 2",
      image: "https://via.placeholder.com/300x200.png?text=Sub2",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">🔍 Test PropertyBrochure</h1>
      <PropertyBrochure 
        property={testProperty} 
        subProperties={testSubProperties} 
      />
    </div>
  );
};

export default PropertyModal;
