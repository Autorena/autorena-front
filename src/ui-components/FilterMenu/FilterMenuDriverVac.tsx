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

  const filterFields = [
    {
      key: "salary_periods",
      label: "Периодичность выплат",
      options: salaryPeriodOptions,
      sheet: "salary_periods",
      type: "checkbox",
    },
    {
      key: "payment_periods",
      label: "Период выплат",
      options: paymentPeriodOptions,
      sheet: "payment_periods",
      type: "checkbox",
    },
    {
      key: "required_experience",
      label: "Опыт вождения",
      options: driveExperienceOptions,
      sheet: "required_experience",
      type: "checkbox",
    },
    {
      key: "employment_types",
      label: "Тип занятости",
      options: employmentTypeOptions,
      sheet: "employment_types",
      type: "checkbox",
    },
    {
      key: "work_schedules",
      label: "График работы",
      options: workScheduleOptions,
      sheet: "work_schedules",
      type: "checkbox",
    },
    {
      key: "salary",
      label: "Зарплата",
      sheet: "salary",
      type: "custom",
    },
    {
      key: "age",
      label: "Возраст",
      sheet: "age",
      type: "custom",
    },
  ];

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

    try {
      const result = await trigger(filterObject);
      console.log("Filter results:", result);
      onClose();
    } catch (err) {
      console.error("Failed to filter listings:", err);
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
        {filterFields.map((field) => {
          const watchedValue = watch(
            field.key as keyof DriverVacFilterFormData
          );
          let selectedLabel: string | undefined;
          if (field.type === "custom" && field.key === "salary") {
            if (minSalary || maxSalary) {
              if (minSalary && maxSalary) {
                selectedLabel = `От ${minSalary}₽ до ${maxSalary}₽`;
              } else if (minSalary) {
                selectedLabel = `От ${minSalary}₽`;
              } else if (maxSalary) {
                selectedLabel = `До ${maxSalary}₽`;
              }
            }
          } else if (field.type === "custom" && field.key === "age") {
            const age = watch("age");
            if (age) {
              selectedLabel = `${age} лет`;
            }
          } else if (field.options) {
            if (Array.isArray(watchedValue)) {
              const selectedOptions = field.options.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                selectedLabel = selectedOptions.map((o) => o.label).join(", ");
              }
            } else if (watchedValue) {
              selectedLabel = field.options.find(
                (o) => o.value === watchedValue
              )?.label;
            }
          }

          return (
            <button
              key={field.key}
              className={styles.filterMenu_field}
              onClick={() =>
                setOpenSheet(
                  field.sheet as
                    | "salary"
                    | "age"
                    | "salary_periods"
                    | "payment_periods"
                    | "employment_type"
                    | "work_schedules"
                    | "citizenship"
                    | "experience"
                )
              }
              type="button"
            >
              {selectedLabel ? (
                <>
                  <span>{selectedLabel}</span>
                  <span
                    className={styles.clearIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (field.type === "custom" && field.key === "salary") {
                        setValue("min_salary", 0);
                        setValue("max_salary", 0);
                      } else {
                        setValue(
                          field.key as keyof DriverVacFilterFormData,
                          ""
                        );
                      }
                    }}
                  >
                    <Cross />
                  </span>
                </>
              ) : (
                <>
                  <span>{field.label}</span>
                  <Arrow />
                </>
              )}
            </button>
          );
        })}
        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field}`}
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
      {filterFields.map((field) =>
        openSheet === field.sheet ? (
          <BottomSheet
            key={field.key}
            isOpen
            onClose={() => setOpenSheet(null)}
            defaultHeight="auto"
          >
            {field.type === "custom" && field.key === "age" && (
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
            )}
            {field.type === "custom" && field.key === "salary" && (
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
                    onChange={(e) =>
                      setValue("min_salary", Number(e.target.value))
                    }
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
                        !minSalary ||
                        !value ||
                        Number(value) >= Number(minSalary),
                    })}
                    onChange={(e) =>
                      setValue("max_salary", Number(e.target.value))
                    }
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
            )}
            {field.type === "checkbox" && field.options && (
              <BottomSheetCheckboxFilter
                title={field.label}
                options={field.options}
                values={
                  (watch(
                    field.key as keyof DriverVacFilterFormData
                  ) as string[]) || []
                }
                onChange={(values) =>
                  setValue(field.key as keyof DriverVacFilterFormData, values)
                }
                onReset={() =>
                  setValue(field.key as keyof DriverVacFilterFormData, [])
                }
                onSubmit={() => setOpenSheet(null)}
              />
            )}
          </BottomSheet>
        ) : null
      )}
    </form>
  );
};
