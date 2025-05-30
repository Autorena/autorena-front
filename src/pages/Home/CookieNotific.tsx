import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { ReactComponent as Cross } from "../../assets/cross-2.svg";
import { ReactComponent as Cookie } from "../../assets/cookie.svg";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const CookieNotific = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setIsVisible(consent !== "true");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000 && isVisible) {
        handleClose();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 260);
  };

  const handleAccept = () => {
    setIsHiding(true);
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
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
