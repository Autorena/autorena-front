import { createContext, useState } from "react";
import { Children, modalContextProps } from "../types";

export const ModalContext = createContext<modalContextProps>({
  isModalActive: false,
  setModalActive: () => {},
  modalContent: null,
  setModalContent: () => {},
  setCrossSize: () => {},
});

export const ModalProvider = ({ children }: Children) => {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [crossSize, setCrossSize] = useState(24);

  return (
    <ModalContext.Provider
      value={{
        isModalActive,
        setModalActive,
        modalContent,
        setModalContent,
        crossSize,
        setCrossSize,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
