import { useContext, useState } from "react";
import styles from "./Modals.module.scss";
import { ModalContext } from "../../HOC/ModalProvider";
import { useForm } from "react-hook-form";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeOff } from "../../assets/non-eye.svg";
import { AuthModal } from "./AuthModal";
import { RegFormData } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";

export const RegistrationModal = () => {
  const { setModalContent } = useContext(ModalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegFormData>();

  const password = watch("password");

  const onSubmit = (data: RegFormData) => {
    console.log(data);
    dispatch(
      setUser({
        name: data.name,
        email: data.email,
        password: data.password,
        isPhoneConfirmed: false,
      })
    );

    setModalContent(<AuthModal />);
  };

  return (
    <form
      className={`${styles.modal} ${styles.registr}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.modal_title}>Регистрация</h2>
      <input
        placeholder="Имя"
        className={`${styles.auth_input} ${errors.name ? "invalid" : ""}`}
        {...register("name", { required: "Поле обязательно" })}
      />
      <input
        type="email"
        placeholder="Email"
        className={`${styles.auth_input} ${errors.email ? "invalid" : ""}`}
        {...register("email", { required: "Поле обязательно" })}
      />
      <div className={`passwordWrap ${styles.passwordWrap}`}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          className={`${styles.auth_input} ${errors.password ? "invalid" : ""}`}
          {...register("password", {
            required: "Поле обязательно",
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={`eyeBtn ${styles.eye}`}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
      <div className={`passwordWrap ${styles.passwordWrap}`}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Подтвердить пароль"
          className={`${styles.auth_input} ${
            errors.confirmPassword ? "invalid" : ""
          }`}
          {...register("confirmPassword", {
            required: "Подтвердите пароль",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className={`eyeBtn ${styles.eye}`}
        >
          {showConfirmPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
      <label className={styles.checkboxWrapper}>
        <input type="checkbox" className={styles.checkboxInput} />
        <span className={styles.checkboxCustom} />
        <span className={styles.checkboxLabel}>Запомнить пароль</span>
      </label>
      <button className={`red-btn ${styles.registrBtn}`} type="submit">
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
