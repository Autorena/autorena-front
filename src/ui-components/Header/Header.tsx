import { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Favorites } from "../../assets/heart.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import { ReactComponent as Logo } from "../../assets/logo-1.svg";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LocationContext } from "../../HOC/LocationProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginModal } from "../../components/modals/LoginModal";
import { useAppSelector } from "../../redux/hooks";
import { declineCity } from "../../utils/declineCity";

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const { setModalActive, setModalContent, setCrossSize } =
    useContext(ModalContext);
  const { location } = useContext(LocationContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900 && pathname.startsWith("/"));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [pathname]);

  if (isMobile && pathname.match(/^\/\d+/)) return null;

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scroll : ""}`}>
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
            {!user.isPhoneConfirmed ? (
              <button
                className={`gray-btn ${styles.authBtn}`}
                onClick={() => {
                  setModalActive(true);
                  setCrossSize(32);
                  setModalContent(<LoginModal />);
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
        <div className={`container ${styles.container}`}>
          <div className={styles.header_bottom}>
            <Link
              to="/"
              className={styles.header_logo}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {" "}
              <Logo />
            </Link>

            <div className={`${styles.header_bottom} ${styles.wrap}`}>
              <button className={`red-btn ${styles.header_categoriesBtn}`}>
                Категории поиска
              </button>
              {pathname.startsWith("/filter/") && (
                <button
                  onClick={() => navigate(-1)}
                  className={styles.arrowBack}
                >
                  <Arrow />
                </button>
              )}

              <div className={styles.header_search}>
                <input
                  type="text"
                  placeholder={`Поиск в ${declineCity(location)}`}
                />
                <button className={`red-btn ${styles.searchBtn}`}>Найти</button>
              </div>
              <button
                className={styles.locationBtn_mob}
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<LocationModal />);
                }}
              >
                <Location />
              </button>
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
    </>
  );
};
