import React from "react";
import { motion } from "framer-motion";
import { Building2, Users2, Star, Landmark } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const NuestraHistoria = () => {
  return (
    <PageWrapper>
      <section className="relative bg-[#F9F9F9] py-20 px-6 md:px-20 overflow-hidden">

        {/* 🌇 Banner superior */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-[#F5F5F5] rounded-3xl overflow-hidden shadow-md mb-16"
        >
          <img
            src="/nuestra-historia.png"
            alt="Banner Nuestra Historia"
            className="w-full h-auto md:h-[420px] object-contain mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-base md:text-lg text-gray-200 tracking-wide"
            >
              Cuatro décadas de visión, innovación y compromiso con el desarrollo urbano
            </motion.p>
          </div>
        </motion.div>

        {/* 🏛️ Contenedor principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto bg-white shadow-lg rounded-3xl p-10 md:p-16 border border-gray-100"
        >
          {/* Texto introductorio */}
          <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 text-justify">
            <p>
              <span className="font-semibold text-gray-900">Inmobiliaria Alberto Alfaro</span>{" "}
              forma parte del{" "}
              <span className="font-semibold text-gray-900">Grupo Empresarial Alfa</span>, con más de{" "}
              <span className="font-semibold">40 años</span> de experiencia en los sectores de{" "}
              <span className="italic">inmobiliaria, construcción, educación y entretenimiento</span>.  
              A lo largo de su trayectoria, ha desarrollado, financiado, construido y comercializado
              diversos proyectos emblemáticos como viviendas, edificios multifamiliares, galerías comerciales,
              centros empresariales, mercados y habilitaciones urbanas.
            </p>

            <p>
              Entre los hitos más relevantes del grupo destacan los siguientes proyectos:
            </p>
          </div>

          {/* 🏗️ Proyectos destacados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {[
              {
                img: "/galerias-alfa.png",
                title: "Galerías Alfa",
                text: "Inmueble compuesto por 70 tiendas comerciales, símbolo del desarrollo empresarial y comercial de la ciudad.",
              },
              {
                img: "/edificio_alfa.png",
                title: "Edificio Empresarial Alfa",
                text: "Espacio corporativo con casino, banco, 25 oficinas y 4 departamentos dúplex, consolidando su presencia en el sector empresarial.",
              },
              {
                img: "/instituto-atlanta.png",
                title: "Instituto de Turismo & Gastronomía ATLANTA",
                text: "Proyecto educativo pionero, orientado a la formación técnica y profesional en turismo, hotelería y gastronomía.",
              },
              {
                img: "/centros-diversion.png",
                title: "Centros de Diversión",
                text: "KANKUN Tropical Disco, Boulevard Sur y Babilon Lounge, marcas de entretenimiento que marcaron tendencia en Chimbote.",
              },
            ].map((p, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="rounded-3xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#C80000] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 👔 Fundador */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 text-justify"
          >
            <p>
              <span className="font-semibold text-gray-900">Inmobiliaria Alberto Alfaro</span> es dirigida por su fundador,{" "}
              <span className="font-semibold text-gray-900">Ing. Alberto Alfaro Vásquez</span>, ingeniero civil con amplia experiencia
              empresarial en el sector inmobiliario y construcción.
            </p>

            <p>
              Ha desempeñado cargos como{" "}
              <strong>Perito Valuador de la Superintendencia de Banca y Seguros</strong>,{" "}
              <strong>Perito de la Corte Superior del Santa</strong> y{" "}
              <strong>Gerente de Desarrollo Urbano</strong> y{" "}
              <strong>Gerente de MYPES y Proyectos Especiales</strong> en la Provincia del Santa.
            </p>

            <p>
              Desde sus inicios, la firma se ha dedicado a{" "}
              <strong>conectar a las personas con sus hogares e inversiones ideales</strong>,
              creciendo con la confianza de sus clientes y un firme compromiso con la excelencia.
            </p>
          </motion.div>

          {/* 💠 Indicadores de Valor */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          >
            {[
              { icon: <Building2 className="w-12 h-12 mx-auto text-[#C80000]" />, title: "+40 Años", desc: "De experiencia integral" },
              { icon: <Users2 className="w-12 h-12 mx-auto text-[#C80000]" />, title: "Confianza", desc: "Cientos de clientes satisfechos" },
              { icon: <Star className="w-12 h-12 mx-auto text-[#C80000]" />, title: "Excelencia", desc: "Compromiso en cada proyecto" },
              { icon: <Landmark className="w-12 h-12 mx-auto text-[#C80000]" />, title: "Presencia", desc: "En todo el norte del país" },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="bg-[#FFF5F5] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default NuestraHistoria;









