import React from "react";

export default function ResultsGrid({ properties }) {
  return (
    <div>
       <section id="redes" className="bg-gray-50 p-6 rounded-2xl shadow bg-white ">
     <div className="mb-4">
    <img 
      src="/subtitulos/resultados_busqueda.png" 
      alt="Resultados de Busqueda" 
      className="w-[30rem] mx-auto" 
    />
  </div>
         
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
  
              <a href={`/propiedades/resumen/${property.id}`} target="_blank" rel="noopener noreferrer">
  <img
    src={property.image}
    alt={property.title}
    className="w-full h-48 object-cover rounded mb-4 cursor-pointer hover:scale-105 transition-transform"
    loading="lazy"
  />
</a>


            
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-1 truncate">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-1 truncate">{property.location}</p>
              <p className="text-blue-600 font-semibold mb-2">
                S/ {Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </p>
              {property.status && (
                <p className="text-xs text-gray-500 mb-4">{property.status}</p>
              )}

              <div className="mt-auto flex gap-2">
                {/* Botón WhatsApp */}
                <a
                  href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 transition no-underline hover:no-underline focus:no-underline active:no-underline"
                >
                  Contactar
                </a>

                {/* Botón Ver más (como enlace) */}
                <a
                  href={`/propiedades/resumen/${property.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600 transition no-underline hover:no-underline focus:no-underline active:no-underline"
                >
                  Ver más
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
            </section>
    </div>
  );
}
