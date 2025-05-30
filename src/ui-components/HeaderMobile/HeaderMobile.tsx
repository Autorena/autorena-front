import styles from "./HeaderMobile.module.scss";
import { ReactComponent as Home } from "../../assets/home-icon.svg";
import { ReactComponent as Like } from "../../assets/favorites.svg";
import { ReactComponent as Listing } from "../../assets/new-listing.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

type HeaderMobProps = {
  className?: string;
};

export const HeaderMobile = ({ className }: HeaderMobProps) => {
  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const { setModalActive, setModalContent } = useContext(ModalContext);

  const handleClick = (path: string) => {
    if (isPhoneConfirmed) navigate(`/${path}`);
    else {
      // setModalActive(true);
      // setModalContent(<LoginModal />);
      navigate(`/unauthorized?action=${path}`);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(`/${path}`);
  };

  return (
    <div className={`${styles.header_mobile} ${className}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.header_mobile_item} ${styles.active}`
            : `${styles.header_mobile_item}`
        }
      >
        <Home />
      </NavLink>
      <button
        onClick={() => handleClick("favorite")}
        className={`${styles.header_mobile_item} ${
          isActive("favorites") ? styles.active : ""
        }`}
      >
        <Like />
      </button>
      <NavLink
        to="/choose-category"
        className={({ isActive }) =>
          isActive
            ? `${styles.header_mobile_item} ${styles.active}`
            : `${styles.header_mobile_item}`
        }
      >
        <Listing />
      </NavLink>
      <button
        onClick={() => handleClick("messages")}
        className={`${styles.header_mobile_item} ${
          isActive("messages") ? styles.active : ""
        }`}
      >
        <Message />
      </button>
      <button
        onClick={() => handleClick("profile")}
        className={`${styles.header_mobile_item} ${
          isActive("profile") ? styles.active : ""
        }`}
      >
        <Profile />
      </button>
    </div>
  );
};
