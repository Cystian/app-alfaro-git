// src/components/SocialMediaSection.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="social-icon" />,
      link: "https://www.facebook.com/inmobiliariaalfaro",
      bg: "bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="social-icon" />,
      link: "https://www.instagram.com/inmobiliariaalfaro",
      bg: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="social-icon" />,
      link: "https://www.tiktok.com/@inmobiliariaalfaro",
      bg: "bg-black",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="social-icon" />,
      link: "https://wa.me/51940221494",
      bg: "bg-green-500",
    },
  ];

  return (
    <section className="py-8 px-4 bg-white-100">
      <h2 className="text-center text-2xl font-bold mb-6">
        Síguenos en nuestras redes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto social-media-container">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-card ${social.bg}`}
          >
            {social.icon}
            <p className="social-text">{social.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;

