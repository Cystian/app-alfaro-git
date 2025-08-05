// src/pages/Properties.jsx
import React from 'react';
import PropertyCard from '../components/PropertyCard';
import PageWrapper from '../components/PageWrapper';
const mockProperties = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x300',
    title: 'Departamento en Nuevo Chimbote',
    price: 'S/ 350,000',
    status: 'Disponible',
    location: 'Urb. Los Álamos, Nuevo Chimbote',
    contactLink: 'https://wa.me/51999999999',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x300',
    title: 'Casa de playa en Tortugas',
    price: 'S/ 780,000',
    status: 'En trámite',
    location: 'Zona Sur, Casma',
    contactLink: 'https://wa.me/51999999999',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300',
    title: 'Terreno en Santa',
    price: 'S/ 120,000',
    status: 'Vendido',
    location: 'Carretera Panamericana, Santa',
    contactLink: 'https://wa.me/51999999999',
  },
];

const Properties = () => {
  return ( <PageWrapper>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Propiedades Disponibles
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
   </PageWrapper>);
};

export default Properties;
