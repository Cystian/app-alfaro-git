import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import SearchBanner from "../components/SearchBanner";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import PageWrapper from "../components/PageWrapper";
import FeaturedProperties from "../components/FeaturedProperties";

export default function Home() {
  const [searchFilters, setSearchFilters] = useState(null);

  const handleSearch = (newFilters) => {
    setSearchFilters(newFilters); // activa búsqueda
  };

  return (
    <PageWrapper>
      <main className="space-y-12 p-4 sm:p-8">
        <SearchBanner onSearch={handleSearch} />

        <section>
          <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
          <FeaturedProperties filters={searchFilters} />
        </section>

        <section id="redes" className="bg-gray-50 p-6 rounded-2xl shadow">
          <SocialMediaCallToAction />
        </section>

        <section id="contacto" className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            ¿Tienes dudas? Contáctanos
          </h2>
          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}
