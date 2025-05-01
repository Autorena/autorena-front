import { StarRating } from "../../ui-components/StarRating/StarRating";
import styles from "./Modals.module.scss";

type CarPhoneProps = {
  img?: string;
  name: string;
  rating: number;
  rating_count: number;
  mobile_phone: string;
};

export const CarPhoneModal = ({ data }: { data: CarPhoneProps }) => {
  const getReviewWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "отзывов";
    }

    if (lastDigit === 1) {
      return "отзыв";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return "отзыва";
    }

    return "отзывов";
  };

  return (
    <div className={`${styles.modal} ${styles.carPhone}`}>
      <div className={styles.carPhone_top}>
        <div className={styles.carPhone_img}></div>
        <div className={styles.carPhone_info}>
          <h3>{data.name}</h3>
          <div className={styles.carPhone_ratingInfo}>
            <span className={styles.carPhone_rate}>{data.rating}</span>
            <StarRating rating={4.6} starSize={16} starGap="2px" />
            <span className={styles.carPhone_ratingCount}>
              {data.rating_count} {getReviewWord(data.rating_count)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.carPhone_phone}>{data.mobile_phone}</div>
    </div>
  );
};
