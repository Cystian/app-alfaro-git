import React from "react";
import { Building2, FileText, BarChart3 } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const Servicios = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">

        {/* Banner superior */}
        <section
          className="w-full h-80 bg-cover bg-center relative flex items-center justify-center"
          style={{ backgroundImage: "url('/images/banner_servicios.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide text-center relative z-10">
            Nuestros Servicios
          </h1>
        </section>

        {/* Introducción */}
        <section className="py-16 px-6 md:px-20 bg-[#F9F9F9]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              En <span className="font-semibold text-[#C80000]">Inmobiliaria Alberto Alfaro</span> te brindamos los siguientes servicios
              en nuestras tres áreas de gestión:{" "}
              <span className="italic">Agencia Inmobiliaria, Asesoría y Proyectos.</span>
            </p>
          </div>
        </section>

        {/* Tarjetas interactivas */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 text-[#C80000] tracking-wide">
              Áreas de Gestión
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Agencia Inmobiliaria",
                  desc: "Venta o alquiler de inmuebles con asesoramiento integral y tasaciones profesionales.",
                  icon: <Building2 size={48} />,
                  img: "/images/agencia.jpg",
                },
                {
                  title: "Asesoría",
                  desc: "Saneamiento físico legal de terrenos, asesoría legal, contable y financiera.",
                  icon: <FileText size={48} />,
                  img: "/images/asesoria.jpg",
                },
                {
                  title: "Proyectos",
                  desc: "Desarrollo de proyectos inmobiliarios e inversiones de alta rentabilidad y plusvalía.",
                  icon: <BarChart3 size={48} />,
                  img: "/images/proyectos.jpg",
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
                    <h4 className="text-2xl font-semibold text-white mb-2">{serv.title}</h4>
                    <p className="text-gray-100 text-sm max-w-xs">{serv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detalle institucional */}
        <section className="py-16 px-6 md:px-20 bg-[#F9F9F9] text-gray-800">
          <div className="max-w-5xl mx-auto leading-relaxed">

            {/* AGENCIA INMOBILIARIA */}
            <h2 className="text-3xl font-semibold text-[#C80000] mb-4 text-center">
              Agencia Inmobiliaria
            </h2>
            <p className="mb-4">
              <strong>1. Venta o Alquiler de Inmuebles:</strong> realizamos un servicio y asesoramiento
              completo en la venta o alquiler de tu propiedad.
            </p>
            <p className="mb-8">
              <strong>2. Tasación de Predios para la Venta:</strong> realizamos estudios de mercado de inmuebles
              de manera permanente, contando con información de precios por metro cuadrado de terrenos y construcción,
              lo que nos permite realizar una tasación óptima para tu inmueble.
            </p>

            {/* ASESORÍA */}
            <h2 className="text-3xl font-semibold text-[#C80000] mb-4 text-center">
              Asesoría
            </h2>
            <p className="mb-4">
              <strong>3. Saneamiento Físico Legal de Terrenos:</strong> elaboramos expedientes y trámites
              para el saneamiento de predios, como subdivisiones, acumulaciones y otros que permitan proceder
              a una venta sin complicaciones.
            </p>
            <p className="mb-8">
              <strong>4. Asesoría Legal, Contable y Financiera:</strong> realizamos el análisis legal de tu
              inmueble, procediendo a su saneamiento, lo que permitirá su efectiva transferencia e inscripción
              en Registros Públicos.
            </p>

            {/* PROYECTOS */}
            <h2 className="text-3xl font-semibold text-[#C80000] mb-4 text-center">
              Proyectos
            </h2>
            <p className="mb-4">
              <strong>5. Desarrollo de Proyectos Inmobiliarios:</strong> realizamos el diseño completo de proyectos
              inmobiliarios, desde el estudio de mercado que garantice su éxito en ventas, pasando por el diseño
              arquitectónico, ingeniería, presupuesto de obra y el proyecto económico que sustente su rentabilidad.
            </p>
            <p>
              <strong>6. Inversiones Inmobiliarias:</strong> contamos con una importante cartera de inmuebles en
              ubicaciones estratégicas y precios que garantizan inversiones inmobiliarias de alta rentabilidad
              y plusvalía.
            </p>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
};

export default Servicios;
