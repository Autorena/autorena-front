import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./HOC/ModalProvider.tsx";
import { LocationProvider } from "./HOC/LocationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LocationProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </LocationProvider>
  </BrowserRouter>
);
