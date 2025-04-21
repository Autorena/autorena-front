import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { ModalProvider } from "./HOC/ModalProvider.tsx";
import { LocationProvider } from "./HOC/LocationProvider.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <LocationProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </LocationProvider>
    </HashRouter>
  </Provider>
);
