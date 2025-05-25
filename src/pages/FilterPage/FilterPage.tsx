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
import { FilterMenu } from "../../ui-components/FilterMenu/FilterMenu";
import { filterPresets } from "../../constants/filterPresets";
import { CarCardLarge } from "../../ui-components/CarCardLarge/CarCardLarge";

export const FilterPage = () => {
  const { filter } = useParams<{ filter?: string }>();
  console.log(filter);
  const filters = filterPresets[filter ?? "default"];
  const dispatch = useAppDispatch();
  const { cars, loading } = useAppSelector((state) => state.cars);

  const filterTitle = filterNameMap[filter ?? "default"];
  const [sortOption, setSortOption] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCars()).catch((error) => {
      console.error("Error fetching cars:", error);
    });
  }, []);

  const handleSortChange = useCallback((value: string | string[]) => {
    if (typeof value === "string") {
      setSortOption(value);
    }
  }, []);

  const filteredAndSortedCars = useMemo(() => {
    const filtered = !filter
      ? cars
      : cars.filter((car) => car.common.category === filter.toUpperCase());
    return sortCars(filtered, sortOption);
  }, [cars, filter, sortOption]);

  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredAndSortedCars.length / ITEMS_PER_PAGE);

  const visibleCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedCars.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedCars, currentPage]);

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className={`container ${styles.homeWrap} ${styles.filterPage}`}>
      <FilterMenu
        filters={filters}
        setIsFilterOpen={setIsFiltersOpen}
        isFiltersOpen={isFiltersOpen}
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
                  sortOptions[(filter ?? "default") as keyof typeof sortOptions]
                }
                value={sortOption}
                onSelect={handleSortChange}
              />
            </div>
          </div>
          <div className={styles.home_recommends}>
            <div className={styles.home_recommends_grid}>
              {visibleCars.map((car) =>
                car.common.size === "large" ? (
                  <CarCardLarge key={car.common.id} carData={car} />
                ) : (
                  <CarCard key={car.common.id} carData={car} />
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
