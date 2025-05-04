import { Link, useNavigate } from "react-router-dom";
import { CarCardProps } from "../../types";
import styles from "./CarCardLarge.module.scss";
import modalStyles from "../../ui-components/Modal/Modal.module.scss";
import { ReactComponent as Like } from "../../assets/favorite.svg";
import { useAppSelector } from "../../redux/hooks";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LoginModal } from "../../components/modals/LoginModal";
import { timeAgo } from "../../utils/timeAgo";
import { CarPhoneModal } from "../../components/modals/CarPhoneModal";
import { useModalWithHistory } from "../../hooks/useModalWithHistory";

export const CarCardLarge = ({ carData }: CarCardProps) => {
  const { openModal } = useModalWithHistory();
  const {
    common: { id, photos, title, description, address, created_at, ads },
    rent_auto: { cost_per_day },
  } = carData;

  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <Link
      to={`/${id}`}
      className={`${styles.carCard} ${ads && styles.ads} ${styles.fullWidth}`}
    >
      <div className={styles.imgWrap}>
        <img src={photos[0]} alt="Car photo" />
      </div>
      <div className={styles.gallery}>
        {photos.map((ph) => (
          <img src={ph} />
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.titleWrap}>
          {title}
          <button
            className={styles.likeBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isPhoneConfirmed) {
                setModalActive(true);
                setModalContent(<LoginModal />);
              }
            }}
          >
            <Like />
          </button>
        </div>
        <p className={styles.price}>
          <span>{cost_per_day}₽ за день</span>

          <button
            className={styles.likeBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isPhoneConfirmed) {
                setModalActive(true);
                setModalContent(<LoginModal />);
              }
            }}
          >
            <Like />
          </button>
        </p>
        <p className={styles.description}>{description}</p>
        <p className={styles.address}>{address}</p>
        <div className={styles.autor}>
          <div className={styles.autor_name}>
            AUTO прокат / аренда автомобилей
          </div>
          <div className={styles.autor_img}></div>
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={`red-btn ${styles.writeBtn}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              if (isPhoneConfirmed) navigate("/chat");
              else openModal(<LoginModal />);
            }}
          >
            Написать
          </button>
          <button
            type="button"
            className={styles.phoneBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModalActive(true);
              setModalContent(
                <CarPhoneModal
                  data={{
                    name: "Сергей",
                    rating: 4.6,
                    rating_count: 12,
                    mobile_phone: "+7 (999) 999 99 99",
                  }}
                />,
                { modalClass: `${modalStyles.other}` }
              );
            }}
          >
            {window.innerWidth <= 550 ? "Позвонить" : " Показать номер"}
          </button>
          <div className={styles.date}>{timeAgo(created_at)}</div>
        </div>{" "}
      </div>
    </Link>
  );
};
