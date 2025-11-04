import React from "react";
import { Building2, FileText, BarChart3 } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

const Servicios = () => {
  // 🔹 Definición de servicios institucionales
  const servicios = [
    {
      title: "Agencia Inmobiliaria",
      items: [
        {
          icon: "/iconos/VENTA_O_ALQUILER_DE_INMUEBLE.png",
          title: "1. Venta o Alquiler de Inmuebles",
          desc: "Realizamos un servicio y asesoramiento completo en la venta o alquiler de tu propiedad.",
        },
        {
          icon: "/iconos/TASACION_DE_PREDIOS_PARA_LA_VENTA.png",
          title: "2. Tasación de Predios para la Venta",
          desc: "Realizamos estudios de mercado actualizados, con información precisa de precios por m² de terreno y construcción, lo que nos permite realizar una tasación óptima para tu inmueble.",
        },
      ],
    },
    {
      title: "Asesoría",
      items: [
        {
          icon: "/iconos/SANEAMIENTO_FISICO-LEGAL_DE_TERRENOS.png",
          title: "3. Saneamiento Físico Legal de Terrenos",
          desc: "Elaboramos expedientes técnicos y trámites para el saneamiento de predios, subdivisiones, acumulaciones y otros procesos que permiten una venta sin complicaciones.",
        },
        {
          icon: "/iconos/ASESORIA_LEGAL_CONTABLE_Y_FINANCIERA.png",
          title: "4. Asesoría Legal, Contable y Financiera",
          desc: "Realizamos el análisis legal y contable de tu inmueble para garantizar su efectiva transferencia e inscripción en Registros Públicos.",
        },
      ],
    },
    {
      title: "Proyectos",
      items: [
        {
          icon: "/iconos/DESARROLLO_DE_PROYECTOS_INMOBILIARIOS.png",
          title: "5. Desarrollo de Proyectos Inmobiliarios",
          desc: "Diseñamos proyectos integrales desde el estudio de mercado hasta la ingeniería y presupuestos, asegurando su rentabilidad.",
        },
        {
          icon: "/iconos/INVERSIONES_INMOBILIARIAS.png",
          title: "6. Inversiones Inmobiliarias",
          desc: "Contamos con una cartera de inmuebles estratégicos que garantizan inversiones de alta plusvalía y retorno.",
        },
      ],
    },
  ];

  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">
        {/* Banner superior */}
        <section
          className="w-full min-h-[300px] md:min-h-[400px] bg-center bg-no-repeat relative flex items-center justify-center py-10 md:py-10"
          style={{
            backgroundImage: "url('/banner_servicios.png')",
            backgroundSize: "contain",
          }}
        ></section>

        {/* Introducción */}
        <section className="py-16 px-6 md:px-20 bg-[#F9F9F9]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                En{" "}
                <span className="font-semibold text-[#C80000]">
                  Inmobiliaria Alberto Alfaro
                </span>{" "}
                te brindamos los siguientes servicios en nuestras tres áreas de
                gestión:{" "}
                <span className="italic">
                  Agencia Inmobiliaria, Asesoría y Proyectos.
                </span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Tarjetas interactivas superiores */}
        <section className="py-20 px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto text-center mt-[-4rem] ">
              <div className="mb-4">
                <img
                  src="/subtitulos/areas_gestion.png"
                  alt="Areas de Gestión"
                  className="w-[30rem] mx-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    title: "Agencia Inmobiliaria",
                    desc: "Venta o alquiler de inmuebles con asesoramiento integral y tasaciones profesionales.",
                    icon: <Building2 size={48} />,
                    img: "/agencia.png",
                  },
                  {
                    title: "Asesoría",
                    desc: "Saneamiento físico legal de terrenos, asesoría legal, contable y financiera.",
                    icon: <FileText size={48} />,
                    img: "/asesoria.png",
                  },
                  {
                    title: "Proyectos",
                    desc: "Desarrollo de proyectos inmobiliarios e inversiones de alta rentabilidad y plusvalía.",
                    icon: <BarChart3 size={48} />,
                    img: "/proyectos.png",
                  },
                ].map((serv, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={serv.img}
                      alt={serv.title}
                      className="w-full h-64 object-cover opacity-90 group-hover:opacity-40 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-[#C80000] mb-3">{serv.icon}</div>
                      <h4 className="text-2xl font-semibold text-gray mb-2">
                        {serv.title}
                      </h4>
                      <p className="text-gray text-sm max-w-xs ">
                        {serv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 🔻 Detalle institucional con animaciones tipo VendeoAlquila */}
        <section className="py-16 px-6 md:px-20 bg-[#F9F9F9] text-gray-800 mt-[-5rem]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((serv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300"
              >
                <h2
                  className="text-2xl font-semibold text-[#C80000] text-center mb-6 text-stroke-dark"
                  style={{ WebkitTextStroke: "0.6px #9ca3af" }}
                >
                  {serv.title}
                </h2>

                {serv.items.map((item, j) => (
                  <div key={j} className="text-center mb-6 last:mb-0">
                    <motion.img
                      src={item.icon}
                      alt={item.title}
                      className="mx-auto w-14 h-14 mb-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <p>
                      <strong>{item.title}:</strong> {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Servicios;

