import { Controller, useForm } from "react-hook-form";
import styles from "./CreateListing.module.scss";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";

const rentTypesOptions = [
  { value: "RENT_TYPE_RENT", label: "Аренда" },
  { value: "RENT_TYPE_BUYOUT", label: "Выкуп" },
];

const rentDurationOptions = [
  { value: "RENT_DURATION_FROM_DAY", label: "От суток" },
  { value: "RENT_DURATION_FROM_WEEK", label: "От недели" },
  { value: "RENT_DURATION_FROM_MONTH", label: "От месяца" },
];

const categoryOptions = [
  { value: "CAR_CATEGORY_ECONOMY", label: "Эконом" },
  { value: "CAR_CATEGORY_COMFORT", label: "Комфорт" },
  { value: "CAR_CATEGORY_COMFORT_PLUS", label: "Комфорт +" },
  { value: "CAR_CATEGORY_BUSINESS", label: "Бизнесс" },
  { value: "CAR_CATEGORY_PREMIUM", label: "Премиум" },
];

const driveExperiences = [
  { value: "DRIVE_EXPERIENCE_NO_EXPERIENCE", label: "Без стажа" },
  { value: "DRIVE_EXPERIENCE_LESS_THAN_1_YEAR", label: "Меньше года" },
  { value: "DRIVE_EXPERIENCE_1_TO_3_YEARS", label: "От 1 года до 3 лет" },
  { value: "DRIVE_EXPERIENCE_3_TO_5_YEARS", label: "От 3 до 5 лет" },
  { value: "DRIVE_EXPERIENCE_MORE_THAN_5_YEARS", label: "Больше 5 лет" },
];

export const WantedRentListingForm = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      rent_types: [],
      age: 0,
      drive_experience: "",
      deposit: undefined,
      rent_durations: "",
      is_russian_citizenship: undefined,
      car_categories: [],
      additional_info: "",
      city: "",
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      listing: {
        wanted_car_rent_listing: {
          rent_types: data.rent_types,
          age: data.age,
          drive_experience: data.drive_experience,
          deposit: data.deposit,
          rent_durations: data.rent_durations,
          is_russian_citizenship: data.is_russian_citizenship,
          car_categories: data.car_categories,
          additional_info: data.additional_info,
          city: data.city,
        },
      },
    };

    console.log("Форма отправлена:", payload);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrap}>
        <h3>Тип аренды</h3>
        <Controller
          name="rent_types"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={rentTypesOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-90px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Возраст арендатора</h3>
        <input type="number" {...register("age")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Стаж вождения</h3>
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
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Залог нужен?</h3>
        <Controller
          name="deposit"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="deposit"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="deposit"
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
        <h3>Срок аренды</h3>
        <Controller
          name="rent_durations"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={rentDurationOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-130px" }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Требуется гражданство РФ?</h3>
        <Controller
          name="is_russian_citizenship"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="is_russian_citizenship"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="is_russian_citizenship"
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
        <h3>Классы автомобилей</h3>
        <Controller
          name="car_categories"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={categoryOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-190px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Описание объявления</h3>
        <textarea {...register("additional_info")} rows={5} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Город</h3>
        <input type="text" {...register("city")} />
      </div>

      <button className={`red-btn ${styles.submitBtn}`}>
        Разместить объявление
      </button>
    </form>
  );
};
