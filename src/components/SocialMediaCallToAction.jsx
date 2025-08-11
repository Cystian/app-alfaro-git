// src/components/SocialMediaSection.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={28} />,
      link: "https://www.facebook.com/inmobiliariaalfaro",
      bg: "bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={28} />,
      link: "https://www.instagram.com/inmobiliariaalfaro",
      bg: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={28} />,
      link: "https://www.tiktok.com/@inmobiliariaalfaro",
      bg: "bg-black",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={28} />,
      link: "https://wa.me/51940221494",
      bg: "bg-green-500",
    },
  ];

  return (
    <section className="py-8 px-4 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">
        Síguenos en nuestras redes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 rounded-2xl bg-white bg-opacity-80 shadow-lg 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${social.bg}`}
            >
              {social.icon}
            </div>
            <p className="mt-3 font-medium">{social.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;

