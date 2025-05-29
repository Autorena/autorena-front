import { Link, useLocation, useNavigate } from "react-router-dom";
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
    listing: {
      id,
      carRentListing: {
        carContent: { photosUrl, createdAt },
        pricePerDay,
        city,
        additionalInfo,
      },
    },
  } = carData;

  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const carTitle = `Аренда ${carData.listing.carRentListing.carContent.brandId} ${carData.listing.carRentListing.carContent.modelId} ${carData.listing.carRentListing.carContent.yearOfCarProduction}`;

  const getCurrentFilter = () => {
    if (pathname.startsWith("/filter/")) {
      return pathname.split("/")[2];
    }
    return "RENT_AUTO";
  };

  const currentFilter = getCurrentFilter();

  return (
    <Link
      to={`/${id}?from=${currentFilter}`}
      className={`${styles.carCard} ${styles.fullWidth}`}
    >
      <div className={styles.imgWrap}>
        <img src={photosUrl[0]} alt="Car photo" />
      </div>
      <div className={styles.gallery}>
        {photosUrl.map((photo: string) => (
          <img src={photo} alt="Car photo" />
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.titleWrap}>
          {carTitle}
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
          <span>{pricePerDay}₽ за день</span>

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
        <p className={styles.description}>{additionalInfo}</p>
        <p className={styles.address}>г. {city}</p>
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
          <div className={styles.date}>{timeAgo(createdAt)}</div>
        </div>
      </div>
    </Link>
  );
};
