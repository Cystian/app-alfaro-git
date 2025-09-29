// ✅ Página Home: integra todo
import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import SearchBanner from "../components/SearchBanner";
import ResultsGrid from "../components/ResultsGrid";
import FeaturedProperties from "../components/FeaturedProperties";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const [filters, setFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // 🔹 Cuando el usuario busca, obtenemos grid de resultados
  useEffect(() => {
    if (!filters) return;
    fetch("/.netlify/functions/getProperties?" + new URLSearchParams(filters))
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => console.error("❌ Error en resultados:", err));
  }, [filters]);

  return (
    <PageWrapper>
      <main className="space-y-12 p-4 sm:p-8">
        {/* Banner con búsqueda */}
        <SearchBanner onSearch={setFilters} />

        {/* Grid de resultados: solo aparece si hay búsqueda */}
        {searchResults.length > 0 && <ResultsGrid properties={searchResults} />}

        {/* Carrusel de destacadas: siempre 6 más recientes */}
        <FeaturedProperties />

        {/* Secciones de branding y contacto */}
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
