import { CarCardProps } from "../../types";
import { timeAgo } from "../../utils/timeAgo";
import styles from "./Favorites.module.scss";
import { ReactComponent as Like } from "../../assets/favorite.svg";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface FavoriteCarCardProps extends CarCardProps {
  isSimilar?: true;
}

export const FavoriteCarCard = ({
  carData,
  isSimilar,
}: FavoriteCarCardProps) => {
  const dispatch = useDispatch();
  const carContent = carData.listing.carRentListing?.carContent;

  if (!carContent) return null;

  const { photosUrl, brandId, modelId } = carContent;

  return (
    <Link to={`/${carData.listing.id}`} className={styles.favorites_carCard}>
      <button
        className={`${styles.favorites_carCard_like} ${
          !isSimilar ? styles.full : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!isSimilar) dispatch(removeFromFavorites(carData.listing.id));
          else dispatch(addToFavorites(carData));
        }}
      >
        <Like />
      </button>
      <div className={styles.favorites_carCard_img}>
        {" "}
        <img src={photosUrl[0]} alt="Car photo" />
      </div>

      <div className={styles.favorites_carCard_right}>
        <p
          className={styles.favorites_carCard_title}
        >{`Аренда ${brandId} ${modelId}`}</p>
        <p className={styles.favorites_carCard_price}>
          {carData.listing.carRentListing?.pricePerDay}₽ за день
        </p>
        <p className={styles.small_text}>
          г. {carData.listing.carRentListing?.city}
        </p>
        <p className={styles.small_text}>
          {timeAgo(carData.listing.carRentListing?.createdAt ?? "")}
        </p>
      </div>
    </Link>
  );
};
