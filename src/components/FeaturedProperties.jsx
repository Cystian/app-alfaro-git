import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("https://inmobiliariaalfaro.netlify.app/.netlify/functions/getProperties");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error("Formato inesperado:", data);
        }
      } catch (error) {
        console.error("Error al cargar propiedades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Cargando propiedades...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} {...prop} />
        ))}
      </div>
    </div>
  );
}
