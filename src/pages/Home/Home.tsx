import styles from "./Home.module.scss";
import option2 from "../../assets/option_2.png";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { Stories } from "../../ui-components/Stories/Stories";
import { useContext, useEffect, useMemo, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Loader } from "../../ui-components/Loader/Loader";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { Link } from "react-router-dom";
import { HomeSlider } from "./HomeSlider";
import { CookieNotific } from "./CookieNotific";
import { declineCity } from "../../utils/declineCity";
import { useFilterListingsQuery } from "../../redux/listingsApi";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";
import { useAppDispatch } from "../../redux/hooks";
import { setCars } from "../../redux/carsSlice";
import { CarCardType } from "../../types";

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
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    type: null,
    value: null,
  });
  const [sortOption, setSortOption] = useState<string>("default");
  const listings = data?.listings || [];
  const dispatch = useAppDispatch();

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
                  <LargeSvgImage
                    src={getLargeSvgPath("filter_1")}
                    alt="Долгосрочная аренда"
                  />
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
                  <LargeSvgImage
                    src={getLargeSvgPath("filter_3")}
                    alt="Тип кузова"
                  />
                </Link>
                <a
                  href="#"
                  className={`${styles.home_option} ${styles.mobile}`}
                >
                  {" "}
                  <h3 className={styles.title}>Помощь на дороге</h3>
                  <LargeSvgImage
                    src={getLargeSvgPath("option_6")}
                    alt="Помощь на дороге"
                  />
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
                  <LargeSvgImage
                    src={getLargeSvgPath("filter_4")}
                    alt="Выкуп автомобилей"
                  />
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
                  <LargeSvgImage
                    src={getLargeSvgPath("filter_5")}
                    alt="Работа водителям"
                  />
                </Link>
              </div>
            </div>
            <a
              href="#"
              className={`${styles.home_option} ${styles.full_height}`}
            >
              {" "}
              <h3 className={styles.title}>Помощь на дороге</h3>
              <LargeSvgImage
                src={getLargeSvgPath("option_6")}
                alt="Помощь на дороге"
              />
            </a>
          </div>
          <div className={styles.home_options_mob}>
            <Link
              to="/filter/RENT_AUTO"
              className={styles.home_options_mob_item}
            >
              <h4>Долгосрочная аренда</h4>
              <LargeSvgImage
                src={getLargeSvgPath("long-term-lease")}
                alt="Долгосрочная аренда"
              />
            </Link>
            <Link
              to="/filter/DAILY_RENT"
              className={styles.home_options_mob_item}
            >
              <h4>Посуточная аренда</h4>
              <LargeSvgImage
                src={getLargeSvgPath("daily-rent")}
                alt="Посуточная аренда"
              />
            </Link>
            <Link
              to="/filter/BUY_AUTO"
              className={styles.home_options_mob_item}
            >
              <h4>Выкуп автомобилей</h4>
              <LargeSvgImage
                src={getLargeSvgPath("buyout")}
                alt="Выкуп автомобилей"
              />
            </Link>
            <Link
              to="/filter/DRIVER_JOBS"
              className={styles.home_options_mob_item}
            >
              <h4>Работа водителям</h4>
              <LargeSvgImage
                src={getLargeSvgPath("driver-work")}
                alt="Работа водителям"
              />
            </Link>
            <Link
              to="/filter/WANTED_RENT"
              className={styles.home_options_mob_item}
            >
              <h4>Поиск арендатора</h4>
              <LargeSvgImage
                src={getLargeSvgPath("search")}
                alt="Поиск арендатора"
              />
            </Link>
            <Link
              to="/filter/AUTO_SERVICES"
              className={styles.home_options_mob_item}
            >
              <h4>Автосервисы</h4>
              <LargeSvgImage
                src={getLargeSvgPath("autoservices")}
                alt="Автосервисы"
              />
            </Link>
            <Link to="/" className={styles.home_options_mob_item}>
              <h4>Помощь на дороге</h4>
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
