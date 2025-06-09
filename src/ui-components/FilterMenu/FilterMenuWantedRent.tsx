import { Controller, useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import {
  carCategoryOptions,
  driveExperienceOptions,
  rentTypesOptions,
  wantedRentDurationOptions,
} from "../../constants/filterOptions";
import { DropdownList } from "../DropdownList/DropdownList";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useFilter } from "../../HOC/FilterContext";
import { useEffect } from "react";
import { RadioButton } from "../RadioButton/RadioButton";
import { FILTER_KEYS } from "../../constants/filterKeys";

type WantedRentFilterFormData = {
  rent_types: string;
  min_age?: number;
  max_age?: number;
  drive_experience: string[];
  deposit_required?: boolean;
  rent_durations: string[];
  require_russian_citizenship?: boolean;
  car_category: string[];
  city: string;
};

type FilterMenuWantedRentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterMenuWantedRent = ({
  isOpen,
  onClose,
}: FilterMenuWantedRentProps) => {
  const [trigger] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const { getFilterValue, setFilterValue } = useFilter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<WantedRentFilterFormData>();

  useEffect(() => {
    const city = getFilterValue<string>(FILTER_KEYS.WANTED_RENT_CITY);
    if (city) {
      setValue("city", city);
    }
  }, [getFilterValue, setValue]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setFilterValue(FILTER_KEYS.WANTED_RENT_CITY, city);
  };

  const onSubmit = async (data: WantedRentFilterFormData) => {
    const filterObject = {
      filter: {
        wanted_car_rent_listing: {
          rent_types: data.rent_types ? [data.rent_types] : undefined,
          min_age: data.min_age,
          max_age: data.max_age,
          drive_experience: data.drive_experience,
          deposit_required: data.deposit_required,
          rent_durations: data.rent_durations,
          require_russian_citizenship: data.require_russian_citizenship,
          car_category: data.car_category,
          city: data.city,
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
          <label htmlFor="rent_types">Тип аренды</label>
          <Controller
            name="rent_types"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", gap: "16px" }}>
                {rentTypesOptions.map((option) => (
                  <RadioButton
                    key={option.value}
                    name="rent_types"
                    value={option.value}
                    label={option.label}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    labelStyle={{ paddingLeft: "36px" }}
                  />
                ))}
              </div>
            )}
          />
        </div>

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
              getFilterValue<string>(FILTER_KEYS.WANTED_RENT_CITY) ||
              ""
            }
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="age">Возраст арендатора</label>
          <div className={styles.fieldsWrap}>
            <input
              type="number"
              placeholder="От"
              className={`${styles.filterMenu_price} ${
                errors.min_age ? "invalid" : ""
              }`}
              {...register("min_age", {
                valueAsNumber: true,
                min: 0,
              })}
            />
            <input
              type="number"
              placeholder="До"
              className={`${styles.filterMenu_price} ${
                errors.max_age ? "invalid" : ""
              }`}
              {...register("max_age", {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="drive_experience">Опыт вождения</label>
          <DropdownList
            options={driveExperienceOptions}
            value={watch("drive_experience")}
            onSelect={(value) =>
              setValue("drive_experience", value as string[])
            }
            isMulti
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="rent_durations">Сроки аренды</label>
          <DropdownList
            options={wantedRentDurationOptions}
            value={watch("rent_durations")}
            onSelect={(value) => setValue("rent_durations", value as string[])}
            isMulti
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

        <label className="checkboxWrapper" style={{ display: "flex" }}>
          <input
            type="checkbox"
            className="checkboxInput"
            {...register("require_russian_citizenship")}
          />
          <span className="checkboxCustom" />
          <span className="checkboxLabel">Требуется гражданство РФ</span>
        </label>

        <div className={styles.inputWrap}>
          <label htmlFor="car_category">Класс авто</label>
          <DropdownList
            options={carCategoryOptions}
            value={watch("car_category")}
            onSelect={(value) => setValue("car_category", value as string[])}
            isMulti
          />
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
