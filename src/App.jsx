import React from "react";
import AppRoutes from "./routes/AppRoutes";
import './styles/tailwind.css'; // make sure this path points to your Tailwind CSS file

function App() {
  return (
    <>
      {/* Tailwind test div */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-blue-500 text-white p-6 rounded shadow-lg text-center">
          Tailwind is working!
        </div>
      </div>

      {/* Your existing app routes */}
      <AppRoutes />
    </>
  );
}

export default App;