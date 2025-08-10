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
      <main className="flex flex-col gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Banner de búsqueda */}
        <section className="w-full">
          <SearchBanner />
        </section>

        {/* Propiedades destacadas */}
        




{/* Sección Redes Sociales */}
<section className="bg-gray-500 bg-opacity-50 py-8">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Facebook */}
    <div className="bg-white rounded-lg shadow p-4">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/inmobiliariaalbertoalfaro"
        data-tabs="timeline"
        data-width=""
        data-height="500"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/inmobiliariaalbertoalfaro"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/inmobiliariaalbertoalfaro">
            Inmobiliaria Alberto Alfaro
          </a>
        </blockquote>
      </div>
    </div>

    {/* Instagram */}
    <div className="bg-white rounded-lg shadow p-4">
      {/* Pega aquí el embed code que obtengas desde Instagram */}
      <blockquote className="instagram-media" ... ></blockquote>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>

    {/* TikTok */}
    <div className="bg-white rounded-lg shadow p-4">
      {/* Pega aquí el código embed completo del video TikTok */}
      {/* Ejemplo: */}
      <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@usuario/video/123..." data-video-id="123..." data-embed-from="oembed" style="max-width: 605px;min-width: 325px;">
        <section>...contenido...</section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>

  </div>
</section>





<section className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-20 ">
            Propiedades destacadas1
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </section>

        {/* Formulario de contacto */}
        <section
          id="contacto"
          className="w-full bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ¿Tienes dudas? Contáctanos
          </h2>
          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}