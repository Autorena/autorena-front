import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { DropdownList } from "../DropdownList/DropdownList";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import {
  carBodyTypeOptions,
  carCategoryOptions,
  fuelTypeOptions,
  transmissionOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { RentFilterFormData } from "./FilterMenuRent";
import { FILTER_KEYS } from "../../constants/filterKeys";
import { useFilter } from "../../HOC/FilterContext";

type FilterMenuWantedRentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterMenuCarSell = ({
  isOpen,
  onClose,
}: FilterMenuWantedRentProps) => {
  const [trigger] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RentFilterFormData>({
    mode: "onChange",
  });

  const { getFilterValue, setFilterValue } = useFilter();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setFilterValue(FILTER_KEYS.CAR_SELL_CITY, city);
  };

  const onSubmit = async (data: RentFilterFormData) => {
    const filterObject = {
      filter: {
        car_sell_listing: {
          transmission_type: data.transmission_type
            ? [data.transmission_type]
            : undefined,
          fuel_type: data.fuel_type ? [data.fuel_type] : undefined,
          car_body_type: data.car_body_type ? [data.car_body_type] : undefined,
          car_category: data.car_category ? [data.car_category] : undefined,
          city: data.city,
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
            onChange={(e) => {
              register("city").onChange(e);
              handleCityChange(e);
            }}
            value={
              watch("city") ||
              getFilterValue<string>(FILTER_KEYS.CAR_SELL_CITY) ||
              ""
            }
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
            onSelect={(value) => setValue("car_body_type", value as string)}
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
          onClick={() => reset()}
        >
          Сбросить все
        </button>
      </div>
    </form>
  );
};
