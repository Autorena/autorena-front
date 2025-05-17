import { useEffect, useMemo, useState } from "react";
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
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const FilterPage = () => {
  const { filter } = useParams<{ filter?: string }>();
  console.log(filter);
  const filters = filterPresets[filter ?? "default"];
  const dispatch = useAppDispatch();
  const { cars, loading } = useAppSelector((state) => state.cars);

  const filterTitle = filterNameMap[filter ?? "default"];
  const [sortOption, setSortOption] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    dispatch(fetchCars()).catch((error) => {
      console.error("Error fetching cars:", error);
    });
  }, []);

  const filteredCars = useMemo(() => {
    if (!filter) return cars;

    return cars.filter((car) => car.common.category === filter.toUpperCase());
  }, [cars, filter]);

  const sortedCars = useMemo(
    () => sortCars(filteredCars, sortOption),
    [cars, sortOption]
  );

  const visibleCars = sortedCars.slice(0, visibleCount);

  useInfiniteScroll(
    () => setVisibleCount((prev) => prev + 20),
    visibleCount < sortedCars.length
  );

  const handleSortChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
    } else {
      setSortOption(value);
    }
  };

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
                  <CarCardLarge carData={car} />
                ) : (
                  <CarCard carData={car} key={car.common.id} />
                )
              )}{" "}
              {loading && <Loader className={styles.load} />}
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
