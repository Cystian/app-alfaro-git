import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${id}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error cargando propiedad:", error);
      }
    };

    fetchProperty();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resumen Completo de Propiedad</h1>
      <p>
        <strong>ID:</strong> {id}
      </p>

      {data ? (
        <div className="mt-4">
          <p><strong>Título:</strong> {data.title}</p>
          <p><strong>Precio:</strong> {data.price}</p>
          <p><strong>Ubicación:</strong> {data.location}</p>
          {/* Puedes expandir con más campos */}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
