import styles from "./StarRating.module.scss";
import { ReactComponent as FullStar } from "../../assets/star.svg";
import { ReactComponent as EmptyStar } from "../../assets/emptyStar.svg";
import { ReactComponent as HalfStar } from "../../assets/halfStar.svg";

export const StarRating = ({
  rating,
  starSize,
  starGap,
}: {
  rating: number;
  starSize: number;
  starGap?: string;
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.rating}>
      <div
        className={styles.rating_stars}
        style={{ gap: `${starGap ? starGap : "4px"}` }}
      >
        {[...Array(fullStars)].map((_, index) => (
          <FullStar
            key={`full-${index}`}
            className={`${styles.rating_starFill} ${styles.rating_star}`}
            style={{ width: `${starSize}px` }}
          />
        ))}
        {halfStar && (
          <HalfStar
            className={styles.rating_star}
            style={{ width: `${starSize}px` }}
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <EmptyStar
            key={`empty-${index}`}
            className={`${styles.rating_starEmpty} ${styles.rating_star}`}
            style={{ width: `${starSize}px` }}
          />
        ))}
      </div>
    </div>
  );
};
