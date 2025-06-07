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
import { ReactComponent as LocationIcon } from "../../assets/location-icon.svg";
import { ReactComponent as Logo } from "../../assets/logo-1.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LocationContext } from "../../HOC/LocationProvider";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { declineCity } from "../../utils/declineCity";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { ReactComponent as Search } from "../../assets/input-search.svg";
import { SearchModal } from "../../components/modals/SearchModal/SearchModal";

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const { setModalActive, setModalContent, setCrossSize } =
    useContext(ModalContext);
  const { location } = useContext(LocationContext);
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let closeTimeout: number;
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
    let lastScroll = window.scrollY;
    let isMobileScreen = window.innerWidth <= 900;
    let scrollTimeout: number;
    const SCROLL_THRESHOLD = 80;

    const handleScroll = () => {
      if (!isMobileScreen) return;

      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScroll;

      if (scrollDiff > 0 && currentScroll > SCROLL_THRESHOLD) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setShowHeader(false);
        }, 100);
      } else if (scrollDiff < 0) {
        clearTimeout(scrollTimeout);
        setShowHeader(true);
      }

      lastScroll = currentScroll;
    };

    const handleResize = () => {
      isMobileScreen = window.innerWidth <= 900;
      if (!isMobileScreen) setShowHeader(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(scrollTimeout);
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

  if (isMobile && pathname !== "/" && !pathname.startsWith("/filter/")) {
    return null;
  }

  return (
    <>
      <header
        className={`${styles.header} ${
          !showHeader && window.innerWidth <= 900 ? styles.hidden : ""
        }`}
      >
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
            {!user.isPhoneConfirmed ? (
              <button
                className={`gray-btn ${styles.authBtn}`}
                onClick={() => {
                  // setModalActive(true);
                  // setCrossSize(32);
                  // setModalContent(<LoginModal />);
                  navigate("/unauthorized?action=profile&from=/");
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
          } ${!showHeader && window.innerWidth <= 900 ? styles.hidden : ""}`}
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
                  <Search />
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
                  user.isPhoneConfirmed
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
              <LocationIcon />
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
