import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const reelRef = useRef(null);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  const loopProperties = [...properties, ...properties]; // loop infinito visual

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    let scrollAmount = 0;
    const speed = 1;

    const interval = setInterval(() => {
      scrollAmount += speed;
      if (scrollAmount >= reel.scrollWidth / 2) scrollAmount = 0;
      reel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 20);

    return () => clearInterval(interval);
  }, [properties]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
      <div
        ref={reelRef}
        className="flex gap-4 overflow-x-hidden whitespace-nowrap"
      >
        {loopProperties.map((prop, index) => (
          <motion.div
            key={`${prop.id}-${index}`}
            className="inline-block flex-shrink-0 w-72"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
          >
            <PropertyCard {...prop} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

