import { useContext, useState } from "react";
import styles from "./Header.module.scss";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Favorites } from "../../assets/heart.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import logo from "../../assets/logo-1.png";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LocationContext } from "../../HOC/LocationProvider";
import { AuthModal } from "../../components/modals/AuthModal";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { setModalActive, setModalContent, setCrossSize } =
    useContext(ModalContext);
  const { location } = useContext(LocationContext);

  return (
    <header className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.header_top__wrap}>
          <ul>
            <li>
              <a href="#">PRO Кабинет</a>
            </li>
            <li>
              <a href="#">БАЗА ЧС</a>
            </li>
            <li>
              <a href="#">Помощь</a>
            </li>
            <li>
              <a href="#">Сотрудничество</a>
            </li>
          </ul>
          {!isLogged ? (
            <button
              className={`gray-btn ${styles.authBtn}`}
              onClick={() => {
                setModalActive(true);
                setCrossSize(32);
                setModalContent(<AuthModal />);
              }}
            >
              Регистрация / вход
            </button>
          ) : (
            <div className={styles.header_profileMenu}>
              <div className={styles.header_profileMenu_left}>
                <a href="#">
                  <Notification />
                </a>
                <a href="#">
                  <Message />
                </a>
                <a href="#">
                  <Favorites />
                </a>
              </div>
              <a href="#">
                <Profile />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className={styles.header_bottom}>
          <Link to="/">
            {" "}
            <img src={logo} alt="Logo" className={styles.header_logo} />
          </Link>

          <div className={`${styles.header_bottom} ${styles.wrap}`}>
            <button className={`red-btn ${styles.header_categoriesBtn}`}>
              Категории поиска
            </button>
            <div className={styles.header_search}>
              <input type="text" placeholder="Поиск" />
              <button className={`red-btn ${styles.searchBtn}`}>Найти</button>
            </div>
            <button className={`red-btn ${styles.header_adBtn}`}>
              Разместить объявление
            </button>
          </div>
          <button
            className={styles.locationBtn}
            onClick={() => {
              setModalActive(true);
              setCrossSize(18);
              setModalContent(<LocationModal />);
            }}
          >
            <Location />
            г. {location}
          </button>
        </div>
      </div>
    </header>
  );
};
