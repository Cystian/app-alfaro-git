import React from "react";
import PropertyCard from "../components/PropertyCard";
import ContactForm from "../components/ContactForm";
import SearchBanner from "../components/SearchBanner";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import PageWrapper from "../components/PageWrapper";
import FeaturedProperties from "../components/FeaturedProperties";
import toast, { Toaster } from "react-hot-toast"; // ✅ Importamos también `toast`

export default function Home() {
  return (
    <PageWrapper>
      <main className="space-y-12 p-4 sm:p-8">
        <SearchBanner />

        <section>
          <h2 className="text-2xl font-bold mb-4">Propiedades destacadasXD</h2>
          <button
            onClick={() => toast.success("Toast de prueba ✅")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Test Toast
          </button>
          <FeaturedProperties />
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

      {/* 🔔 Contenedor global de notificaciones */}
      <Toaster position="top-center" reverseOrder={false} />
    </PageWrapper>
  );
}
