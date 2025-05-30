import styles from "./Home.module.scss";
import { ReactComponent as Option1 } from "../../assets/filter_1.svg";
import option2 from "../../assets/option_2.png";
import { ReactComponent as Option3 } from "../../assets/filter_3.svg";
import { ReactComponent as Option4 } from "../../assets/filter_4.svg";
import { ReactComponent as Option5 } from "../../assets/filter_5.svg";
import { ReactComponent as Option6 } from "../../assets/option_6.svg";
import { ReactComponent as Option1_mob } from "../../assets/long-term-lease.svg";
import { ReactComponent as Option2_mob } from "../../assets/daily-rent.svg";
import { ReactComponent as Option3_mob } from "../../assets/buyout.svg";
import { ReactComponent as Option4_mob } from "../../assets/driver-work.svg";
import { ReactComponent as Option5_mob } from "../../assets/search.svg";
import { ReactComponent as Option6_mob } from "../../assets/autoservices.svg";
import { ReactComponent as Option7_mob } from "../../assets/help.svg";
import { ReactComponent as StoryImg } from "../../assets/bail.svg";
import { Stories } from "../../ui-components/Stories/Stories";
import { useContext, useEffect, useMemo, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ReactComponent as Location } from "../../assets/location-icon-2.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { fetchCars } from "../../redux/carsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../ui-components/Loader/Loader";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { sortCars } from "../../utils/sortCars";
import { Link } from "react-router-dom";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { HomeSlider } from "./HomeSlider";
import { CookieNotific } from "./CookieNotific";
import { declineCity } from "../../utils/declineCity";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";

type ActiveFilter = {
  type: "price" | "carCategory" | "listingType" | null;
  value: number | string | null;
};

export const Home = () => {
  const { location } = useContext(LocationContext);
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { cars, loading } = useAppSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(20);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    type: null,
    value: null,
  });
  const [sortOption, setSortOption] = useState<string>("default");

  useEffect(() => {
    dispatch(fetchCars()).catch((error) => {
      console.error("Error fetching cars:", error);
    });
  }, []);

  useInfiniteScroll(() => {
    setVisibleCount((prev) => prev + 20);
  }, visibleCount < cars.length);

  const filterCars = (
    type: "price" | "carCategory" | "listingType",
    value: number | string
  ) => {
    setActiveFilter((prev) => {
      // Если кликаем на уже активный фильтр - снимаем его
      if (prev.type === type && prev.value === value) {
        return { type: null, value: null };
      }
      // Иначе устанавливаем новый фильтр
      return { type, value };
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const filteredCars = cars.filter((car) => {
    const { type, value } = activeFilter;
    const rentListing = car.listing.carRentListing;

    if (!type || !value) return true;

    switch (type) {
      case "price":
        return rentListing?.pricePerDay
          ? rentListing.pricePerDay <= (value as number)
          : false;
      case "carCategory":
        return rentListing?.carContent.carCategory === value;
      case "listingType":
        return value in car.listing;
      default:
        return true;
    }
  });

  const sortedFilteredCars = useMemo(() => {
    return sortCars(filteredCars, sortOption);
  }, [filteredCars, sortOption]);

  const visibleCars = sortedFilteredCars.slice(0, visibleCount);

  return (
    <div className={`home container ${styles.homeWrap}`}>
      <HeaderMobile className={styles.header_mobile} />
      <div className={styles.home}>
        <div className={styles.home_main}>
          <HomeSlider />
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
          <div className={styles.home_options_mob}>
            <Link
              to="/filter/RENT_AUTO"
              className={styles.home_options_mob_item}
            >
              <h4>Долгосрочная аренда</h4>
              <Option1_mob />
            </Link>
            <Link
              to="/filter/DAILY_RENT"
              className={styles.home_options_mob_item}
            >
              <h4>Посуточная аренда</h4>
              <Option2_mob />
            </Link>
            <Link
              to="/filter/BUY_AUTO"
              className={styles.home_options_mob_item}
            >
              <h4>Выкуп автомобилей</h4>
              <Option3_mob />
            </Link>
            <Link
              to="/filter/DRIVER_JOBS"
              className={styles.home_options_mob_item}
            >
              <h4>Работа водителям</h4>
              <Option4_mob style={{ right: "0" }} />
            </Link>
            <Link to="/filter/SEARCH" className={styles.home_options_mob_item}>
              <h4>Поиск арендатора</h4>
              <Option5_mob style={{ right: "0" }} />
            </Link>
            <Link
              to="/filter/AUTO_SERVICES"
              className={styles.home_options_mob_item}
            >
              <h4>Автосервисы</h4>
              <Option6_mob style={{ right: "0" }} />
            </Link>
            <Link to="/" className={styles.home_options_mob_item}>
              <h4>Помощь на дороге</h4>
              <Option7_mob style={{ right: "0" }} />
            </Link>
          </div>
          <div className={styles.home_stories}>
            <div className={styles.home_stories_block}>
              <h4>
                Авторена внесет залог <span>за вас</span>
              </h4>
              <StoryImg />
            </div>
            <Stories />
          </div>
          <div className={styles.home_info}>
            <h2>
              Посмотрите объявления в <span>{declineCity(location)}</span>
            </h2>
            <div className={styles.home_info_points}>
              <button
                className={`${styles.home_filter} ${styles.large}`}
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<LocationModal />);
                }}
              >
                <Location /> {location}
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

              <div className={styles.home_info_points_bottom}>
                <button
                  className={`${styles.home_filter} ${
                    activeFilter.type === "price" &&
                    activeFilter.value === 1000 &&
                    styles.active
                  }`}
                  onClick={() => filterCars("price", 1000)}
                >
                  Авто до 1000 в сутки
                </button>
                <button
                  className={`${styles.home_filter} ${
                    activeFilter.type === "carCategory" &&
                    activeFilter.value === "CAR_CATEGORY_COMFORT_PLUS" &&
                    styles.active
                  }`}
                  onClick={() =>
                    filterCars("carCategory", "CAR_CATEGORY_COMFORT_PLUS")
                  }
                >
                  Аренда комфорт +
                </button>
                <button
                  className={`${styles.home_filter} ${
                    activeFilter.type === "carCategory" &&
                    activeFilter.value === "CAR_CATEGORY_BUSINESS" &&
                    styles.active
                  }`}
                  onClick={() =>
                    filterCars("carCategory", "CAR_CATEGORY_BUSINESS")
                  }
                >
                  Авто бизнес-класса
                </button>
                <button
                  className={`${styles.home_filter} ${
                    activeFilter.type === "listingType" &&
                    activeFilter.value === "DAILY_RENT" &&
                    styles.active
                  }`}
                  onClick={() => filterCars("listingType", "DAILY_RENT")}
                >
                  Аренда на сутки
                </button>
                <button
                  className={`${styles.home_filter} ${
                    activeFilter.type === "price" &&
                    activeFilter.value === 3000 &&
                    styles.active
                  }`}
                  onClick={() => filterCars("price", 3000)}
                >
                  Авто до 3000 в сутки
                </button>
              </div>
              <div className={styles.home_sortlist}>
                <DropdownList
                  options={sortOptions.default}
                  onSelect={(value) => {
                    if (typeof value === "string") handleSortChange(value);
                  }}
                  value={sortOption}
                />
              </div>
            </div>
            <div className={styles.home_recommends_grid}>
              {visibleCars.map((car) => (
                <CarCard carData={car} key={car.listing.id} />
              ))}{" "}
              {loading && <Loader className={styles.load} />}
            </div>
          </div>
          <div className={styles.home_recommends}>
            <h2 className={`section-title ${styles.title}`}>
              Рекомендации <span>для вас</span>
            </h2>
            <div className={styles.home_recommends_grid}>
              {cars.map((car) => (
                <CarCard carData={car} key={car.listing.id} />
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
      <CookieNotific />
    </div>
  );
};
