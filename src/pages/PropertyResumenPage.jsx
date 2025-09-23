import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${id}`);
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resumen Completo de Propiedad</h1>
      <p>
        <strong>ID:</strong> {id}
      </p>

      {data && data.property ? (
        <div className="mt-4">
          <p><strong>Título:</strong> {data.property.title}</p>
          <p><strong>Precio:</strong> {data.property.price}</p>
          <p><strong>Ubicación:</strong> {data.property.location}</p>
          <p><strong>Descripción:</strong> {data.property.description}</p>
          <p><strong>Dormitorios:</strong> {data.property.bedrooms}</p>
          <p><strong>Baños:</strong> {data.property.bathrooms}</p>
          <p><strong>Área:</strong> {data.property.area} m²</p>

          <h2 className="text-xl font-semibold mt-6">Subpropiedades</h2>
          <ul>
            {data.subProperties.map((sub) => (
              <li key={sub.id} className="mt-2">
                <p>{sub.content}</p>
                <img
                  src={sub.image}
                  alt={sub.text_content}
                  className="w-64 rounded-lg shadow"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron datos en memoria.</p>
      )}
    </div>
  );
}
