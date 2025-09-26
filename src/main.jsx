import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Advertisement from "./components/Advertisement.jsx";
import Add from "./components/Add.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Add />
        {/* <Advertisement /> */}
        {/* <RentAdvertisementCarousel /> */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
