// src/components/SocialMediaCallToAction.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";

const SocialMediaCallToAction = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={32} />,
      url: "https://facebook.com",
      bg: "bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={32} />,
      url: "https://instagram.com",
      bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={32} />,
      url: "https://tiktok.com",
      bg: "bg-black",
    },
    {
      name: "X (Twitter)",
      icon: <FaTwitter size={32} />,
      url: "https://twitter.com",
      bg: "bg-sky-500",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={32} />,
      url: "https://wa.me/51999999999",
      bg: "bg-green-500",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-full h-16 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition ${social.bg}`}
        >
          <div className="flex items-center gap-3">
            {social.icon}
            <span>{social.name}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaCallToAction;
