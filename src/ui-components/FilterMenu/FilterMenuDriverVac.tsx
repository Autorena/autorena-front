import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { DropdownList } from "../DropdownList/DropdownList";
import {
  driveExperienceOptions,
  employmentTypeOptions,
  salaryPeriodOptions,
  workScheduleOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";

type DriverVacFilterFormData = {
  city?: string;
  min_salary?: number;
  max_salary?: number;
  salary_periods?: string[];
  drive_experience?: string[];
  employment_types?: string[];
  work_schedules?: string[];
  require_russian_citizenship?: boolean;
};

type FilterMenuDriverVacProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterMenuDriverVac = ({
  isOpen,
  onClose,
}: FilterMenuDriverVacProps) => {
  const [trigger] = useLazyFilterListingsQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DriverVacFilterFormData>();

  const onSubmit = async (data: DriverVacFilterFormData) => {
    const filterObject = {
      filter: {
        driver_vacancy: {
          city: data.city,
          min_salary: data.min_salary ? Number(data.min_salary) : undefined,
          max_salary: data.max_salary ? Number(data.max_salary) : undefined,
          salary_periods: data.salary_periods,
          drive_experience: data.drive_experience,
          employment_types: data.employment_types,
          work_schedules: data.work_schedules,
          require_russian_citizenship: data.require_russian_citizenship,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    try {
      const result = await trigger(filterObject);
      console.log("Filter results:", result);
      onClose();
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
          <input type="text" placeholder="Город" {...register("city")} />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="salary">Зарплата</label>
          <div className={styles.fieldsWrap}>
            <input
              type="number"
              placeholder="От"
              className={`${styles.filterMenu_year} ${
                errors.min_salary ? "invalid" : ""
              }`}
              {...register("min_salary")}
            />
            <input
              type="number"
              placeholder="До"
              className={`${styles.filterMenu_year} ${
                errors.max_salary ? "invalid" : ""
              }`}
              {...register("max_salary")}
            />
          </div>
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="salary_periods">Период оплаты</label>
          <DropdownList
            options={salaryPeriodOptions}
            value={watch("salary_periods")}
            onSelect={(value) => setValue("salary_periods", value as string[])}
            isMulti
          />
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
          <label htmlFor="employment_types">Тип занятости</label>
          <DropdownList
            options={employmentTypeOptions}
            value={watch("employment_types")}
            onSelect={(value) =>
              setValue("employment_types", value as string[])
            }
            isMulti
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="work_schedules">График работы</label>
          <DropdownList
            options={workScheduleOptions}
            value={watch("work_schedules")}
            onSelect={(value) => setValue("work_schedules", value as string[])}
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
      </div>

      <div className={styles.filterMenu_bottom}>
        <button type="submit" className={`red-btn ${styles.submitBtn}`}>
          Показать вакансии
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
