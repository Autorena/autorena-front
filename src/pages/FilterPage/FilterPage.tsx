import { useEffect, useMemo, useState, useCallback, useContext } from "react";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import styles from "../Home/Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../ui-components/Loader/Loader";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import { filterNameMap } from "../../constants/filterMap";
import { sortCars } from "../../utils/sortCars";
import {
  FilterMenu,
  FilterMenuProps,
} from "../../ui-components/FilterMenu/FilterMenu";
import { CarCardType } from "../../types";
import { resetFilter } from "../../redux/listingsSlice";
import { RentFilter } from "./RentFilter";
import { DailyRentFilter } from "./DailyRentFilter";
import { BuyAutoFilter } from "./BuyAutoFilter";
import { WantedRentFilter } from "./WantedRentFilter";
import { DriverVacFilter } from "./DriverVacFilter";
import { LocationContext } from "../../HOC/LocationProvider";
import { useFilterListingsQuery } from "../../redux/listingsApi";

export const FilterPage = () => {
  const { filter } = useParams<{ filter?: string }>();
  const { location } = useContext(LocationContext);
  console.log(filter);
  const dispatch = useAppDispatch();
  const filteredListings = useAppSelector(
    (state) => state.listings.filteredListings
  );
  const isFilterApplied = useAppSelector(
    (state) => state.listings.isFilterApplied
  );

  const getFilterType = () => {
    switch (filter?.toUpperCase()) {
      case "BUY_AUTO":
        return "car_sell_listing";
      case "RENT_AUTO":
      case "DAILY_RENT":
      case "AUTO_SERVICES":
      case "DRIVER_JOBS":
      case "WANTED_RENT":
      default:
        return "car_rent_listing";
    }
  };

  const {
    data: serverData,
    isLoading: serverLoading,
    error: serverError,
  } = useFilterListingsQuery({
    filter: {
      [getFilterType()]: {
        city: location,
      },
    },
    pagination: {
      page: 1,
      page_size: 100,
    },
  });

  const serverListings = serverData?.listings || [];

  const filterTitle = filterNameMap[filter ?? "default"];
  const [sortOption, setSortOption] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch(resetFilter());
  }, [filter, dispatch]);

  const handleSortChange = useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setSortOption(value);
    }
  }, []);

  const displayData = useMemo(() => {
    if (isFilterApplied) {
      return filteredListings;
    }

    return serverListings;
  }, [serverListings, filteredListings, isFilterApplied]);

  const sortedData = useMemo(() => {
    if (sortOption === "default") {
      return displayData;
    }
    return sortCars(displayData, sortOption);
  }, [displayData, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sortOption, filteredListings]);

  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const visibleData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const renderFilter = () => {
    switch (filter) {
      case "RENT_AUTO":
        return (
          <RentFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      case "BUY_AUTO":
        return (
          <BuyAutoFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      case "AUTO_SERVICES":
        return (
          <RentFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      case "DRIVER_JOBS":
        return (
          <DriverVacFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      case "WANTED_RENT":
        return (
          <WantedRentFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      case "DAILY_RENT":
        return (
          <DailyRentFilter
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            filterType={(filter ?? "default").toUpperCase()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`container ${styles.homeWrap} ${styles.filterPage}`}>
      <FilterMenu
        filterType={filter?.toUpperCase() as FilterMenuProps["filterType"]}
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <HeaderMobile className={styles.header_mobile} />
      <Breadcrumbs />
      <div className={styles.home}>
        <div className={styles.home_main}>
          <div className={styles.home_info}>
            <h2 className="section-title">{filterTitle}</h2>
            {renderFilter()}
          </div>
          <div className={styles.home_recommends}>
            {serverError && (
              <div className={styles.empty}>
                {"status" in serverError && serverError.status === 404 ? (
                  "Объявлений не найдено"
                ) : (
                  <>
                    Ошибка загрузки данных:{" "}
                    {"message" in serverError
                      ? serverError.message
                      : "Неизвестная ошибка"}
                  </>
                )}
              </div>
            )}
            {!serverLoading && !serverError && displayData.length === 0 && (
              <div className={styles.empty}>Объявлений не найдено</div>
            )}
            <div className={styles.home_recommends_grid}>
              {visibleData.map(
                (item: CarCardType) => (
                  // item.listing.size === "large" ? (
                  //   <CarCardLarge key={item.listing.id} carData={item} />
                  // ) : (
                  <CarCard key={item.id} carData={item} />
                )
                // )
              )}
              {serverLoading && <Loader className={styles.load} />}
            </div>
            {currentPage < totalPages && (
              <button
                className={`${styles.loadMore} red-btn`}
                onClick={handleLoadMore}
              >
                Показать еще
              </button>
            )}
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
      </div>
      <ul className={styles.footer_list}>
        <li>Долгосрочная аренда авто</li>
        <li>Автосервисы</li>
        <li>Долгосрочная аренда авто</li>
        <li>Автосервисы</li>
        <li>Аренда авто от суток</li>
        <li>Помощь на дороге</li>
        <li>Аренда авто от суток</li>
        <li>Помощь на дороге</li>

        <li>Выкуп автомобилей</li>
        <li>Лизинг</li>
        <li>Выкуп автомобилей</li>
        <li>Лизинг</li>

        <li>Работа водителям</li>
        <li>Запчасти</li>
        <li>Работа водителям</li>
        <li>Запчасти</li>
      </ul>
    </div>
  );
};
