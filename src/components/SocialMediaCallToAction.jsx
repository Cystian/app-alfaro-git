import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const iconMap = {
  facebook: <FaFacebookF className="social-icon" />,
  instagram: <FaInstagram className="social-icon" />,
  tiktok: <FaTiktok className="social-icon" />,
  whatsapp: <FaWhatsapp className="social-icon" />,
};

const SocialMediaSection = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/get-social-links")
      .then((res) => res.json())
      .then((data) => setSocialLinks(data))
      .catch((err) => console.error("Error cargando redes:", err));
  }, []);

  return (
    <section className="py-8 px-4 bg-white-100">
      <h2 className="text-center text-2xl font-bold mb-6">
        Síguenos en nuestras redes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto social-media-container">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-card ${social.color_fondo}`}
          >
            {iconMap[social.icono] || null}
            <p className="social-text">{social.nombre}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;


