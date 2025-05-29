import { useEffect, useMemo, useState, useCallback } from "react";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import styles from "../Home/Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loader } from "../../ui-components/Loader/Loader";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import { filterNameMap } from "../../constants/filterMap";
import { ReactComponent as Filters } from "../../assets/filters.svg";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";
import { sortCars } from "../../utils/sortCars";
import { fetchCars } from "../../redux/carsSlice";
import {
  FilterMenu,
  FilterMenuProps,
} from "../../ui-components/FilterMenu/FilterMenu";
import { CarCardLarge } from "../../ui-components/CarCardLarge/CarCardLarge";
import { CarCardType } from "../../types";
import { setFilteredCars } from "../../redux/listingsSlice";

export const FilterPage = () => {
  const { filter } = useParams<{ filter?: string }>();
  const dispatch = useAppDispatch();
  const { cars, loading } = useAppSelector((state) => state.cars);
  const filteredListings = useAppSelector(
    (state) => state.listings.filteredListings
  );

  const filterTitle = filterNameMap[filter ?? "default"];
  const [sortOption, setSortOption] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filterToListingMap: Record<string, keyof CarCardType["listing"]> = {
    RENT_AUTO: "carRentListing",
    DAILY_RENT: "carRentListing",
    BUY_AUTO: "carRentListing",
    DRIVER_JOBS: "carRentListing",
    AUTO_SERVICES: "carRentListing",
    SEARCH: "carRentListing",
  };

  useEffect(() => {
    dispatch(fetchCars()).catch((error) => {
      console.error("Error fetching cars:", error);
    });
  }, []);

  useEffect(() => {
    dispatch(setFilteredCars([]));
  }, [filter, dispatch]);

  const handleSortChange = useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setSortOption(value);
    }
  }, []);

  const displayData = useMemo(() => {
    if (filteredListings.length > 0) {
      return filteredListings.map((listing) => ({ listing }));
    }

    if (!filter) return cars;

    const listingType = filterToListingMap[filter.toUpperCase()];
    if (!listingType) return cars;

    return cars.filter((car) => {
      if (listingType === "carRentListing") {
        if (filter.toUpperCase() === "BUY_AUTO") {
          return (
            car.listing.carRentListing?.listingOptions?.buyoutPossible === true
          );
        }

        const isDailyRent = car.listing.carRentListing?.rentDuration?.includes(
          "RENT_DURATION_FROM_DAY"
        );
        return filter.toUpperCase() === "DAILY_RENT"
          ? isDailyRent
          : !isDailyRent;
      }
      return !!car.listing[listingType];
    });
  }, [cars, filter, filteredListings]);

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
            <div className={styles.home_info_points}>
              <button
                className={`${styles.home_filter} ${styles.filterBtn}`}
                onClick={() => setIsFiltersOpen((prev) => !prev)}
              >
                <Filters />
                Фильтры
              </button>
              <DropdownList
                options={
                  sortOptions[
                    (
                      filter ?? "default"
                    ).toUpperCase() as keyof typeof sortOptions
                  ] ?? sortOptions.default
                }
                value={sortOption}
                onSelect={handleSortChange}
              />
            </div>
          </div>
          <div className={styles.home_recommends}>
            <div className={styles.home_recommends_grid}>
              {visibleData.map((item) =>
                item.listing.size === "large" ? (
                  <CarCardLarge key={item.listing.id} carData={item} />
                ) : (
                  <CarCard key={item.listing.id} carData={item} />
                )
              )}
              {loading && <Loader className={styles.load} />}
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
