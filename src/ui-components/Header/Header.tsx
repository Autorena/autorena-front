import { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Messages } from "../../assets/message-profile.svg";
import { ReactComponent as Favorites } from "../../assets/heart.svg";
import { ReactComponent as Favorite } from "../../assets/favorites-profile.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon-2.svg";
import { ReactComponent as Listing } from "../../assets/listing.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as ProfileMenu } from "../../assets/profile-2.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LocationContext } from "../../HOC/LocationProvider";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { declineCity } from "../../utils/declineCity";
import { SearchModal } from "../../components/modals/SearchModal/SearchModal";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { useAuth } from "../../HOC/AuthProvider";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { setModalActive, setModalContent, setCrossSize } =
    useContext(ModalContext);
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let closeTimeout: number;
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const hiddenOnMobile = [
    "/messages",
    "/favorites",
    "/notifications",
    "/profile",
    "/unauthorized",
  ];

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchElement = document.querySelector(`.${styles.header_search}`);
      const searchBtn = document.querySelector(`.${styles.header_searchBtn}`);

      if (
        searchElement &&
        !searchElement.contains(event.target as Node) &&
        searchBtn &&
        !searchBtn.contains(event.target as Node)
      ) {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    const hideHeader =
      hiddenOnMobile.includes(pathname) ||
      pathname.match(
        /^\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
      );

    if (hideHeader) {
      return null;
    }
  }

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={styles.header_top}>
          <div className={styles.header_top__wrap}>
            <ul>
              <li>
                <a href="#">PRO Кабинет</a>
              </li>
              <li>
                <Link to="/blacklist">БАЗА ЧС</Link>
              </li>
              <li>
                <a href="#">Помощь</a>
              </li>
              <li>
                <a href="#">Сотрудничество</a>
              </li>
            </ul>
            {!isAuthenticated ? (
              <button
                className={`gray-btn ${styles.authBtn}`}
                onClick={() => {
                  navigate("/unauthorized?action=profile&from=/");
                }}
              >
                Регистрация / вход
              </button>
            ) : (
              <div className={styles.header_profileMenu}>
                <div className={styles.header_profileMenu_left}>
                  <Link to="/notifications">
                    <Notification />
                  </Link>
                  <Link to="/messages">
                    <Message />
                  </Link>
                  <Link to="/favorites">
                    <Favorites />
                  </Link>
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
                          logout();
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
              {/* <Logo /> */}
              <LargeSvgImage src={getLargeSvgPath("logo-1")} />
            </Link>

            <div className={`${styles.header_bottom} ${styles.wrap}`}>
              <button className={`red-btn ${styles.header_categoriesBtn}`}>
                Категории поиска
              </button>

              <div
                className={`${styles.header_search} ${
                  isSearchModalOpen ? styles.active : ""
                }`}
              >
                <input
                  type="text"
                  placeholder={`Поиск в ${declineCity(location)}`}
                />
                <button className={`red-btn ${styles.searchBtn}`}>Найти</button>
              </div>

              <div className={styles.header_icons_mob}>
                <button
                  className={styles.header_searchBtn}
                  onClick={() => setIsSearchModalOpen(true)}
                >
                  <img src="assets/input-search.svg" alt="" />
                  {/* <Search /> */}
                </button>

                {/* <button
                  className={styles.locationBtn_mob}
                  onClick={() => {
                    setModalActive(true);
                    setModalContent(<LocationModal />);
                  }}
                >
                  <LocationIcon />
                </button> */}
                <button>
                  <Settings />
                </button>
              </div>

              <Link
                to={`${
                  isAuthenticated
                    ? "/choose-category"
                    : "/unauthorized?action=create_listing"
                }`}
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
              <LargeSvgImage
                src={getLargeSvgPath("location-icon")}
                alt="Локация"
              />
              {/* <Location /> */}
              г. {location}
            </button>
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};
