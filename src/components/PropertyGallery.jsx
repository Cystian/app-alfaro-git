import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { FiCamera, FiMenu } from "react-icons/fi";
import { Home, MapPin, UserRound, Mail, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import PropertyResumePageGallery from "../components/PropertyResumenPageGallery";

export default function PropertyGallery({ data }) {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado del menú lateral
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Helper robusto para obtener la URL de una "imagen" en distintas formas posibles
  const resolveSrc = (maybe) => {
    if (!maybe) return null;
    if (typeof maybe === "string") {
      const s = maybe.trim();
      return s === "" ? null : s;
    }
    if (typeof maybe === "object") {
      // busca propiedades comunes
      const candidates = ["src", "url", "image", "thumbnail", "photo"];
      for (const c of candidates) {
        if (maybe[c] && typeof maybe[c] === "string" && maybe[c].trim() !== "") {
          return maybe[c].trim();
        }
      }
      // a veces la imagen puede estar dentro de un objeto nested { data: { url: ... } }
      if (maybe.data && typeof maybe.data === "object") {
        for (const c of ["src", "url", "image", "photo"]) {
          if (maybe.data[c] && typeof maybe.data[c] === "string" && maybe.data[c].trim() !== "") {
            return maybe.data[c].trim();
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (!data?.property) {
      setImages([]);
      setGalleryImages([]);
      return;
    }

    // Construimos la lista priorizando la imagen principal en primer lugar
    const mainSrc = resolveSrc(data.property.image) || resolveSrc(data.property.photo) || null;
    const mainTitle = data.property.title || data.property.name || "";

    // Mapear subpropiedades robustamente (podrían venir con estructuras diferentes)
    const subs = (data.subProperties || []).map((sub) => {
      // intenta extraer la imagen de diferentes campos
      const src =
        resolveSrc(sub.image) ||
        resolveSrc(sub.photo) ||
        resolveSrc(sub.src) ||
        resolveSrc(sub.url) ||
        null;

      const title = sub.content || sub.title || sub.name || "Vista adicional";
      const description = sub.text_content || sub.description || "";

      return { src, title, description };
    });

    // Armamos array final: primero principal (si existe), luego subpropiedades filtradas
    const combined = [
      ...(mainSrc ? [{ src: mainSrc, title: mainTitle, description: "" }] : []),
      ...subs,
    ]
      // filtrar nulos y strings vacíos
      .filter((it) => it && it.src && typeof it.src === "string" && it.src.trim() !== "")
      // eliminar duplicados por src manteniendo el primer encuentro
      .reduce((acc, cur) => {
        if (!acc.find((x) => x.src === cur.src)) acc.push(cur);
        return acc;
      }, []);

    // Actualizamos estados: galleryImages (objetos) y images (solo src para Swiper)
    setGalleryImages(combined);
    setImages(combined.map((it) => it.src));
  }, [data]);

  if (!images.length) {
    return (
      <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50 font-sans">
        No hay imágenes disponibles para esta propiedad.
      </div>
    );
  }

  return (
    <>
      {/* GALERÍA PRINCIPAL */}
      <div
        className="
          flex flex-col bg-gray-50 p-4 md:p-2
          rounded-2xl shadow-md border border-gray-200
          hover:shadow-lg transition-all duration-300
          w-[98%] md:w-[98%] lg:w-[100%]
          font-sans relative
          mt-[-2rem]
          left-1/2 -translate-x-1/2
          h-[430px] md:h-[480px] lg:h-[530px]
          overflow-hidden
        "
      >
        {/* BOTÓN DEL MENÚ LATERAL (ahora arriba derecha) */}
        <button
          onClick={() => setSideMenuOpen(true)}
          className="
            absolute top-5 right-5 z-30
            flex items-center gap-2 bg-white/95 text-gray-800
            py-2 px-4 rounded-full shadow-md hover:shadow-lg
            transition-all duration-300 text-sm font-medium tracking-wide
          "
        >
          <FiMenu className="text-rojo-inmobiliario" />
          
        </button>

{/* Logo centrado superior del slider */}
<img
  src="/logo.png"
  alt="logo"
  className="
    absolute top-5 left-1/2 -translate-x-1/2
    w-48 md:w-52 h-auto

    bg-white               /* Fuerza blanco puro */
    bg-opacity-100         /* Cero gris */
    backdrop-filter-none   /* Evita mezcla visual */
    shadow-none            /* Quita sombras del contexto */
    rounded-2xl

    pointer-events-none
    z-[60]

    animate-logoSoftDrop
  "
/>



        {/* CARRUSEL PRINCIPAL */}
        <div className="relative rounded-2xl overflow-hidden h-full">
          <Swiper
            modules={[Navigation, Pagination, Thumbs, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={10}
            className="rounded-2xl overflow-hidden w-full h-full"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-[410px] md:h-[460px] lg:h-[510px]
                             overflow-hidden rounded-2xl bg-white flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* GRADIENTE ELEGANTE */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* BOTÓN VER FOTOS */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="
              absolute bottom-5 right-5 flex items-center gap-2
              bg-white/95 text-gray-800 font-medium py-2 px-5
              rounded-full shadow-lg hover:shadow-xl hover:bg-white
              z-20 transition-all duration-300 text-sm tracking-wide
            "
          >
            <FiCamera className="text-rojo-inmobiliario" />
            Ver fotos
          </button>
        </div>
      </div>

      {/* PANEL LATERAL (OFF-CANVAS) */}
      {sideMenuOpen && (
        <>
          {/* Fondo oscuro clicable */}
          <div
            onClick={() => setSideMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          ></div>

          {/* Panel deslizante */}
          <aside
            className="
              fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50
              p-6 flex flex-col gap-6 animate-slide-left
            "
            role="dialog"
            aria-modal="true"
            aria-label="Menú de opciones de la galería"
          >
            {/* Header del panel con logo */}
<div className="flex flex-col items-center ">
  {/* Logo */}
  <img
    src="/logo.png"
    alt="logo"
    className="w-36 h-auto mb-3 drop-shadow-sm"
  />

  <div className="flex w-full justify-between items-center">
    <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
      Menú
    </h3>
    <button
      onClick={() => setSideMenuOpen(false)}
      aria-label="Cerrar panel"
      className="text-gray-600 text-xl hover:text-black transition"
    >
      ✕
    </button>
  </div>
</div>

            {/* Sección de navegación principal */}
            <nav className="flex flex-col gap-3 -mt-4 ">
              <a
                href="/vende-o-alquila"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <Home className="w-5 h-5 text-rojo-inmobiliario" />
                VENDE O ALQUILA CON NOSOTROS
              </a>

              <a
                href="/servicios"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <MapPin className="w-5 h-5 text-rojo-inmobiliario" />
                SERVICIOS
              </a>

              {/* Grupo CONÓCENOS (sublinks) */}
              <div className="mt-2 border-t pt-3 border-gray-100">
                <div className="text-sm font-medium text-gray-500 uppercase mb-2">Conócenos</div>

                <a
                  href="/acerca-de-nosotros"
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  <UserRound className="w-5 h-5 text-rojo-inmobiliario" />
                  Acerca de Nosotros
                </a>

                <a
                  href="/contacto"
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  <Mail className="w-5 h-5 text-rojo-inmobiliario" />
                  Contacto
                </a>

                <a
                  href="/nuestra-historia"
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  <BookOpen className="w-5 h-5 text-rojo-inmobiliario" />
                  Nuestra Historia
                </a>
              </div>

              <div className="mt-2 border-t pt-3 border-gray-100">

              <a
                href="/blog"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <Home className="w-5 h-5 text-rojo-inmobiliario" />
                BLOG
              </a>

              <a
                href="/asesores"
                className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                <Home className="w-5 h-5 text-rojo-inmobiliario" />
                ASESORES
              </a>

              </div>
            </nav>

            

          </aside>
        </>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <PropertyResumePageGallery
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Animación personalizada */}
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.35s ease-out forwards;
        }

        @keyframes logoSoftDrop {
  0% {
    opacity: 0;
    transform: translate(-50%, -18px);
    filter: blur(6px);
  }
  60% {
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

.animate-logoSoftDrop {
  animation: logoSoftDrop 0.7s ease-out forwards;
}

      `}</style>
    </>
  );
}
