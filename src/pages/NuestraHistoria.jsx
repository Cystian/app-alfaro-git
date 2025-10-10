import React from "react";
import { motion } from "framer-motion";
import { Building2, Users2, Star, Landmark } from "lucide-react";

const NuestraHistoria = () => {
  return (
    <section
      className="relative bg-[#F9F9F9] py-20 px-6 md:px-20 overflow-hidden"
      style={{ paddingTop: "2rem" }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 pt-4" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
      >
        {/* === Banner Principal === */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src="/nuestra-historia.png"
            alt="Banner Nuestra Historia"
            className="w-full h-full object-cover"
          />
          {/* Capa superpuesta con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {/* Texto del banner */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
         
            <p className="mt-2 text-sm md:text-base text-gray-200">
              Cuatro décadas de visión, innovación y compromiso con el desarrollo urbano
            </p>
          </div>
        </div>

        {/* === Contenido Principal === */}
        <div className="p-10 md:p-16">
          {/* Texto principal */}
          <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 text-justify">
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
              construido, vendido y alquilado proyectos de diversa índole:
              viviendas, edificios multifamiliares, galerías comerciales, centros
              empresariales, centros de diversión, mercados de abastos y
              habilitaciones urbanas.
            </p>

            <p>
              Dentro de los proyectos propios más destacados construidos por el
              grupo se encuentran:
            </p>
          </div>

          {/* === Proyectos destacados === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* Proyecto 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <img
                src="/galerias-alfa.png"
                alt="Galerías Alfa"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C80000] mb-2">
                  Galerías Alfa
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Inmueble compuesto por{" "}
                  <strong>70 tiendas comerciales</strong>, símbolo del desarrollo
                  empresarial y comercial de la ciudad.
                </p>
              </div>
            </motion.div>

            {/* Proyecto 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <img
                src="/edificio-alfa.png"
                alt="Edificio Alfa"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C80000] mb-2">
                  Edificio Alfa
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Inmueble empresarial conformado por un{" "}
                  <strong>
                    casino, banco, 25 oficinas y 4 departamentos dúplex
                  </strong>
                  , consolidando su presencia en el sector corporativo.
                </p>
              </div>
            </motion.div>

            {/* Proyecto 3 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <img
                src="/instituto-atlanta.png"
                alt="Instituto de Turismo & Gastronomía ATLANTA"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C80000] mb-2">
                  Instituto de Turismo & Gastronomía ATLANTA
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Proyecto educativo pionero, orientado a la formación técnica y
                  profesional en turismo, hotelería y gastronomía.
                </p>
              </div>
            </motion.div>

            {/* Proyecto 4 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <img
                src="/centros-diversion.png"
                alt="Centros de Diversión"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#C80000] mb-2">
                  Centros de Diversión
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  <strong>
                    KANKUN Tropical Disco, Boulevard Sur y Babilon Lounge
                  </strong>
                  , reconocidas marcas de entretenimiento y conciertos que
                  marcaron tendencia en Chimbote.
                </p>
              </div>
            </motion.div>
          </div>

          {/* === Fundador === */}
          <div className="mt-16 text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 text-justify">
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
              <strong>
                Perito Valuador de la Superintendencia de Banca y Seguros
              </strong>
              , <strong>Perito de la Corte Superior del Santa</strong> y ha
              ocupado cargos institucionales como{" "}
              <strong>
                Gerente de Desarrollo Urbano y Gerente de MYPES y Proyectos
                Especiales
              </strong>{" "}
              de la Provincia del Santa.
            </p>

            <p>
              Desde sus inicios, la firma se ha dedicado a{" "}
              <strong>conectar a las personas con sus hogares ideales</strong>,
              creciendo gracias a la confianza de sus clientes y al compromiso
              con la excelencia.
            </p>
          </div>

          {/* === Valores === */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center">
            <div className="p-6 bg-[#FFF5F5] rounded-2xl shadow-sm hover:shadow-md transition">
              <Building2 className="mx-auto text-[#C80000] w-10 h-10 mb-3" />
              <h3 className="font-bold text-gray-900">+40 Años</h3>
              <p className="text-gray-600 text-sm mt-2">
                De experiencia integral
              </p>
            </div>
            <div className="p-6 bg-[#FFF5F5] rounded-2xl shadow-sm hover:shadow-md transition">
              <Users2 className="mx-auto text-[#C80000] w-10 h-10 mb-3" />
              <h3 className="font-bold text-gray-900">Confianza</h3>
              <p className="text-gray-600 text-sm mt-2">
                Miles de clientes satisfechos
              </p>
            </div>
            <div className="p-6 bg-[#FFF5F5] rounded-2xl shadow-sm hover:shadow-md transition">
              <Star className="mx-auto text-[#C80000] w-10 h-10 mb-3" />
              <h3 className="font-bold text-gray-900">Excelencia</h3>
              <p className="text-gray-600 text-sm mt-2">
                Compromiso en cada proyecto
              </p>
            </div>
            <div className="p-6 bg-[#FFF5F5] rounded-2xl shadow-sm hover:shadow-md transition">
              <Landmark className="mx-auto text-[#C80000] w-10 h-10 mb-3" />
              <h3 className="font-bold text-gray-900">Presencia</h3>
              <p className="text-gray-600 text-sm mt-2">
                En toda la región del Santa
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NuestraHistoria;







