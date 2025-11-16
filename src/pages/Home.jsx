// ✅ Página principal que orquesta todo
import React, { useState, useEffect, useRef } from "react";
import ContactForm from "../components/ContactForm";
import SearchBanner from "../components/SearchBanner";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import PageWrapper from "../components/PageWrapper";
import FeaturedProperties from "../components/FeaturedProperties";
import ResultsGrid from "../components/ResultsGrid";
import FloatingShare from "../components/FloatingShare"; // ← Componente flotante

export default function Home() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const resultsRef = useRef(null);

  // 👉 Detectar si estamos en la raíz "/"
  const isHome = typeof window !== "undefined" && window.location.pathname === "/";

  const handleSearch = (newFilters) => {
    setSearchFilters(newFilters);
  };

  useEffect(() => {
    if (!searchFilters) return;

    const params = new URLSearchParams(searchFilters).toString();
    console.log("🔹 Parámetros de búsqueda:", params);

    fetch(`/api/getProperties?${params}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 Datos que llegan de la API:", data);
        setSearchResults(data);

        setTimeout(() => {
          if (resultsRef.current) {
            const offset = -5;
            const top = resultsRef.current.offsetTop - offset;

            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }
        }, 200);
      })
      .catch((err) => console.error("Error en búsqueda:", err));
  }, [searchFilters]);

  return (
    <PageWrapper>
      {/* 🌟 Botón flotante con posición fija */}
      {isHome && (
        <div className="fixed bottom-6 left-6 z-50">
          <FloatingShare />
        </div>
      )}

      <main className="space-y-4 p-0.5 sm:p-1 bg-gray-100">

        {/* Banner de búsqueda */}
        <SearchBanner onSearch={handleSearch} />

        {/* Grid de resultados */}
        {searchResults.length > 0 && (
          <>
            {console.log("Resultados que llegan al grid:", searchResults)}

            <div ref={resultsRef}>
              <ResultsGrid properties={searchResults} />
            </div>
          </>
        )}

        {/* Destacadas */}
        <section className="bg-gray-50 p-6 rounded-2xl shadow bg-white">
          <FeaturedProperties />
        </section>

        {/* Redes */}
        <section className="bg-gray-50 p-6 rounded-2xl shadow bg-white">
          <SocialMediaCallToAction />
        </section>

        {/* Contacto */}
        <section className="bg-gray-50 p-6 rounded-2xl shadow bg-white">
          <div className="mb-4">
            <img
              src="/subtitulos/tienes_dudas.png"
              alt="Tienes Dudas"
              className="w-[30rem] mx-auto"
            />
          </div>

          <ContactForm />
        </section>
      </main>
    </PageWrapper>
  );
}

