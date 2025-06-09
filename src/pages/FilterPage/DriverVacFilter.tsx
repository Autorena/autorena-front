import { ReactComponent as Filters } from "../../assets/filters.svg";
import { ReactComponent as Location } from "../../assets/location-icon-2.svg";
import { ReactComponent as Banner } from "../../assets/profile-banner-1.svg";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";
import styles from "../Home/Home.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { useFilter } from "../../HOC/FilterContext";
import { FILTER_KEYS } from "../../constants/filterKeys";

export interface FilterProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
  sortOption: string;
  onSortChange: (value: string | string[]) => void;
  filterType: string;
}

export const DriverVacFilter = ({
  isFiltersOpen,
  setIsFiltersOpen,
  sortOption,
  onSortChange,
  filterType,
}: FilterProps) => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { getFilterValue } = useFilter();

  return (
    <>
      <Banner className={styles.home_info_banner} />
      <div className={styles.home_info_points}>
        <div className={styles.home_info_points_top}>
          <button
            className={`${styles.home_filter} ${styles.large}`}
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  forFilters={true}
                  initialCity={
                    getFilterValue<string>(FILTER_KEYS.DRIVER_VAC_CITY) ??
                    undefined
                  }
                  cityKey={FILTER_KEYS.DRIVER_VAC_CITY}
                />
              );
            }}
          >
            <Location />{" "}
            {getFilterValue<string>(FILTER_KEYS.DRIVER_VAC_CITY) ||
              "Выберите город"}
          </button>
          <button
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  forFilters={true}
                  initialCity={
                    getFilterValue<string>(FILTER_KEYS.DRIVER_VAC_CITY) ??
                    undefined
                  }
                  cityKey={FILTER_KEYS.DRIVER_VAC_CITY}
                />
              );
            }}
            style={{ padding: "0 8px" }}
            className={styles.home_filter_choose}
          >
            Выбрать город
          </button>
        </div>
        <DropdownList
          options={
            sortOptions[filterType as keyof typeof sortOptions] ??
            sortOptions.default
          }
          value={sortOption}
          onSelect={onSortChange}
        />
        <button
          className={`${styles.home_filter} ${styles.filterBtn}`}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <Filters />
          Фильтры
        </button>
      </div>
    </>
  );
};
