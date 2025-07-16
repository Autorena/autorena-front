import styles from "./Home.module.scss";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { useContext, useEffect, useMemo, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Loader } from "../../ui-components/Loader/Loader";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { Link, useNavigate } from "react-router-dom";
import { HomeSlider } from "./HomeSlider";
import { CookieNotific } from "./CookieNotific";
import { declineCity } from "../../utils/declineCity";
import { useFilterListingsQuery } from "../../redux/listingsApi";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";
import { useAppDispatch } from "../../redux/hooks";
import { setCars } from "../../redux/carsSlice";
import { CarCardType } from "../../types";
import { useSearch } from "../../HOC/SearchContext";

type ActiveFilter = {
  type: "price" | "carCategory" | "listingType" | null;
  value: number | string | null;
};

export const Home = () => {
  const { location } = useContext(LocationContext);
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { data, isLoading, error } = useFilterListingsQuery({
    filter: { car_rent_listing: { city: location } },
    pagination: { page: 1, page_size: 20 },
  });
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    type: null,
    value: null,
  });
  const [sortOption, setSortOption] = useState<string>("default");
  const listings = data?.listings || [];
  const dispatch = useAppDispatch();
  const { setSearchValue } = useSearch();

  const searchRequests = [
    "Аренда бизнес автомобиля для такси",
    "Выкуп лада приора",
    "Снять автомобиль на сутки в Казани",
    "Аренда автомобиля с возможностью выкупа",
    "Работа водителем Екатеринбург",
  ];

  const filterCars = (
    type: "price" | "carCategory" | "listingType",
    value: number | string
  ) => {
    setActiveFilter((prev) => {
      if (prev.type === type && prev.value === value) {
        return { type: null, value: null };
      }
      return { type, value };
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  useEffect(() => {
    if (data?.listings) {
      dispatch(setCars(data.listings));
    }
  }, [data, dispatch]);

  const filteredCars = useMemo(() => {
    if (!activeFilter.type || activeFilter.value === null) return listings;
    return listings.filter((car: CarCardType) => {
      const rentListing = car.carRentListing;
      if (!rentListing) return false;
      switch (activeFilter.type) {
        case "price":
          return rentListing.pricePerDay
            ? rentListing.pricePerDay <= (activeFilter.value as number)
            : false;
        case "carCategory":
          return rentListing.carContent.carCategory === activeFilter.value;
        case "listingType":
          if (activeFilter.value === "DAILY_RENT") {
            return rentListing.rentDuration?.includes("RENT_DURATION_FROM_DAY");
          }
          return !!car[activeFilter.value as keyof CarCardType];
        default:
          return true;
      }
    });
  }, [listings, activeFilter]);

  return (
    <div className={`home container ${styles.homeWrap}`}>
      <HeaderMobile className={styles.header_mobile} />
      <div className={styles.home}>
        <div className={styles.home_main}>
          <HomeSlider />

          <Link to="/filter/WANTED_RENT" className={styles.home_banner}></Link>

          <div className={styles.home_options}>
            <Link
              to="/filter/RENT_AUTO"
              className={`${styles.home_options_item} ${styles.rent}`}
            >
              <h4>
                Долгосрочная
                <br /> аренда
              </h4>
              <LargeSvgImage
                src={getLargeSvgPath("long-term-lease")}
                alt="Долгосрочная аренда"
              />
            </Link>
            <Link
              to="/filter/DAILY_RENT"
              className={`${styles.home_options_item} ${styles.daily}`}
            >
              <h4>
                Посуточная
                <br /> аренда
              </h4>
              <LargeSvgImage
                src={getLargeSvgPath("daily-rent")}
                alt="Посуточная аренда"
              />
            </Link>
            <Link
              to="/filter/BUY_AUTO"
              className={`${styles.home_options_item} ${styles.buyout}`}
            >
              <h4>
                Выкуп
                <br /> автомобилей
              </h4>
              <LargeSvgImage
                src={getLargeSvgPath("buyout")}
                alt="Выкуп автомобилей"
              />
            </Link>
            <Link
              to="/filter/DRIVER_JOBS"
              className={`${styles.home_options_item} ${styles.driver_job}`}
            >
              <h4>
                Работа
                <br /> водителям
              </h4>
              <LargeSvgImage
                src={getLargeSvgPath("driver-work")}
                alt="Работа водителям"
              />
            </Link>
            <Link
              to="/filter/WANTED_RENT"
              className={`${styles.home_options_item} ${styles.wanted_rent}`}
            >
              <h4>
                Поиск
                <br /> арендатора
              </h4>
              <LargeSvgImage
                src={getLargeSvgPath("search")}
                alt="Поиск арендатора"
              />
            </Link>
            <Link
              to="/filter/AUTO_SERVICES"
              className={`${styles.home_options_item} ${styles.autoservices}`}
            >
              <h4>Автосервисы</h4>
              <LargeSvgImage
                src={getLargeSvgPath("autoservices")}
                alt="Автосервисы"
              />
            </Link>
            <Link
              to="/"
              className={`${styles.home_options_item} ${styles.help}`}
            >
              <h4>
                Помощь на
                <br /> дороге
              </h4>
              <LargeSvgImage src={getLargeSvgPath("help")} alt="Залог" />
            </Link>
          </div>
          <div className={styles.home_stories}>
            <div className={styles.home_stories_block}>
              <h4>
                Авторена внесет залог <span>за вас</span>
              </h4>
              <LargeSvgImage src={getLargeSvgPath("bail")} alt="Залог" />
            </div>
          </div>
          <div className={styles.home_info}>
            <h2>Посмотрите объявления в {declineCity(location)}</h2>
            <div className={styles.home_info_points}>
              <button
                className={`${styles.home_filter} ${styles.large}`}
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<LocationModal />);
                }}
              >
                <LargeSvgImage
                  src={getLargeSvgPath("location-icon-2")}
                  alt="Локация"
                />{" "}
                {location}
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
              {isLoading && <Loader className={styles.load} />}
              {error && <div>Ошибка загрузки</div>}
              {listings.length === 0 && !isLoading && (
                <div className={styles.home_empty}>Нет объявлений</div>
              )}
              {filteredCars.map((listing: CarCardType) => (
                <CarCard carData={listing} key={listing.id} />
              ))}
            </div>
          </div>
          <div className={styles.home_recommends}>
            <h2 className={`section-title ${styles.title}`}>
              Рекомендации <span>для вас</span>
            </h2>
            <div className={styles.home_recommends_grid}>
              {isLoading && <Loader className={styles.load} />}
              {error && <div>Ошибка загрузки</div>}
              {listings.length === 0 && !isLoading && (
                <div className={styles.home_empty}>Нет объявлений</div>
              )}
              {filteredCars.map((listing: CarCardType) => (
                <CarCard carData={listing} key={listing.id} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.home_right}>
          <div className={styles.home_right_top}>
            <h3>Популярные запросы сегодня:</h3>
            <div className={styles.home_right_requests}>
              {searchRequests.map((r) => (
                <button
                  className={styles.home_right_request}
                  onClick={() => {
                    setSearchValue(r);
                    navigate("/search-results");
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className={styles.home_right_autorena}>
              Авторена. Мы используем
              <br />
              <a href="#">рекомендательные технологии.</a>
            </p>
            <ul>
              <li>
                <a href="#">Правила сайта</a>
              </li>
              <li>
                <a href="#">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#">Сотрудничество</a>
              </li>
            </ul>
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
