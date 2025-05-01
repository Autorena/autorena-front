import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { useAppDispatch } from "../../redux/hooks";
import { filterCars } from "../../redux/carsSlice";

type FilterFormData = {
  city?: string;
  district?: string;
  min_price?: number;
  max_price?: number;
  start_date?: string;
  end_date?: string;
  can_be_delivered?: boolean;
};

type FilterMenuProps = {
  filters: {
    city?: string;
    district?: string;
    min_price?: string;
    max_price?: string;
    start_date?: string;
    end_date?: string;
    can_be_delivered?: string;
  };
  setIsFilterOpen: (isOpen: boolean) => void;
  isFiltersOpen: boolean;
};

export const FilterMenu = ({
  filters,
  setIsFilterOpen,
  isFiltersOpen,
}: FilterMenuProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data: FilterFormData) => {
    setIsFilterOpen(false);
    console.log(data);
    dispatch(filterCars(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.filterMenu} ${isFiltersOpen ? styles.open : ""}`}
    >
      <button
        className={styles.filterMenu_close}
        onClick={() => setIsFilterOpen(false)}
      >
        <Cross />
      </button>
      <h2 className={styles.filterMenu_title}>Фильтры</h2>
      <div className={styles.filterMenu_fields}>
        {filters.city && (
          <div className={styles.inputWrap}>
            <label htmlFor="">{filters.city}</label>
            <input type="text" placeholder="Город" {...register("city")} />
          </div>
        )}
        {filters.district && (
          <div className={styles.inputWrap}>
            <label htmlFor="">{filters.district}</label>
            <input
              type="text"
              placeholder="Район"
              {...register("district")}
              className={`${errors.district ? "invalid" : ""}`}
            />
          </div>
        )}
        {filters.min_price && filters.max_price && (
          <div className={styles.inputWrap}>
            <label htmlFor="">{filters.min_price}, ₽</label>
            <div className={styles.fieldsWrap}>
              <input
                type="number"
                placeholder="От"
                className={`${styles.filterMenu_price} ${
                  errors.min_price ? "invalid" : ""
                }`}
                {...register("min_price")}
              />
              <input
                type="number"
                placeholder="До"
                className={`${styles.filterMenu_price} ${
                  errors.max_price ? "invalid" : ""
                }`}
                {...register("max_price")}
              />
            </div>
          </div>
        )}
        {filters.start_date && filters.end_date && (
          <div className={styles.inputWrap}>
            <label htmlFor="">{filters.start_date}</label>
            <div className={styles.fieldsWrap}>
              <input
                type="date"
                placeholder="Начало"
                className={styles.filterMenu_date}
                {...register("start_date")}
              />
              <input
                type="date"
                placeholder="Конец"
                className={styles.filterMenu_date}
                {...register("end_date")}
              />
            </div>
          </div>
        )}
        {filters.can_be_delivered && (
          <label className={`checkboxWrapper`} style={{ display: "flex" }}>
            <input
              type="checkbox"
              className="checkboxInput"
              {...register("can_be_delivered")}
            />
            <span className="checkboxCustom" />
            <span className="checkboxLabel">Доставка</span>
          </label>
        )}
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
