import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import {
  carBodyTypeOptions,
  carCategoryOptions,
  fuelTypeOptions,
  transmissionOptions,
} from "../../constants/filterOptions";
import { DropdownList } from "../DropdownList/DropdownList";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useFilter } from "../../HOC/FilterContext";
import { useEffect } from "react";

const FILTER_KEYS = {
  BRAND: "rent_brand",
  CAR_BODY_TYPE: "rent_car_body_type",
  PRICE_RANGE: "rent_price_range",
  DATE_RANGE: "rent_date_range",
  CITY: "daily_rent_city",
} as const;

type RentFilterFormData = {
  city?: string;
  deposit_required?: boolean;
  transmission_type?: string;
  fuel_type?: string;
  car_body_type?: string;
  car_category?: string;
  min_year?: number;
  max_year?: number;
  min_price_per_day?: number;
  max_price_per_day?: number;
  brand?: string;
};

type FilterMenuRentProps = {
  isOpen: boolean;
  onClose: () => void;
  filterType?:
    | "RENT_AUTO"
    | "DAILY_RENT"
    | "BUY_AUTO"
    | "DRIVER_JOBS"
    | "AUTO_SERVICES"
    | "SEARCH";
};

export const FilterMenuDaily = ({ isOpen, onClose }: FilterMenuRentProps) => {
  const [trigger] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const { filterState, getFilterValue, setFilterValue, resetFilters } =
    useFilter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RentFilterFormData>();

  const filterCity = getFilterValue(FILTER_KEYS.CITY) as string | null;

  useEffect(() => {
    const brand = getFilterValue(FILTER_KEYS.BRAND);
    const carBodyType = getFilterValue(FILTER_KEYS.CAR_BODY_TYPE);
    const priceRange = getFilterValue(FILTER_KEYS.PRICE_RANGE) as
      | [number | null, number | null]
      | null;

    if (typeof brand === "string") {
      setValue("brand", brand);
    }
    if (typeof carBodyType === "string") {
      setValue("car_body_type", carBodyType);
    }
    if (Array.isArray(priceRange)) {
      setValue("min_price_per_day", priceRange[0] || undefined);
      setValue("max_price_per_day", priceRange[1] || undefined);
    }
    if (filterCity) {
      setValue("city", filterCity);
    }
  }, [filterState, setValue, getFilterValue, filterCity]);

  const onSubmit = async (data: RentFilterFormData) => {
    const filterObject = {
      filter: {
        car_rent_listing: {
          transmission_type: data.transmission_type
            ? [data.transmission_type]
            : undefined,
          fuel_type: data.fuel_type ? [data.fuel_type] : undefined,
          car_body_type: data.car_body_type ? [data.car_body_type] : undefined,
          car_category: data.car_category ? [data.car_category] : undefined,
          brand: data.brand ? [data.brand] : undefined,
          city: data.city || filterCity || undefined,
          deposit_required: !data.deposit_required,
          min_year: data.min_year,
          max_year: data.max_year,
          min_price_per_day: data.min_price_per_day,
          max_price_per_day: data.max_price_per_day,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    try {
      const result = await trigger(filterObject);
      if (result.data) {
        dispatch(setFilteredCars(result.data.listings));
        onClose();
      }
    } catch (err) {
      console.error("Failed to filter listings:", err);
    }
  };

  const handleReset = () => {
    reset();
    resetFilters();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.filterMenu} ${isOpen ? styles.open : ""}`}
    >
      <button
        className={styles.filterMenu_close}
        onClick={onClose}
        type="button"
      >
        <Cross />
      </button>
      <h2 className={styles.filterMenu_title}>Фильтры</h2>
      <div className={styles.filterMenu_fields}>
        <div className={styles.inputWrap}>
          <label htmlFor="city">Город</label>
          <input
            type="text"
            placeholder="Город"
            {...register("city")}
            value={watch("city") || filterCity || ""}
            onChange={(e) => {
              setValue("city", e.target.value);
              setFilterValue(FILTER_KEYS.CITY, e.target.value);
            }}
          />
        </div>

        <label className="checkboxWrapper" style={{ display: "flex" }}>
          <input
            type="checkbox"
            className="checkboxInput"
            {...register("deposit_required")}
          />
          <span className="checkboxCustom" />
          <span className="checkboxLabel">Без депозита</span>
        </label>

        <div className={styles.inputWrap}>
          <label htmlFor="transmission_type">Тип трансмиссии</label>
          <DropdownList
            options={transmissionOptions}
            value={watch("transmission_type")}
            onSelect={(value) => setValue("transmission_type", value as string)}
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="fuel_type">Тип топлива</label>
          <DropdownList
            options={fuelTypeOptions}
            value={watch("fuel_type")}
            onSelect={(value) => setValue("fuel_type", value as string)}
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="car_body_type">Тип кузова</label>
          <DropdownList
            options={carBodyTypeOptions}
            value={watch("car_body_type")}
            onSelect={(value) => {
              setValue("car_body_type", value as string);
              setFilterValue(FILTER_KEYS.CAR_BODY_TYPE, value as string);
            }}
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="car_category">Класс авто</label>
          <DropdownList
            options={carCategoryOptions}
            value={watch("car_category")}
            onSelect={(value) => setValue("car_category", value as string)}
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="year">Год выпуска</label>
          <div className={styles.fieldsWrap}>
            <input
              type="number"
              placeholder="От"
              className={`${styles.filterMenu_year} ${
                errors.min_year ? "invalid" : ""
              }`}
              max={new Date().getFullYear()}
              {...register("min_year", {
                valueAsNumber: true,
                min: 1900,
                max: new Date().getFullYear(),
              })}
            />
            <input
              type="number"
              placeholder="До"
              className={`${styles.filterMenu_year} ${
                errors.max_year ? "invalid" : ""
              }`}
              max={new Date().getFullYear()}
              {...register("max_year", {
                valueAsNumber: true,
                min: 1900,
                max: new Date().getFullYear(),
              })}
            />
          </div>
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="price">Цена, ₽</label>
          <div className={styles.fieldsWrap}>
            <input
              type="number"
              placeholder="От"
              className={`${styles.filterMenu_price} ${
                errors.min_price_per_day ? "invalid" : ""
              }`}
              {...register("min_price_per_day", {
                valueAsNumber: true,
                min: 0,
              })}
              value={watch("min_price_per_day") || ""}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : null;
                setValue("min_price_per_day", value || undefined);
                const currentPriceRange = getFilterValue(
                  FILTER_KEYS.PRICE_RANGE
                ) as [number | null, number | null] | null;
                setFilterValue(FILTER_KEYS.PRICE_RANGE, [
                  value,
                  currentPriceRange?.[1] || null,
                ]);
              }}
            />
            <input
              type="number"
              placeholder="До"
              className={`${styles.filterMenu_price} ${
                errors.max_price_per_day ? "invalid" : ""
              }`}
              {...register("max_price_per_day", {
                valueAsNumber: true,
                min: 0,
              })}
              value={watch("max_price_per_day") || ""}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : null;
                setValue("max_price_per_day", value || undefined);
                const currentPriceRange = getFilterValue(
                  FILTER_KEYS.PRICE_RANGE
                ) as [number | null, number | null] | null;
                setFilterValue(FILTER_KEYS.PRICE_RANGE, [
                  currentPriceRange?.[0] || null,
                  value,
                ]);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.filterMenu_bottom}>
        <button type="submit" className={`red-btn ${styles.submitBtn}`}>
          Показать объявления
        </button>
        <button
          type="button"
          className={`${styles.cleanBtn}`}
          onClick={handleReset}
        >
          Сбросить все
        </button>
      </div>
    </form>
  );
};
