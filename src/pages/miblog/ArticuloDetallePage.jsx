import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ArticuloDetallePage = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getArticulos?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticulo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el articulo:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20">Cargando articulo...</p>;
  if (!articulo) return <p className="text-center py-20">Articulo no encontrado</p>;

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <Link to="/blog/noticias" className="text-red-600 font-semibold mb-6 inline-block">
        ← Volver a Articulos
      </Link>
      <h1 className="text-4xl font-bold mb-6">{articulo.titulo}</h1>
      <img src={articulo.imagen} alt={articulo.titulo} className="w-full h-96 object-cover rounded-2xl mb-6" />
      <p className="text-gray-600 text-sm mb-6">
        {new Date(articulo.fecha).toLocaleDateString("es-PE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="text-gray-800 text-lg leading-relaxed">
        {articulo.descripcion}
      </div>
    </section>
  );
};

export default ArticuloDetallePage;
