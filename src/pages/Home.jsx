// src/pages/Home.jsx
import React from 'react';
import PropertyCard from '../components/PropertyCard';
import ContactForm from '../components/ContactForm';
import { Button } from '@/components/ui/button';
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
  return ( <PageWrapper>
    <main className="space-y-12 p-4 sm:p-8">
      {/* Banner */}
 <section
  className="relative bg-cover bg-center h-64 rounded-2xl shadow-lg"
  style={{ backgroundImage: "url('./public/baner.png')" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 rounded-2xl">
    <h1 className="text-3xl md:text-5xl font-bold">Encuentra tu lugar ideal</h1>
    <p className="mt-2 text-lg md:text-xl">Compra, vende o alquila con la mejor asesoría</p>
    <Button className="mt-4 bg-white text-black hover:bg-gray-200 transition">Contáctanos</Button>
  </div>
</section>

      {/* Propiedades destacadas */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
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
   </PageWrapper>);
}
