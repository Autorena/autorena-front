import { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Messages } from "../../assets/message-profile.svg";
import { ReactComponent as Favorites } from "../../assets/heart.svg";
import { ReactComponent as Favorite } from "../../assets/favorites-profile.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { ReactComponent as Listing } from "../../assets/listing.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as ProfileMenu } from "../../assets/profile-2.svg";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import { ReactComponent as Logo } from "../../assets/logo-1.svg";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LocationContext } from "../../HOC/LocationProvider";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginModal } from "../../components/modals/LoginModal";
import { useAppSelector } from "../../redux/hooks";
import { declineCity } from "../../utils/declineCity";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const { setModalActive, setModalContent, setCrossSize } =
    useContext(ModalContext);
  const { location } = useContext(LocationContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let closeTimeout: number;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

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
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  if (isMobile && pathname !== "/" && !pathname.startsWith("/filter/")) {
    return null;
  }

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
                <div
                  className={styles.header_profileWrapper}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button onClick={() => navigate("/profile")}>
                    <Profile />
                  </button>
                  {isDropdownOpen && (
                    <div className={styles.header_profileDropdown}>
                      <ul>
                        <li>
                          <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            <ProfileMenu /> Профиль
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/choose-category"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            <Listing /> Объявления
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            <Favorite /> Избранное
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            <Messages /> Сообщения
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            <Settings /> Настройки
                          </NavLink>
                        </li>
                      </ul>
                      <div className={styles.header_profiles}>
                        <h4>Мои профили</h4>
                        <div className={styles.header_profiles_adding}>
                          <div className={styles.header_profiles_img}></div>
                          <button>
                            <Plus />
                          </button>
                        </div>
                      </div>
                      <button
                        className={styles.header_logout}
                        onClick={() => {
                          dispatch(logout());
                          setTimeout(() => navigate("/"), 0);
                        }}
                      >
                        <Logout />
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`container ${styles.container} ${
            pathname === "/create-listing" ? styles.hide : ""
          }`}
        >
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
              <Link
                to="/choose-category"
                className={`red-btn ${styles.header_adBtn}`}
              >
                Разместить объявление
              </Link>
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
