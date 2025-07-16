import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { ReactComponent as Cross } from "../../assets/cross-2.svg";
import { ReactComponent as Cookie } from "../../assets/cookie.svg";

const COOKIE_CONSENT_KEY = "cookie_consent";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(";").shift();
    }
  }
  return undefined;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; max-age=31536000; path=/`;
}

export const CookieNotific = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_CONSENT_KEY);
    setIsVisible(consent !== "true");
  }, []);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 260);
  };

  const handleAccept = () => {
    setIsHiding(true);
    setCookie(COOKIE_CONSENT_KEY, "true");
    setTimeout(() => {
      setIsVisible(false);
    }, 260);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.cookie} ${isHiding ? styles.hiding : ""}`}>
      <button className={styles.closeBtn} onClick={handleClose}>
        <Cross />
      </button>
      <div className={styles.cookie_text}>
        Мы используем{" "}
        <a href="#">
          {" "}
          cookies <Cookie />
        </a>
        чтобы вам было <br /> удобнее пользоваться Автореной
      </div>
      <button className={styles.acceptBtn} onClick={handleAccept}>
        Окей
      </button>
    </div>
  );
};
