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

const transmissionMap: Record<string, string> = {
  TRANSMISSION_TYPE_MANUAL: "Механическая",
  TRANSMISSION_TYPE_AUTOMATIC: "Автоматическая",
  TRANSMISSION_TYPE_CVT: "Вариатор",
  TRANSMISSION_TYPE_ROBOT: "Робот",
  TRANSMISSION_TYPE_DCT: "Робот с двумя сцеплениями",
};

const fuelTypeMap: Record<string, string> = {
  FUEL_TYPE_PETROL: "Бензин",
  FUEL_TYPE_DIESEL: "Дизель",
  FUEL_TYPE_HYBRID: "Гибрид",
  FUEL_TYPE_ELECTRIC: "Электро",
  FUEL_TYPE_GAS: "Газ",
};

const carCategoryMap: Record<string, string> = {
  CAR_CATEGORY_ECONOMY: "Эконом",
  CAR_CATEGORY_COMFORT: "Комфорт",
  CAR_CATEGORY_BUSINESS: "Бизнес",
  CAR_CATEGORY_PREMIUM: "Премиум",
  CAR_CATEGORY_SUV: "Внедорожник",
  CAR_CATEGORY_SPORT: "Спорт",
  CAR_CATEGORY_VAN: "Минивэн",
  CAR_CATEGORY_ELECTRIC: "Электро",
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const SCROLL_THRESHOLD = 50;

  const isAuth = useAppSelector((state) => state.user.isPhoneConfirmed);
  const cars = useAppSelector((state) => state.cars.cars);
  const navigate = useNavigate();

  const similarCars = useMemo(() => {
    if (!car.listing.carRentListing) return [];
    return cars
      .filter((c) => {
        if (!c.listing.carRentListing) return false;
        return (
          c.listing.carRentListing.carContent.carCategory ===
            car.listing.carRentListing?.carContent.carCategory &&
          c.listing.id !== car.listing.id
        );
      })
      .slice(0, 8);
  }, [
    cars,
    car.listing.carRentListing?.carContent.carCategory,
    car.listing.id,
  ]);

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

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    if (Math.abs(currentScroll - lastScrollY) > SCROLL_THRESHOLD) {
      setShowButtons(currentScroll < lastScrollY);
      setLastScrollY(currentScroll);
    }
  }, [lastScrollY]);

  useEffect(() => {
    setLastScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!car.listing.carRentListing) {
    return null;
  }

  const { carRentListing } = car.listing;
  const { carContent } = carRentListing;

  return (
    <div className={styles.car_left_bottom}>
      <div className={`${styles.car_info_term} ${styles.location}`}>
        <h3 className={styles.car_subtitle}>Расположение</h3>
        <p>г. {carRentListing.city}</p>
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
            Минимальное количество суток:{" "}
            <span>{carRentListing.minimumRentalPeriod}</span>
          </li>
          <li>
            Есть лимит пробега: <span>Нет</span>
          </li>
          <li>
            Депозит: <span>2000 ₽</span>
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
            Марка: <span>{carContent.brandId}</span>
          </li>
          <li>
            Модель: <span>{carContent.modelId}</span>
          </li>
          <li>
            Год выпуска: <span>{carContent.yearOfCarProduction}</span>
          </li>
          <li>
            Двигатель:{" "}
            <span>
              {fuelTypeMap[carContent.fuelType] || carContent.fuelType}
            </span>
          </li>
          <li>
            Привод: <span>Передний</span>
          </li>
          <li>
            Коробка передач:{" "}
            <span>
              {transmissionMap[carContent.transmission] ||
                carContent.transmission}
            </span>
          </li>
          <li>
            Комплектация: <span>1.5T CVT Ultimate</span>
          </li>
          <li>
            Класс авто:{" "}
            <span>
              {carCategoryMap[carContent.carCategory] || carContent.carCategory}
            </span>
          </li>
          <li>
            Дополнительно:
            <span>
              {Object.entries(carContent.carOptions)
                .filter(([, value]) => value)
                .map(([key]) => {
                  const optionNames: Record<string, string> = {
                    hasAirConditioning: "Кондиционер",
                    hasChildSeat: "Детское кресло",
                    hasBluetooth: "Bluetooth",
                    hasNavigation: "Навигация",
                    hasParkingSensors: "Парктроник",
                    hasBackupCamera: "Камера заднего вида",
                    hasLeatherSeats: "Кожаный салон",
                    hasSunroof: "Люк",
                    hasHeatedSeats: "Подогрев сидений",
                    hasCruiseControl: "Круиз-контроль",
                  };
                  return optionNames[key] || key;
                })
                .join(", ")}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.car_info_term}>
        <h3 className={styles.car_subtitle}>Описание</h3>
        <p>{carRentListing.additionalInfo || "Описание отсутствует"}</p>
      </div>
      <div className={`${styles.car_reviews} ${styles.car_info_term}`}>
        <h3>Отзывы</h3>
        <div className={styles.car_reviewsWrap}>
          {visibleReviews.map((r) => (
            <Review key={r.author + r.date} reviewData={r} />
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
          Объявление №<span>{car.listing.id}</span>
        </p>
        <p>
          {new Date(carContent.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
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
            <CarCard key={similarCar.listing.id} carData={similarCar} />
          ))}
        </div>
      </div>
      <div className={`${styles.car_bottom_info} ${styles.mobile}`}>
        <p>
          Объявление №<span>{car.listing.id}</span>
        </p>
        <p>{new Date(carContent.createdAt).toLocaleDateString("ru-RU")}</p>
        <p>800 просмотров</p>
      </div>
    </div>
  );
};
