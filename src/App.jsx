// src/App.jsx
import { RouterProvider } from "react-router-dom";
import router from "./router"; // asumiendo que tu archivo está en src/router.jsx
import "./styles/main.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen text-gray-800">
      <RouterProvider router={router} />
      {/* 🔔 Contenedor global de notificaciones */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;

