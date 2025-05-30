import { useContext, useEffect, useState } from "react";
import styles from "./Modals.module.scss";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../HOC/ModalProvider";
import { useAppDispatch } from "../../redux/hooks";
import { setPhoneConfirmed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

type CodeType = {
  code: string;
};

export const PhoneConfirmModal = ({ phone }: { phone: string }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const { setModalActive } = useContext(ModalContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeType>();

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const onSubmit = () => {
    dispatch(setPhoneConfirmed());
    setModalActive(false);
    navigate("/");
  };

  return (
    <form
      className={`${styles.modal} ${styles.phone} ${styles.confirm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.modal_title}>Подтвердите номер</h2>
      <p className={styles.confirm_text}>
        Укажите проверочный код - он придёт
        <br /> на {phone} в течение 2 минут.
      </p>
      <input
        type="text"
        placeholder="Код из СМС"
        {...register("code", {
          required: "Поле обязательно",
        })}
        className={`${styles.confirm_input} ${errors.code ? "invalid" : ""}`}
      />
      <br className={styles.hide} />
      {timeLeft === 0 ? (
        <button
          type="button"
          className={styles.resendBtn}
          onClick={() => setTimeLeft(180)}
        >
          Получить новый код
        </button>
      ) : (
        <p className={styles.modal_note}>
          Получить новый код можно через {formatTime(timeLeft)}
        </p>
      )}
      <button className={`red-btn ${styles.confirmBtn}`}>Подтвердить</button>
    </form>
  );
};
