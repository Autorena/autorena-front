import styles from "./Home.module.scss";
import { ReactComponent as Option1 } from "../../assets/filter_1.svg";
import option2 from "../../assets/option_2.png";
import { ReactComponent as Option3 } from "../../assets/filter_3.svg";
import { ReactComponent as Option4 } from "../../assets/filter_4.svg";
import { ReactComponent as Option5 } from "../../assets/filter_5.svg";
import { ReactComponent as Option6 } from "../../assets/option_6.svg";
import { Stories } from "../../ui-components/Stories/Stories";
import { useContext, useEffect, useMemo, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { fetchCars } from "../../redux/carsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../ui-components/Loader/Loader";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortCars } from "../../utils/sortCars";
import { Link } from "react-router-dom";
import { sortOptions } from "../../constants/sortOptions";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const Home = () => {
  const { location } = useContext(LocationContext);
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { cars, loading } = useAppSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(20);
  const [activeFilter, setActiveFilter] = useState<{ [key: string]: any }>({});
  const [sortOption, setSortOption] = useState<string>("default");

  useEffect(() => {
    dispatch(fetchCars()).catch((error) => {
      console.error("Error fetching cars:", error);
    });
  }, []);

  useInfiniteScroll(() => {
    setVisibleCount((prev) => prev + 20);
  }, visibleCount < cars.length);

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

  const handleSortChange = (value: string) => {
    console.log("Selected sort option:", value);
    setSortOption(value);
  };

  const sortedFilteredCars = useMemo(() => {
    return sortCars(filteredCars, sortOption);
  }, [filteredCars, sortOption]);

  const visibleCars = sortedFilteredCars.slice(0, visibleCount);

  return (
    <div className={`container ${styles.homeWrap}`}>
      <HeaderMobile className={styles.header_mobile} />
      <div className={styles.home}>
        <div className={styles.home_main}>
          <div className={styles.home_options}>
            <div className={styles.home_optionsWrap}>
              <div className={styles.top_row}>
                <Link
                  to="/filter/RENT_AUTO"
                  className={`${styles.home_option} ${styles.big}`}
                >
                  <h3 className={styles.title}>
                    Долгосрочная
                    <br /> аренда
                  </h3>
                  <Option1 />
                </Link>
                <Link
                  to="/filter/DAILY_RENT"
                  className={`${styles.home_option} ${styles.home_optionHide}`}
                >
                  {" "}
                  <h3 className={styles.title}>
                    Аренда от
                    <br /> суток
                  </h3>
                  <img src={option2} alt="" className={styles.option_img} />
                </Link>
                <Link to="/filter/AUTO_SERVICES" className={styles.home_option}>
                  {" "}
                  <h3 className={styles.title}>Автосервисы</h3>
                  <Option3 />
                </Link>
                <a
                  href="#"
                  className={`${styles.home_option} ${styles.mobile}`}
                >
                  {" "}
                  <h3 className={styles.title}>Помощь на дороге</h3>
                  <Option6 />
                </a>
              </div>
              <div className={styles.bottom_row}>
                <Link
                  to="/filter/DAILY_RENT"
                  className={`${styles.home_option} ${styles.home_optionVisible}`}
                >
                  {" "}
                  <h3 className={styles.title}>
                    Аренда от
                    <br /> суток
                  </h3>
                  <img src={option2} alt="" className={styles.option_img} />
                </Link>
                <Link
                  to="/filter/BUY_AUTO"
                  className={`${styles.home_option} ${styles.big}`}
                >
                  {" "}
                  <h3 className={styles.title}>
                    Выкуп <br />
                    автомобилей
                  </h3>
                  <Option4 />
                </Link>
                <Link
                  to="/filter/DRIVER_JOBS"
                  className={`${styles.home_option} ${styles.big} ${styles.resize}`}
                >
                  {" "}
                  <h3 className={styles.title}>
                    Работа
                    <br /> водителям
                  </h3>
                  <Option5 />
                </Link>
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
            <div className={styles.home_info_points}>
              <button className={`${styles.home_filter} ${styles.large}`}>
                <Location /> {location} и область
              </button>
              <button
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<LocationModal />);
                }}
                style={{ padding: "0 8px" }}
                className={styles.home_filter_choose}
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
              <DropdownList
                options={sortOptions.default}
                onSelect={handleSortChange}
              />
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
