// src/pages/Home.jsx
import React from 'react';
import PropertyCard from '../components/PropertyCard';
import ContactForm from '../components/ContactForm';
import SearchBanner from '../components/SearchBanner';
import PageWrapper from '../components/PageWrapper';

const featuredProperties = [
  {
    id: 1,
    title: 'Departamento en Miraflores',
    image: '/images/miraflores.jpg',
    price: 'US$ 120,000',
    location: 'Miraflores, Lima',
    status: 'En Venta',
  },
  {
    id: 2,
    title: 'Casa en Trujillo',
    image: '/images/trujillo.jpg',
    price: 'S/ 390,000',
    location: 'Trujillo, La Libertad',
    status: 'En Alquiler',
  },
  {
    id: 3,
    title: 'Terreno en Cajamarca',
    image: '/images/cajamarca.jpg',
    price: 'US$ 35,000',
    location: 'Cajamarca',
    status: 'En Venta',
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex flex-col gap-12 p-4 sm:p-8">
        {/* Banner de búsqueda */}
        <SearchBanner />

        {/* Propiedades destacadas */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </section>

        {/* Formulario de contacto */}
        <section id="contacto" className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">¿Tienes dudas? Contáctanos</h2>
          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}
    
     