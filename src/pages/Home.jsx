import React, { useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import ContactForm from '../components/ContactForm';
import SearchBanner from '../components/SearchBanner';
import SocialMediaSection from '../components/SocialMediaSection'; 
import SocialMediaCallToAction from '../components/SocialMediaCallToAction'; 
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

const loadScript = (id, src) => {
  if (!document.getElementById(id) && !document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script');
    if (id) script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
};

export default function Home() {
  useEffect(() => {
    loadScript('facebook-jssdk', 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v16.0');
    loadScript('instagram-embed', 'https://www.instagram.com/embed.js');
    loadScript('tiktok-embed', 'https://www.tiktok.com/embed.js');

    const parseEmbeds = () => {
      if (window.FB) window.FB.XFBML.parse();
      if (window.instgrm) window.instgrm.Embeds.process();
      if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
    };

    const timeout = setTimeout(parseEmbeds, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageWrapper>
      <main className="space-y-12 p-4 sm:p-8">
        <SearchBanner />

        <section>
          <h2 className="text-2xl font-bold mb-4">Propiedades destacadasX1</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </section>

   {/*   <SocialMediaSection />*/}

        {/* Aquí insertas la llamada a la acción */}
        <SocialMediaCallToAction />

        <section id="contacto" className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">¿Tienes dudas? Contáctanos</h2>
          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}
