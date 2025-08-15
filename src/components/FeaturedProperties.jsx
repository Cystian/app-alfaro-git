import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/getProperties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Cargando propiedades...</p>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} {...prop} />
        ))}
      </div>
    </section>
  );
}

