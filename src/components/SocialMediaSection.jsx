// src/components/SocialMediaSection.jsx
import React from 'react';

const SocialMediaSection = () => {
  return (
    <section className="bg-gray-900 bg-opacity-70 rounded-2xl p-8 max-w-7xl mx-auto text-white space-y-8">
      {/* Llamado a la acción Instagram */}
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">
          Síguenos en Instagram
        </h3>
        <p className="mb-4 text-lg drop-shadow-md">
          Descubre las últimas propiedades y promociones exclusivas.
        </p>
        <a
          href="https://www.instagram.com/inmobiliariaalbertoalfaro/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full font-semibold shadow-lg hover:brightness-110 transition"
        >
          @inmobiliariaalbertoalfaro
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facebook Embed */}
        <div className="fb-page"
          data-href="https://www.facebook.com/inmobiliariaalbertoalfaro"
          data-tabs="timeline"
          data-width=""
          data-height=""
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
          style={{ minHeight: '300px' }}
        >
          <blockquote
            cite="https://www.facebook.com/inmobiliariaalbertoalfaro"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/inmobiliariaalbertoalfaro">Inmobiliaria Alberto Alfaro</a>
          </blockquote>
        </div>

        {/* Instagram Profile Embed (usando iframe para perfil) */}
        <div className="flex justify-center items-center">
          <iframe
            src="https://www.instagram.com/inmobiliariaalbertoalfaro/embed"
            title="Instagram Profile"
            className="w-full max-w-xs h-[400px] rounded-lg shadow-lg"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allowTransparency="true"
          />
        </div>

        {/* TikTok Embed */}
        <div className="flex justify-center items-center">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@inmobiliariaalbertoalfaro"
            data-video-id=""
            style={{ maxWidth: '325px', minWidth: '325px', margin: '0 auto' }}
          >
            <section> {/* En blanco para que TikTok cargue el video automáticamente */} </section>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;