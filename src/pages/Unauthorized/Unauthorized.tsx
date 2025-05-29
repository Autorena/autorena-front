import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Unauthorized.module.scss";
import img from "../../assets/no-auth.png";

type ActionConfig = {
  title: string;
  text: string;
  buttonText: string;
};

const actionConfigs: Record<string, ActionConfig> = {
  favorite: {
    title: "Избранное",
    text: "сохранять избранные объявления.",
    buttonText: "Войти / Зарегистрироваться",
  },
  rent: {
    title: "Аренда автомобиля",
    text: "Войдите или зарегистрируйтесь, чтобы арендовать автомобиль",
    buttonText: "Войти / Зарегистрироваться",
  },
  create_listing: {
    title: "Создание объявления",
    text: "Войдите или зарегистрируйтесь, чтобы создать объявление",
    buttonText: "Войти / Зарегистрироваться",
  },
  default: {
    title: "Требуется авторизация",
    text: "Войдите или зарегистрируйтесь, чтобы продолжить",
    buttonText: "Войти / Зарегистрироваться",
  },
};

export const Unauthorized = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action") || "default";
  const from = searchParams.get("from") || "";

  const config = actionConfigs[action] || actionConfigs.default;

  const handleAuth = () => {
    // Здесь можно добавить логику для открытия модального окна авторизации
    // или редиректа на страницу авторизации с сохранением from параметра
    navigate(`/auth?from=${from}`);
  };

  return (
    <div className="container">
      <div className={styles.unauth}>
        <h3 className={styles.unauth_title}>{config.title}</h3>
        <div className={styles.unauth_content}>
          <img src={img} alt="No authorization" />
          <p
            className={styles.unauth_text}
          >{`Войдите или зарегистрируйтесь, чтобы ${config.text}`}</p>
          <button
            className={`red-btn ${styles.unauth_btn}`}
            onClick={handleAuth}
          >
            {config.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
