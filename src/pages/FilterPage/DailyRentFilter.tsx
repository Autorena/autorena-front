import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import styles from "../Home/Home.module.scss";
import { FilterProps } from "./RentFilter";
import { ReactComponent as Filters } from "../../assets/filters.svg";
import { ReactComponent as Location } from "../../assets/location-icon-2.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import banner from "../../assets/banner-1.png";

import { sortOptions } from "../../constants/sortOptions";
import { useContext, useState, useRef } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { carBodyTypeOptions } from "../../constants/filterOptions";
import { useForm } from "react-hook-form";
import { DateRangePickerSheet } from "../../ui-components/DateRangePicker/DateRangePicker";
import { useGetBrandsQuery } from "../../redux/brandsApi";
import { useFilter } from "../../HOC/FilterContext";
import { PriceRangePickerSheet } from "../../ui-components/PriceRangePicker/PriceRangePicker";
import { BrandSearchModal } from "../../components/modals/BrandSearchModal/BrandSearchModal";

const FILTER_KEYS = {
  BRAND: "rent_brand",
  CAR_BODY_TYPE: "rent_car_body_type",
  PRICE_RANGE: "rent_price_range",
  DATE_RANGE: "rent_date_range",
  CITY: "daily_rent_city",
} as const;

export const DailyRentFilter = ({
  isFiltersOpen,
  setIsFiltersOpen,
  sortOption,
  onSortChange,
  filterType,
}: FilterProps) => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const { setFilterValue, getFilterValue, applyFilters } = useFilter();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { watch, setValue } = useForm();
  const { data: brandsData } = useGetBrandsQuery("");
  const [isPriceSheetOpen, setIsPriceSheetOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: null,
    max: null,
  });
  const priceButtonRef = useRef<HTMLButtonElement>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const isFilterActive = (key: string) => {
    const value = getFilterValue(key);

    if (key === FILTER_KEYS.DATE_RANGE) {
      if (Array.isArray(value)) {
        return value.some((item) => item instanceof Date && item !== null);
      }
      return false;
    }

    if (Array.isArray(value)) {
      return value.some((item) => item);
    }

    return value ? true : false;
  };

  const handleDateSelect = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setFilterValue(FILTER_KEYS.DATE_RANGE, dates);
  };

  const handlePriceSelect = (prices: [number | null, number | null]) => {
    setFilterValue(FILTER_KEYS.PRICE_RANGE, prices);
    setPriceRange({ min: prices[0], max: prices[1] });
    setIsPriceSheetOpen(false);
  };

  const handleBrandSelect = (value: string) => {
    setValue("brand", value);
    setFilterValue(FILTER_KEYS.BRAND, value);
    setIsBrandModalOpen(false);
  };

  const handleCarBodyTypeSelect = (value: string) => {
    setValue("car_body_type", value);
    setFilterValue(FILTER_KEYS.CAR_BODY_TYPE, value);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const selectedBrand = getFilterValue<string>(FILTER_KEYS.BRAND);

  const formatDateRangeDisplay = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };

    if (start && end) {
      if (start.getTime() === end.getTime()) {
        return `${start.toLocaleDateString("ru-RU", options)}`;
      } else {
        return `${start.toLocaleDateString(
          "ru-RU",
          options
        )} - ${end.toLocaleDateString("ru-RU", options)}`;
      }
    } else if (start) {
      return `от ${start.toLocaleDateString("ru-RU", options)}`;
    } else {
      return "Даты аренды";
    }
  };

  const getCurrentCategoryActiveFiltersCount = () => {
    const activeFilters = [
      FILTER_KEYS.BRAND,
      FILTER_KEYS.CAR_BODY_TYPE,
      FILTER_KEYS.PRICE_RANGE,
      FILTER_KEYS.DATE_RANGE,
      FILTER_KEYS.CITY,
    ];

    return activeFilters.reduce((count, key) => {
      const value = getFilterValue(key);

      if (key === FILTER_KEYS.DATE_RANGE) {
        if (Array.isArray(value)) {
          return value.some((item) => item instanceof Date && item !== null)
            ? count + 1
            : count;
        }
        return count;
      }

      if (Array.isArray(value)) {
        return value.some((item) => item) ? count + 1 : count;
      }

      return value ? count + 1 : count;
    }, 0);
  };

  return (
    <>
      <img src={banner} alt="" className={styles.home_info_banner} />
      <div className={styles.filtersPanel}>
        <div className={styles.home_info_points_top}>
          <button
            className={`${styles.home_filter} ${styles.large} ${
              isFilterActive(FILTER_KEYS.CITY) ? styles.active : ""
            }`}
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  forFilters={true}
                  initialCity={
                    getFilterValue<string>(FILTER_KEYS.CITY) ?? undefined
                  }
                  cityKey={FILTER_KEYS.CITY}
                />
              );
            }}
          >
            <Location />{" "}
            {getFilterValue<string>(FILTER_KEYS.CITY) || "Выберите город"}
          </button>
          <button
            onClick={() => {
              setModalActive(true);
              setModalContent(
                <LocationModal
                  forFilters={true}
                  initialCity={
                    getFilterValue<string>(FILTER_KEYS.CITY) ?? undefined
                  }
                  cityKey={FILTER_KEYS.CITY}
                />
              );
            }}
            style={{ padding: "0 8px" }}
            className={`${styles.home_filter_choose} ${
              isFilterActive(FILTER_KEYS.CITY) ? styles.active : ""
            }`}
          >
            Выбрать город
          </button>
        </div>
        <div style={{ width: "auto", position: "relative" }}>
          <button
            className={`${styles.home_filter} ${
              isFilterActive(FILTER_KEYS.DATE_RANGE) ? styles.active : ""
            }`}
            onClick={() => setIsDatePickerOpen(true)}
          >
            <Calendar />
            {formatDateRangeDisplay(dateRange)}
          </button>
        </div>

        <button
          className={`${styles.home_filter} ${
            isFilterActive(FILTER_KEYS.BRAND) ? styles.active : ""
          }`}
          onClick={() => setIsBrandModalOpen(true)}
        >
          <Search />
          {selectedBrand || "Марка авто"}
        </button>

        <DropdownList
          options={carBodyTypeOptions}
          value={watch("car_body_type")}
          onSelect={handleCarBodyTypeSelect}
          className={`${styles.home_filter} ${
            isFilterActive(FILTER_KEYS.CAR_BODY_TYPE) ? styles.active : ""
          }`}
          placeholder="Тип кузова"
        />

        <button
          className={`${styles.home_filter} ${styles.count} ${
            getCurrentCategoryActiveFiltersCount() > 0 ? styles.active : ""
          }`}
        >
          <Filters />
          {getCurrentCategoryActiveFiltersCount() > 0 && (
            <span>{getCurrentCategoryActiveFiltersCount()}</span>
          )}
        </button>

        <div style={{ width: "100%" }}>
          <button
            ref={priceButtonRef}
            className={`${styles.home_filter} ${styles.filterBtn} ${
              styles.priceButton
            } ${isFilterActive(FILTER_KEYS.PRICE_RANGE) ? styles.active : ""}`}
            onClick={() => setIsPriceSheetOpen(true)}
          >
            {priceRange.min || priceRange.max ? (
              <>
                От {priceRange.min || 0} ₽ до {priceRange.max || "∞"} ₽
                <Arrow className={styles.arrow} />
              </>
            ) : (
              <>
                Цена за сутки <Arrow className={styles.arrow} />
              </>
            )}
          </button>
        </div>

        <button className={styles.applyBtn} onClick={handleApplyFilters}>
          Применить фильтры
        </button>
      </div>
      <div className={styles.home_info_points}>
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

      <PriceRangePickerSheet
        isOpen={isPriceSheetOpen}
        onClose={() => setIsPriceSheetOpen(false)}
        initialPrices={[priceRange.min, priceRange.max]}
        onPriceSelect={handlePriceSelect}
      />

      <BrandSearchModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        brands={brandsData?.brands || []}
        onSelectBrand={handleBrandSelect}
      />

      <DateRangePickerSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        initialDates={dateRange}
        onDateSelect={handleDateSelect}
      />
    </>
  );
};
