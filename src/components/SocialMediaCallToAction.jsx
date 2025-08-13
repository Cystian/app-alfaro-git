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

  const isHex = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
  const isGradient = (color) =>
    color.toLowerCase().startsWith("linear-gradient");

  return (
    <section className="py-8 px-4 bg-white-100">
      <h2 className="text-center text-2xl font-bold mb-6">
        Síguenos en nuestras redes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto social-media-container">
        {socialLinks.map((social, index) => {
          const colorValue = social.color_fondo || "";
          const useClass = !isHex(colorValue) && !isGradient(colorValue);
          const useStyle = isHex(colorValue)
            ? { backgroundColor: colorValue }
            : isGradient(colorValue)
            ? { background: colorValue }
            : {};

          return (
            <a
              key={index}
              href={social.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card flex flex-col items-center justify-center ${
                useClass ? colorValue : ""
              }`}
              style={useStyle}
            >
              {iconMap[social.icono] || null}
              <p className="social-text">{social.nombre}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SocialMediaSection;

