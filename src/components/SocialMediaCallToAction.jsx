// src/components/SocialMediaCallToAction.jsx
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const SocialMediaCallToAction = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook size={40} />,
      url: "https://facebook.com/inmobiliariaalfaro",
      bg: "bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={40} />,
      url: "https://instagram.com/inmobiliariaalfaro",
      bg: "bg-pink-500",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={40} />,
      url: "https://tiktok.com/@inmobiliariaalfaro",
      bg: "bg-black",
    },
    {
      name: "X",
      icon: <FaXTwitter size={40} />,
      url: "https://x.com/inmobiliariaalfaro",
      bg: "bg-gray-800",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={40} />,
      url: "https://wa.me/51940221494",
      bg: "bg-green-500",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          ¡Conéctate con Nosotros!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full text-white ${link.bg} mb-4`}
              >
                {link.icon}
              </div>
              <span className="font-semibold">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaCallToAction;

