import { createContext, useState } from "react";
import { Children, modalContextProps } from "../types";

export const ModalContext = createContext<modalContextProps>({
  isModalActive: false,
  setModalActive: () => {},
  modalContent: null,
  setModalContent: () => {},
  setCrossSize: () => {},
  modalClass: "",
});

export const ModalProvider = ({ children }: Children) => {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setContent] = useState<React.ReactNode | null>(null);
  const [modalClass, setModalClass] = useState("");
  const [crossSize, setCrossSize] = useState(24);

  const setModalContent = (
    content: React.ReactNode,
    options?: { modalClass?: string }
  ) => {
    setContent(content);
    if (options?.modalClass) {
      console.log(options.modalClass);
      setModalClass(options.modalClass);
    } else {
      setModalClass("");
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalActive,
        setModalActive,
        modalContent,
        setModalContent,
        crossSize,
        setCrossSize,
        modalClass,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
