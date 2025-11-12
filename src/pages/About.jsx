import React from "react";
import { motion } from "framer-motion";
import { Eye, Handshake, Lightbulb, Heart } from "lucide-react";
import FloatingShare from "../components/FloatingShare";

const About = () => {
  return (
    <>
    <FloatingShare />
    <section className="relative bg-[#F9F9F9] pt-8 px-6 md:px-20 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
      >
        {/* 🔻 Banner superior */}
        <section
          className="w-full min-h-[300px] md:min-h-[400px] bg-center bg-no-repeat relative flex items-center justify-center py-10 md:py-10"
          style={{
            backgroundImage: "url('/subtitulos/about.png')",
            backgroundSize: "contain",
          }}
        ></section>

        {/* 🏛️ Quiénes Somos */}
        <section className="py-20 px-6 md:px-20 bg-[#F9F9F9] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-semibold mb-6 text-[#C80000] tracking-wide">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Somos una firma inmobiliaria especializada en proyectos de{" "}
              <span className="font-semibold text-black">
                alta gama y desarrollo urbano
              </span>
              . Nuestro compromiso es crear experiencias únicas en la compra,
              venta y alquiler de propiedades exclusivas. Combinamos{" "}
              <span className="italic font-semibold">innovación</span>,{" "}
              <span className="italic font-semibold">transparencia</span> y{" "}
              <span className="italic font-semibold">profesionalismo</span> para
              garantizar un acompañamiento integral y seguro.
            </p>
          </motion.div>
        </section>

        {/* 🌆 Imagen aspiracional */}
        <section className="relative w-full h-[22rem] md:h-[28rem] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/luxury-skyline.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white text-3xl md:text-5xl font-bold tracking-wider text-center leading-snug"
            >
              Elevamos el estándar de vivir con lujo y confianza
            </motion.h2>
          </div>
        </section>

        {/* 🎯 Misión y Visión */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Misión",
                content:
                  "Brindar soluciones inmobiliarias personalizadas y seguras, combinando asesoría profesional, respaldo jurídico y un trato humano para superar las expectativas de cada cliente.",
              },
              {
                title: "Visión",
                content:
                  "Ser la inmobiliaria de referencia a nivel nacional, reconocida por la innovación, calidad y el impulso a un crecimiento urbano sostenible, alineado a las tendencias globales de lujo y bienestar.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative bg-[#F9F9F9] p-10 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#C80000] tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💎 Nuestros Valores */}
        <section className="py-24 px-6 md:px-20 bg-[#F5F5F5] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold mb-16 text-[#C80000] tracking-wide"
          >
            Nuestros Valores
          </motion.h2>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { title: "Transparencia", icon: <Eye size={52} /> },
              { title: "Compromiso", icon: <Handshake size={52} /> },
              { title: "Innovación", icon: <Lightbulb size={52} /> },
              { title: "Empatía", icon: <Heart size={52} /> },
            ].map((val, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center border border-gray-200"
              >
                <div className="text-[#C80000] mb-5">{val.icon}</div>
                <h4 className="text-xl font-semibold text-[#222222] tracking-wide">
                  {val.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </section>
    </>
  );
};

export default About;


