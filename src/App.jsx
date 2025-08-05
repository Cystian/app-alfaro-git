// src/App.jsx
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import "./styles/main.css";

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen text-gray-800">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
