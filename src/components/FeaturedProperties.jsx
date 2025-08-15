import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const reelRef = useRef(null);

  // Fetch de propiedades desde tu BD
  useEffect(() => {
    fetch('/api/properties') // Ajusta tu endpoint
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  // Efecto de reel automático
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    let scrollAmount = 0;
    const interval = setInterval(() => {
      scrollAmount += 1; // velocidad
      if (scrollAmount >= reel.scrollWidth - reel.clientWidth) {
        scrollAmount = 0; // reinicia
      }
      reel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 30);

    return () => clearInterval(interval);
  }, [properties]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
      <div
        ref={reelRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth"
      >
        {properties.map((prop) => (
          <div key={prop.id} className="inline-block flex-shrink-0 w-72">
            <PropertyCard {...prop} />
          </div>
        ))}
      </div>
    </section>
  );
}
