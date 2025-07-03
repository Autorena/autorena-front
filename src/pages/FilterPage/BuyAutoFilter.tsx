import { ReactComponent as Filters } from "../../assets/filters.svg";
// import { ReactComponent as Location } from "../../assets/location-icon-2.svg";
import banner from "../../assets/banner-3.png";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { sortOptions } from "../../constants/sortOptions";
import styles from "../Home/Home.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { useFilter } from "../../HOC/FilterContext";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { LocationContext } from "../../HOC/LocationProvider";

const FILTER_KEYS = {
  BRAND: "buy_auto_brand",
  CAR_BODY_TYPE: "buy_auto_car_body_type",
  PRICE_RANGE: "buy_auto_price_range",
  CITY: "car_sell_city",
} as const;

export interface FilterProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
  sortOption: string;
  onSortChange: (value: string | string[]) => void;
  filterType: string;
}

export const BuyAutoFilter = ({
  isFiltersOpen,
  setIsFiltersOpen,
  sortOption,
  onSortChange,
  filterType,
}: FilterProps) => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { getFilterValue } = useFilter();
  const { location } = useContext(LocationContext);

  const selectedCity = location || getFilterValue<string>(FILTER_KEYS.CITY);

  return (
    <>
      <img src={banner} alt="" className={styles.home_info_banner} />
      <div className={styles.home_info_points}>
        <div className={styles.home_info_points_top}>
          <button
            className={`${styles.home_filter} ${styles.large}`}
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  initialCity={selectedCity ?? undefined}
                  cityKey={FILTER_KEYS.CITY}
                />
              );
            }}
          >
            <LargeSvgImage src={getLargeSvgPath("location-icon-2")} />
            {selectedCity || "Выберите город"}
          </button>
          <button
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  initialCity={selectedCity ?? undefined}
                  cityKey={FILTER_KEYS.CITY}
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
