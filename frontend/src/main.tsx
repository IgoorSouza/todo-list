import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        duration: 3000,
        style: {
          backgroundColor: "rgb(51 65 85)",
          color: "white",
        },
      }}
    />
    <div className="bg-slate-500"></div>
    <App />
  </React.StrictMode>
);
