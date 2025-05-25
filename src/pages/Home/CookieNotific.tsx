import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { ReactComponent as Cross } from "../../assets/cross-2.svg";
import { ReactComponent as Cookie } from "../../assets/cookie.svg";

export const CookieNotific = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000 && isVisible) {
        handleHide();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleHide = () => {
    setIsHiding(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 260);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.cookie} ${isHiding ? styles.hiding : ""}`}>
      <button className={styles.closeBtn} onClick={handleHide}>
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
      <button className={styles.acceptBtn} onClick={handleHide}>
        Окей
      </button>
    </div>
  );
};
