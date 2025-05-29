import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { DropdownList } from "../DropdownList/DropdownList";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import {
  carCategoryOptions,
  driveExperienceOptions,
  rentDurationOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";

type WantedRentFilterFormData = {
  city?: string;
  min_age?: number;
  max_age?: number;
  drive_experience?: string[];
  deposit_required?: boolean;
  rent_durations?: string[];
  require_russian_citizenship?: boolean;
  car_category?: string[];
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<WantedRentFilterFormData>();

  const onSubmit = async (data: WantedRentFilterFormData) => {
    const filterObject = {
      filter: {
        wanted_car_rent_listing: {
          rent_types: ["RENT_TYPE_BUYOUT"],
          city: data.city,
          min_age: data.min_age,
          max_age: data.max_age,
          drive_experience: data.drive_experience,
          deposit_required: data.deposit_required,
          rent_durations: data.rent_durations,
          require_russian_citizenship: data.require_russian_citizenship,
          car_category: data.car_category,
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
      <button className={styles.filterMenu_close} onClick={onClose}>
        <Cross />
      </button>
      <h2 className={styles.filterMenu_title}>Фильтры</h2>
      <div className={styles.filterMenu_fields}>
        <div className={styles.inputWrap}>
          <label htmlFor="city">Город</label>
          <input type="text" placeholder="Город" {...register("city")} />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="age">Возраст арендатора</label>
          <div className={styles.fieldsWrap}>
            <input
              type="number"
              placeholder="От"
              className={`${styles.filterMenu_year} ${
                errors.min_age ? "invalid" : ""
              }`}
              {...register("min_age")}
            />
            <input
              type="number"
              placeholder="До"
              className={`${styles.filterMenu_year} ${
                errors.max_age ? "invalid" : ""
              }`}
              {...register("max_age")}
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

        <label className="checkboxWrapper" style={{ display: "flex" }}>
          <input
            type="checkbox"
            className="checkboxInput"
            {...register("deposit_required")}
          />
          <span className="checkboxCustom" />
          <span className="checkboxLabel">Требуется залог</span>
        </label>

        <div className={styles.inputWrap}>
          <label htmlFor="rent_durations">Срок аренды</label>
          <DropdownList
            options={rentDurationOptions}
            value={watch("rent_durations")}
            onSelect={(value) => setValue("rent_durations", value as string[])}
            isMulti
          />
        </div>

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
          <label htmlFor="car_category">Класс автомобиля</label>
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
