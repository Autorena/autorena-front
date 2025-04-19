import styles from "./Home.module.scss";
import option1 from "../../assets/option_1.png";
import option2 from "../../assets/option_2.png";
import option3 from "../../assets/option_3.png";
import option4 from "../../assets/option_4.png";
import option5 from "../../assets/option_5.png";
import { ReactComponent as Option6 } from "../../assets/option_6.svg";
import { Stories } from "../../ui-components/Stories/Stories";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { fetchCars } from "../../redux/carsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../ui-components/Loader/Loader";

export const Home = () => {
  const { location } = useContext(LocationContext);
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { cars, loading } = useAppSelector((state) => state.cars);

  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(20);
  const [activeFilter, setActiveFilter] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  console.log(activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 420;

      if (bottomReached && visibleCount < cars.length) {
        setVisibleCount((prev) => prev + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, cars.length]);

  const filterCars = (type: string, value: any) => {
    setActiveFilter((prev) =>
      prev[type] === value
        ? Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== type)
          )
        : { ...prev, [type]: value }
    );
  };

  const filteredCars = cars.filter((car) => {
    const { price, car_class } = activeFilter;

    if (price && car.rent_auto.cost_per_day > price) return false;
    if (
      car_class &&
      car.search_auto?.car_class?.toLowerCase() !== car_class.toLowerCase()
    )
      return false;

    return true;
  });

  const visibleCars = filteredCars.slice(0, visibleCount);

  return (
    <div className="container">
      <div className={styles.home}>
        <div className={styles.home_main}>
          <div className={styles.home_options}>
            <div className={styles.home_optionsWrap}>
              <div className={styles.top_row}>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  <h3 className={styles.title}>
                    Долгосрочная
                    <br /> аренда
                  </h3>
                  <img src={option1} alt="Service image" />
                </a>
                <a href="#" className={styles.home_option}>
                  {" "}
                  <h3 className={styles.title}>
                    Аренда от
                    <br /> суток
                  </h3>
                  <img src={option2} alt="Service image" />
                </a>
                <a href="#" className={styles.home_option}>
                  {" "}
                  <h3 className={styles.title}>Автосервисы</h3>
                  <img src={option3} alt="Service image" />
                </a>
              </div>
              <div className={styles.bottom_row}>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  {" "}
                  <h3 className={styles.title}>
                    Выкуп <br />
                    автомобилей
                  </h3>
                  <img src={option4} alt="Service image" />
                </a>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  {" "}
                  <h3 className={styles.title}>
                    Работа
                    <br /> водителям
                  </h3>
                  <img src={option5} alt="Service image" />
                </a>
              </div>
            </div>

            <a
              href="#"
              className={`${styles.home_option} ${styles.full_height}`}
            >
              {" "}
              <h3 className={styles.title}>Помощь на дороге</h3>
              <Option6 />
            </a>
          </div>
          <Stories />
          <div className={styles.home_info}>
            <h2 className="section-title">
              Посмотрите объявления в Москве и МО
            </h2>
            <div className={styles.home_info_points}>
              <button className={`${styles.home_filter} ${styles.large}`}>
                <Location /> {location} и область
              </button>
              <button
                onClick={() => {
                  setModalContent(<LocationModal />);
                  setModalActive(true);
                }}
                style={{ padding: "0 8px" }}
              >
                Выбрать город
              </button>

              <button
                className={`${styles.home_filter} ${
                  "price" in activeFilter && styles.active
                }`}
                onClick={() => filterCars("price", 1000)}
              >
                Авто до 1000 в сутки
              </button>
              <button
                className={`${styles.home_filter} ${
                  "car_class" in activeFilter && styles.active
                }`}
                onClick={() => filterCars("car_class", "comfort_plus")}
              >
                Аренда комфорт +
              </button>
            </div>
          </div>
          <div className={styles.home_recommends}>
            <h2 className={`section-title ${styles.title}`}>
              Рекомендации <span>для вас</span>
            </h2>
            <div className={styles.home_recommends_grid}>
              {visibleCars.map((car) => (
                <CarCard carData={car} key={car.common.id} />
              ))}{" "}
              {loading && <Loader className={styles.load} />}
            </div>
          </div>
        </div>
        <div className={styles.home_ads}>
          <div className={styles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
          <div className={styles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
        </div>
      </div>
    </div>
  );
};
