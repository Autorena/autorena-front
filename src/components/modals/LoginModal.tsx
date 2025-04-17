import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./Modals.module.scss";
import { ReactComponent as Vk } from "../../assets/vk-login.svg";
import { ReactComponent as Ok } from "../../assets/ok-login.svg";
import { ReactComponent as Apple } from "../../assets/apple.svg";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { RegistrationModal } from "./RegistrationModal";

type LoginFormData = {
  identifier: string;
  password: string;
};

export const LoginModal = () => {
  const { setModalContent, setModalActive } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = () => {
    setModalActive(false);
  };

  return (
    <form
      className={`${styles.modal} ${styles.login}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.modal_title}>Вход</h2>
      <input
        placeholder="Телефон или почта"
        className={`${styles.auth_input} ${errors.identifier ? "invalid" : ""}`}
        {...register("identifier", { required: "Поле обязательно" })}
      />
      <input
        type="password"
        placeholder="Пароль"
        className={`${styles.auth_input} ${errors.password ? "invalid" : ""}`}
        {...register("password", {
          required: "Поле обязательно",
        })}
      />

      <div className={styles.passwordWrap}>
        <label className={styles.checkboxWrapper}>
          <input type="checkbox" className={styles.checkboxInput} />
          <span className={styles.checkboxCustom} />
          <span className={styles.checkboxLabel}>Запомнить пароль</span>
        </label>
        <button className={styles.forgotBtn} type="button">
          Забыли пароль?
        </button>
      </div>
      <button className={`red-btn ${styles.loginBtn}`} type="submit">
        Войти
      </button>
      <div className={styles.loginWays}>
        <p className={styles.login_text}>Или продолжить через:</p>
        <div className={styles.loginItems}>
          <button type="button">
            <Vk />
          </button>
          <button type="button">
            <Ok />
          </button>
          <button type="button">
            <Apple />
          </button>
          <button type="button">
            <Google />
          </button>
        </div>
      </div>
      <p className={styles.login_text}>Нет аккаунта?</p>
      <button
        className={`white-btn ${styles.regLink}`}
        onClick={() => setModalContent(<RegistrationModal />)}
      >
        Зарегистрироваться
      </button>
      <p className={styles.modal_note}>
        При входе вы соглашаетесь с{" "}
        <a href="#">
          условиями <br />
          использования и политикой конфиденциальности.
        </a>
      </p>
    </form>
  );
};
