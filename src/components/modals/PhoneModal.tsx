import { useContext } from "react";
import styles from "./Modals.module.scss";
import { ModalContext } from "../../HOC/ModalProvider";
import { PhoneConfirmModal } from "./PhoneComfirmModal";
import { useForm } from "react-hook-form";

type PhoneFormData = {
  phone: string;
};

export const PhoneModal = () => {
  const { setModalContent } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>();

  const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, "");

    return digits.replace(
      /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
      "+$1 $2 $3 $4 $5"
    );
  };

  const onSubmit = (data: PhoneFormData) => {
    console.log(data);
    const formatedPhone = formatPhoneNumber(data.phone);
    setModalContent(<PhoneConfirmModal phone={formatedPhone} />);
  };

  return (
    <form
      className={`${styles.modal} ${styles.phone}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.modal_title}>Введите номер телефона</h2>
      <div className={styles.inputWrap}>
        <input
          type="tel"
          placeholder="Телефон"
          onFocus={(e) => {
            if (!e.target.value) e.target.value = "+7";
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^\d+]/g, "");
          }}
          {...register("phone", {
            required: "Поле обязательно",
            validate: (value) =>
              /^\+7\d{10}$/.test(value) ||
              "Введите номер в формате +7XXXXXXXXXX",
          })}
          className={errors.phone ? "invalid" : ""}
        />
        <button className={`red-btn ${styles.inputBtn}`} type="submit">
          Продолжить
        </button>
      </div>
      <p className={styles.modal_note}>
        При регистрации и входе вы соглашаетесь с
        <a href="#">
          <br />
          условиями использования и политикой конфиденциальности.
        </a>
      </p>
    </form>
  );
};
