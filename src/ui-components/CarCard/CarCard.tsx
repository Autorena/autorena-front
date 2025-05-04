import { Link, useLocation } from "react-router-dom";
import styles from "./CarCard.module.scss";
import { ReactComponent as Favorite } from "../../assets/favorite.svg";
import { ReactComponent as More } from "../../assets/more-icon.svg";
import { CarCardProps } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LoginModal } from "../../components/modals/LoginModal";

export const CarCard = ({ carData }: CarCardProps) => {
  const { pathname } = useLocation();

  const {
    common: { photos, title, ads },
    rent_auto: { cost_per_day, taxi_possible, buy_option, discount },
  } = carData;

  // const categoryData = getCategoryData(carData);

  // const cost = categoryData?.cost_per_day ?? 0;
  // const taxi_possible = categoryData?.taxi_possible ?? false;
  // const buy_option = categoryData?.buy_option ?? false;
  // const discount = categoryData?.discount ?? 0;

  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const { setModalContent, setModalActive } = useContext(ModalContext);

  const getCurrentFilter = () => {
    if (pathname.startsWith("/filter/")) {
      return pathname.split("/")[2];
    }
    return "RENT_AUTO";
  };

  const currentFilter = getCurrentFilter();

  return (
    <Link
      to={`/${carData.common.id}?from=${currentFilter}`}
      className={`${styles.carCard} ${ads && styles.ads}`}
    >
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
            if (!isPhoneConfirmed) {
              setModalActive(true);
              setModalContent(<LoginModal />);
            }
          }}
        >
          <Favorite />
        </button>
      </div>
      <p className={styles.carCard_buyOption}>
        {buy_option && "возможен выкуп"}
      </p>
      <div className={styles.carCard_bottom}>
        <p className={styles.carCard_price}>
          от {cost_per_day.toLocaleString("ru-RU")}₽ за день
        </p>
        <ul className={styles.carCard_list}>
          <li> Для личного пользования: {!taxi_possible ? "да" : "нет"}</li>
          <li>Для такси: {taxi_possible ? "да" : "нет"}</li>
          <li>Скидка за сроки: {discount !== 0 ? "да" : "нет"}</li>
        </ul>
      </div>
    </Link>
  );
};
