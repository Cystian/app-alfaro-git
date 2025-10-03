// ✅ Página principal que orquesta todo
import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SearchBanner from "../components/SearchBanner";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import PageWrapper from "../components/PageWrapper";
import FeaturedProperties from "../components/FeaturedProperties";
import ResultsGrid from "../components/ResultsGrid";

export default function Home() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (newFilters) => {
    setSearchFilters(newFilters);
  };

  // 🔹 Actualiza resultados del grid cuando cambian los filtros
  useEffect(() => {
    if (!searchFilters) return;
    const params = new URLSearchParams(searchFilters).toString();
    fetch(`/.netlify/functions/getProperties?${params}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => console.error("Error en búsqueda:", err));
  }, [searchFilters]);

  return (
    <PageWrapper>
      <main className="space-y-4 p-4 sm:p-8">
        {/* Banner de búsqueda */}
        <SearchBanner onSearch={handleSearch} />

        {/* Grid de resultados solo si hay búsqueda */}
        {searchResults.length > 0 && <ResultsGrid properties={searchResults} />}

        {/* Carrusel de propiedades destacadas siempre 6 más recientes */}
        <FeaturedProperties />

        {/* Redes sociales */}
        <section id="redes" className="bg-gray-50 p-6 rounded-2xl shadow">
          <SocialMediaCallToAction />
        </section>

        {/* Contacto */}
        <section id="contacto" className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">¿Tienes dudas? Contáctanos</h2>
          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}
