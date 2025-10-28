import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const VendeoAlquila = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-gray-800">

        {/* 🔻 Banner superior */}
        <section
          className="w-full min-h-[300px] md:min-h-[400px] bg-center bg-no-repeat relative flex items-center justify-center py-10 md:py-10"
          style={{
            backgroundImage: "url('/subtitulos/banner_vendeoalquila.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-white text-4xl md:text-5xl font-semibold text-center z-10 drop-shadow-lg"
          >
            Vende o Alquila con Total Garantía
          </motion.h1>
        </section>

        {/* 🏡 Introducción */}
        <section className="py-16 px-6 md:px-20 text-center bg-[#F9F9F9]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Nuestra <span className="font-semibold text-[#C80000]">experiencia y capacidad</span> nos permite atenderte
              de manera segura y personalizada.
            </p>
          </motion.div>
        </section>

        {/* 🔹 Subtítulo */}
        <section className="px-6 md:px-20 text-center mt-[-2rem] mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#C80000] mb-4"
              style={{ WebkitTextStroke: "0.6px #9ca3af" }}
            >
              Nuestro Proceso
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              En <span className="font-semibold text-[#C80000]">Inmobiliaria Alberto Alfaro</span> te ofrecemos
              un servicio y asesoramiento completo, gestionando detalladamente las siguientes actividades
              de principio a fin:
            </p>
          </motion.div>
        </section>

        {/* 🧭 Tarjetas del proceso */}
        <section className="pb-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

            {[
              {
                step: "01",
                title: "Tasación",
                desc: "Realizamos la valorización de tu inmueble con peritos experimentados para determinar el mejor precio para venta o alquiler.",
              },
              {
                step: "02",
                title: "Estudio Legal de tu Inmueble",
                desc: "Evaluamos tu inmueble para dejarlo saneado y listo para la venta o alquiler.",
              },
              {
                step: "03",
                title: "Promoción y Publicidad",
                desc: "Publicitamos tu propiedad mediante carteles, videos y flyers, con campañas en redes sociales y nuestro Portal Web. Además, contamos con una Red de Agentes Inmobiliarios para multiplicar el alcance a potenciales clientes.",
              },
              {
                step: "04",
                title: "Financiamiento Bancario",
                desc: "Gestionamos créditos hipotecarios para facilitar la compra del inmueble y cerrar la operación con respaldo financiero.",
              },
              {
                step: "05",
                title: "Asesoría Legal y Contable",
                desc: "Elaboramos contratos seguros para la venta o alquiler, gestionando pagos de impuestos municipales (Autovalúo, Arbitrios, Alcabala) y SUNAT (Impuesto a la Renta) para garantizar tu seguridad jurídica y tributaria.",
              },
              {
                step: "06",
                title: "Firma de Escritura",
                desc: "Coordinamos con la Notaría y la entidad financiera hasta la firma de la Escritura Pública y la entrega del cheque de gerencia.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-[#F9F9F9] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200"
              >
                <span className="absolute -top-5 left-6 bg-[#C80000] text-white font-semibold text-sm px-3 py-1 rounded-full shadow-md">
                  Paso {item.step}
                </span>
                <h3 className="text-xl font-semibold text-[#C80000] mb-3 mt-2">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

          </div>
        </section>

      </div>
    </PageWrapper>
  );
};

export default VendeoAlquila;
