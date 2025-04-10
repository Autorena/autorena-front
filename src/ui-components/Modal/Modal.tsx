import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { modalContextProps } from "../../types";

export const Modal = ({
  isModalActive,
  setModalActive,
  setModalContent,
  modalContent,
  crossSize,
}: modalContextProps) => {
  return ReactDOM.createPortal(
    <div
      className={`${styles.modal_overlay} ${isModalActive && styles.active}`}
    >
      <div className={styles.modal_content}>
        <button
          className={`${styles.modal_btnClose}`}
          onClick={() => {
            setModalActive(false);
            setModalContent(null);
          }}
        >
          <Cross width={crossSize} height={crossSize} />
        </button>
        {modalContent}
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
};
