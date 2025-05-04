import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./Layout";
import { Modal } from "./ui-components/Modal/Modal";
import { Home } from "./pages/Home/Home";
import { RegistrationModal } from "./components/modals/RegistrationModal";
import { FilterPage } from "./pages/FilterPage/FilterPage";
import { CarPage } from "./pages/CarPage/CarPage";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  return (
    <>
      <ScrollToTop />
      <Modal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reg" element={<RegistrationModal />} />
          <Route path="/filter/:filter" element={<FilterPage />} />
          <Route path="/:id" element={<CarPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
