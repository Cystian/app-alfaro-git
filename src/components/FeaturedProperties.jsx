import React, { useState, useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion'; // Para animaciones suaves

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const reelRef = useRef(null);

  // Fetch propiedades desde tu BD
  useEffect(() => {
    fetch('/api/properties') // Ajusta tu endpoint
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  // Scroll infinito horizontal
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    let scrollAmount = 0;
    const speed = 1; // Ajusta velocidad

    const interval = setInterval(() => {
      scrollAmount += speed;
      if (scrollAmount >= reel.scrollWidth / 2) {
        scrollAmount = 0; // reinicia para loop infinito
      }
      reel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 20);

    return () => clearInterval(interval);
  }, [properties]);

  // Duplicar propiedades para loop infinito visual
  const loopProperties = [...properties, ...properties];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
      <div
        ref={reelRef}
        className="flex gap-4 overflow-x-hidden whitespace-nowrap"
      >
        {loopProperties.map((prop, index) => (

