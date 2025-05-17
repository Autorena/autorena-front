import { useContext } from "react";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";
import styles from "./Modals.module.scss";
import { ModalContext } from "../../HOC/ModalProvider";
import { PhoneModal } from "./PhoneModal";

export const AuthModal = () => {
  const { setModalContent } = useContext(ModalContext);

  return (
    <div className={`${styles.modal} ${styles.auth}`}>
      <h2 className={styles.modal_title}>Для чего нужен профиль?</h2>
      <div className={styles.choice}>
        <RadioButton
          label="Я арендую авто"
          name="profileType"
          value="1"
          labelStyle={{
            fontSize: "24px",
            lineHeight: "29px",
            fontWeight: 600,
            paddingLeft: "40px",
            marginBottom: "16px",
          }}
          onChange={() => setModalContent(<PhoneModal />)}
        />
        <RadioButton
          label=" Я сдаю авто в аренду"
          name="profileType"
          value="2"
          labelStyle={{
            fontSize: "24px",
            lineHeight: "29px",
            fontWeight: 600,
            paddingLeft: "40px",
          }}
          onChange={() => setModalContent(<PhoneModal />)}
        />
      </div>
    </div>
  );
};
