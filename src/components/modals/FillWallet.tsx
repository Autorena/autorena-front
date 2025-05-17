import { useForm } from "react-hook-form";
import styles from "./Modals.module.scss";

export const FillWallet = () => {
  const { register } = useForm();

  return (
    <form className={`${styles.modal} ${styles.wallet}`}>
      <h2 className={styles.modal_title}>Пополнение кошелька</h2>
      <div className={styles.inputWrap}>
        <input
          type="number"
          placeholder="1000 ₽"
          {...register("amount", {
            required: "Поле обязательно",
          })}
        />
        <button className={`red-btn ${styles.confirmBtn}`} type="submit">
          Подтвердить
        </button>
      </div>
      <p className={styles.info_text}>Введите сумму к пополнению</p>
      <div className={styles.wallet_bottom}>
        <h4>Выберите способ пополнения</h4>
      </div>
    </form>
  );
};
