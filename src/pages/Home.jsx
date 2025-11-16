// ✅ Página principal que orquesta todo
import React, { useState, useEffect, useRef } from "react";
import ContactForm from "../components/ContactForm";
import SearchBanner from "../components/SearchBanner";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import PageWrapper from "../components/PageWrapper";
import FeaturedProperties from "../components/FeaturedProperties";
import ResultsGrid from "../components/ResultsGrid";
import FloatingShare from "../components/FloatingShare"; // ← Asegúrate que exista

export default function Home() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // 👉 Ref para hacer scroll suave al grid
  const resultsRef = useRef(null);

  // 👉 Detectar si estamos en la raíz "/"
  const isHome = window.location.pathname === "/";

  const handleSearch = (newFilters) => {
    setSearchFilters(newFilters);
  };

  // 🔹 Actualiza resultados del grid cuando cambian los filtros
  useEffect(() => {
    if (!searchFilters) return;

    const params = new URLSearchParams(searchFilters).toString();
    console.log("🔹 Parámetros de búsqueda:", params);

    fetch(`/api/getProperties?${params}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 Datos que llegan de la API:", data);
        setSearchResults(data);

        // 🚀 AUTO-SCROLL cuando llegan resultados (con offset)
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
      <main className="space-y-4 p-0.5 sm:p-1 bg-gray-100">

        {/* Renderizar FloatingShare SOLO en la página raíz */}
        {isHome && <FloatingShare />}

        {/* Banner de búsqueda */}
        <SearchBanner onSearch={handleSearch} />

        {/* Grid de resultados solo si hay búsqueda */}
        {searchResults.length > 0 && (
          <>
            {console.log("Resultados que llegan al grid:", searchResults)}

            {/* 👉 Contenedor del grid con ref para autoscroll */}
            <div ref={resultsRef}>
              <ResultsGrid properties={searchResults} />
            </div>
          </>
        )}

        {/* Carrusel de propiedades destacadas */}
        <section
          id="redes"
          className="bg-gray-50 p-6 rounded-2xl shadow bg-white"
        >
          <FeaturedProperties />
        </section>

        {/* Redes sociales */}
        <section
          id="redes"
          className="bg-gray-50 p-6 rounded-2xl shadow bg-white"
        >
          <SocialMediaCallToAction />
        </section>

        {/* Contacto */}
        <section
          id="contacto"
          className="bg-gray-50 p-6 rounded-2xl shadow bg-white"
        >
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
