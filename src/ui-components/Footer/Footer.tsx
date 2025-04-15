import styles from "./Footer.module.scss";
import { ReactComponent as TikTok } from "../../assets/tik_tok.svg";
import { ReactComponent as Vk } from "../../assets/vk.svg";
import { ReactComponent as Youtube } from "../../assets/youtube.svg";
import { ReactComponent as Tg } from "../../assets/telegram.svg";
import { ReactComponent as Ok } from "../../assets/ok.svg";
import logo from "../../assets/logo-1.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.footer_left}>
          <Link to="/" className={styles.footer_logo}>
            <img src={logo} alt="Logo" />
          </Link>
          <div className={styles.footer_itemsWrap}>
            <div className={styles.footer_items}>
              <Link to="/">Долгосрочная аренда авто</Link>
              <Link to="/">Аренда авто от суток</Link>
              <Link to="/">Выкуп автомобилей</Link>
              <Link to="/">Работа водителям</Link>
              <Link to="/">Автосервисы</Link>
              <Link to="/">Помощь на дороге</Link>
            </div>
            <div className={styles.footer_items}>
              <Link to="/">Лизинг</Link>
              <Link to="/">Запчасти</Link>
              <Link to="/">База черного списка</Link>
              <Link to="/">Размещение на Авторене</Link>
              <Link to="/">Безопасность</Link>
              <Link to="/">Техподдержка</Link>
            </div>
          </div>
        </div>
        <div className={styles.footer_right}>
          <ul className={styles.footer_socialMedia}>
            <li>
              <a href="#">
                <TikTok />
              </a>
            </li>
            <li>
              <a href="#">
                <Vk />
              </a>
            </li>
            <li>
              <a href="#">
                <Youtube />
              </a>
            </li>
            <li>
              <a href="#">
                <Tg />
              </a>
            </li>
            <li>
              <a href="#">
                <Ok />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
