import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./CarCard.module.scss";
import { ReactComponent as Favorite } from "../../assets/favorite.svg";
import { ReactComponent as More } from "../../assets/more-icon.svg";
import { CarCardProps } from "../../types";
import { useAppSelector } from "../../redux/hooks";

export const CarCard = ({ carData }: CarCardProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    listing: {
      id,
      carRentListing: {
        carContent: { photosUrl, brandId, modelId, yearOfCarProduction },
        listingOptions: {
          allowedForTaxi,
          allowedOnlyForPersonalUse,
          buyoutPossible,
        },
        pricePerDay,
      },
    },
  } = carData;

  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  // const { setModalContent, setModalActive } = useContext(ModalContext);

  const getCurrentFilter = () => {
    const filter = pathname.startsWith("/filter/")
      ? pathname.split("/")[2]
      : "RENT_AUTO";

    return filter;
  };

  const currentFilter = getCurrentFilter();

  const title = `${brandId} ${modelId} ${yearOfCarProduction}`;

  return (
    <Link
      to={`/${id}?from=${currentFilter}`}
      className={`${styles.carCard} ${carData.listing?.ads && styles.ads}`}
    >
      <div className={styles.carCard_imgWrap}>
        <img
          src={photosUrl[0]}
          alt="Car photo"
          className={styles.carCard_img}
          loading="lazy"
        />
        <button
          className={styles.carCard_moreBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <More />
        </button>
      </div>
      <div className={styles.carCard_title}>
        <p>Аренда {title}</p>
        <button
          className={styles.carCard_likeBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isPhoneConfirmed) {
              navigate("/unauthorized?action=favorite");
              // setModalActive(true);
              // setModalContent(<LoginModal />);
            }
          }}
        >
          <Favorite />
        </button>
      </div>
      <p className={styles.carCard_buyOption}>
        {buyoutPossible && "возможен выкуп"}
      </p>
      <div className={styles.carCard_bottom}>
        <p className={styles.carCard_price}>
          от {pricePerDay.toLocaleString("ru-RU")}₽ за день
        </p>
        <ul className={styles.carCard_list}>
          <li>
            Для личного пользования: {allowedOnlyForPersonalUse ? "да" : "нет"}
          </li>
          <li>Для такси: {allowedForTaxi ? "да" : "нет"}</li>
          <li>Скидка за сроки: нет</li>
        </ul>
      </div>
    </Link>
  );
};
