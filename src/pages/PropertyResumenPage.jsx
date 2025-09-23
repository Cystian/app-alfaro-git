import { useParams } from "react-router-dom";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const data = JSON.parse(sessionStorage.getItem("propDataResumen"));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resumen Completo de Propiedad</h1>
      <p><strong>ID:</strong> {id}</p>

      {data ? (
        <div className="mt-4">
          <p><strong>Título:</strong> {data.title}</p>
          <p><strong>Precio:</strong> {data.price}</p>
          <p><strong>Ubicación:</strong> {data.location}</p>
          {/* Otros campos extensos */}
        </div>
      ) : (
        <p>No se encontraron datos en memoria.</p>
      )}
    </div>
  );
}

