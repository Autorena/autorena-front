import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Unauthorized.module.scss";
import { BottomSheet } from "../../ui-components/BottomSheet/BottomSheet";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { Header } from "../../ui-components/Header/Header";
import { CASDOOR_LOGIN_URL, CASDOOR_REG_URL } from "../../constants/api";

type ActionConfig = {
  title: string;
  text: string;
  buttonText: string;
};

const actionConfigs: Record<string, ActionConfig> = {
  favorites: {
    title: "Избранное",
    text: "Войдите или зарегистрируйтесь, чтобы сохранять избранные объявления.",
    buttonText: "Войти / Зарегистрироваться",
  },
  messages: {
    title: "Сообщения",
    text: "Войдите или зарегистрируйтесь, чтобы посмотреть входящие сообщения.",
    buttonText: "Войти / Зарегистрироваться",
  },
  create_listing: {
    title: "Объявления",
    text: "Войдите или зарегистрируйтесь, чтобы разместиться на площадке или управлять существующими объявлениями.",
    buttonText: "Войти / Зарегистрироваться",
  },
  profile: {
    title: "Профиль",
    text: "Создайте свой личный аккаунт, для того чтобы получить все удобства сервиса Авторена.",
    buttonText: "Войти / Зарегистрироваться",
  },
};

export const Unauthorized = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action") || "default";
  // const from = searchParams.get("from") || "/";
  const [isAuthSheetOpen, setAuthSheetOpen] = useState(false);
  const config = actionConfigs[action] || actionConfigs.default;
  // const { setModalActive, setModalContent } = useContext(ModalContext);

  return (
    <>
      {" "}
      <Header />
      <div className="container">
        <div className={styles.unauth}>
          <h3 className={styles.unauth_title}>{config.title}</h3>
          <div className={styles.unauth_content}>
            <LargeSvgImage src={getLargeSvgPath("no-auth")} />
            <p className={styles.unauth_text}>{config.text}</p>
            <button
              className={`red-btn ${styles.unauth_btn}`}
              onClick={() => setAuthSheetOpen(true)}
            >
              {config.buttonText}
            </button>
          </div>
        </div>

        <BottomSheet
          isOpen={isAuthSheetOpen}
          onClose={() => setAuthSheetOpen(false)}
          defaultHeight={260}
        >
          <div className={styles.authContent}>
            <button
              className={styles.authButton}
              onClick={() => {
                // setModalActive(true);
                // setModalContent(<LoginModal />);
                window.location.href = CASDOOR_LOGIN_URL;
              }}
            >
              Войти через телефон или почту
            </button>
            <button
              className={styles.registerBtn}
              onClick={() => {
                // setModalActive(true);
                // setModalContent(<RegistrationModal />);
                window.location.href = CASDOOR_REG_URL;
              }}
            >
              Зарегистрироваться
            </button>
            <p className={styles.authAgreement}>
              При регистрации и входе вы соглашаетесь с условиями использования
              Авторена и политикой конфиденциальности.
            </p>
          </div>
        </BottomSheet>
        <HeaderMobile />
      </div>
    </>
  );
};
