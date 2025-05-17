import { Controller, useForm } from "react-hook-form";
import styles from "./CreateListing.module.scss";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";

const salaryPeriods = [
  { value: "SALARY_PERIOD_PER_SHIFT", label: "За смену" },
  { value: "SALARY_PERIOD_PER_HOUR", label: "За час" },
  { value: "SALARY_PERIOD_PER_MOUNTH", label: "В месяц" },
];

const driveExperiences = [
  { value: "DRIVE_EXPERIENCE_NO_EXPERIENCE", label: "Без стажа" },
  { value: "DRIVE_EXPERIENCE_LESS_THAN_1_YEAR", label: "Меньше года" },
  { value: "DRIVE_EXPERIENCE_1_TO_3_YEARS", label: "От 1 года до 3 лет" },
  { value: "DRIVE_EXPERIENCE_3_TO_5_YEARS", label: "От 3 до 5 лет" },
  { value: "DRIVE_EXPERIENCE_MORE_THAN_5_YEARS", label: "Больше 5 лет" },
];

const employmentTypes = [
  { value: "EMPLOYMENT_TYPE_PART_TIME", label: "Частичная занятость" },
  { value: "EMPLOYMENT_TYPE_FULL_TIME", label: "Полная занятость" },
];

const paymentPeriods = [
  { value: "PAYMENT_PERIOD_DAILY", label: "Ежедневно" },
  { value: "PAYMENT_PERIOD_WEEKLY", label: "Еженедельно" },
  { value: "PAYMENT_PERIOD_BI_MONTHLY", label: "Два раза в месяц" },
  { value: "PAYMENT_PERIOD_MONTHLY", label: "Ежемесячно" },
];

const workSchedules = [
  { value: "WORK_SCHEDULE_FLEXIBLE", label: "Гибкий" },
  { value: "WORK_SCHEDULE_FIVE_DAYS", label: "5 дней в неделю" },
  { value: "WORK_SCHEDULE_TWO_TWO", label: "2 через 2" },
];

export const DriverVacancyForm = () => {
  const { register, handleSubmit, control } = useForm({
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

  const onSubmit = (data: any) => {
    console.log(data);
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
              options={salaryPeriods}
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
        <input type="number" {...register("min_age", { required: true })} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Максимальный возраст</h3>
        <input type="number" {...register("max_age", { required: true })} />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Требуемый стаж</h3>
        <Controller
          name="drive_experience"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={driveExperiences}
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
              options={employmentTypes}
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
              options={paymentPeriods}
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
              {workSchedules.map((option) => (
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

      <button type="submit" className={`red-btn ${styles.submitBtn}`}>
        Разместить объявление
      </button>
    </form>
  );
};
