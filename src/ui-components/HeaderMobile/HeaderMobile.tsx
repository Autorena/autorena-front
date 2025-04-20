import styles from "./HeaderMobile.module.scss";
import { ReactComponent as Logo } from "../../assets/logo-2.svg";
import { ReactComponent as Like } from "../../assets/favorites.svg";
import { ReactComponent as Listing } from "../../assets/listings.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Profile } from "../../assets/profile-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LoginModal } from "../../components/modals/LoginModal";

type HeaderMobProps = {
  className?: string;
};

export const HeaderMobile = ({ className }: HeaderMobProps) => {
  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { setModalActive, setModalContent } = useContext(ModalContext);

  const handleClick = (path: string) => {
    if (isPhoneConfirmed) navigate(`/${path}`);
    else {
      setModalActive(true);
      setModalContent(<LoginModal />);
    }
  };

  return (
    <div className={`${styles.header_mobile} ${className}`}>
      <Link to="/" className={styles.header_mobile_item}>
        <Logo style={{ width: "40px", height: "37px" }} />
        <p>Поиск</p>
      </Link>
      <button
        onClick={() => {
          handleClick("favorites");
        }}
        className={styles.header_mobile_item}
      >
        <Like style={{ width: "34px", height: "32px" }} />
        <p>Избранное</p>
      </button>
      <Link to="" className={styles.header_mobile_item}>
        <Listing style={{ width: "35px", height: "35px" }} />
        <p>Объявления</p>
      </Link>
      <button
        onClick={() => handleClick("messages")}
        className={styles.header_mobile_item}
      >
        <Message style={{ width: "32px", height: "32px" }} />
        <p>Сообщения</p>
      </button>
      <button
        onClick={() => handleClick("profile")}
        className={styles.header_mobile_item}
      >
        <Profile style={{ width: "32px", height: "32px" }} />
        <p>Профиль</p>
      </button>
    </div>
  );
};
