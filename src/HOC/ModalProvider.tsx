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
  const modalStack = useRef<{ content: React.ReactNode; modalClass: string }[]>(
    []
  );

  const closeModal = () => {
    modalStack.current = [];
    setContent(null);
    setModalClass("");
    setModalActive(false);
    window.history.back();
  };

  const goBack = () => {
    if (modalStack.current.length > 0) {
      const prev = modalStack.current.pop();
      setContent(prev?.content || null);
      setModalClass(prev?.modalClass || "");
    } else {
      closeModal();
    }
  };

  const setModalContent = (
    content: React.ReactNode,
    options?: {
      modalClass?: string;
      isRootModal?: boolean;
      skipHistory?: boolean;
    }
  ) => {
    if (content) {
      if (options?.isRootModal) {
        modalStack.current = [];
      }

      if (modalContent && !options?.isRootModal) {
        modalStack.current.push({ content: modalContent, modalClass });
      }

      setContent(content);
      setModalClass(options?.modalClass || "");
      setModalActive(true);

      if (!options?.skipHistory) {
        window.history.pushState({ isModal: true }, "");
      }
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.isModal) {
        goBack();
      } else if (isModalActive) {
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalActive, modalContent]);

  useEffect(() => {
    document.body.style.overflow = isModalActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalActive]);

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
