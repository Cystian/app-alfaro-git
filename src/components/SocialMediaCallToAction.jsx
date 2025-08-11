import React, { useEffect, useRef, useState } from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
  {
    id: "x",
    href: "https://twitter.com/inmobiliariaalbertoalfaro",
    label: "Visita nuestro perfil en X",
    icon: FaXTwitter,
    gradient: "from-gray-800 via-gray-900 to-black",
  },
];

export default function SocialMediaCallToAction() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-4xl mx-auto my-8 px-4 grid gap-4 sm:grid-cols-4"
    >
      {socialLinks.map(({ id, href, label, icon: Icon, gradient }, index) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          aria-label={label}
          className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-xl shadow-lg text-white font-semibold text-lg bg-gradient-to-r ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 opacity-0 ${
            visible ? "animate-fadeUp" : ""
          }`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationFillMode: "forwards",
          }}
        >
          <Icon size={32} />
          <span className="text-center">{label}</span>
        </a>
      ))}
    </section>
  );
}
