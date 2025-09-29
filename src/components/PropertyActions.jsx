// src/components/PropertyActions.jsx
import React from "react";
import { generatePropertyPdf } from "../utils/pdfGenerator";

const PropertyActions = ({ propData, subProperties }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 px-4">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${propData.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border-2 border-[#dc2626] text-[#dc2626] bg-white py-2 px-4 rounded-lg hover:bg-[#dc2626] hover:text-white transition no-underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12.04 2C6.55 2 2 6.2 2 11.3c0 1.82.52 3.55 1.43 5.05L2 22l5.9-1.9c1.46.8 3.13 1.22 4.96 1.22 5.49 0 10.04-4.2 10.04-9.3S17.53 2 12.04 2z"/>
          <path d="M16.1 13.8c-.2-.1-1.3-.64-1.5-.71-.2-.07-.4-.1-.6.1-.2.2-.7.7-.8.84-.1.14-.3.16-.5.05-.2-.1-.8-.3-1.5-.95-.6-.56-1-1.25-1.2-1.46-.1-.2 0-.32.1-.43.1-.1.2-.25.3-.37.1-.12.1-.21.2-.35.1-.14.05-.26 0-.37-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.25-.1.14-.7.7-.7 1.7 0 1 .7 1.9.8 2 .1.14 1.5 2.3 3.7 3.2.5.2.9.3 1.2.4.5.2.9.2 1.3.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.2-1 0-.1-.2-.1-.4-.2z"/>
        </svg>
        WhatsApp
      </a>

      {/* Descargar PDF */}
      <button
        onClick={() => generatePropertyPdf(propData, subProperties)}
        className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        <img src="/flyer.png" alt="Flyer" className="w-5 h-5 mr-2" />
        Descargar Flyer
      </button>

      {/* Ver Resumen */}
      <a
        href={`/propiedades/resumen/${propData.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="inline-flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition">
          <img src="/documento.png" alt="Resumen" className="w-5 h-5 mr-2" />
          Ver Resumen
        </button>
      </a>
    </div>
  );
};

export default PropertyActions;
