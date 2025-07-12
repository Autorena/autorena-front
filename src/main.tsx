import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { ModalProvider } from "./HOC/ModalProvider.tsx";
import { LocationProvider } from "./HOC/LocationProvider.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { AuthProvider } from "./HOC/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <AuthProvider>
        <LocationProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </LocationProvider>
      </AuthProvider>
    </HashRouter>
  </Provider>
);
