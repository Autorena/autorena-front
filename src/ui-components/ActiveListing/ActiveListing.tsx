import { Link } from "react-router-dom";
import { CarCardProps } from "../../types";
import styles from "./ActiveListing.module.scss";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as Like } from "../../assets/heart.svg";
import { ReactComponent as Message } from "../../assets/message.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { useState } from "react";

export const ActiveListing = ({ carData }: CarCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!carData.listing.carRentListing) {
    return null;
  }

  const { carRentListing } = carData.listing;

  return (
    <Link to={`/${carRentListing.id}`} className={styles.listing}>
      <img
        src={carRentListing.carContent.photosUrl[0]}
        alt="Car photo"
        className={styles.listing_img}
      />
      <div className={styles.listingWrap}>
        <div className={styles.listing_info}>
          <p
            className={styles.listing_title}
          >{`Аренда ${carRentListing.carContent.brandId} ${carRentListing.carContent.modelId}`}</p>
          <p className={styles.listing_price}>
            {carRentListing.pricePerDay.toLocaleString("ru-RU")}₽ за день
          </p>
          <p
            className={styles.listing_descr}
            style={{
              WebkitLineClamp: isExpanded ? "unset" : "4",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {carRentListing.additionalInfo}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={styles.listing_toggleTextBtn}
          >
            {isExpanded ? "Скрыть" : "Смотреть полностью"}
          </button>
          <p className={styles.listing_address}>г. {carRentListing.city}</p>
        </div>
        <div className={styles.listing_statistic}>
          <p className={styles.listing_days}>Осталось 29 дней</p>
          <div className={styles.listing_statisticWrap}>
            <p
              className={`${styles.listing_watching} ${styles.listing_statistic_item}`}
            >
              <Eye /> 0
            </p>
            <p
              className={`${styles.listing_likes} ${styles.listing_statistic_item}`}
            >
              <Like /> 0
            </p>
            <p
              className={`${styles.listing_messages} ${styles.listing_statistic_item}`}
            >
              <Message /> Нет новых сообщений
            </p>
          </div>
        </div>
      </div>
      <button className={styles.listing_edit}>
        <Edit />
      </button>
    </Link>
  );
};
