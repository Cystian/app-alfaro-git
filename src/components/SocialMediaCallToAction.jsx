// src/components/SocialMediaCallToAction.jsx
import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const socialLinks = [
  {
    id: "instagram",
    href: "https://www.instagram.com/inmobiliariaalbertoalfaro",
    label: "Visita nuestro Instagram",
    icon: <FaInstagram size={28} />,
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/inmobiliariaalbertoalfaro",
    label: "Visita nuestra página de Facebook",
    icon: <FaFacebookF size={28} />,
    gradient: "from-blue-600 via-blue-700 to-blue-800",
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@inmobiliariaalbertoalfaro", // Ajusta si el usuario o URL es distinto
    label: "Visita nuestro TikTok",
    icon: <FaTiktok size={28} />,
    gradient: "from-black via-gray-800 to-gray-900",
  },
];

const SocialMediaCallToAction = () => {
  return (
    <section className="max-w-3xl mx-auto my-8 space-y-6 px-4">
      {socialLinks.map(({ id, href, label, icon, gradient }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center space-x-3 p-4 rounded-xl shadow-lg text-white font-semibold text-lg bg-gradient-to-r ${gradient} hover:brightness-110 transition`}
          aria-label={label}
        >
          {icon}
          <span>{label}</span>
        </a>
      ))}
    </section>
  );
};

export default SocialMediaCallToAction;