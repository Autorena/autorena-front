import { Controller, useForm } from "react-hook-form";
import styles from "./CreateListing.module.scss";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import {
  driveExperienceOptions,
  employmentTypeOptions,
  paymentPeriodOptions,
  salaryPeriodOptions,
  workScheduleOptions,
} from "../../constants/filterOptions";
import { useCreateListingMutation } from "../../redux/listingsApi";

interface DriverVacancyFormData {
  salary: string;
  salary_periods: string[];
  min_age: string;
  max_age: string;
  drive_experience: string[];
  employment_type: string[];
  payment_period: string[];
  work_schedule: string;
  allow_without_russian_passport?: boolean;
  additional_info: string;
  city: string;
}

export const DriverVacancyForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<DriverVacancyFormData>({
    defaultValues: {
      salary: "",
      salary_periods: [],
      min_age: "",
      max_age: "",
      drive_experience: [],
      employment_type: [],
      payment_period: [],
      work_schedule: "",
      allow_without_russian_passport: undefined,
      additional_info: "",
      city: "",
    },
  });

  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();
  const minAge = watch("min_age");

  const onSubmit = async (data: DriverVacancyFormData) => {
    const payload = {
      listing: {
        driver_vacancy: {
          salary: data.salary,
          salary_periods: data.salary_periods,
          min_age: data.min_age,
          max_age: data.max_age,
          drive_experience: data.drive_experience,
          employment_type: data.employment_type,
          payment_period: data.payment_period,
          work_schedule: data.work_schedule,
          allow_without_russian_passport: data.allow_without_russian_passport,
          additional_info: data.additional_info,
          city: data.city,
        },
      },
    };

    try {
      await createListing(payload).unwrap();
      console.log("Объявление успешно создано");
    } catch (error) {
      console.error("Ошибка при создании объявления:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrap}>
        <h3>Зарплата</h3>
        <input type="number" {...register("salary", { required: true })} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Период оплаты</h3>
        <Controller
          name="salary_periods"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={salaryPeriodOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-130px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Минимальный возраст</h3>
        <input type="number" {...register("min_age")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Максимальный возраст</h3>
        <input
          type="number"
          {...register("max_age", {
            validate: (value) => {
              if (minAge && parseInt(value) < parseInt(minAge)) {
                return "Максимальный возраст не может быть меньше минимального";
              }
              return true;
            },
          })}
        />
        {errors.max_age && (
          <span className={styles.error}>{errors.max_age.message}</span>
        )}
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Требуемый стаж</h3>
        <Controller
          name="drive_experience"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={driveExperienceOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-190px" }}
              isMulti
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Тип занятости</h3>
        <Controller
          name="employment_type"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={employmentTypeOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-90px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Период выплат</h3>
        <Controller
          name="payment_period"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={paymentPeriodOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-160px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>График работы</h3>
        <Controller
          name="work_schedule"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              {workScheduleOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  name="work_schedule"
                  value={option.value}
                  label={option.label}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  labelStyle={{ paddingLeft: "36px" }}
                />
              ))}
            </div>
          )}
        />{" "}
      </div>

      <div className={styles.inputWrap}>
        <h3> Можно без паспорта РФ</h3>
        <Controller
          name="allow_without_russian_passport"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="allow_without_russian_passport"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="allow_without_russian_passport"
                value="false"
                label="Нет"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
                labelStyle={{ paddingLeft: "36px" }}
              />
            </div>
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Город</h3>
        <input type="text" {...register("city")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Описание объявления</h3>
        <textarea {...register("additional_info")} rows={5} />
      </div>

      <button
        type="submit"
        className={`red-btn ${styles.submitBtn}`}
        disabled={isCreating}
      >
        {isCreating ? "Создание..." : "Разместить объявление"}
      </button>
    </form>
  );
};
