import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { ReactComponent as Arrow } from "../../assets/arrowList.svg";
import styles from "./Review.module.scss";
import { ReviewType } from "../../pages/CarPage/CarPage";

interface Props {
  reviewData: ReviewType;
}

export const Review = ({ reviewData }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => setExpanded((prev) => !prev);

  const maxLength = 200;
  const isLongText = reviewData.description.length > maxLength;

  const displayText = expanded
    ? reviewData.description
    : reviewData.description.slice(0, maxLength) + (isLongText ? "..." : "");

  return (
    <div className={styles.review}>
      <div className={styles.review_header}>
        <div className={styles.review_img}></div>
        <div className={styles.review_header_wrap}>
          <p className={styles.review_author}>{reviewData.author}</p>
          <p className={styles.review_date}>{reviewData.date}</p>
        </div>
      </div>
      <StarRating
        rating={reviewData.rate}
        starSize={window.innerWidth <= 550 ? 14 : 19}
      />
      <p className={styles.review_title}>{reviewData.title}</p>
      <p className={styles.review_text}>
        {displayText}
        {isLongText && (
          <button className={styles.toggle_btn} onClick={toggleText}>
            {expanded ? "Скрыть" : "Показать целиком"}
            <Arrow
              className={`${styles.toggle_btn_arrow} ${
                expanded ? styles.expanded : ""
              }`}
            />
          </button>
        )}
      </p>
    </div>
  );
};
