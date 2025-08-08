// src/pages/Home.jsx
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBanner from '../components/SearchBanner';

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        {/* Navbar fijo con z-index */}
        <Navbar />

        {/* Contenedor principal con margen para que el contenido no quede debajo del Navbar */}
        <main className="flex-grow px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
          {/* Hero ajustado con padding horizontal responsivo */}
          <section className="w-full max-w-screen-xl mx-auto">
            <Hero />
          </section>

          {/* SearchBanner con margen top ajustado responsivamente */}
          <section className="w-full max-w-screen-xl mx-auto mt-8 md:mt-12">
            <SearchBanner />
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;