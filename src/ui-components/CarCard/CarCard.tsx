import { Link } from "react-router-dom";
import styles from "./CarCard.module.scss";
import { ReactComponent as Favorite } from "../../assets/favorite.svg";
import { ReactComponent as More } from "../../assets/more-icon.svg";
import { CarCardType } from "../../types";

interface CarCardProps {
  carData: CarCardType;
}

export const CarCard = ({ carData }: CarCardProps) => {
  const {
    common: { id, photos, title, ads },
    rent_auto: { cost_per_day, taxi_possible, buy_option, year, discount },
  } = carData;
  return (
    <Link to={`/${id}`} className={`${styles.carCard} ${ads && styles.ads}`}>
      <div className={styles.carCard_imgWrap}>
        <img src={photos[0]} alt="Car photo" className={styles.carCard_img} />
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
        <p>{title}</p>
        <button
          className={styles.carCard_likeBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Favorite />
        </button>
      </div>
      <p className={styles.carCard_buyOption}>
        {buy_option && "возможен выкуп"}
      </p>
      <p className={styles.carCard_price}>от {cost_per_day}₽ за день</p>
      <ul className={styles.carCard_list}>
        <li> Для личного пользования: {!taxi_possible ? "да" : "нет"}</li>
        <li>Для такси: {taxi_possible ? "да" : "нет"}</li>
        <li>Скидка за сроки: {discount !== 0 ? "да" : "нет"}</li>
      </ul>
    </Link>
  );
};
