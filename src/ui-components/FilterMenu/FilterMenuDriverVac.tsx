import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import {
  driveExperienceOptions,
  employmentTypeOptions,
  paymentPeriodOptions,
  salaryPeriodOptions,
  workScheduleOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars, setFilterError } from "../../redux/listingsSlice";
import { useContext, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { BottomSheetCheckboxFilter } from "../BottomSheet/BottomSheetCheckboxFilter";

type DriverVacFilterFormData = {
  city?: string;
  min_salary: number;
  max_salary: number;
  age: number;
  required_experience?: string[];
  salary_periods: string[];
  payment_periods: string[];
  employment_types?: string[];
  work_schedules?: string[];
  is_russian_citizenship?: boolean;
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
  const dispatch = useAppDispatch();
  const { location } = useContext(LocationContext);
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const [openSheet, setOpenSheet] = useState<
    | null
    | "salary"
    | "age"
    | "salary_periods"
    | "payment_periods"
    | "employment_type"
    | "work_schedules"
    | "citizenship"
    | "experience"
  >(null);
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
          city: location,
          min_salary: data.min_salary ? Number(data.min_salary) : undefined,
          max_salary: data.max_salary ? Number(data.max_salary) : undefined,
          age: data.age,
          salary_periods: data.salary_periods,
          payment_periods: data.payment_periods,
          required_experience: data.required_experience,
          employment_types: data.employment_types,
          work_schedules: data.work_schedules,
          is_russian_citizenship: data.is_russian_citizenship,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    console.log(filterObject);

    try {
      const result = await trigger(filterObject);

      if (result.error) {
        const errorMessage =
          "status" in result.error && result.error.status === 404
            ? "Объявлений не найдено"
            : "Ошибка загрузки данных";

        dispatch(setFilterError(errorMessage));
        dispatch(setFilteredCars([]));

        if ("status" in result.error && result.error.status === 404) {
          onClose();
        }
        return;
      }

      if (result.data) {
        dispatch(setFilteredCars(result.data.listings));
        onClose();
      }
    } catch (err) {
      console.error("Failed to filter listings:", err);
      onClose();
    }
  };

  const minSalary = watch("min_salary");
  const maxSalary = watch("max_salary");

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
      <label>Искать в городе:</label>
      <div className={styles.cityWrap}>
        <button
          type="button"
          className={styles.filterMenu_city}
          onClick={() => {
            setModalActive(true);
            setModalContent(<LocationModal />);
          }}
        >
          <LargeSvgImage
            src={getLargeSvgPath("location-icon-2")}
            alt="Локация"
          />{" "}
          {location}
        </button>
        <button
          type="button"
          onClick={() => {
            setModalActive(true);
            setModalContent(<LocationModal />);
          }}
          style={{ padding: "0 8px" }}
          className={styles.filterMenu_city_choose}
        >
          Изменить город
        </button>
      </div>

      <div className={styles.filterMenu_fields}>
        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          onClick={() => setOpenSheet("salary")}
          type="button"
          style={{ marginBottom: "20px" }}
        >
          {(() => {
            if (minSalary || maxSalary) {
              if (minSalary && maxSalary) {
                return (
                  <>
                    <span>
                      От {minSalary}₽ до {maxSalary}₽
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_salary", 0);
                        setValue("max_salary", 0);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              } else if (minSalary) {
                return (
                  <>
                    <span>От {minSalary}₽</span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_salary", 0);
                        setValue("max_salary", 0);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              } else if (maxSalary) {
                return (
                  <>
                    <span>До {maxSalary}₽</span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_salary", 0);
                        setValue("max_salary", 0);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Зарплата</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          onClick={() => setOpenSheet("age")}
          type="button"
          style={{ marginBottom: "20px" }}
        >
          {(() => {
            const age = watch("age");
            if (age) {
              return (
                <>
                  <span>{age} лет</span>
                  <span
                    className={styles.clearIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("age", 0);
                    }}
                  >
                    <Cross />
                  </span>
                </>
              );
            }
            return (
              <>
                <span>Возраст</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("salary_periods")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("salary_periods");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = salaryPeriodOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("salary_periods", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Периодичность выплат</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("payment_periods")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("payment_periods");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = paymentPeriodOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("payment_periods", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Период выплат</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("experience")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("required_experience");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = driveExperienceOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("required_experience", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Опыт вождения</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("employment_type")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("employment_types");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = employmentTypeOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("employment_types", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Тип занятости</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("work_schedules")}
          type="button"
          style={{ borderRadius: "0 0 8px 8px", marginBottom: "20px" }}
        >
          {(() => {
            const watchedValue = watch("work_schedules");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = workScheduleOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("work_schedules", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>График работы</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field} ${styles.separated}`}
          style={{ borderRadius: "8px" }}
        >
          <span className={styles.checkboxLabel}>Требуется гражданство РФ</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("is_russian_citizenship")}
          />
          <span className={styles.checkboxCustom} />
        </label>
      </div>

      <div className={styles.filterMenu_bottom}>
        <button
          type="button"
          className={`${styles.cleanBtn}`}
          onClick={() => reset()}
        >
          Сброс фильтров
        </button>
        <button type="submit" className={`red-btn ${styles.submitBtn}`}>
          Показать вакансии
        </button>
      </div>
      {openSheet === "age" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <div className={styles.inputWrap} style={{ marginBottom: 0 }}>
            <label className={styles.fieldsWrap_title}>Возраст</label>
            <div className={styles.fieldsWrap}>
              <input
                type="number"
                className={`${styles.filterMenu_age} ${
                  errors.age ? "invalid" : ""
                }`}
                value={watch("age") || ""}
                onChange={(e) => setValue("age", Number(e.target.value))}
              />
            </div>
            <button
              className={styles.submitBtn}
              type="button"
              onClick={() => setOpenSheet(null)}
            >
              Показать объявления
            </button>
          </div>
        </BottomSheet>
      )}

      {openSheet === "salary" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <div className={styles.inputWrap} style={{ marginBottom: 0 }}>
            <label className={styles.fieldsWrap_title}>Зарплата</label>
            <div className={styles.fieldsWrap}>
              <input
                type="number"
                placeholder="От"
                className={`${styles.filterMenu_price} ${
                  errors.min_salary ? "invalid" : ""
                }`}
                value={minSalary || ""}
                {...register("min_salary", {
                  valueAsNumber: true,
                  min: 0,
                })}
                onChange={(e) => setValue("min_salary", Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="До"
                className={`${styles.filterMenu_price} ${
                  errors.max_salary ? "invalid" : ""
                }`}
                value={maxSalary || ""}
                {...register("max_salary", {
                  valueAsNumber: true,
                  min: 0,
                  validate: (value) =>
                    !minSalary || !value || Number(value) >= Number(minSalary),
                })}
                onChange={(e) => setValue("max_salary", Number(e.target.value))}
              />
            </div>

            <button
              className={styles.submitBtn}
              type="button"
              onClick={() => setOpenSheet(null)}
            >
              Показать объявления
            </button>
          </div>
        </BottomSheet>
      )}

      {openSheet === "salary_periods" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <BottomSheetCheckboxFilter
            title="Периодичность выплат"
            options={salaryPeriodOptions}
            values={(watch("salary_periods") as string[]) || []}
            onChange={(values) => setValue("salary_periods", values)}
            onReset={() => setValue("salary_periods", [])}
            onSubmit={() => setOpenSheet(null)}
          />
        </BottomSheet>
      )}

      {openSheet === "payment_periods" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <BottomSheetCheckboxFilter
            title="Период выплат"
            options={paymentPeriodOptions}
            values={(watch("payment_periods") as string[]) || []}
            onChange={(values) => setValue("payment_periods", values)}
            onReset={() => setValue("payment_periods", [])}
            onSubmit={() => setOpenSheet(null)}
          />
        </BottomSheet>
      )}

      {openSheet === "experience" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <BottomSheetCheckboxFilter
            title="Опыт вождения"
            options={driveExperienceOptions}
            values={(watch("required_experience") as string[]) || []}
            onChange={(values) => setValue("required_experience", values)}
            onReset={() => setValue("required_experience", [])}
            onSubmit={() => setOpenSheet(null)}
          />
        </BottomSheet>
      )}

      {openSheet === "employment_type" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <BottomSheetCheckboxFilter
            title="Тип занятости"
            options={employmentTypeOptions}
            values={(watch("employment_types") as string[]) || []}
            onChange={(values) => setValue("employment_types", values)}
            onReset={() => setValue("employment_types", [])}
            onSubmit={() => setOpenSheet(null)}
          />
        </BottomSheet>
      )}

      {openSheet === "work_schedules" && (
        <BottomSheet
          isOpen
          onClose={() => setOpenSheet(null)}
          defaultHeight="auto"
        >
          <BottomSheetCheckboxFilter
            title="График работы"
            options={workScheduleOptions}
            values={(watch("work_schedules") as string[]) || []}
            onChange={(values) => setValue("work_schedules", values)}
            onReset={() => setValue("work_schedules", [])}
            onSubmit={() => setOpenSheet(null)}
          />
        </BottomSheet>
      )}
    </form>
  );
};
