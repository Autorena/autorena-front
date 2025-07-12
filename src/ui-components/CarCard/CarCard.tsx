import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./CarCard.module.scss";
import { ReactComponent as Favorite } from "../../assets/favorite.svg";
import { ReactComponent as More } from "../../assets/more-icon.svg";
import { CarCardProps } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { addToFavorites } from "../../redux/favoritesSlice";
import { useAuth } from "../../HOC/AuthProvider";

export const CarCard = ({ carData }: CarCardProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const { id, carRentListing, carSellListing } = carData;

  const listingData = carRentListing || carSellListing;
  if (!listingData) return null;

  const {
    carContent: { brandId, modelId, yearOfCarProduction },
    listingOptions: {
      allowedForTaxi,
      allowedOnlyForPersonalUse,
      buyoutPossible,
    },
  } = listingData;

  const pricePerDay =
    "pricePerDay" in listingData ? listingData.pricePerDay : undefined;
  const price = "price" in listingData ? listingData.price : undefined;

  const getCurrentFilter = () => {
    const filter = pathname.startsWith("/filter/")
      ? pathname.split("/")[2]
      : carRentListing
      ? "RENT_AUTO"
      : "SELL_AUTO";

    return filter;
  };

  const currentFilter = getCurrentFilter();

  const title = `${brandId} ${modelId} ${yearOfCarProduction}`;
  const displayPrice = carRentListing
    ? `от ${pricePerDay?.toLocaleString("ru-RU")}₽ за день`
    : `${price?.toLocaleString("ru-RU")}₽`;

  return (
    <Link
      to={`/${id}?from=${currentFilter}`}
      // className={`${styles.carCard} ${carData.listing?.ads && styles.ads}`}
      className={`${styles.carCard}`}
    >
      <div className={styles.carCard_imgWrap}>
        <img
          // src={photosUrl[0]}
          src="car.svg"
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
        <p>
          {carRentListing ? "Аренда" : "Продажа"} {title}
        </p>
        <button
          className={styles.carCard_likeBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isAuthenticated) {
              navigate("/unauthorized?action=favorites");
            } else {
              dispatch(addToFavorites(carData));
            }
          }}
        >
          <Favorite />
        </button>
      </div>
      {carRentListing && (
        <p className={styles.carCard_buyOption}>
          {buyoutPossible ? "возможен выкуп" : "выкуп невозможен"}
        </p>
      )}
      <div className={styles.carCard_bottom}>
        <p className={styles.carCard_price}>{displayPrice}</p>
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
