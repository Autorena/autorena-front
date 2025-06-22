import styles from "./Develop.module.scss";
import { useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";

export const Develop = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.develop}>
      <LargeSvgImage src={getLargeSvgPath("develop-img")} />
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
