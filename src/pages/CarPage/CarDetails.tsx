import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useAppSelector } from "../../redux/hooks";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Review } from "../../ui-components/Review/Review";
import { StarRating } from "../../ui-components/StarRating/StarRating";
import styles from "./CarPage.module.scss";
import modalStyles from "../../ui-components/Modal/Modal.module.scss";
import { ModalContext } from "../../HOC/ModalProvider";
import { CarPhoneModal } from "../../components/modals/CarPhoneModal";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../../components/modals/LoginModal";
import { useModalWithHistory } from "../../hooks/useModalWithHistory";
import { CarCardType } from "../../types";

type ReviewType = {
  title: string;
  author: string;
  date: string;
  rate: number;
  description: string;
};

export const CarDetails = ({
  car,
  reviews,
  visibleReviews,
  setShowAllReviews,
}: {
  car: CarCardType;
  reviews: ReviewType[];
  visibleReviews: ReviewType[];
  showAllReviews: boolean;
  setShowAllReviews: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { openModal } = useModalWithHistory();
  const [showButtons, setShowButtons] = useState(true);
  const isAuth = useAppSelector((state) => state.user.isPhoneConfirmed);
  const cars = useAppSelector((state) => state.cars.cars);
  const navigate = useNavigate();

  // Оптимизируем фильтрацию похожих машин
  const similarCars = useMemo(() => {
    return cars
      .filter(
        (c) =>
          c.common.category === car.common.category &&
          c.common.id !== car.common.id
      )
      .slice(0, 4); // Ограничиваем до 4 похожих машин
  }, [cars, car.common.category, car.common.id]);

  // Оптимизируем обработчики событий
  const handlePhoneClick = useCallback(() => {
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
  }, [setModalActive, setModalContent]);

  const handleWriteClick = useCallback(() => {
    if (isAuth) navigate("/chat");
    else openModal(<LoginModal />);
  }, [isAuth, navigate, openModal]);

  // Оптимизируем обработчик скролла
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    setShowButtons(currentScroll < window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.car_left_bottom}>
      <div className={`${styles.car_info_term} ${styles.location}`}>
        <h3 className={styles.car_subtitle}>Расположение</h3>
        <p>{car.common.address}</p>
      </div>
      <div className={styles.car_info_term}>
        <h3 className={styles.car_subtitle}>Условия аренды</h3>
        <ul className={styles.car_list}>
          <li>
            Минимальный возраст водителя: <span>25 лет</span>
          </li>
          <li>
            Минимальный стаж вождения: <span>1 год</span>
          </li>
          <li>
            Страховка: <span>ОСАГО</span>
          </li>
          <li>
            Минимальное количество суток: <span>2</span>
          </li>
          <li>
            Есть лимит пробега: <span>Нет</span>
          </li>
          <li>
            Депозит: <span>20000 ₽</span>
          </li>
        </ul>
      </div>
      <div className={styles.car_info_term}>
        <h3 className={styles.car_subtitle}>Об автомобиле</h3>
        <div
          className={`${styles.car_buttons} ${
            !showButtons ? styles.hidden : ""
          }`}
        >
          <button className={styles.phoneBtn} onClick={handlePhoneClick}>
            Позвонить
          </button>
          <button
            className={`red-btn ${styles.writeBtn}`}
            onClick={handleWriteClick}
          >
            Написать
          </button>
        </div>
        <ul className={styles.car_list}>
          <li>
            Марка: <span>OMODA</span>
          </li>
          <li>
            Модель: <span>С5</span>
          </li>
          <li>
            Год выпуска: <span>{car.rent_auto.year}</span>
          </li>
          <li>
            Двигатель: <span>Бензин</span>
          </li>
          <li>
            Привод: <span>Передний</span>
          </li>
          <li>
            Коробка передач: <span>Вариатор</span>
          </li>
          <li>
            Комплектация: <span>1.5T CVT Ultimate</span>
          </li>
          <li>
            Класс авто: <span>Комфорт</span>
          </li>
          <li>
            Дополнительно:
            <span>
              Кондиционер, аудиосистема, сиденья с подогревом, камера заднего
              вида
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.car_info_term}>
        <h3 className={styles.car_subtitle}>Описание</h3>
        <p>
          Mашина aбcолютнo новaя комплектация Ultimаtе. Куплeна в 2024 гoду в
          сaлонe у официального дилеpa зa наличку, все чеки имеются. Машина на
          гарантии, русификация, полный пакет документов и.т. д
        </p>
      </div>
      <div className={`${styles.car_reviews} ${styles.car_info_term}`}>
        <h3>Отзывы</h3>
        <div className={styles.car_reviewsWrap}>
          {visibleReviews.map((r) => (
            <Review reviewData={r} />
          ))}
        </div>
        {visibleReviews.length < reviews.length && (
          <button
            className={`${styles.showAll} red-btn`}
            onClick={() => setShowAllReviews((prev) => !prev)}
          >
            Посмотреть все
          </button>
        )}
      </div>
      <div className={styles.car_bottom_info}>
        <p>
          Объявление №<span>3467343247</span>
        </p>
        <p>1 октября 2024, 03:00</p>
        <p>800 просмотров</p>
      </div>
      <div className={styles.car_info_mobile}>
        <div className={styles.header}>
          <h3>AUTO прокат / аренда автомобилей</h3>
          <div className={styles.image}></div>
        </div>
        <div className={styles.bottom}>
          <p>Компания</p>
          <div className={styles.info}>
            <span className={styles.car_author_rate}>4,6</span>
            <StarRating rating={4.6} starSize={14} starGap="2px" />
            <span className={styles.reviews}>12 отзывов</span>
          </div>
          <p>21 объявление</p>
          <button className={`white-btn ${styles.subscribeBtn}`}>
            Подписаться
          </button>
        </div>
      </div>
      <div className={styles.car_similar}>
        <h3>Похожие объявления</h3>
        <div className={styles.car_similarWrap}>
          {similarCars.map((similarCar) => (
            <CarCard key={similarCar.common.id} carData={similarCar} />
          ))}
        </div>
      </div>
      <div className={`${styles.car_bottom_info} ${styles.mobile}`}>
        <p>
          Объявление №<span>3467343247</span>
        </p>
        <p>1 октября 2024, 03:00</p>
        <p>800 просмотров</p>
      </div>
    </div>
  );
};
