import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Aquí simulas el consumo desde tu API/BD
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/propiedades/${id}`); // 🔹 Ajusta tu endpoint
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resumen Completo de Propiedad</h1>
      <p>
        <strong>ID:</strong> {id}
      </p>

      {data ? (
        <div className="mt-4">
          <p>
            <strong>Título:</strong> {data.title}
          </p>
          <p>
            <strong>Precio:</strong> {data.price}
          </p>
          <p>
            <strong>Ubicación:</strong> {data.location}
          </p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
