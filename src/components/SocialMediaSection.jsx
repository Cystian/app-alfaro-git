import React from "react";

const SocialMediaSection = () => {
  return (
    <section className="bg-gray-800 bg-opacity-50 rounded-xl p-6 max-w-7xl mx-auto space-y-6">
      <h3 className="text-white text-2xl font-semibold mb-4 text-center">
        Síguenos en nuestras redes sociales
      </h3>
      <div className="flex flex-col md:flex-row justify-center items-start md:space-x-10 space-y-6 md:space-y-0">

        {/* Facebook */}
        <div className="fb-page"
          data-href="https://www.facebook.com/inmobiliariaalbertoalfaro"
          data-tabs="timeline"
          data-width="320"
          data-height="400"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
          style={{ minWidth: 320, maxWidth: 320, width: "100%" }}>
          <blockquote cite="https://www.facebook.com/inmobiliariaalbertoalfaro" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/inmobiliariaalbertoalfaro">Inmobiliaria Alberto Alfaro</a>
          </blockquote>
        </div>

        {/* Instagram */}
        <blockquote 
          className="instagram-media" 
          data-instgrm-captioned 
          data-instgrm-permalink="https://www.instagram.com/p/CvCMGHEpShU/" 
          data-instgrm-version="14"
          style={{ background: "#FFF", border: "none", borderRadius: "8px", maxWidth: "320px", width: "100%" }}>
        </blockquote>

        {/* TikTok */}
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@inmobiliariaalfaro/video/7260000000000000000"
          data-video-id="7260000000000000000"
          style={{ maxWidth: "320px", width: "100%" }}
          >
        </blockquote>
      </div>
    </section>
  );
};

export default SocialMediaSection;