import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CarPage.module.scss";
import modalStyles from "../../ui-components/Modal/Modal.module.scss";
import { ReactComponent as Heart } from "../../assets/favorite.svg";
import { ReactComponent as ArrowBack } from "../../assets/car-arrowBack.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import { useContext, useEffect, useState } from "react";
import { fetchCarById, fetchCars } from "../../redux/carsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import { Loader } from "../../ui-components/Loader/Loader";
import { ModalContext } from "../../HOC/ModalProvider";
import { LoginModal } from "../../components/modals/LoginModal";
import { CarGallery } from "./CarGallery";
import { StarRating } from "../../ui-components/StarRating/StarRating";
import { CarDetails } from "./CarDetails";
import { CarPhoneModal } from "../../components/modals/CarPhoneModal";
import { useModalWithHistory } from "../../hooks/useModalWithHistory";

export type ReviewType = {
  title: string;
  author: string;
  date: string;
  rate: number;
  description: string;
};

export const CarPage = () => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { openModal } = useModalWithHistory();
  const isAuth = useAppSelector((state) => state.user.isPhoneConfirmed);
  const { id } = useParams();
  const cars = useAppSelector((state) => state.cars.cars);
  const car = useAppSelector((state) => state.cars.car);
  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [searchParams] = useSearchParams();
  const fromFilter = searchParams.get("from") || "RENT_AUTO";
  console.log("Перешли с фильтра:", fromFilter);

  useEffect(() => {
    if (!cars || cars.length === 0) {
      dispatch(fetchCars());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCarById(id!));
  }, [id]);

  if (
    !car ||
    !car.listing.carRentListing.carContent.photosUrl ||
    car.listing.carRentListing.carContent.photosUrl.length === 0
  ) {
    return <Loader />;
  }

  const { carContent } = car.listing.carRentListing;
  const carTitle = `Аренда ${carContent.brandId} ${carContent.modelId} ${carContent.yearOfCarProduction}`;

  const reviews = [
    {
      title: carTitle,
      author: "Александр",
      date: "6 декабря",
      rate: 4.5,
      description:
        "Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней. Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней.",
    },
    {
      title: carTitle,
      author: "Владимир",
      date: "6 декабря",
      rate: 5,
      description:
        "Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней. Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней.Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней.",
    },
    {
      title: carTitle,
      author: "Анатолий",
      date: "19 декабря",
      rate: 4,
      description:
        "Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней. Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней.Хотелось бы оставить отзыв о работе данной компании. Отличный сервис, советую. Все оперативно и без подводных камней.",
    },
  ];

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div className="container carPage">
      <Breadcrumbs className={styles.car_breadcrumbs} />
      <div className={styles.car_info}>
        <div className={styles.car_left}>
          <div className={styles.car_header}>
            <button
              className={styles.backBtn}
              onClick={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            >
              <ArrowBack />
            </button>
            <h2>{carTitle}</h2>
            <div className={styles.car_headerWrap}>
              <button className={styles.shareBtn}>
                <Share />
              </button>
              <button
                onClick={() => {
                  if (isPhoneConfirmed) navigate("/profile");
                  else {
                    openModal(<LoginModal />);
                  }
                }}
                className={styles.likeBtn}
              >
                <Heart />
              </button>
            </div>
          </div>{" "}
          <CarGallery photos={carContent.photosUrl} />
          <div className={styles.car_top_mobile}>
            <h3>{carTitle}</h3>
            <p className={styles.price}>
              {" "}
              {car.listing.carRentListing.pricePerDay.toLocaleString("ru-RU")}₽
              за день
            </p>
            <div className={styles.car_top_info}>
              <span className={styles.car_author_rate}>4.6</span>
              <span className={styles.reviews}>12 отзывов</span>
            </div>
            <p className={styles.car_top_address}>
              г. {car.listing.carRentListing.city}
            </p>
          </div>
          <CarDetails
            car={car}
            reviews={reviews}
            visibleReviews={visibleReviews}
            showAllReviews={showAllReviews}
            setShowAllReviews={setShowAllReviews}
          />
        </div>
        <div className={styles.car_right}>
          <div className={styles.car_right_top}>
            <p className={styles.car_right_price}>
              {car.listing.carRentListing.pricePerDay.toLocaleString("ru-RU")}₽
              за день
            </p>
            <button
              className={styles.showBtn}
              onClick={() => {
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
              }}
            >
              Показать номер
            </button>
            <button
              onClick={() => {
                if (isAuth) navigate("/chat");
                else setModalContent(<LoginModal />);
              }}
              className={`red-btn ${styles.writeBtn}`}
            >
              Написать
            </button>
            <div className={styles.car_right_info}>
              <div className={styles.car_right_img}></div>
              <div className={styles.car_right_infoWrap}>
                <div className={styles.car_author}>Сергей</div>
                <div className={styles.car_author_info}>
                  <span className={styles.car_author_rate}>4,6</span>
                  <StarRating rating={4.6} starSize={14} starGap="2px" />
                  <span className={styles.car_author_rateCount}>
                    12 отзывов
                  </span>
                </div>
              </div>
            </div>
            <button className={styles.checkBtn}>
              Проверить по базе
              <br /> черного списка
            </button>
          </div>
          <div className={styles.car_right_bottom}>
            <div className={styles.car_ad}>
              <p>Здесь будет реклама</p>
            </div>
            <div className={styles.car_ad}>
              <p>Здесь будет реклама</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
