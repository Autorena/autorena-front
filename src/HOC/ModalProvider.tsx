import { createContext, useEffect, useRef, useState } from "react";
import { Children, modalContextProps } from "../types";

export const ModalContext = createContext<modalContextProps>({
  isModalActive: false,
  setModalActive: () => {},
  modalContent: null,
  setModalContent: () => {},
  crossSize: 24,
  setCrossSize: () => {},
  modalClass: "",
  goBack: () => {},
});

export const ModalProvider = ({ children }: Children) => {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setContent] = useState<React.ReactNode | null>(null);
  const [modalClass, setModalClass] = useState("");
  const [crossSize, setCrossSize] = useState(24);

  useEffect(() => {
    if (isModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalActive]);

  const modalStack = useRef<{ content: React.ReactNode; modalClass: string }[]>(
    []
  );

  const setModalContent = (
    content: React.ReactNode,
    options?: { modalClass?: string }
  ) => {
    if (content) {
      if (modalContent) {
        modalStack.current.push({ content: modalContent, modalClass });
      }
      setContent(content);
      setModalClass(options?.modalClass || "");
      setModalActive(true);
    } else {
      setContent(null);
      setModalClass("");
      setModalActive(false);
    }
  };

  const goBack = () => {
    const prev = modalStack.current.pop();
    if (prev) {
      setContent(prev.content);
      setModalClass(prev.modalClass);
    } else {
      setContent(null);
      setModalClass("");
      setModalActive(false);
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
        goBack,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
