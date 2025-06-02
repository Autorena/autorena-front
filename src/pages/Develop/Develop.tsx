import styles from "./Develop.module.scss";
import { ReactComponent as Image } from "../../assets/develop-img.svg";
import { useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";

export const Develop = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.develop}>
      <Image />
      <h4>Этот функционал в разработке</h4>
      <p className={styles.develop_text}>
        Мы работаем изо всех сил, чтобы <br /> сделать его очень удобным для вас
      </p>
      <button
        className={`red-btn ${styles.backBtn}`}
        onClick={() => navigate(-1)}
      >
        Вернуться назад
      </button>
      <HeaderMobile />
    </div>
  );
};
