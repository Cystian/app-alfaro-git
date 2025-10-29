import React from "react";
import { motion } from "framer-motion";
import { Building2, Users2, Star, Landmark } from "lucide-react";

const NuestraHistoria = () => {
  return (
    <section className="relative bg-[#F9F9F9] px-6 md:px-20 overflow-hidden" style={{
    padding-top: 2rem}}>
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
      >
        {/* === Banner Principal === */}
        <div className="relative w-full h-auto md:h-[420px] overflow-hidden bg-[#F5F5F5]">
          <img
            src="/nuestra-historia.png"
            alt="Banner Nuestra Historia"
            className="w-full h-auto md:h-[420px] object-contain mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-2 text-sm md:text-base text-gray-200"
            >
              Cuatro décadas de visión, innovación y compromiso con el desarrollo urbano
            </motion.p>
          </div>
        </div>

        {/* === Contenido Principal === */}
        <div className="p-10 md:p-16 text-gray-700">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed space-y-6 text-justify"
          >
            <p>
              <span className="font-semibold text-gray-900">
                Inmobiliaria Alberto Alfaro
              </span>{" "}
              es una de las firmas del{" "}
              <span className="font-semibold text-gray-900">
                Grupo Empresarial Alfa
              </span>
              , con más de <span className="font-semibold">40 años</span> de
              experiencia en los sectores de{" "}
              <span className="italic">
                inmobiliaria, construcción, educación y entretenimiento
              </span>
              . Durante su trayectoria, el grupo ha desarrollado, financiado,
              construido, vendido y alquilado proyectos como viviendas,
              edificios multifamiliares, galerías comerciales, centros empresariales,
              centros de diversión, mercados de abastos y habilitaciones urbanas.
            </p>

            <p>
              El grupo ha ejecutado importantes proyectos propios de alto impacto,
              entre los que destacan:
            </p>
          </motion.div>

          {/* === Proyectos destacados === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {[
              {
                img: "/galerias-alfa.png",
                title: "Galerías Alfa",
                desc: "Inmueble compuesto por 70 tiendas comerciales, símbolo del desarrollo empresarial y comercial de la ciudad."
              },
              {
                img: "/edificio_alfa.png",
                title: "Edificio Empresarial Alfa",
                desc: "Inmueble empresarial con casino, banco, 25 oficinas y 4 departamentos dúplex, consolidando su presencia corporativa."
              },
              {
                img: "/instituto-atlanta.png",
                title: "Instituto de Turismo & Gastronomía ATLANTA",
                desc: "Proyecto educativo pionero orientado a la formación técnica y profesional en turismo, hotelería y gastronomía."
              },
              {
                img: "/centros-diversion.png",
                title: "Centros de Diversión",
                desc: "KANKUN Tropical Disco, Boulevard Sur y Babilon Lounge: marcas icónicas del entretenimiento en Chimbote."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all"
              >
                <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#C80000] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* === Fundador === */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-lg md:text-xl leading-relaxed space-y-6 text-justify"
          >
            <p>
              <span className="font-semibold text-gray-900">
                Inmobiliaria Alberto Alfaro
              </span>{" "}
              es dirigida por su CEO y fundador,{" "}
              <span className="font-semibold text-gray-900">
                Ing. Alberto Alfaro Vásquez
              </span>
              , ingeniero civil con amplia experiencia empresarial en el rubro
              inmobiliario y sector privado.
            </p>
            <p>
              Se ha desempeñado como{" "}
              <strong>Perito Valuador de la SBS</strong>,{" "}
              <strong>Perito de la Corte Superior del Santa</strong> y ha ocupado
              cargos institucionales como{" "}
              <strong>
                Gerente de Desarrollo Urbano y Gerente de MYPES y Proyectos Especiales
              </strong>{" "}
              de la Provincia del Santa.
            </p>
            <p>
              Desde sus inicios, la firma se ha dedicado a{" "}
              <strong>conectar a las personas con sus hogares e inversiones ideales</strong>,
              creciendo gracias a la confianza de sus clientes y al compromiso con la excelencia.
            </p>
          </motion.div>

          {/* === Valores === */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center"
          >
            {[
              { Icon: Building2, title: "+40 Años", desc: "De experiencia integral" },
              { Icon: Users2, title: "Confianza", desc: "Cientos de clientes satisfechos" },
              { Icon: Star, title: "Excelencia", desc: "Compromiso en cada proyecto" },
              { Icon: Landmark, title: "Presencia", desc: "En todo el norte del país" }
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="p-6 bg-[#FFF5F5] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Icon className="mx-auto text-[#C80000] w-10 h-10 mb-3" />
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NuestraHistoria;




