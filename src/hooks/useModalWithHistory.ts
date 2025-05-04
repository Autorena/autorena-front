// hooks/useModalWithHistory.ts
import { useContext } from "react";
import { ModalContext } from "../HOC/ModalProvider";
import { ReactNode } from "react";

export const useModalWithHistory = () => {
  const { setModalActive, setModalContent } = useContext(ModalContext);

  const open = (content: ReactNode) => {
    window.history.pushState({ modal: true }, "");
    setModalActive(true);
    setModalContent(content);
  };

  const close = () => {
    setModalActive(false);
    setModalContent(null);
    window.history.back();
  };

  return { openModal: open, closeModal: close };
};
