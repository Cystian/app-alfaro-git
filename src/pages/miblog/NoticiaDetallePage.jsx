import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const NoticiaDetallePage = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getNoticias?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNoticia(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar la noticia:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20">Cargando noticia...</p>;
  if (!noticia) return <p className="text-center py-20">Noticia no encontrada</p>;

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <Link to="/blog/noticias" className="text-[#DF011A] font-semibold mb-6 inline-block">
        ← Volver a Noticias
      </Link>
      <h1 className="text-4xl font-bold mb-6">{noticia.titulo}</h1>
      <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-96 object-cover rounded-2xl mb-6" />
      <p className="text-gray-600 text-sm mb-6">
        {new Date(noticia.fecha).toLocaleDateString("es-PE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="text-gray-800 text-lg leading-relaxed">
        {noticia.descripcion}
      </div>
    </section>
  );
};

export default NoticiaDetallePage;
