// src/components/SocialMediaCallToAction.jsx
import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

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

// Variantes para la animación secuencial
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SocialMediaCallToAction() {
  return (
    <motion.section
      className="max-w-3xl mx-auto my-8 space-y-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map(({ id, href, label, icon: Icon, gradient }) => (
        <motion.a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
          className={`flex items-center justify-center space-x-3 p-4 rounded-xl shadow-lg text-white font-semibold text-lg bg-gradient-to-r ${gradient} transition-transform transform hover:brightness-110`}
          aria-label={label}
        >
          <Icon size={28} />
          <span>{label}</span>
        </motion.a>
      ))}
    </motion.section>
  );
}
