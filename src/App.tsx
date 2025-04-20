import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./Layout";
import { Modal } from "./ui-components/Modal/Modal";
import { Home } from "./pages/Home/Home";
import { RegistrationModal } from "./components/modals/RegistrationModal";

function App() {
  return (
    <>
      <Modal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reg" element={<RegistrationModal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
