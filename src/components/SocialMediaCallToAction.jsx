// src/components/SocialMediaCallToAction.jsx
import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const socialLinks = [
  {
    id: "instagram",
    href: "https://www.instagram.com/inmobiliariaalbertoalfaro",
    label: "Visita nuestro Instagram",
    icon: FaInstagram,
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/inmobiliariaalbertoalfaro",
    label: "Visita nuestra página de Facebook",
    icon: FaFacebookF,
    gradient: "from-blue-600 via-blue-700 to-blue-800",
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@inmobiliariaalbertoalfaro",
    label: "Visita nuestro TikTok",
    icon: FaTiktok,
    gradient: "from-black via-gray-800 to-gray-900",
  },
];

export default function SocialMediaCallToAction() {
  return (
    <section className="max-w-3xl mx-auto my-8 space-y-6 px-4">
      {socialLinks.map(({ id, href, label, icon: Icon, gradient }, index) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          aria-label={label}
          className={`flex items-center justify-center space-x-3 p-4 rounded-xl shadow-lg text-white font-semibold text-lg bg-gradient-to-r ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 opacity-0 animate-fadeUp`}
          style={{
            animationDelay: `${index * 0.2}s`, // Delay secuencial
            animationFillMode: "forwards",
          }}
        >
          <Icon size={28} />
          <span>{label}</span>
        </a>
      ))}
    </section>
  );
}
