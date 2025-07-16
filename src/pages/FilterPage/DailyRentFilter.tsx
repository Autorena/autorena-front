import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import styles from "../Home/Home.module.scss";
import { FilterProps } from "./RentFilter";
import { ReactComponent as Filters } from "../../assets/filters.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import banner from "../../assets/banner-1.png";
import { sortOptions } from "../../constants/sortOptions";
import { useContext, useState } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { carBodyTypeOptions } from "../../constants/filterOptions";
import { useForm } from "react-hook-form";
import { DateRangePickerSheet } from "../../ui-components/DateRangePicker/DateRangePicker";
import { useGetBrandsQuery } from "../../redux/brandsApi";
import { useFilter } from "../../HOC/FilterContext";
import { PriceRangePickerSheet } from "../../ui-components/PriceRangePicker/PriceRangePicker";
import { BrandSearchModal } from "../../components/modals/BrandSearchModal/BrandSearchModal";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { LocationContext } from "../../HOC/LocationProvider";
import { BottomSheet } from "../../ui-components/BottomSheet/BottomSheet";
import { BottomSheetCheckboxFilter } from "../../ui-components/BottomSheet/BottomSheetCheckboxFilter";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars, setFilterError } from "../../redux/listingsSlice";

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
  const { setFilterValue, getFilterValue } = useFilter();
  const [trigger] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { setValue, handleSubmit } = useForm();
  const { data: brandsData } = useGetBrandsQuery("");
  const [isPriceSheetOpen, setIsPriceSheetOpen] = useState(false);
  const priceRange = getFilterValue(FILTER_KEYS.PRICE_RANGE) as
    | [number | null, number | null]
    | undefined;
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const { location } = useContext(LocationContext);
  const [isCarBodySheetOpen, setIsCarBodySheetOpen] = useState(false);
  const carBodyType = getFilterValue(FILTER_KEYS.CAR_BODY_TYPE) as
    | string[]
    | undefined;

  const selectedCity = location || getFilterValue<string>(FILTER_KEYS.CITY);

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
    setIsPriceSheetOpen(false);
  };

  const handleBrandSelect = (value: string) => {
    setValue("brand", value);
    setFilterValue(FILTER_KEYS.BRAND, value);
    setIsBrandModalOpen(false);
  };

  const onSubmit = async () => {
    console.log("форма отправлена");
    const brand = getFilterValue<string>(FILTER_KEYS.BRAND);
    const carBodyType = getFilterValue<string[]>(FILTER_KEYS.CAR_BODY_TYPE);
    const priceRange = getFilterValue<[number | null, number | null]>(
      FILTER_KEYS.PRICE_RANGE
    );
    const selectedCity = location || getFilterValue<string>(FILTER_KEYS.CITY);

    const filterObject = {
      filter: {
        car_rent_listing: {
          city: selectedCity,
          brand: brand || undefined,
          car_body_type:
            carBodyType && carBodyType.length > 0 ? carBodyType : undefined,
          min_price_per_day: priceRange?.[0] || undefined,
          max_price_per_day: priceRange?.[1] || undefined,
          rent_duration: ["RENT_DURATION_FROM_DAY"],
        },
      },
      pagination: {
        page: 1,
        page_size: 100,
      },
    };

    try {
      const result = await trigger(filterObject);
      console.log(result);
      if (result.error) {
        const errorMessage =
          "status" in result.error && result.error.status === 404
            ? "Объявлений не найдено"
            : "Ошибка загрузки данных";

        dispatch(setFilterError(errorMessage));
        return;
      }

      if (result.data) {
        dispatch(setFilteredCars(result.data.listings));
        dispatch(setFilterError(null));
      }
    } catch (err) {
      console.log("err", err);
      setIsFiltersOpen(false);
    }
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
          type="button"
        >
          <Search />
          {selectedBrand || "Марка авто"}
        </button>

        <button
          className={`${styles.home_filter} ${styles.filterBtn} ${
            isFilterActive(FILTER_KEYS.CAR_BODY_TYPE) ? styles.active : ""
          }`}
          onClick={() => setIsCarBodySheetOpen(true)}
          type="button"
        >
          {carBodyType && carBodyType.length > 0
            ? carBodyType
                .map(
                  (type) =>
                    carBodyTypeOptions.find((o) => o.value === type)?.label ||
                    type
                )
                .join(", ")
            : "Тип кузова"}
          <Arrow className={styles.arrow} />
        </button>

        <button
          className={`${styles.home_filter} ${styles.count} ${
            getCurrentCategoryActiveFiltersCount() > 0 ? styles.active : ""
          }`}
          type="button"
        >
          <Filters />
          {getCurrentCategoryActiveFiltersCount() > 0 && (
            <span>{getCurrentCategoryActiveFiltersCount()}</span>
          )}
        </button>

        <div style={{ width: "auto", position: "relative" }}>
          <button
            className={`${styles.home_filter} ${styles.filterBtn} ${
              isFilterActive(FILTER_KEYS.PRICE_RANGE) ? styles.active : ""
            }`}
            onClick={() => setIsPriceSheetOpen(true)}
          >
            {priceRange && (priceRange[0] || priceRange[1]) ? (
              <>
                От {priceRange[0] || 0} ₽ до {priceRange[1] || "∞"} ₽
                <Arrow className={styles.arrow} />
              </>
            ) : (
              <>
                Цена за сутки <Arrow className={styles.arrow} />
              </>
            )}
          </button>
        </div>

        <button className={styles.applyBtn} type="submit">
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
          type="button"
        >
          <Filters />
          Фильтры
        </button>
      </div>

      <PriceRangePickerSheet
        isOpen={isPriceSheetOpen}
        onClose={() => setIsPriceSheetOpen(false)}
        initialPrices={priceRange ?? [null, null]}
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

      <BottomSheet
        isOpen={isCarBodySheetOpen}
        onClose={() => setIsCarBodySheetOpen(false)}
        defaultHeight="auto"
      >
        <BottomSheetCheckboxFilter
          title="Тип кузова"
          options={carBodyTypeOptions}
          values={
            Array.isArray(getFilterValue(FILTER_KEYS.CAR_BODY_TYPE))
              ? (getFilterValue(FILTER_KEYS.CAR_BODY_TYPE) as string[])
              : []
          }
          onChange={(values) => {
            setFilterValue(FILTER_KEYS.CAR_BODY_TYPE, values);
          }}
          onReset={() => {
            setFilterValue(FILTER_KEYS.CAR_BODY_TYPE, []);
          }}
          onSubmit={() => setIsCarBodySheetOpen(false)}
        />
      </BottomSheet>
    </form>
  );
};
