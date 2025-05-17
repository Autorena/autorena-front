import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Back } from "../../assets/arrowBack.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { useContext, useEffect } from "react";

export const Modal = () => {
  const {
    isModalActive,
    modalContent,
    crossSize,
    modalClass,
    setModalActive,
    setModalContent,
    goBack,
  } = useContext(ModalContext);

  useEffect(() => {
    const handlePopState = () => {
      if (isModalActive) {
        setModalActive(false);
        setModalContent(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalActive]);

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal_overlay} ${isModalActive && styles.active}`}
    >
      <div className={`${styles.modal_content} ${modalClass}`}>
        <button
          className={`${styles.modal_btnClose}`}
          onClick={() => {
            setModalActive(false);
            setModalContent(null);
            // window.history.back();
          }}
        >
          <Cross width={crossSize} height={crossSize} />
        </button>
        <button className={styles.modal_btnBack} onClick={goBack}>
          <Back />
        </button>
        {modalContent}
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
};
