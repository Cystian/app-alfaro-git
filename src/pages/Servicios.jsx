import React from "react";
import { Building2, FileText, BarChart3 } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const Servicios = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">

        {/* Banner superior */}
<section
  className="w-full min-h-[300px] md:min-h-[400px] bg-center bg-no-repeat relative flex items-center justify-center pb-[5rem] md:pb-[5rem]"
  style={{
    backgroundImage: "url('/banner_servicios.png')",
    backgroundSize: "contain", // 🔹 Ajusta la imagen al contenedor
  }}
>

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
       
                 <div className="mb-4">
        <img
          src="/subtitulos/areas_gestion.png"
          alt="Nuestro Equipo de Asesores"
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
                    <h4 className="text-2xl font-semibold text-gray mb-2">{serv.title}</h4>
                    <p className="text-gray text-sm max-w-xs ">{serv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* Detalle institucional como tarjetas */}
<section className="py-16 px-6 md:px-20 bg-[#F9F9F9] text-gray-800 mt-[-5rem] ">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* 🏠 Agencia Inmobiliaria */}
    <div className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300">
      <h2
        className="text-2xl font-semibold text-[#C80000] text-center mb-4 text-stroke-dark"
        style={{ WebkitTextStroke: "0.6px #9ca3af" }}
      >
        Agencia Inmobiliaria
      </h2>
      <p className="mb-3">
        <strong>1. Venta o Alquiler de Inmuebles:</strong> realizamos un servicio y asesoramiento completo en la venta o alquiler de tu propiedad.
      </p>
      <p>
        <strong>2. Tasación de Predios para la Venta:</strong> realizamos estudios de mercado actualizados, con información precisa de precios por m² de terreno y construcción, lo que nos permite realizar una tasación óptima para tu inmueble.
      </p>
    </div>

    {/* 📄 Asesoría */}
    <div className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300">
      <h2
        className="text-2xl font-semibold text-[#C80000] text-center mb-4 text-stroke-dark"
        style={{ WebkitTextStroke: "0.6px #9ca3af" }}
      >
        Asesoría
      </h2>
      <p className="mb-3">
        <strong>3. Saneamiento Físico Legal de Terrenos:</strong> elaboramos expedientes técnicos y trámites para el saneamiento de predios, subdivisiones, acumulaciones y otros procesos que permiten una venta sin complicaciones.
      </p>
      <p>
        <strong>4. Asesoría Legal, Contable y Financiera:</strong> realizamos el análisis legal y contable de tu inmueble para garantizar su efectiva transferencia e inscripción en Registros Públicos.
      </p>
    </div>

    {/* 📊 Proyectos */}
    <div className="bg-white shadow-md hover:shadow-lg rounded-2xl p-6 border border-gray-200 transition-all duration-300">
      <h2
        className="text-2xl font-semibold text-[#C80000] text-center mb-4 text-stroke-dark"
        style={{ WebkitTextStroke: "0.6px #9ca3af" }}
      >
        Proyectos
      </h2>
      <p className="mb-3">
        <strong>5. Desarrollo de Proyectos Inmobiliarios:</strong> diseñamos proyectos integrales desde el estudio de mercado hasta la ingeniería y presupuestos, asegurando su rentabilidad.
      </p>
      <p>
        <strong>6. Inversiones Inmobiliarias:</strong> contamos con una cartera de inmuebles estratégicos que garantizan inversiones de alta plusvalía y retorno.
      </p>
    </div>

  </div>
</section>


      </div>
    </PageWrapper>
  );
};

export default Servicios;
