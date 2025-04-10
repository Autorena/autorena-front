import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./Layout";
import { Modal } from "./ui-components/Modal/Modal";
import { useContext } from "react";
import { ModalContext } from "./HOC/ModalProvider";

function App() {
  const {
    isModalActive,
    setModalActive,
    modalContent,
    setModalContent,
    crossSize,
    setCrossSize,
  } = useContext(ModalContext);
  return (
    <>
      <Modal
        isModalActive={isModalActive}
        setModalActive={setModalActive}
        modalContent={modalContent}
        setModalContent={setModalContent}
        crossSize={crossSize}
        setCrossSize={setCrossSize}
      />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
}

export default App;
